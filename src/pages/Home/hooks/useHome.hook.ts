import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useMutation } from '@apollo/client';
import { GET_TASKS, DELETE_TASK, GET_WORKSPACES, UPDATE_TASK } from '@/api/graphql';
import { removeTask, upsertTask as upsertTaskRedux } from '@/redux/tasks/task.slice';
import { removeEvent } from '@/redux/calendar/calendar.slice';
import { TaskBar } from '../components/Sidebar/types/Sidebar.types';
import type { Task } from '@/redux/tasks/task.types';
import type { TaskSearchItems } from '../../Workspace/types/workspace.types';
import { mapGoogleEventToTask } from '@/api/Tasks/taskMapper';

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
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [activeFocusTask, setActiveFocusTask] = useState<Task | null>(null);
  const [activeFocusSubtaskIndex, setActiveFocusSubtaskIndex] = useState<number | null>(null);

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
  
  const isEditModalOpen = (isTaskDetailsOpen && !isViewFull) || isCreatingNewTask;
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

  const handleStartFocus = (task?: Task | TaskSearchItems | null, subtaskIndex?: number | null) => {
    if (task) {
      setActiveFocusTask(task as Task);
    }
    setActiveFocusSubtaskIndex(typeof subtaskIndex === 'number' ? subtaskIndex : null);
    setIsFocusModeOpen(true);
  };

  const handleOpenTaskDetails = (task: Task | TaskSearchItems, mode: 'view' | 'edit' = 'edit') => {
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
      typeof s === 'string' ? { title: s, completed: false, timer: 0 } : { ...s }
    );
    updatedSubtasks[subtaskIndex].completed = !updatedSubtasks[subtaskIndex].completed;

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
          },
        },
        refetchQueries: [
          { query: GET_TASKS, variables: { userId: (taskDetailsTask as Task).user_id || '' } },
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
          tags: data.updateTask.tags?.map((t: { name: string } | string) => (typeof t === 'string' ? t : t.name)) || [],
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

  const handleSaveTask = (updatedTask: Task) => {
    // Map TaskResponse to Task if needed
    const mappedTask: Task = {
      ...updatedTask,
      user_id: updatedTask.user_id || (taskDetailsTask as Task)?.user_id || user?.id || '',
      notes_encrypted: updatedTask.notes_encrypted || '',
      deadline: updatedTask.deadline || new Date().toISOString(),
      tags: updatedTask.tags?.map((t: { name: string } | string) => (typeof t === 'string' ? t : t.name)) || [],
    };
    dispatch(upsertTaskRedux(mappedTask));
    
    // Also update tempTask to keep the modal state in sync
    if (tempTask && tempTask.id === updatedTask.id) {
      setTempTask(mappedTask);
    }
  };

  const deleteTask = async () => {
    if (taskDetailsTask?.id) {
      try {
        const isGoogleEvent = !!taskDetailsTask.google_event_id;
        const isFocuslyTask = (taskDetailsTask as Task).user_id !== 'google-user';
        
        if (isGoogleEvent && taskDetailsTask.google_event_id) {
          dispatch(removeEvent({ id: taskDetailsTask.google_event_id }));
        }

        if (isFocuslyTask) {
          await deleteTaskMutation({
            variables: { id: taskDetailsTask.id },
            refetchQueries: [
              { query: GET_TASKS, variables: { userId: user?.id || '' } },
              { query: GET_WORKSPACES, variables: { search: '' } },
            ],
          });
          dispatch(removeTask({ id: taskDetailsTask.id }));
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
