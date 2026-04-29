import type { TaskSearchItems } from '@/pages/Workspace/types/workspace.types';

export interface EditorSidebarProps {
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (b: boolean) => void;
  selectedSubtaskIndex: number | null;
  selectTask: TaskSearchItems | null;
  handleUpdateTask?: (
    taskId: string,
    updates: Partial<TaskSearchItems>,
  ) => Promise<void>;
  onOpenTaskDetails?: (task: TaskSearchItems, mode?: 'view' | 'edit') => void;
  onStartFocus?: (task: TaskSearchItems, subtaskIndex: number | null) => void;
  activeFocusTaskId?: string | null;
}
