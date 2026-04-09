export interface GoogleCalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary?: string;
  description?: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    dateTime?: string;
    timeZone?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    timeZone?: string;
    date?: string;
  };
  recurringEventId?: string;
  originalStartTime?: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
  colorId?: string;
  attendees?: {
    email: string;
    organizer?: boolean;
    self?: boolean;
    responseStatus: string;
  }[];
  extendedProperties?: {
    private: {
      [key: string]: string;
    };
  };
  source?: {
    url: string;
    title: string;
  };
  hangoutLink?: string;
  conferenceData?: {
    entryPoints?: {
      entryPointType: string;
      uri: string;
      label?: string;
    }[];
    conferenceId?: string;
    conferenceSolution?: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
  };
}

// Outlook calendar types removed along with Outlook integration
