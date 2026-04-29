import { useMutation } from '@apollo/client';
import {
  UPDATE_TASK,
  GET_TASKS,
  GET_TASKS_TITLES,
} from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { useAppDispatch } from '@/redux/hooks';
import { upsertTask as upsertTaskRedux } from '@/redux/tasks/task.slice';
import type { Task } from '@/redux/tasks/task.types';

interface UseTasksMutationsProps {
  userId?: string;
  tasks: TaskResponse[];
  onSuccess?: (message: string, subMessage: string) => void;
}

export const useTasksMutations = ({
  userId,
  tasks,
  onSuccess,
}: UseTasksMutationsProps) => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  const dispatch = useAppDispatch();

  const mapResponseToTask = (t: TaskResponse): Task => ({
    id: t.id,
    user_id: t.user_id || userId || '',
    title: t.title,
    notes_encrypted: t.notes_encrypted || '',
    estimate_timer: t.estimate_timer || 0,
    priority_level: t.priority_level || 2,
    deadline: t.deadline || new Date().toISOString(),
    status: t.status || 'Todo',
    category: t.category || 'General',
    created_at: t.created_at || new Date().toISOString(),
    updated_at: t.updated_at || new Date().toISOString(),
    completed_at: null,
    deleted_at: null,
    subtasks: t.subtasks || [],
    links: t.links || [],
    real_timer: t.real_timer,
    google_event_id: t.google_event_id,
    estimated_start_date: t.estimated_start_date,
    estimated_end_date: t.estimated_end_date,
    tags:
      t.tags?.map((tag: string | { name: string }) =>
        typeof tag === 'string' ? tag : tag.name,
      ) || [],
  });

  const updateTask = async (id: string, task: TaskResponse) => {
    try {
      const {
        title,
        notes_encrypted,
        status,
        estimate_minutes,
        deadline,
        subtasks,
        priority_level,
        category,
        tags,
        google_event_id,
        estimated_start_date,
        estimated_end_date,
        real_timer,
      } = task;

      const { data } = await updateTaskMutation({
        variables: {
          updateTaskInput: {
            id,
            title,
            notes_encrypted,
            status,
            estimate_timer: estimate_minutes,
            real_timer,
            duration: null,
            priority_level,
            deadline,
            subtasks: subtasks?.map((st) => ({
              title: st.title,
              completed: st.completed,
              timer: st.timer,
              notes_encrypted: st.notes_encrypted,
              estimate_timer: st.estimate_timer,
              priority_level: st.priority_level,
              status: st.status,
              deadline: st.deadline,
              category: st.category,
            })),
            category,
            google_event_id,
            estimated_start_date,
            estimated_end_date,
            tags:
              tags?.map((t: string | { name: string }) =>
                typeof t === 'string' ? t : t.name,
              ) || [],
          },
        },
        refetchQueries: [
          { query: GET_TASKS, variables: { userId } },
          { query: GET_TASKS_TITLES, variables: { userId } },
        ],
      });

      if (data?.updateTask) {
        dispatch(upsertTaskRedux(mapResponseToTask(data.updateTask)));
      }

      onSuccess?.(
        'Task updated successfully!',
        'Your changes have been saved.',
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddSubtask = async (
    parentTaskId: string,
    subtask: { title: string; timer: number },
  ) => {
    const parentTask = tasks.find((t) => t.id === parentTaskId);
    if (!parentTask) return;

    const newSubtasks = [
      ...(parentTask.subtasks || []).map((s) => ({
        title: s.title,
        completed: s.completed,
        timer: s.timer,
      })),
      {
        title: subtask.title,
        completed: false,
        timer: subtask.timer,
      },
    ];

    try {
      const { data } = await updateTaskMutation({
        variables: {
          updateTaskInput: {
            id: parentTaskId,
            title: parentTask.title,
            notes_encrypted: parentTask.notes_encrypted,
            status: parentTask.status,
            estimate_timer: parentTask.estimate_minutes,
            duration: null,
            priority_level: parentTask.priority_level,
            deadline: parentTask.deadline,
            subtasks: newSubtasks,
            category: parentTask.category,
            google_event_id: parentTask.google_event_id,
            estimated_start_date: parentTask.estimated_start_date,
            estimated_end_date: parentTask.estimated_end_date,
            tags:
              parentTask.tags?.map((t: string | { name: string }) =>
                typeof t === 'string' ? t : t.name,
              ) || [],
          },
        },
        refetchQueries: [
          { query: GET_TASKS, variables: { userId } },
          { query: GET_TASKS_TITLES, variables: { userId } },
        ],
      });

      if (data?.updateTask) {
        dispatch(upsertTaskRedux(mapResponseToTask(data.updateTask)));
      }

      onSuccess?.(
        'Subtask added successfully!',
        'The subtask has been attached to the parent task.',
      );
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };

  return {
    updateTask,
    handleAddSubtask,
  };
};
