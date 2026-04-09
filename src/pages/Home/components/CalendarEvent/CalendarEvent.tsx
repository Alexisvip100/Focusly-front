import React, { useState } from 'react';
import moment from 'moment';
import type { EventProps } from 'react-big-calendar';
import { 
  Typography, 
  Menu, 
  MenuItem, 
  Divider, 
  Box, 
  Stack, 
  ListItemIcon, 
  ListItemText,
  alpha,
  useTheme
} from '@mui/material';
import { 
  CalendarToday as CalendarTodayIcon, 
  Videocam as VideocamIcon,
  ContentCopy as DuplicateIcon,
  DeleteOutline as DeleteIcon
} from '@mui/icons-material';

import { getEventColor, EventContainer, priorityCircleSx, contextMenuSx, PRIORITY_COLORS } from './CalendarEvent.styles';

import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';
import type { Task } from '@/redux/tasks/task.types';
import { useCalendarContextMenu } from './hooks/useCalendarContextMenu';

export interface ICalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: GoogleCalendarEvent | Task;
  type?: 'task' | 'event';
  provider?: string;
  overlapIndex?: number;
}

export const CalendarEvent = (props: EventProps<ICalendarEvent>) => {
  const { event, title } = props;
  const theme = useTheme();
  const variant = getEventColor(event as { id?: string });
  const timeRange = `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`;

  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const { handleDuplicateTask, handleChangePriority, handleDeleteTask, handleDeleteGoogleEvent } = useCalendarContextMenu();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu(
      contextMenu === null
        ? { mouseX: e.clientX + 2, mouseY: e.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const onDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.type === 'task' && event.resource) {
      handleDuplicateTask(event.resource as Task);
    }
    handleClose();
  };

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.id) {
      if (event.type === 'task') {
        handleDeleteTask(event.id);
      } else {
        handleDeleteGoogleEvent(event.id);
      }
    }
    handleClose();
  };

  const onPriorityChange = (e: React.MouseEvent, level: number) => {
    e.stopPropagation();
    if (event.id) {
      handleChangePriority(event.id, level);
    }
    handleClose();
  };

  const VIDEO_CALL_DOMAINS = /meet\.google\.com|zoom\.us|teams\.microsoft\.com|webex\.com|skype\.com|slack\.com|discord\.com|jit\.si|whereby\.com/i;

  const hasVideoLinkInTask =
    event.type === 'task' &&
    ((event.resource as Task)?.links?.some((link) => VIDEO_CALL_DOMAINS.test(link.url)) ||
      VIDEO_CALL_DOMAINS.test(event.title));

  const isMeeting =
    (event.type === 'event' &&
      !!(
        (event.resource as GoogleCalendarEvent)?.hangoutLink ||
        (event.resource as GoogleCalendarEvent)?.conferenceData ||
        ((event.resource as GoogleCalendarEvent)?.attendees?.length ?? 0) > 1
      )) ||
    hasVideoLinkInTask;

  const currentPriority = event.type === 'task' ? (event.resource as Task)?.priority_level : undefined;

  return (
    <>
      <EventContainer 
        variant={variant} 
        isMeeting={isMeeting} 
        overlapIndex={event.overlapIndex}
        onContextMenu={handleContextMenu}
      >
        <div className="event-card-inner">
          <div className="event-icon-container">
            {isMeeting ? (
              <VideocamIcon sx={{ fontSize: '18px', color: '#3B82F6' }} />
            ) : (
              <CalendarTodayIcon sx={{ fontSize: '16px', color: '#ffffff' }} />
            )}
          </div>
          <div className="event-info">
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, fontSize: '13px', lineHeight: 1.2, display: 'block', color: 'inherit' }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: '11px', fontWeight: 500, display: 'block', opacity: 0.8, color: 'inherit' }}
            >
              {timeRange}
            </Typography>
          </div>
        </div>
      </EventContainer>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        sx={contextMenuSx}
      >
        {event.type === 'task' && (
          <>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, lineHeight: 1 }}>
                Priority & Color
              </Typography>
              <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 1 }}>
                {[1, 2, 3, 4].map((level) => (
                  <Box
                    key={level}
                    onClick={(e: React.MouseEvent) => onPriorityChange(e, level)}
                    sx={priorityCircleSx(PRIORITY_COLORS[level].main, currentPriority === level)}
                  />
                ))}
              </Stack>
            </Box>
            
            <Divider />
            
            <MenuItem onClick={onDuplicate}>
              <ListItemIcon>
                <DuplicateIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Duplicate Task</ListItemText>
            </MenuItem>
          </>
        )}
        
        <MenuItem 
          onClick={onDelete} 
          sx={{ 
            color: 'error.main', 
            '&:hover': { 
              backgroundColor: alpha(theme.palette.error.main, 0.08) + ' !important',
              color: 'error.dark'
            } 
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>{event.type === 'task' ? 'Delete Task' : 'Delete External Event'}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
