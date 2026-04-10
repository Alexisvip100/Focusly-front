import { Box, styled, alpha } from '@mui/material';
import type { CalendarDesignMode } from './calendarView.types';

export const CalendarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDayView' && prop !== 'design',
})<{ isDayView?: boolean; design?: CalendarDesignMode }>(
  ({ theme, isDayView, design = 'current' }) => {
    const isDark = theme.palette.mode === 'dark';
    const isModern = design === 'modern';

    // Modern Design Tokens
    const modernSurface = alpha(theme.palette.background.paper, isDark ? 0.86 : 0.94);
    const modernBorder = alpha(theme.palette.divider, 0.9);
    const modernRadius = '20px';

    return {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      flex: 1,
      boxSizing: 'border-box',
      
      '& .rbc-calendar': {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        backgroundColor: isModern ? 'transparent' : 'inherit',
        '& *, & *:before, & *:after': {
          boxSizing: 'inherit',
        },
      },

      '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
        border: isModern ? 'none' : `1px solid ${theme.palette.divider}`,
        backgroundColor: isModern ? 'transparent' : theme.palette.background.default,
      },

      '& .rbc-off-range-bg': {
        backgroundColor: isDark ? alpha(theme.palette.background.default, 0.45) : theme.palette.grey[100],
      },

      // Global removals for Modern Mode
      ...(isModern && {
        '& .rbc-month-view, & .rbc-time-view, & .rbc-header, & .rbc-day-bg, & .rbc-month-row, & .rbc-time-content, & .rbc-time-header-content, & .rbc-timeslot-group': {
          border: 'none !important',
        },
      }),

      // Month View Specific (Cards)
      '& .rbc-month-view': {
        ...(isModern && {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '8px',
          '& .rbc-month-row': {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '12px',
            border: 'none',
            overflow: 'visible',
            maxHeight: 'none !important',
            minHeight: '135px',
          },
          '& .rbc-row-bg': {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '12px',
            position: 'absolute',
            inset: 0,
            overflow: 'visible',
          },
          '& .rbc-day-bg': {
            backgroundColor: modernSurface,
            border: `1px solid ${modernBorder} !important`,
            borderRadius: modernRadius,
            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.01) translateY(-2px)',
              borderColor: alpha(theme.palette.primary.main, 0.45) + ' !important',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.1)',
            },
          },
          '& .rbc-date-cell': {
            padding: '12px 14px',
            fontWeight: 800,
            fontSize: '15px',
            color: theme.palette.text.primary,
          },
        }),
      },

      // Standard Grid styling for Current Mode
      ...(!isModern && {
        '& .rbc-month-row + .rbc-month-row': {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        '& .rbc-day-bg + .rbc-day-bg': {
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }),

      // Time View (Week/Day) Specific
      '& .rbc-time-view': {
        ...(isModern && {
          '& .rbc-time-header': {
            display: isDayView ? 'none' : 'flex',
            gap: '12px',
            padding: '0 12px',
            marginBottom: '12px',
          },
          '& .rbc-time-header-cell': {
            backgroundColor: modernSurface,
            border: `1px solid ${modernBorder} !important`,
            borderRadius: '18px',
            padding: '10px',
            minHeight: '65px',
          },
          '& .rbc-time-content': {
            display: 'flex',
            gap: '12px',
            padding: '0 12px',
            backgroundColor: 'transparent',
            borderTop: 'none',
          },
          '& .rbc-day-slot': {
            backgroundColor: modernSurface,
            border: `1px solid ${modernBorder} !important`,
            borderRadius: modernRadius,
          },
          '& .rbc-time-gutter': {
            backgroundColor: 'transparent',
            border: 'none',
          },
        }),
      },

      ...(!isModern && {
        '& .rbc-time-content': {
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        },
        '& .rbc-time-content > * + * > *': {
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
        '& .rbc-timeslot-group': {
          borderBottom: `1px solid ${theme.palette.divider}`,
          minHeight: '65px',
        },
        '& .rbc-time-gutter': {
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }),

      '& .rbc-timeslot-group': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '65px',
        ...(isModern && { border: 'none !important' }),
      },

      '& .rbc-time-slot': {
        flex: 1,
        ...(!isModern && {
          '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
      },

      '& .rbc-today': {
        backgroundColor: 'transparent !important',
        ...(isModern && {
          '&.rbc-day-bg': {
            borderColor: theme.palette.primary.main + ' !important',
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        }),
      },

      '& .rbc-event': {
        backgroundColor: 'transparent',
        padding: 0,
        outline: 'none',
        border: 'none',
        '&:focus': { outline: 'none' },
      },

      '& .rbc-header': {
        backgroundColor: isModern ? 'transparent' : theme.palette.background.paper,
        borderBottom: isModern ? 'none' : `1px solid ${theme.palette.divider}`,
        fontWeight: 700,
        padding: '10px 0',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(!isModern && {
          borderLeft: `1px solid ${theme.palette.divider}`,
          '&:first-of-type': {
            borderLeft: 'none',
          },
        }),
      },

      '& .rbc-show-more': {
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: '12px',
        padding: '4px 8px',
        cursor: 'pointer',
        background: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '& .rbc-month-view .rbc-date-cell.rbc-now': {
        '& button': {
          backgroundColor: theme.palette.primary.main,
          color: '#ffffff !important',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '6px 8px 0 auto',
          padding: '0',
          minWidth: '28px',
          fontWeight: 800,
          fontSize: '13px',
        },
      },

      '& .rbc-month-view .rbc-event': {
        margin: isModern ? '4px 10px' : '2px 0',
        padding: '0 !important',
        backgroundColor: 'transparent !important',
        '& .event-icon-container': { display: isModern ? 'none' : 'flex' },
        '& .event-info': { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: '6px',
          '& span:last-child': { display: 'none' } 
        },
      },
      
      '& .rbc-label': {
        color: theme.palette.text.secondary,
        fontSize: '12px',
        fontWeight: 600,
      },

      '& .rbc-current-time-indicator': {
        backgroundColor: '#ef4444',
        height: '1px',
      },
    };
  }
);
