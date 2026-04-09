import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Views, type View } from 'react-big-calendar';
import { sileo } from 'sileo';
// Types
import type { RootState } from '@/redux/store';
import type { Task } from '@/redux/tasks/task.types';
import { setTasks, removeTask, upsertTask as upsertTaskRedux } from '@/redux/tasks/task.slice';
import { setEvents } from '@/redux/calendar/calendar.slice';
import { fetchGoogleEvents } from '@/api/GoogleCalendar/googleCalendarApi';
import type { TaskData } from '../../CreateTaskModal';
import type { ICalendarEvent } from '../../CalendarEvent';
import { GET_TASKS, DELETE_TASK, GET_WORKSPACES, CREATE_TASK } from '@/api/graphql';
import { useQuery, useMutation } from '@apollo/client';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';

import { mapResponseToTask } from '@/api/Tasks/taskMapper';

export const useCalendarView = () => {
  const dispatch = useDispatch();
  const reduxEvents = useSelector((state: RootState) => state.calendar.reduxEvents);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slotContextMenu, setSlotContextMenu] = useState<{ mouseX: number; mouseY: number; date: Date } | null>(null);

  // New Task Modal State moved to URL parameters
  const [deleteTaskMutation] = useMutation(DELETE_TASK);

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: tasksData } = useQuery(GET_TASKS, {
    skip: !user?.id,
    variables: { userId: user?.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (tasksData?.tasks) {
      const validTasks: Task[] = tasksData.tasks.map((t: TaskResponse) => mapResponseToTask(t));
      dispatch(setTasks(validTasks));
    }
  }, [tasksData, dispatch]);

  // Fetch Google Calendar Events on Mount if not present but user is from Google
  useEffect(() => {
    if (reduxEvents.length === 0 && user?.authProvider === 'google') {
      fetchGoogleEvents()
        .then((events) => {
          if (events) {
            dispatch(setEvents(events));
          }
        })
        .catch((err) => {
          console.error('Failed to restore Google Calendar events', err);
        });
    }
  }, [reduxEvents.length, dispatch, user?.authProvider]);
  const [createTaskMutation] = useMutation(CREATE_TASK);
  const importedIds = useRef(new Set<string>());

  useEffect(() => {
    if (reduxEvents.length > 0 && user?.id) {
      const newEvents = reduxEvents.filter((e) => {
        const normGoogleId = e.id.replace(/^_+/, '').split('_')[0];
        const isAlreadyProcessed = importedIds.current.has(normGoogleId);
        const existsInDB = tasks.some(t => {
          const tGoogleId = t.google_event_id?.replace(/^_+/, '').split('_')[0];
          return tGoogleId === normGoogleId;
        });
        return !isAlreadyProcessed && !existsInDB;
      });

      if (newEvents.length > 0) {
        newEvents.forEach(async (ge) => {
          const normId = ge.id.replace(/^_+/, '').split('_')[0];
          importedIds.current.add(normId);

          try {
            const startStr = ge.start.dateTime || ge.start.date || '';
            const endStr = ge.end.dateTime || ge.end.date || '';
            const start = new Date(startStr);
            const end = endStr ? new Date(endStr) : new Date(start.getTime() + 30 * 60000);
            const durationMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);

            const links: { title: string; url: string }[] = [];
            if (ge.hangoutLink) links.push({ title: 'Google Meet', url: ge.hangoutLink });
            if (ge.conferenceData?.entryPoints) {
              ge.conferenceData.entryPoints.forEach(ep => {
                if (ep.uri) links.push({ title: ep.label || ep.entryPointType || 'Joining Info', url: ep.uri });
              });
            }

            await createTaskMutation({
              variables: {
                createTaskInput: {
                  user_id: user.id || '',
                  title: ge.summary || 'Untitled Import',
                  notes_encrypted: ge.description || '',
                  estimate_timer: durationMinutes > 0 ? durationMinutes : 30,
                  deadline: start.toISOString(),
                  priority_level: 2,
                  status: 'Pending',
                  category: 'Meeting',
                  google_event_id: ge.id,
                  links: links.map(l => ({ title: l.title, url: l.url })),
                },
              },
              refetchQueries: [{ query: GET_TASKS, variables: { userId: user.id } }],
            });
          } catch (err) {
            console.error('Failed to auto-import event:', ge.id, err);
          }
        });
      }
    }
  }, [reduxEvents, tasks, user?.id, createTaskMutation]);

  const events = useMemo(() => {
    // 1. Map Google Calendar Events (Virtual)
    const calendarEvents = reduxEvents
      .filter((e) => {
        const normGoogleId = e.id.replace(/^_+/, '').split('_')[0];
        return !tasks.some(t => {
          const tGoogleId = t.google_event_id?.replace(/^_+/, '').split('_')[0];
          return tGoogleId === normGoogleId;
        });
      })
      .map((ge) => {
        try {
          const startStr = ge.start.dateTime || ge.start.date || '';
          const endStr = ge.end.dateTime || ge.end.date || '';
          if (!startStr) return null;

          return {
            id: ge.id,
            title: ge.summary || 'Untitled',
            start: new Date(startStr),
            end: endStr ? new Date(endStr) : new Date(startStr),
            allDay: !ge.start.dateTime && !!ge.start.date,
            resource: ge,
            type: 'event' as const,
            provider: 'google',
          };
        } catch (err) {
          console.error('Error parsing event', err);
          return null;
        }
      })
      .filter((e): e is NonNullable<typeof e> => Boolean(e));

    // 2. Map Focusly Tasks (Native)
    const taskEvents = tasks.map((task: Task) => {
      const desc = task.notes_encrypted || '';
      const startDateMatch = desc.match(/\[START_DATE:(.*?)\]/);

      let start = new Date(task.deadline || new Date());
      let end = new Date(start.getTime() + (task.estimate_timer || 30) * 60000);

      if (startDateMatch && startDateMatch[1]) {
        const parsedStart = new Date(startDateMatch[1]);
        if (!isNaN(parsedStart.getTime())) {
          start = parsedStart;
          const deadlineDate = new Date(task.deadline || new Date());
          end = deadlineDate;
        }
      }

      return {
        id: task.id,
        title: task.title,
        start,
        end,
        allDay: false,
        resource: task,
        type: 'task' as const,
      };
    });

    const allEvents = [...calendarEvents, ...taskEvents] as ICalendarEvent[];
    const sortedEvents = allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    const result: ICalendarEvent[] = [];
    const activeWindows: { end: number; index: number }[] = [];

    sortedEvents.forEach((event) => {
      const start = event.start.getTime();
      
      for (let i = activeWindows.length - 1; i >= 0; i--) {
        if (activeWindows[i].end <= start) {
          activeWindows.splice(i, 1);
        }
      }

      const usedIndices = new Set(activeWindows.map(w => w.index));
      let overlapIndex = 0;
      while (usedIndices.has(overlapIndex)) {
        overlapIndex++;
      }

      activeWindows.push({ end: event.end.getTime(), index: overlapIndex });
      result.push({ ...event, overlapIndex });
    });

    return result;
  }, [reduxEvents, tasks]);

  const handleOnChangeView = (selectedView: View) => {
    setCurrentView(selectedView);
  };

  const handleOnNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSearchParams({ action: 'create', start: start.toISOString(), end: end.toISOString() });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectEvent = (event: ICalendarEvent | any) => {
    const activeTab = searchParams.get('tab') || 'DailyPlan';

    if (event.type === 'task') {
      const task = tasks.find((t) => t.id === event.id) || (event.resource as Task);
      if (task) {
        setSearchParams({ tab: activeTab, taskId: task.id });
      }
    } else if (event.type === 'event') {
      setSearchParams({ tab: activeTab, taskId: event.id });
    }
  };

  // When clicking "+N más", navigate to day view for that date
  const handleShowMore = (_events: ICalendarEvent[], date: Date) => {
    setCurrentView(Views.DAY);
    setCurrentDate(date);
  };

  const handleSaveTask = (taskData: TaskResponse | TaskData) => {
    // If it's a full task response from GraphQL
    if (taskData && 'id' in taskData && taskData.id) {
      const task = mapResponseToTask(taskData as TaskResponse);
      
      // Use upsertTaskRedux to handle both updates and additions safely
      dispatch(upsertTaskRedux(task));
      
      sileo.success({
        fill: '#ecfdf5ff',
        title: 'Task saved successfully!',
        duration: 4000,
        description: 'Your changes have been synced.',
      });
    }
    handleModalClose();
  };

  const handleModalClose = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('taskId');
    newParams.delete('action');
    newParams.delete('start');
    newParams.delete('end');
    setSearchParams(newParams);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      const isFocuslyTask = taskToDelete?.user_id !== 'google-user';

      if (isFocuslyTask) {
        await deleteTaskMutation({
          variables: { id: taskId },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId: user?.id } },
            { query: GET_WORKSPACES, variables: { search: '' } },
          ],
        });
        dispatch(removeTask({ id: taskId }));
      }

      handleModalClose();
      sileo.success({
        fill: 'rgba(239, 68, 68, 0.9)',
        title: 'Task deleted successfully!',
        description: 'The task has been removed from your schedule.',
      });
    } catch (e) {
      console.error('Failed to delete task', e);
      sileo.error({
        title: 'Failed to delete task',
        description: 'Please try again later.',
        fill: 'rgba(239, 68, 68, 0.9)', // Solid Red
      });
    }
  };

  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isFocusSessionActive, setIsFocusSessionActive] = useState(false);

  const handleSlotContextMenu = (e: React.MouseEvent, date: Date) => {
    e.preventDefault();
    setSlotContextMenu({
      mouseX: e.clientX,
      mouseY: e.clientY,
      date,
    });
  };

  const closeSlotContextMenu = () => {
    setSlotContextMenu(null);
  };

  return {
    events,
    currentView,
    currentDate,
    handleOnChangeView,
    handleOnNavigate,
    handleSelectSlot,
    handleSelectEvent,
    handleSaveTask,
    handleDeleteTask,
    handleModalClose,
    isFocusModeOpen,
    setIsFocusModeOpen,
    isFocusSessionActive,
    setIsFocusSessionActive,
    handleShowMore,
    tasks,
    slotContextMenu,
    handleSlotContextMenu,
    closeSlotContextMenu,
  };
};
