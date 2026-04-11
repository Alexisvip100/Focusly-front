import type { Task, TaskStatus } from '@/redux/tasks/task.types';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';

/**
 * Maps a Google Calendar event to a Focusly Task structure.
 * This is used for pre-filling the task modal when a user selects 
 * a Google event from the calendar views.
 */
export const mapGoogleEventToTask = (event: GoogleCalendarEvent): Task => {
  return {
    id: event.id,
    user_id: 'google-user', // Marker for virtual/transient tasks from Google
    title: event.title || 'Untitled',
    notes_encrypted: event.notes_encrypted || '',
    estimate_timer: event.estimate_timer || 30,
    priority_level: event.priority_level || 3,
    deadline: event.deadline,
    status: (event.status as TaskStatus) || 'Pending',
    category: 'Meeting',
    created_at: event.created_at || new Date().toISOString(),
    updated_at: event.updated_at || new Date().toISOString(),
    links: event.links || [],
    google_event_id: event.id,
    subtasks: (event.subtasks || []) as any,
    tags: event.tags || [],
    estimated_start_date: event.estimated_start_date,
    estimated_end_date: event.deadline,
  };
};

/**
 * Standardizes the transformation of GraphQL TaskResponse into Redux Task type.
 * This prevents duplication and ensures consistent ID and Date handling.
 */
export const mapResponseToTask = (t: TaskResponse): Task => {
  const safeISO = (d: string | null | undefined): string | null => {
    if (!d) return null;
    try {
      const date = new Date(d);
      return isNaN(date.getTime()) ? null : date.toISOString();
    } catch {
      return null;
    }
  };

  return {
    id: t.id,
    user_id: t.user_id,
    title: t.title,
    notes_encrypted: t.notes_encrypted || '',
    estimate_timer: t.estimate_timer || 0,
    priority_level: t.priority_level,
    deadline: safeISO(t.deadline) || new Date().toISOString(),
    status: t.status as TaskStatus,
    category: t.category || 'General',
    created_at: safeISO(t.created_at) || new Date().toISOString(),
    updated_at: safeISO(t.updated_at) || new Date().toISOString(),
    completed_at: safeISO(t.completed_at),
    deleted_at: safeISO(t.deleted_at),
    subtasks: (t.subtasks || []).map((s) => {
      if (typeof s === 'string') {
        return { title: s, completed: false, timer: 0 };
      }
      return {
        title: s.title,
        completed: !!s.completed,
        timer: s.timer || 0,
        notes_encrypted: s.notes_encrypted,
        estimate_timer: s.estimate_timer,
        priority_level: s.priority_level,
        status: s.status as TaskStatus,
        deadline: s.deadline,
        category: s.category,
        id: s.id,
        created_at: s.created_at,
        links: s.links,
      };
    }),
    links: t.links || [],
    google_event_id: t.google_event_id,
    tags: t.tags?.map((tag: string | { name: string }) => (typeof tag === 'string' ? tag : tag.name)) || [],
    estimated_start_date: safeISO(t.estimated_start_date),
    estimated_end_date: safeISO(t.estimated_end_date),
  };
};
