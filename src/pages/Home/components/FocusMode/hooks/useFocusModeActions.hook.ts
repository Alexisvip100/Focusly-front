import { useMutation } from '@apollo/client';
import {
  GET_TOTAL_WORKSPACES,
  GET_WORKSPACES,
} from '@/pages/Workspace/workspaces.graphql';
import {
  UPDATE_TASK,
  GET_TASKS,
  GET_TASKS_TITLES,
} from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import type { Task, TaskStatus } from '@/redux/tasks/task.types';

interface UseFocusModeActionsProps {
  userId?: string;
  onSessionComplete: () => void;
}

export const useFocusModeActions = ({
  userId,
  onSessionComplete,
}: UseFocusModeActionsProps) => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK);

  const handleCompleteTask = async (
    activeTask: Task,
    activeSubtaskIndex: number | null,
    timeSpentMinutes: number,
  ) => {
    try {
      if (activeSubtaskIndex !== null && activeTask.subtasks) {
        const updatedSubtasks = [...activeTask.subtasks];
        const subtask = updatedSubtasks[activeSubtaskIndex as number];

        if (typeof subtask === 'string') return;

        const subtaskInput = {
          title: subtask.title,
          completed: true,
          timer: Math.round((subtask.timer || 0) + timeSpentMinutes),
          estimate_timer: subtask.estimate_timer,
          priority_level: subtask.priority_level,
          category: subtask.category,
        };

        const subtasksInput = updatedSubtasks.map((st, idx) => {
          if (idx === activeSubtaskIndex) return subtaskInput;
          if (typeof st === 'string')
            return { title: st, completed: false, timer: 0 };
          return {
            title: st.title,
            completed: st.completed,
            timer: Math.round(st.timer || 0),
            estimate_timer: st.estimate_timer,
            priority_level: st.priority_level,
            category: st.category,
          };
        });

        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              subtasks: subtasksInput,
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
            { query: GET_TOTAL_WORKSPACES },
            { query: GET_WORKSPACES, variables: { search: '' } },
          ],
        });
      } else {
        const totalRealTimer = Math.round(
          (activeTask.real_timer || 0) + timeSpentMinutes,
        );
        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              status: 'Done',
              real_timer: totalRealTimer,
              duration: totalRealTimer.toString(),
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
            { query: GET_TOTAL_WORKSPACES },
            { query: GET_WORKSPACES, variables: { search: '' } },
          ],
        });
      }
      onSessionComplete();
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleUpdateStatus = async (
    activeTask: Task,
    activeSubtaskIndex: number | null,
    newStatus: TaskStatus,
  ) => {
    try {
      if (activeSubtaskIndex !== null && activeTask.subtasks) {
        const updatedSubtasks = [...activeTask.subtasks];
        const subtasksInput = updatedSubtasks.map((st, idx) => {
          if (typeof st === 'string')
            return { title: st, completed: false, timer: 0 };
          return {
            title: st.title,
            completed: st.completed,
            timer: st.timer,
            estimate_timer: st.estimate_timer,
            priority_level: st.priority_level,
            category: st.category,
            status: idx === activeSubtaskIndex ? newStatus : st.status,
          };
        });

        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              subtasks: subtasksInput,
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
          ],
        });
      } else {
        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              status: newStatus,
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
          ],
        });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleUpdatePriority = async (
    activeTask: Task,
    activeSubtaskIndex: number | null,
    newPriority: number,
  ) => {
    try {
      if (activeSubtaskIndex !== null && activeTask.subtasks) {
        const updatedSubtasks = [...activeTask.subtasks];
        const subtasksInput = updatedSubtasks.map((st, idx) => {
          if (typeof st === 'string')
            return { title: st, completed: false, timer: 0 };
          return {
            title: st.title,
            completed: st.completed,
            timer: st.timer,
            estimate_timer: st.estimate_timer,
            priority_level:
              idx === activeSubtaskIndex ? newPriority : st.priority_level,
            category: st.category,
            status: st.status,
          };
        });

        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              subtasks: subtasksInput,
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
          ],
        });
      } else {
        await updateTaskMutation({
          variables: {
            updateTaskInput: {
              id: activeTask.id,
              priority_level: newPriority,
            },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId } },
            { query: GET_TASKS_TITLES, variables: { userId } },
          ],
        });
      }
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  return {
    handleCompleteTask,
    handleUpdateStatus,
    handleUpdatePriority,
  };
};
