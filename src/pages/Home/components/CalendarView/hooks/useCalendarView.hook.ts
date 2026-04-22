import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Views, type View } from 'react-big-calendar';
import { 
  addDays, addMonths, addWeeks, subDays, subMonths, subWeeks,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay,
  format,
} from 'date-fns';
import { sileo } from 'sileo';
import type { RootState } from '@/redux/store';
import type { Task } from '@/redux/tasks/task.types';
import { setTasks } from '@/redux/tasks/task.slice';
import { removeEvent, setEvents } from '@/redux/calendar/calendar.slice';
import { fetchGoogleEvents } from '@/api/GoogleCalendar/googleCalendarApi';
import type { ICalendarEvent } from '../../CalendarEvent';
import { GET_TASKS, DELETE_TASK } from '../../CreateTaskModal/tasks.graphql';
import { useQuery, useMutation } from '@apollo/client';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { CalendarNavigateAction } from '../calendarView.types';
import { mapResponseToTask, normalizeGoogleId, getBaseGoogleId } from '@/api/Tasks/taskMapper';

export const useCalendarView = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reduxEvents = useSelector((state: RootState) => state.calendar?.reduxEvents) || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tasks = useSelector((state: RootState) => state.task?.tasks) || [];
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL if available
  const [currentView, setCurrentView] = useState<View>(() => {
    const v = searchParams.get('v');
    const validViews: View[] = [Views.MONTH, Views.WEEK, Views.DAY];
    return validViews.includes(v as View) ? (v as View) : Views.MONTH;
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const d = searchParams.get('d');
    if (d) {
      // Split YYYY-MM-DD and create a local Date at midnight
      const [year, month, day] = d.split('-').map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month - 1, day);
      }
    }
    return new Date();
  });

  // Sync URL with state
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentV = newParams.get('v');
    const currentD = newParams.get('d');
    
    // Use local time date string for the URL to avoid timezone confusion in the calendar view
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    
    if (currentV !== currentView || currentD !== dateStr) {
      newParams.set('v', currentView as string);
      newParams.set('d', dateStr);
      setSearchParams(newParams, { replace: true });
    }
  }, [currentView, currentDate, setSearchParams, searchParams]);

  const [slotContextMenu, setSlotContextMenu] = useState<{ mouseX: number; mouseY: number; date: Date } | null>(null);
  const [resolvedGoogleCalendarUserId, setResolvedGoogleCalendarUserId] = useState<string | null>(null);
  


  // New Task Modal State moved to URL parameters
  const [deleteTaskMutation] = useMutation(DELETE_TASK);

  const user = useSelector((state: RootState) => state.auth.user);

  const dateRange = useMemo(() => {
    let start: Date;
    let end: Date;

    if (currentView === Views.MONTH) {
      // Fetch some days before and after to cover the calendar grid overflow
      start = subDays(startOfMonth(currentDate), 7);
      end = addDays(endOfMonth(currentDate), 7);
    } else if (currentView === Views.WEEK) {
      start = startOfWeek(currentDate);
      end = endOfWeek(currentDate);
    } else {
      start = startOfDay(currentDate);
      end = endOfDay(currentDate);
    }

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }, [currentDate, currentView]);

  const { data: tasksData, loading: isTasksQueryLoading } = useQuery(GET_TASKS, {
    skip: !user?.id,
    variables: { 
      userId: user?.id,
      filters: {
        startDate: dateRange.start,
        endDate: dateRange.end,
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (tasksData?.tasks) {
      const validTasks: Task[] = tasksData.tasks.map((t: TaskResponse) => mapResponseToTask(t));
      dispatch(setTasks(validTasks));
    }
  }, [tasksData, dispatch]);

  const shouldRestoreGoogleCalendar =
    user?.authProvider === 'google' &&
    Boolean(user?.id) &&
    reduxEvents.length === 0 &&
    resolvedGoogleCalendarUserId !== user.id;

  const isGoogleEventsLoading = shouldRestoreGoogleCalendar;

  // Fetch Google Calendar Events when the range or user changes
  useEffect(() => {
    if (user?.authProvider !== 'google' || !user?.id) {
      return;
    }

    let isMounted = true;
    setResolvedGoogleCalendarUserId(null); // Mark as loading for this range

    fetchGoogleEvents(dateRange.start, dateRange.end)
      .then((events) => {
        if (isMounted && events) {
          dispatch(setEvents(events));
        }
      })
      .catch((err) => {
        console.error('Failed to fetch Google Calendar events', err);
      })
      .finally(() => {
        if (isMounted) {
          setResolvedGoogleCalendarUserId(user.id);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch, user?.id, user?.authProvider, dateRange]);

  const hasRenderableCalendarData =
    reduxEvents.length > 0 ||
    tasks.length > 0 ||
    (tasksData?.tasks?.length ?? 0) > 0;

  const isCalendarLoading =
    !hasRenderableCalendarData && (isTasksQueryLoading || isGoogleEventsLoading);
  const events = useMemo(() => {
    // 1. Prepare a set of all synced Google Event IDs for efficient deduplication
    // We store both exact normalized IDs and base IDs to catch series imports.
    const syncedGoogleIds = new Set<string>();
    tasks.forEach(t => {
      if (t.google_event_id) {
        const norm = normalizeGoogleId(t.google_event_id);
        const base = getBaseGoogleId(t.google_event_id);
        if (norm) syncedGoogleIds.add(norm);
        if (base) syncedGoogleIds.add(base);
      }
    });

    // 2. Map Google Calendar Events (Virtual) with robust Deduplication
    const calendarEvents = reduxEvents
      .filter((ge) => {
        const normGoogleId = normalizeGoogleId(ge.id);
        const baseGoogleId = getBaseGoogleId(ge.id);
        
        // Hide if there's any match in our synced IDs set
        const isAlreadySaved = syncedGoogleIds.has(normGoogleId) || syncedGoogleIds.has(baseGoogleId);
                               
        return !isAlreadySaved;
      })
      .map((ge) => {
        try {
          return {
            id: ge.id,
            title: ge.title,
            start: new Date(ge.estimated_start_date),
            end: new Date(ge.deadline),
            allDay: ge.is_all_day,
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

      const deadlineDate = task.deadline ? new Date(task.deadline) : new Date();
      const hasEstimatedStart = task.estimated_start_date && !isNaN(new Date(task.estimated_start_date).getTime());
      
      let start = hasEstimatedStart ? new Date(task.estimated_start_date!) : (isNaN(deadlineDate.getTime()) ? new Date() : deadlineDate);
      let end = hasEstimatedStart && task.estimated_end_date ? new Date(task.estimated_end_date) : new Date(start.getTime() + (task.estimate_timer || 30) * 60000);

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

    // Final Content-Based Deduplication (The "Double-Check" Layer)
    // Even if IDs don't match, we merge events with the same title, start, and end times.
    const mergedEventsMap = new Map<string, ICalendarEvent>();

    [...calendarEvents, ...taskEvents].forEach((event) => {
      // Create a unique composite key for the event content
      const key = `${event.title}_${event.start?.getTime()}_${event.end?.getTime()}`;
      const existing = mergedEventsMap.get(key);

      // Rule: Always prefer native 'task' type over virtual 'event' type if they overlap
      if (!existing || (event.type === 'task' && existing.type === 'event')) {
        mergedEventsMap.set(key, event as ICalendarEvent);
      }
    });

    const allEvents = Array.from(mergedEventsMap.values());
    const sortedEvents = allEvents.sort((a, b) => {
      const aStart = a.start?.getTime() || 0;
      const bStart = b.start?.getTime() || 0;
      return aStart - bStart;
    });

    const result: ICalendarEvent[] = [];
    const activeWindows: { end: number; index: number }[] = [];

    sortedEvents.forEach((event) => {
      const start = event.start?.getTime() || 0;
      
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

  const handleNavigateAction = (action: CalendarNavigateAction) => {
    if (action === 'TODAY') {
      setCurrentDate(new Date());
      return;
    }

    if (currentView === Views.MONTH) {
      setCurrentDate((prev) => (action === 'NEXT' ? addMonths(prev, 1) : subMonths(prev, 1)));
      return;
    }

    if (currentView === Views.WEEK) {
      setCurrentDate((prev) => (action === 'NEXT' ? addWeeks(prev, 1) : subWeeks(prev, 1)));
      return;
    }

    setCurrentDate((prev) => (action === 'NEXT' ? addDays(prev, 1) : subDays(prev, 1)));
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
      const isGoogleTask = taskToDelete?.task_type === 'GoogleTask';

      if (isGoogleTask) {
        // Pure Google Calendar event — delete via REST API
        const eventId = taskToDelete?.google_event_id || taskId;
        await deleteGoogleEvent(eventId);
        dispatch(removeEvent({ id: taskId }));
      } else {
        // PlatformTask — delete via GraphQL (backend handles Google sync if needed)
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
        fill: 'rgba(239, 68, 68, 0.9)',
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
    isCalendarLoading,
    handleOnChangeView,
    handleOnNavigate,
    handleNavigateAction,
    handleSelectSlot,
    handleSelectEvent,
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
