import type { Task } from "../tasks/task.types";


export interface GoogleCalendarEvent {
  id: string;
  google_event_id: string;
  title: string;
  notes_encrypted: string;
  deadline: string; // ISO string
  estimated_start_date: string; // ISO string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Scheduled' | 'Canceled';
  priority_level: number;
  subtasks: Task[];
  tags: any[];
  links: { title: string; url: string }[];
  estimate_timer?: number;
  participants?: { email: string; responseStatus?: string; avatar?: string }[];
  organizer_email?: string;
  location?: string;
  is_all_day: boolean;
  created_at: string;
  updated_at: string;
}

