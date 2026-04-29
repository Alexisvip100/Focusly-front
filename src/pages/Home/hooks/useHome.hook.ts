import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useMutation } from '@apollo/client';
import { GET_WORKSPACES } from '@/pages/Workspace/workspaces.graphql';
import {
  GET_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
} from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import {
  removeTask,
  upsertTask as upsertTaskRedux,
} from '@/redux/tasks/task.slice';
import { removeEvent } from '@/redux/calendar/calendar.slice';
import { TaskBar } from '../components/Sidebar/types/Sidebar.types';
import type { Task } from '@/redux/tasks/task.types';
import type { TaskSearchItems } from '../../Workspace/types/workspace.types';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import {
  mapGoogleEventToTask,
  normalizeGoogleId,
  mapResponseToTask,
  getBaseGoogleId,
} from '@/api/Tasks/taskMapper';
import { deleteGoogleEvent } from '@/api/GoogleCalendar/googleCalendarApi';

export const useHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const { reduxEvents } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const activeTab = (searchParams.get('tab') as TaskBar) || TaskBar.DailyPlan;

  // Workspace & UI State
  const [isWorkspaceEditorOpen, setIsWorkspaceEditorOpen] = useState(false);
  const [isWorkspaceSidebarOpen, setIsWorkspaceSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  // Focus Mode State
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(() => {
    return localStorage.getItem('focus_mode_open') === 'true';
  });
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);
  const [activeFocusTask, setActiveFocusTask] = useState<Task | null>(() => {
    const saved = localStorage.getItem('focus_mode_task');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeFocusSubtaskIndex, setActiveFocusSubtaskIndex] = useState<
    number | null
  >(() => {
    const saved = localStorage.getItem('focus_mode_subtask_index');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('focus_mode_open', String(isFocusModeOpen));
    if (activeFocusTask) {
      localStorage.setItem('focus_mode_task', JSON.stringify(activeFocusTask));
    } else {
      localStorage.removeItem('focus_mode_task');
    }
    if (activeFocusSubtaskIndex !== null) {
      localStorage.setItem(
        'focus_mode_subtask_index',
        JSON.stringify(activeFocusSubtaskIndex),
      );
    } else {
      localStorage.removeItem('focus_mode_subtask_index');
    }
  }, [isFocusModeOpen, activeFocusTask, activeFocusSubtaskIndex]);

  // Task Details Management via URL
  const taskIdParam = searchParams.get('taskId');
  const [tempTask, setTempTask] = useState<Task | TaskSearchItems | null>(null);

  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [updateTaskMutation] = useMutation(UPDATE_TASK);

  const taskDetailsTask = useMemo(() => {
    if (!taskIdParam) return null;
    if (tempTask && tempTask.id === taskIdParam) return tempTask;

    // Check in native Focusly tasks
    const nativeTask = tasks.find((t) => t.id === taskIdParam);
    if (nativeTask) return nativeTask;

    // Check in Google Calendar events (virtual tasks)
    const googleEvent = reduxEvents.find((e) => e.id === taskIdParam);
    if (googleEvent) return mapGoogleEventToTask(googleEvent);

    return null;
  }, [tasks, reduxEvents, taskIdParam, tempTask]);

  const isTaskDetailsOpen = !!taskIdParam && !!taskDetailsTask;
  const isViewFull = searchParams.get('view') === 'full';

  // New Case: "New Task" via URL (e.g. from calendar slot)
  const isCreatingNewTask = searchParams.get('action') === 'create';

  const isEditModalOpen =
    (isTaskDetailsOpen && !isViewFull) || isCreatingNewTask;
  const isFullViewOpen = isTaskDetailsOpen && isViewFull;

  const initialStart = useMemo(() => {
    const startParam = searchParams.get('start');
    if (!startParam) return null;
    const date = new Date(startParam);
    return isNaN(date.getTime()) ? null : date;
  }, [searchParams]);

  const initialEnd = useMemo(() => {
    const endParam = searchParams.get('end');
    if (!endParam) return null;
    const date = new Date(endParam);
    return isNaN(date.getTime()) ? null : date;
  }, [searchParams]);

  const handleStartFocus = (
    task?: Task | TaskSearchItems | null,
    subtaskIndex?: number | null,
  ) => {
    if (
      task?.id !== activeFocusTask?.id ||
      subtaskIndex !== activeFocusSubtaskIndex
    ) {
      localStorage.removeItem('focus_mode_time_left');
      localStorage.removeItem('focus_mode_is_active');
    }
    if (task) {
      setActiveFocusTask(task as Task);
    }
    setActiveFocusSubtaskIndex(
      typeof subtaskIndex === 'number' ? subtaskIndex : null,
    );
    setIsFocusModeOpen(true);
    setIsFocusModeActive(true);
  };

  const handleOpenTaskDetails = (
    task: Task | TaskSearchItems,
    mode: 'view' | 'edit' = 'edit',
  ) => {
    setTempTask(task);
    const params: Record<string, string> = { tab: activeTab, taskId: task.id };
    if (mode === 'view') params.view = 'full';
    setSearchParams(params);
  };

  const closeTaskDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('taskId');
    newParams.delete('view');
    newParams.delete('action');
    newParams.delete('start');
    newParams.delete('end');
    setSearchParams(newParams);
    setTempTask(null);
  };

  const handleToggleSubtask = async (taskId: string, subtaskIndex: number) => {
    if (!taskDetailsTask || !taskDetailsTask.subtasks) return;

    const updatedSubtasks = [...taskDetailsTask.subtasks].map((s) =>
      typeof s === 'string'
        ? { title: s, completed: false, timer: 0 }
        : { ...s },
    );
    updatedSubtasks[subtaskIndex].completed =
      !updatedSubtasks[subtaskIndex].completed;

    try {
      const { data } = await updateTaskMutation({
        variables: {
          updateTaskInput: {
            id: taskId,
            subtasks: updatedSubtasks.map((s) => ({
              title: s.title,
              completed: s.completed,
              timer: s.timer,
              notes_encrypted: s.notes_encrypted,
              estimate_timer: s.estimate_timer,
              priority_level: s.priority_level,
              status: s.status,
              deadline: s.deadline,
              category: s.category,
            })),
            real_timer: (taskDetailsTask as Task).real_timer,
            google_event_id: (taskDetailsTask as Task).google_event_id,
            estimated_start_date: (taskDetailsTask as Task)
              .estimated_start_date,
            estimated_end_date: (taskDetailsTask as Task).estimated_end_date,
          },
        },
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: { userId: (taskDetailsTask as Task).user_id || '' },
          },
          { query: GET_WORKSPACES, variables: { search: '' } },
        ],
      });

      if (data?.updateTask) {
        // Map TaskResponse (backend) to Task (Redux/Frontend)
        const mappedTask: Task = {
          ...data.updateTask,
          user_id: data.updateTask.user_id || (taskDetailsTask as Task).user_id,
          notes_encrypted: data.updateTask.notes_encrypted || '',
          deadline: data.updateTask.deadline || new Date().toISOString(),
          estimated_start_date: data.updateTask.estimated_start_date,
          estimated_end_date: data.updateTask.estimated_end_date,
          tags:
            data.updateTask.tags?.map((t: { name: string } | string) =>
              typeof t === 'string' ? t : t.name,
            ) || [],
        };
        dispatch(upsertTaskRedux(mappedTask));
      }

      if (tempTask && tempTask.id === taskId) {
        setTempTask({
          ...tempTask,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          subtasks: updatedSubtasks as any,
        });
      }
    } catch (e) {
      console.error('Failed to toggle subtask', e);
    }
  };

  const changeStatusTab = (active: TaskBar) => {
    setSearchParams({ tab: active });
    if (active !== TaskBar.Workspace) {
      setIsWorkspaceEditorOpen(false);
    }
  };

  const handleSaveTask = (updatedTask: Task | TaskResponse) => {
    const mappedTask = mapResponseToTask(updatedTask as TaskResponse);
    const prevTaskId = taskIdParam;

    // 1. Immediately update tempTask to lock the UI state to the new Task data
    // This prevents the modal from closing when taskIdParam changes in the URL
    setTempTask(mappedTask);

    // 2. Update Redux store
    dispatch(upsertTaskRedux(mappedTask));

    // 3. Cleanup virtual Google state to prevent duplication
    if (
      mappedTask.google_event_id ||
      ('task_type' in updatedTask && updatedTask.task_type === 'GoogleTask')
    ) {
      // Remove the specific ID we just converted
      if (prevTaskId) {
        dispatch(removeEvent({ id: prevTaskId }));
      }

      // Secondary cleanup for any other virtual instances of the same event
      const normalizedId = normalizeGoogleId(mappedTask.google_event_id);
      const baseId = getBaseGoogleId(mappedTask.google_event_id);

      const matchingEvents = reduxEvents.filter((e) => {
        const eventId = normalizeGoogleId(e.id);
        const eventBaseId = getBaseGoogleId(e.id);
        return (
          eventId === normalizedId ||
          eventBaseId === baseId ||
          eventId === baseId ||
          eventBaseId === normalizedId
        );
      });

      matchingEvents.forEach((e) => {
        if (e.id !== prevTaskId) {
          dispatch(removeEvent({ id: e.id }));
        }
      });
    }

    // 4. Update the URL: Transition taskId from the Google ID to the Native ID
    const newParams = new URLSearchParams(searchParams);
    newParams.set('taskId', mappedTask.id);
    setSearchParams(newParams);
  };

  const deleteTask = async () => {
    if (taskDetailsTask?.id) {
      try {
        const isGoogleTask =
          (taskDetailsTask as Task).task_type === 'GoogleTask';

        if (!isGoogleTask) {
          // Point 2: Platform Task — Delete from BOTH Google (if synced) and Platform
          if (taskDetailsTask.google_event_id) {
            try {
              await deleteGoogleEvent(taskDetailsTask.google_event_id);
              // Also remove from virtual state
              dispatch(removeEvent({ id: taskDetailsTask.google_event_id }));
            } catch (err) {
              console.warn(
                'Failed to delete synced Google event, proceeding with platform delete',
                err,
              );
            }
          }

          await deleteTaskMutation({
            variables: { id: taskDetailsTask.id },
            refetchQueries: [
              { query: GET_TASKS, variables: { userId: user?.id || '' } },
              { query: GET_WORKSPACES, variables: { search: '' } },
            ],
          });
          dispatch(removeTask({ id: taskDetailsTask.id }));
        } else {
          // Point 1: Pure Google Event — Delete only in Google Calendar
          const eventId = taskDetailsTask.google_event_id || taskDetailsTask.id;
          await deleteGoogleEvent(eventId);
          dispatch(removeEvent({ id: taskDetailsTask.id }));
        }
      } catch (e) {
        console.error('Failed to delete task', e);
      }
    }
    closeTaskDetails();
  };

  return {
    activeTab,
    changeStatusTab,
    isWorkspaceEditorOpen,
    setIsWorkspaceEditorOpen,
    isWorkspaceSidebarOpen,
    setIsWorkspaceSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isFocusModeOpen,
    setIsFocusModeOpen,
    isFocusModeActive,
    setIsFocusModeActive,
    activeFocusTask,
    activeFocusSubtaskIndex,
    handleStartFocus,
    handleOpenTaskDetails,
    taskDetailsTask,
    isFullViewOpen,
    isEditModalOpen,
    closeTaskDetails,
    handleToggleSubtask,
    handleSaveTask,
    deleteTask,
    initialStart,
    initialEnd,
    isCreatingNewTask,
  };
};
