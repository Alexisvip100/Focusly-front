export interface TaskFilterInput {
  status?:
    | 'Todo'
    | 'Planning'
    | 'Pending'
    | 'OnHold'
    | 'Review'
    | 'Done'
    | 'Backlog'
    | 'Scheduled'
    | 'Archived';
  priorityLevel?: number;
  category?: string;
}

export interface TaskSortInput {
  sort?: string;
  order?: string;
}

export interface TaskResponse {
  id: string;
  user_id: string;
  title: string;
  notes_encrypted: string;
  estimate_timer: number;
  estimate_minutes: number;
  priority_level: number;
  category: string;
  deadline: string; // GraphQL usually sends ISO string for Dates
  status:
    | 'Todo'
    | 'Planning'
    | 'Pending'
    | 'OnHold'
    | 'Review'
    | 'Done'
    | 'Backlog'
    | 'Scheduled'
    | 'Archived';
  completed_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  tags: { name: string }[];
  subtasks: {
    title: string;
    completed: boolean;
    timer: number;
    notes_encrypted?: string;
    estimate_timer?: number;
    priority_level?: number;
    status?:
      | 'Todo'
      | 'Planning'
      | 'Pending'
      | 'OnHold'
      | 'Review'
      | 'Done'
      | 'Backlog'
      | 'Scheduled'
      | 'Archived';
    deadline?: string;
    category?: string;
    created_at?: string;
    id?: string;
    links?: { title: string; url: string }[];
  }[];
  filters?: TaskFilterInput;
  sort?: TaskSortInput;
  links?: { title: string; url: string }[];
  google_event_id?: string;
  estimated_start_date?: string;
  estimated_end_date?: string;
}

export interface updateTask {
  id: string;
  title?: string;
  notes_encrypted?: string;
  estimate_timer?: number;
  priority_level?: number;
  deadline?: string;
  status?:
    | 'Todo'
    | 'Planning'
    | 'Pending'
    | 'OnHold'
    | 'Review'
    | 'Done'
    | 'Backlog'
    | 'Scheduled'
    | 'Archived';
  subtasks?: string[];
  estimated_start_date?: string;
  estimated_end_date?: string;
}

export interface CreateTaskRequest {
  user_id: string;
  title: string;
  notes_encrypted: string;
  estimate_timer: number;
  priority_level: number;
  deadline: string;
  status:
    | 'Todo'
    | 'Planning'
    | 'Pending'
    | 'OnHold'
    | 'Review'
    | 'Done'
    | 'Backlog'
    | 'Scheduled'
    | 'Archived';
  tags: string[];
  subtasks: string[];
  estimated_start_date?: string;
  estimated_end_date?: string;
}
