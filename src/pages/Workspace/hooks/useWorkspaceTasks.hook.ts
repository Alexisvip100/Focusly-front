import { useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TOTAL_WORKSPACES } from '../workspaces.graphql';
import { GET_TASKS_TITLES, UPDATE_TASK } from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import type { TaskSearchItems } from '../types/workspace.types';

interface UseWorkspaceTasksProps {
  userId?: string;
  onTaskSelect?: (taskId: string | undefined) => void;
}

export const useWorkspaceTasks = ({ userId, onTaskSelect }: UseWorkspaceTasksProps) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState<number | null>(null);

  const { data: tasksData, loading: isLoading } = useQuery(GET_TASKS_TITLES, {
    skip: !userId,
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });

  const [updateTaskMutation] = useMutation(UPDATE_TASK);

  const selectTask = useMemo(() => {
    if (!tasksData?.tasks || !selectedTaskId) return null;
    return tasksData.tasks.find((t: TaskSearchItems) => t.id === selectedTaskId) || null;
  }, [tasksData, selectedTaskId]);

  const handleSelectTask = (selectedTask: TaskSearchItems | null, subtaskIndex?: number | null) => {
    if (selectedTask?.id !== selectedTaskId) {
      setSelectedSubtaskIndex(typeof subtaskIndex === 'number' ? subtaskIndex : null);
    } else {
      setSelectedSubtaskIndex(typeof subtaskIndex === 'number' ? subtaskIndex : null);
    }

    setSelectedTaskId(selectedTask?.id || null);
    onTaskSelect?.(selectedTask?.id);
    if (!selectedTask) {
      setSelectedSubtaskIndex(null);
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<TaskSearchItems>) => {
    try {
      await updateTaskMutation({
        variables: {
          updateTaskInput: {
            id: taskId,
            ...updates,
          },
        },
        refetchQueries: [
          { query: GET_TASKS_TITLES, variables: { userId } },
          { query: GET_TOTAL_WORKSPACES },
        ],
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleSubtask = async (taskId: string, subtaskIndex: number) => {
    if (!selectTask || !selectTask.subtasks) return;

    const updatedSubtasks = [...selectTask.subtasks];
    const subtask = { ...updatedSubtasks[subtaskIndex] };
    subtask.completed = !subtask.completed;
    updatedSubtasks[subtaskIndex] = subtask;

    await handleUpdateTask(taskId, { subtasks: updatedSubtasks });
  };

  // Sync is no longer needed as selectTask is derived from useMemo using tasksData and selectedTaskId

  return {
    tasksData,
    isLoading,
    selectTask,
    selectedSubtaskIndex,
    handleSelectTask,
    handleUpdateTask,
    handleToggleSubtask,
  };
};
