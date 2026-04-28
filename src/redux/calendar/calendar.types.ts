export interface GoogleCalendarEvent {
  id: string;
  google_event_id: string;
  title: string;
  notes_encrypted: string;
  deadline: string;
  estimated_start_date: string;
  status:
    | 'Pending'
    | 'In Progress'
    | 'Completed'
    | 'Scheduled'
    | 'Canceled'
    | 'Todo'
    | 'Planning'
    | 'OnHold'
    | 'Review'
    | 'Done'
    | 'Backlog'
    | 'Scheduled'
    | 'Archived';
  priority_level: number;
  subtasks: unknown[];
  tags: string[];
  links: { title: string; url: string }[];
  estimate_timer?: number;
  collaborators?: { email: string; responseStatus?: string; avatar?: string }[];
  organizer_email?: string;
  location?: string;
  is_all_day: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface that matches the RAW Google Calendar API response.
 * Used for direct operations with the Google API (create/update).
 */
export interface RawGoogleEvent {
  id?: string;
  summary?: string;
  description?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      requestId?: string;
      conferenceSolutionKey?: { type: string };
    };
    entryPoints?: {
      entryPointType?: string;
      uri?: string;
      label?: string;
    }[];
  };
  attendees?: {
    email?: string;
    responseStatus?: string;
  }[];
  organizer?: {
    email?: string;
    self?: boolean;
  };
  location?: string;
  created?: string;
  updated?: string;
}
