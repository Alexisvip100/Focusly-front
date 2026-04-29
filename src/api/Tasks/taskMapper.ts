import type { Task, TaskStatus } from '@/redux/tasks/task.types';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';

export const normalizeGoogleId = (id: string | null | undefined): string => {
  if (!id) return '';
  return id.replace(/^_+/, '');
};

export const getBaseGoogleId = (id: string | null | undefined): string => {
  if (!id) return '';
  return normalizeGoogleId(id).split('_')[0];
};

export const mapGoogleEventToTask = (event: GoogleCalendarEvent): Task => {
  return {
    id: event.id,
    user_id: 'google-user',
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
    task_type: 'GoogleTask',
    google_event_id: normalizeGoogleId(event.id),
    subtasks: [],
    tags: event.tags || [],
    estimated_start_date: event.estimated_start_date,
    estimated_end_date: event.deadline,
    collaborators: (event.collaborators || []).map(
      (c: { name?: string; email?: string; avatar?: string }) => ({
        name: c.name || '',
        email: c.email || '',
        avatar:
          c.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(c.email?.split('@')[0] || 'user')}&background=random&color=fff&size=128`,
      }),
    ),
  };
};

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
    real_timer: t.real_timer,
    duration: t.duration,
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
    task_type: (t.task_type || 'PlatformTask') as 'GoogleTask' | 'PlatformTask',
    google_event_id: normalizeGoogleId(t.google_event_id),
    source: 'platform',
    collaborators: (t.collaborators || []).map((c) => ({
      ...c,
      name: c.name || '',
      avatar:
        c.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(c.email?.split('@')[0] || 'user')}&background=random&color=fff&size=128`,
    })),
    tags:
      t.tags?.map((tag: string | { name: string }) =>
        typeof tag === 'string' ? tag : tag.name,
      ) || [],
    estimated_start_date: safeISO(t.estimated_start_date),
    estimated_end_date: safeISO(t.estimated_end_date),
  };
};
