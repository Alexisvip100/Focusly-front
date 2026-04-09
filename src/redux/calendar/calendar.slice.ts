import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GoogleCalendarEvent } from './calendar.types';

type CalendarEvent = GoogleCalendarEvent;

interface CalendarState {
  reduxEvents: CalendarEvent[];
}

const initialState: CalendarState = {
  reduxEvents: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.reduxEvents = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.reduxEvents.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<{ id: string }>) => {
      state.reduxEvents = state.reduxEvents.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const { setEvents, addEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
