import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

interface CustomPickerDayProps {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

export const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light blue for range
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    backgroundColor: '#3b82f6 !important', // Blue for start
    color: '#ffffff',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    backgroundColor: '#3b82f6 !important', // Blue for end
    color: '#ffffff',
  }),
}));

export const dateRangeInputSx = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 14px',
  backgroundColor: '#0b0e11',
  border: '1px solid #334155',
  borderRadius: '15px',
  color: '#ffffff',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#475569',
  },
  minHeight: '45px', // Match text fields roughly
};

export const calendarPopperSx = {
  '& .MuiPaper-root': {
    backgroundColor: '#1E2329',
    border: '1px solid #334155',
    color: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  '& .MuiPickersCalendarHeader-root': {
    color: '#fff',
  },
  '& .MuiPickersCalendarHeader-label': {
    fontWeight: 600,
  },
  '& .MuiSvgIcon-root': {
    color: '#94a3b8',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: '#64748b',
  },
};
