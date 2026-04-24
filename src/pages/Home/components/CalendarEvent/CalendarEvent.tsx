import { useState } from 'react';
import { 
  Box, 
  Menu, 
  MenuItem, 
  Typography, 
  Divider, 
  Stack, 
  alpha 
} from '@mui/material';
import { 
  CalendarToday as CalendarTodayIcon, 
  Videocam as VideocamIcon,
  ContentCopy as DuplicateIcon,
  DeleteOutline as DeleteIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

import { getEventColor, EventContainer, priorityCircleSx, contextMenuSx, PRIORITY_COLORS } from './CalendarEvent.styles';


import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';
import type { Task } from '@/redux/tasks/task.types';
import moment from 'moment';
import { useCalendarContextMenu } from './hooks/useCalendarContextMenu';

export interface ICalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Task | GoogleCalendarEvent;
  type: 'task' | 'event';
  overlapIndex?: number;
  provider?: string;
}

interface CalendarEventProps {
  event: ICalendarEvent;
  title: string;

  continuesPrior?: boolean;
  continuesAfter?: boolean;
  localizer?: unknown;
  slotStart?: Date;
  slotEnd?: Date;
  onStartFocus?: () => void;
}

export const CalendarEvent = (props: CalendarEventProps) => {
  const { event, title, onStartFocus } = props;
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

  const handleOnStartFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStartFocus) {
      onStartFocus();
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
        (event.resource as GoogleCalendarEvent)?.links?.some((link) => VIDEO_CALL_DOMAINS.test(link.url)) ||
        ((event.resource as GoogleCalendarEvent)?.collaborators?.length ?? 0) > 1
      )) ||
    hasVideoLinkInTask;

  const currentPriority = event.type === 'task' ? (event.resource as Task)?.priority_level : undefined;

  const renderClassic = () => (
    <EventContainer 
      variant={variant} 
      isMeeting={isMeeting} 
      overlapIndex={event.overlapIndex}
      onContextMenu={handleContextMenu}
    >
      <div className="event-card-inner" style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', height: '100%', minWidth: 0 }}>
        <div className="event-icon-container" style={{ flexShrink: 0, paddingTop: '1px' }}>
          {isMeeting ? (
            <VideocamIcon sx={{ fontSize: '14px', color: '#3B82F6' }} />
          ) : (
            <CalendarTodayIcon sx={{ fontSize: '12px', color: '#ffffff' }} />
          )}
        </div>
        <div className="event-info" style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: 1.3,
              display: 'block',
              color: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={title}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', fontWeight: 500, display: 'block', opacity: 0.75, color: 'inherit', lineHeight: 1.2 }}
          >
            {timeRange}
          </Typography>
        </div>
      </div>
    </EventContainer>
  );


  return (
    <>
      {renderClassic()}

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
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="caption" fontWeight={700} color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Actions
          </Typography>
        </Box>
        
        {onStartFocus && (
          <MenuItem onClick={handleOnStartFocus}>
            <ScheduleIcon sx={{ mr: 1.5, color: 'primary.main' }} />
            Start Focus
          </MenuItem>
        )}

        {event.type === 'task' && (
          <MenuItem onClick={onDuplicate}>
            <DuplicateIcon sx={{ mr: 1.5, color: 'primary.main' }} />
            Duplicate Task
          </MenuItem>
        )}

        {event.type === 'task' && <Divider />}
        {event.type === 'task' && (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" fontWeight={700} color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Priority
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.5, mb: 0.5 }}>
              {[1, 2, 3, 4].map((level) => (
                <Box
                  key={level}
                  onClick={(e) => onPriorityChange(e, level)}
                  sx={priorityCircleSx(PRIORITY_COLORS[level].main, currentPriority === level)}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Divider />
        
        <MenuItem onClick={onDelete} sx={{ color: '#ef4444', '&:hover': { bgcolor: alpha('#ef4444', 0.08) } }}>
          <DeleteIcon sx={{ mr: 1.5, color: '#ef4444' }} />
          Delete {event.type === 'task' ? 'Task' : 'Event'}
        </MenuItem>
      </Menu>
    </>
  );
};
