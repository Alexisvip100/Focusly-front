import { useMutation } from '@apollo/client';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { GET_WORKSPACES } from '@/pages/Workspace/workspaces.graphql';
import { 
  CREATE_TASK, 
  UPDATE_TASK, 
  DELETE_TASK, 
  GET_TASKS,
} from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import { removeEvent } from '@/redux/calendar/calendar.slice';
import { removeTask, upsertTask } from '@/redux/tasks/task.slice';
import { sileo } from 'sileo';
import type { Task } from '@/redux/tasks/task.types';

import { mapResponseToTask } from '@/api/Tasks/taskMapper';

import { deleteGoogleEvent } from '@/api/GoogleCalendar/googleCalendarApi';

export const useCalendarContextMenu = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDuplicateTask = async (task: Task) => {
    if (!user) return;
    
    // Check if it's a Google event mirrored task - we probably shouldn't duplicate these directly via Focusly API or they lose sync
    if (task.task_type === 'GoogleTask') {
        sileo.error({ title: 'Cannot duplicate Google events via context menu' });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...duplicateInput } = {
      ...task,
      title: `${task.title} (Copy)`,
      real_timer: 0,
      user_id: user.id || '',
      links: task.links?.map(l => ({ title: l.title, url: l.url })) || [],
      tags: task.tags || [],
    };

    try {
      const { data } = await createTask({
        variables: { 
          createTaskInput: {
            title: duplicateInput.title,
            notes_encrypted: duplicateInput.notes_encrypted,
            estimate_timer: duplicateInput.estimate_timer,
            real_timer: 0,
            status: duplicateInput.status,
            priority_level: duplicateInput.priority_level,
            category: duplicateInput.category,
            deadline: duplicateInput.deadline,
            user_id: duplicateInput.user_id,
            links: duplicateInput.links,
            tags: duplicateInput.tags,
          } 
        },
        // We'll skip refetchQueries here and rely on upsertTask to avoid duplication flickers
        // Apollo's internal cache will handle the rest if configured correctly
      });
      
      if (data?.createTask) {
        const newTask = mapResponseToTask(data.createTask);
        dispatch(upsertTask(newTask));
        sileo.success({ 
            title: 'Task duplicated',
            fill: '#ecfdf5ff'
        });
      }
    } catch (error) {
      console.error('Failed to duplicate task:', error);
      sileo.error({ title: 'Failed to duplicate task' });
    }
  };

  const handleChangePriority = async (taskId: string, priorityLevel: number) => {
    if (!user) return;

    try {
      const { data } = await updateTask({
        variables: {
          updateTaskInput: {
            id: taskId,
            priority_level: priorityLevel,
          },
        },
      });

      if (data?.updateTask) {
        const updatedTask = mapResponseToTask(data.updateTask);
        dispatch(upsertTask(updatedTask));
        sileo.success({ 
            title: 'Priority updated',
            fill: '#ecfdf5ff'
        });
      }
    } catch (error) {
      console.error('Failed to update priority:', error);
      sileo.error({ title: 'Failed to update priority' });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;

    try {
      await deleteTask({
        variables: { id: taskId },
        refetchQueries: [
            { query: GET_TASKS, variables: { userId: user.id } },
            { query: GET_WORKSPACES, variables: { search: '' } }
        ],
      });
      dispatch(removeTask({ id: taskId }));
      sileo.success({ 
          title: 'Task deleted',
          fill: 'rgba(239, 68, 68, 0.9)'
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      sileo.error({ title: 'Failed to delete task' });
    }
  };

  const handleDeleteGoogleEvent = async (eventId: string) => {
    try {
      await deleteGoogleEvent(eventId);
      dispatch(removeEvent({ id: eventId }));
      sileo.success({ 
          title: 'Event deleted',
          fill: 'rgba(239, 68, 68, 0.9)'
      });
    } catch (error) {
      console.error('Failed to delete Google event:', error);
      sileo.error({ title: 'Failed to delete event' });
    }
  };

  return {
    handleDuplicateTask,
    handleChangePriority,
    handleDeleteTask,
    handleDeleteGoogleEvent,
  };
};
