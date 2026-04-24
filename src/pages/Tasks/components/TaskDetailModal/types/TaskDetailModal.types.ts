import type { Task } from '@/redux/tasks/task.types';

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  priority: 'High' | 'Med' | 'Low' | 'No priority';
  category: string;
  deadline: Date | null;
  duration: string;
  subtasks?: { title: string; completed: boolean; timer: number }[];
  tags: string[];
  links?: { title: string; url: string }[];
  google_event_id?: string;
  status?: Task['status'];
  realTime?: string;
  shouldGenerateMeet?: boolean;
  collaborators?: { name: string; email: string; avatar?: string }[];
}

export interface TaskDetailModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initialStart: Date | null;
  initialEnd: Date | null;
  initialTask?: Task | null;
  handleDelete?: (id: string) => Promise<void>;
  handleUpdate?: (task: Task) => Promise<void>;
  parentTask?: {
    id: string;
    title: string;
    subtasks?: { title: string; completed: boolean; timer: number }[];
  };
  subtaskIndex?: number;
}

export interface UseTaskDetailModalProps {
  onSave: (task: Task) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
  initialStart: Date | null;
  initialEnd?: Date | null;
  initialTask?: Task | null;
  parentTask?: Task;
  subtaskIndex?: number;
}

export interface TaskInput {
  title: string;
  notes_encrypted: string;
  estimate_timer: number;
  real_timer: number;
  tags: string[];
  deadline: string;
  priority_level: number;
  category: string;
  links: { title: string; url: string }[];
  status?: string;
  subtasks?: { title: string; completed: boolean; timer: number; notes_encrypted?: string }[];
  google_event_id?: string;
  user_id?: string;
  collaborators?: { name: string; email: string; avatar?: string }[];
}

export interface UseTaskCollectionsProps {
  initialTask?: Task | null;
  onAddLink?: (links: { title: string; url: string }[]) => void;
  onRemoveLink?: (links: { title: string; url: string }[]) => void;
}

export interface UseTaskFormStateProps {
  initialTask?: Task | null;
  initialStart: Date | null;
}

export interface UseTaskMutationsProps {
  onSave: (task: Task) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
  initialTask?: Task | null;
  parentTask?: Task;
  subtaskIndex?: number;
  resetForm: () => void;
}