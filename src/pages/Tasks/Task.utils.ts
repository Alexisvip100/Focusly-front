import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';

export const validateTaskDelay = (task: TaskResponse) => {
  const now = new Date();
  if (!task.deadline) return false;
  const taskDate = new Date(task.deadline);
  return taskDate.getTime() - now.getTime() < 0;
};
