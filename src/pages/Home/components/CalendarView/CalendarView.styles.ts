import { Box, styled, alpha } from '@mui/material';

export const CalendarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDayView',
})<{ isDayView?: boolean }>(({ theme, isDayView }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  flex: 1,
  // Override React Big Calendar styles for Dark Mode
  '& .rbc-calendar': {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
  },
  
  '& .rbc-month-row .rbc-row-bg > div': {
    borderLeft: `1px solid ${theme.palette.divider} !important`,
    borderRight: `1px solid ${theme.palette.divider} !important`,
  },
  // Force all react-big-calendar borders to use theme divider
  '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view, & .rbc-month-row, & .rbc-day-bg, & .rbc-time-content, & .rbc-timeslot-group, & .rbc-time-slot, & .rbc-header, & .rbc-time-header-content, & .rbc-time-header, & .rbc-time-gutter': {
    borderColor: `${theme.palette.divider} !important`,
  },

  '& .rbc-event-label': {
    display: 'none',
  },
  '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
  '& .rbc-off-range-bg': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.5) : theme.palette.grey[100],
  },

  '& .rbc-month-row + .rbc-month-row': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  '& .rbc-time-view .rbc-allday-cell': {
    display: 'none',
  },
  '& .rbc-day-bg + .rbc-day-bg': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  '& .rbc-day-bg': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  '& .rbc-time-content': {
    borderTop: `1px solid ${theme.palette.divider}`,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    backgroundColor: theme.palette.background.default,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '& .rbc-time-content > * + * > *': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  // Perfect Scrollbar Customizations
  '& .ps__rail-y': {
    zIndex: 10,
    backgroundColor: 'transparent !important',
    width: '8px !important',
  },
  '& .ps__thumb-y': {
    backgroundColor: `${theme.palette.divider} !important`,
    width: '4px !important',
    borderRadius: '4px !important',
  },
  '& .ps__rail-y:hover .ps__thumb-y, & .ps__rail-y.ps--clicking .ps__thumb-y': {
    backgroundColor: `${theme.palette.text.secondary} !important`,
  },
  '& .rbc-timeslot-group': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: '65px', // Consistent hour height
    display: 'flex',
    flexDirection: 'column',
  },
  '& .rbc-time-header': {
    display: isDayView ? 'none' : 'flex',
  },
  '& .rbc-time-slot': {
    flex: 1,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider}`, // Restore solid 1px line
    },
  },
  '& .rbc-today': {
    backgroundColor: 'transparent !important',
  },
  '& .rbc-event': {
    backgroundColor: 'transparent', // Custom component handles bg
    padding: 0,
    outline: 'none',
    border: 'none',
    '&:focus': { outline: 'none' },
  },
  '& .rbc-header + .rbc-header': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  '& .rbc-header.rbc-today': {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  '& .rbc-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`, // Restore horizontal line under headers
    fontWeight: 600,
    padding: '8px 0',
    height: 'auto',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.divider}`, // Ensure top border for consistency
  },
  '& .rbc-time-header-content': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  '& .rbc-time-header.rbc-overflowing': {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  // Fix for Week view header height
  '& .rbc-time-header-cell': {
    minHeight: '60px', // Force enough height for stacked header
  },
  '& .rbc-toolbar button': {
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.rbc-active': {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: '#ffffff',
      boxShadow: 'none',
    },
  },
  '& .rbc-time-gutter': {
    backgroundColor: theme.palette.background.paper, // Match container bg
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  '& .rbc-label': {
    color: theme.palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
  },
  '& .rbc-current-time-indicator': {
    backgroundColor: '#ef4444', // Red line
    height: '1px',
  },
  '& .rbc-show-more': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '11px',
    padding: '2px 4px',
    cursor: 'pointer',
    background: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '& .rbc-month-view .rbc-month-row': {
    maxHeight: '135px',
    minHeight: '135px',
    overflow: 'hidden',
  },
  '& .rbc-month-view .rbc-row-content': {
    overflow: 'hidden',
  },

  '& .rbc-month-view .rbc-date-cell.rbc-now': {
    '& button': {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff !important',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '6px 8px 0 auto',
      padding: '0',
      minWidth: '24px',
      fontWeight: 600,
      fontSize: '12px',
    }
  },

  '& .rbc-month-view .rbc-event': {
    maxHeight: '20px !important',
    margin: '3px 0',
    padding: '0 !important',
    backgroundColor: 'transparent !important',
    '& .event-icon-container': { display: 'none' },
    '& .event-card-inner': { padding: '2px 6px !important', gap: '0 !important' },
    '& .event-info': { flexDirection: 'row', alignItems: 'center', gap: '4px' },
    // Hide time in month view to save even more space
    '& .event-info span:last-child': { display: 'none' },
  },
}));
