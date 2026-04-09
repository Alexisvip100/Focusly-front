import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface FolderTypes {
  id: string;
  name: string;
  userId: string;
  color?: string;
  workspaceCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceTypes {
  id: string;
  userId: string;
  taskId?: string;
  task?: TaskSearchItems;
  folderId?: string;
  folder?: FolderTypes;
  title: string;
  saveStatus: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceFormData {
  id?: string;
  title: string;
  content: string;
  taskId?: string;
  folderId?: string;
  folder?: FolderTypes;
  saveStatus: boolean;
}

export interface WorkspaceEditorProps {
  onBack: () => void;
  register: UseFormRegister<WorkspaceFormData>;
  setValue: UseFormSetValue<WorkspaceFormData>;
  watch: UseFormWatch<WorkspaceFormData>;
  getValues: UseFormGetValues<WorkspaceFormData>;
  selectTask: TaskSearchItems | null;
  handleSelectTask: (task: TaskSearchItems | null, subtaskIndex?: number | null) => void;
  tasksData: { tasks: TaskSearchItems[] } | undefined;
  selectedSubtaskIndex: number | null;
  onStartFocus?: (task?: TaskSearchItems | null, subtaskIndex?: number | null) => void;
  onOpenTaskDetails?: (task: TaskSearchItems, mode?: 'view' | 'edit') => void;
  onToggleSubtask?: (taskId: string, index: number) => void;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (isOpen: boolean) => void;
  saveStatus?: 'idle' | 'saving' | 'saved';
}

export interface WorkspaceProps {
  isEditorOpen: boolean;
  onEditorChange: (isOpen: boolean) => void;
  onStartFocus?: (task?: TaskSearchItems | null, subtaskIndex?: number | null) => void;
  onOpenTaskDetails?: (task: TaskSearchItems, mode?: 'view' | 'edit') => void;
  isSidebarOpen: boolean;
  onSidebarChange: (isOpen: boolean) => void;
}
export interface TaskSearchItems {
  id: string;
  title: string;
  status: string;
  estimate_timer: number;
  duration?: number;
  priority_level: number;
  category?: string;
  deadline: string;
  notes_encrypted?: string;
  subtasks?: {
    title: string;
    completed: boolean;
    timer: number;
    notes_encrypted?: string;
    estimate_timer?: number;
    priority_level?: number;
    status?: string;
    deadline?: string;
    category?: string;
  }[];
  links?: { title: string; url: string }[];
  google_event_id?: string;
}
