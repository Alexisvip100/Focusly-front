import type { Task, TaskStatus } from '@/redux/tasks/task.types';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';

/**
 * Maps a Google Calendar event to a Focusly Task structure.
 * This is used for pre-filling the task modal when a user selects 
 * a Google event from the calendar views.
 */
export const mapGoogleEventToTask = (event: GoogleCalendarEvent): Task => {
  try {
    const startStr = event.start.dateTime || event.start.date || '';
    const endStr = event.end.dateTime || event.end.date || '';
    
    if (!startStr) {
      throw new Error('Google event has no start time/date');
    }

    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : new Date(start.getTime() + 30 * 60000);
    const durationMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);

    const links: { title: string; url: string }[] = [];
    const seenUrls = new Set<string>();

    const addLink = (title: string, url: string) => {
      const norm = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      if (!seenUrls.has(norm)) {
        links.push({ title, url });
        seenUrls.add(norm);
      }
    };

    if (event.hangoutLink) {
      addLink('Google Meet', event.hangoutLink);
    }
    
    if (event.conferenceData?.entryPoints) {
      event.conferenceData.entryPoints.forEach((ep) => {
        if (ep.uri) {
          addLink(ep.label || ep.entryPointType || 'Joining Info', ep.uri);
        }
      });
    }

    return {
      id: event.id,
      user_id: 'google-user', // Marker for virtual/transient tasks from Google
      title: event.summary || 'Untitled',
      notes_encrypted: event.description || '',
      estimate_timer: durationMinutes > 0 ? durationMinutes : 30,
      priority_level: 2,
      deadline: start.toISOString(),
      status: 'Pending' as TaskStatus,
      category: 'Meeting',
      created_at: event.created || new Date().toISOString(),
      updated_at: event.updated || new Date().toISOString(),
      links,
      google_event_id: event.id,
      subtasks: [],
      tags: [],
    };
  } catch (err) {
    console.error('Failed to map Google Event to Task:', err);
    // Return a minimal fallback if mapping fails
    return {
      id: event.id,
      user_id: 'google-user',
      title: event.summary || 'Untitled',
      notes_encrypted: event.description || '',
      estimate_timer: 30,
      priority_level: 2,
      deadline: new Date().toISOString(),
      status: 'Pending' as TaskStatus,
      category: 'Meeting',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      links: [],
      google_event_id: event.id,
      subtasks: [],
      tags: [],
    };
  }
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
  };
};
