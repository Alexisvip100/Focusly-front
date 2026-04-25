export type TaskStatus =
  | 'Todo'
  | 'Planning'
  | 'Pending'
  | 'OnHold'
  | 'Review'
  | 'Done'
  | 'Backlog'
  | 'Scheduled'
  | 'Archived';

export interface Task {
  /** PK */
  id: string;
  /** FK */
  user_id: string;
  title: string;
  /** AES-256 Encrypted (NFR-03.1) */
  notes_encrypted: string;
  /** For Workload Analysis (FR-20) */
  estimate_timer?: number;
  real_timer?: number | null;
  duration?: string | null;
  /** 1=Low, 4=Critical (FR-06) */
  priority_level: number;
  /** Strict Deadline */
  deadline: string;
  status: TaskStatus;
  category: string;
  /** For Golden Hour Analysis (FR-16) */
  completed_at?: string | null;
  created_at: string;
  /** For Sync Conflict Logic (NFR-02.2) */
  updated_at: string;
  /** Soft Delete (For Sync) */
  deleted_at?: string | null;
  tags?: string[] | { name: string }[];
  subtasks?:
    | string[]
    | {
        title: string;
        completed: boolean;
        timer: number;
        notes_encrypted?: string;
        estimate_timer?: number;
        priority_level?: number;
        status?: TaskStatus;
        deadline?: string;
        category?: string;
        id?: string;
        created_at?: string;
        links?: { title: string; url: string }[];
      }[];
  estimated_start_date?: string | null;
  estimated_end_date?: string | null;
  workspaces?: {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    folder?: {
      id: string;
      name: string;
      color?: string;
    } | null;
  }[];
  links?: { title: string; url: string }[];
  collaborators?: {
    name: string;
    email: string;
    avatar?: string;
    responseStatus?: string;
  }[];
  task_type?: 'PlatformTask' | 'GoogleTask';
  google_event_id?: string;
  source?: 'google' | 'platform';
  sync_status?: 'synced' | 'pending' | 'error';
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
