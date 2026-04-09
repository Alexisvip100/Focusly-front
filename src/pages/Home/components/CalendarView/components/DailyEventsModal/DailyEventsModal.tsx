import React from 'react';
import { 
  Popover, 
  IconButton, 
  Typography, 
  Box, 
  Divider,
} from '@mui/material';
import { 
  Close as CloseIcon, 
  EventNote as EventNoteIcon 
} from '@mui/icons-material';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import type { ICalendarEvent } from '../../../CalendarEvent';
import { CalendarEvent } from '../../../CalendarEvent';

const localizer = momentLocalizer(moment);

interface DailyEventsModalProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
  events: ICalendarEvent[];
  onSelectEvent: (event: ICalendarEvent) => void;
  anchorEl: HTMLElement | null;
}

export const DailyEventsModal: React.FC<DailyEventsModalProps> = ({
  open,
  onClose,
  date,
  events,
  onSelectEvent,
  anchorEl,
}) => {
  const formattedDate = date ? moment(date).format('MMMM D, YYYY') : '';

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          backgroundImage: 'none',
          borderRadius: '16px',
          padding: '8px',
          width: '320px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 16px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }
      }}
    >
      <Box sx={{ p: 1.5, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 800, color: '#ffffff', mb: 0.2 }}>
            {formattedDate}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5} sx={{ opacity: 0.5 }}>
            <EventNoteIcon sx={{ fontSize: '12px', color: '#ffffff' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600, fontSize: '10px' }}>
              {events.length} {events.length === 1 ? 'Task' : 'Tasks'}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small" 
          sx={{ 
            color: 'rgba(255,255,255,0.4)',
            padding: '2px',
            '&:hover': { color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)' }
          }}
        >
          <CloseIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

      <Divider sx={{ mx: 1.5, mb: 1, borderColor: 'rgba(255,255,255,0.06)' }} />

      <Box 
        sx={{ 
          p: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.2,
          maxHeight: '380px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '3px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' },
        }}
      >
        {events.map((event) => (
          <Box 
            key={event.id} 
            onClick={() => {
              onSelectEvent(event);
              onClose();
            }}
            sx={{
              cursor: 'pointer',
              borderRadius: '12px',
              backgroundColor: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              },
              '& .rbc-event': { 
                background: 'none !important', 
                padding: '0 !important',
                width: '100%',
                // Make the iç cards even smaller for the popover
                '& .event-card-inner': { padding: '8px 10px', gap: '10px' },
                '& .event-icon-container': { width: '32px', height: '32px' },
                '& .event-info span:first-child': { fontSize: '12px' },
                '& .event-info span:last-child': { fontSize: '10px' },
              }
            }}
          >
            <CalendarEvent 
              event={event} 
              title={event.title}
              continuesPrior={false}
              continuesAfter={false}
              localizer={localizer}
              slotStart={event.start}
              slotEnd={event.end}
            />
          </Box>
        ))}
      </Box>
    </Popover>
  );
};
