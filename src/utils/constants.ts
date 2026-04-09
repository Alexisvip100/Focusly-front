import type { Task, TaskStatus } from '@/redux/tasks/task.types';

export const BASE_EMPTY_TASK: Partial<Task> = {
  title: '',
  notes_encrypted: '',
  status: 'Todo' as TaskStatus,
  priority_level: 2,
  subtasks: [],
  category: 'Personal',
  real_timer: 0,
};

export const DEFAULT_WORKSPACE_DATA = {
  title: 'Untitled Strategic Plan',
  content: '[]',
  saveStatus: true,
};
