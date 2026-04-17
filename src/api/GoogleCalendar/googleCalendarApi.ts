import axios from '@/api/axiosInstance';
import type { GoogleCalendarEvent, RawGoogleEvent } from '@/redux/calendar/calendar.types';

// Ya no necesitamos manejar la lógica de refresco ni localStorage en el cliente,
// el backend lo hace automáticamente usando la sesión del usuario.
export const fetchGoogleEvents = async (
  startDate?: string,
  endDate?: string
): Promise<GoogleCalendarEvent[]> => {
  const params = new URLSearchParams();
  if (startDate) params.append('timeMin', startDate);
  if (endDate) params.append('timeMax', endDate);

  const response = await axios.get(`/google-calendar/events?${params.toString()}`);
  return (response.data || []) as GoogleCalendarEvent[];
};

export const createGoogleEvent = async (
  event: Partial<RawGoogleEvent>
): Promise<RawGoogleEvent> => {
  const response = await axios.post('/google-calendar/events', event);
  return response.data;
};

export const updateGoogleEvent = async (
  eventId: string,
  event: Partial<RawGoogleEvent>
): Promise<RawGoogleEvent> => {
  const response = await axios.patch(`/google-calendar/events/${eventId}`, event);
  return response.data;
};

export const deleteGoogleEvent = async (eventId: string): Promise<void> => {
  await axios.delete(`/google-calendar/events/${eventId}`);
};
