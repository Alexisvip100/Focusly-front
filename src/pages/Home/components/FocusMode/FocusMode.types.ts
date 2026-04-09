import type { Task } from '@/redux/tasks/task.types';

export interface FocusModeProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  tasks?: Task[];
  onComplete?: (taskId: string) => void;
  onActiveChange?: (isActive: boolean) => void;
  subtaskIndex?: number | null;
}

export type ViewMode = 'full' | 'mini';

export interface Position {
  x: number;
  y: number;
}
