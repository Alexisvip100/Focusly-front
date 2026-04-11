import { useState } from 'react';
import type { ToolbarProps, View } from 'react-big-calendar';
import type { ICalendarEvent } from '../CalendarEvent';
import { Navigate } from 'react-big-calendar';
import type { CalendarNavigateAction } from '../CalendarView/calendarView.types';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  Divider,
  Fade,
  alpha,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  CheckCircleOutline as CheckIcon,
  DeleteOutline as DeleteIcon,
  DoneAll as DoneAllIcon,
  InboxOutlined as InboxIcon,
} from '@mui/icons-material';

import {
  ToolbarContainer,
  DateHeader,
  MainDate,
  ViewToggle,
  NavButton,
} from './CalendarToolbar.styles';

interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [];

interface CustomToolbarProps extends ToolbarProps<ICalendarEvent, object> {
  isSessionActive?: boolean;
  onNavigateAction?: (action: CalendarNavigateAction) => void;
}

export const CalendarToolbar = (props: CustomToolbarProps) => {
  const { date, view, onView, onNavigate, label, onNavigateAction } = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const open = Boolean(anchorEl);


  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const goToBack = () => onNavigateAction ? onNavigateAction('PREV') : onNavigate(Navigate.PREVIOUS);
  const goToNext = () => onNavigateAction ? onNavigateAction('NEXT') : onNavigate(Navigate.NEXT);
  const goToToday = () => onNavigateAction ? onNavigateAction('TODAY') : onNavigate(Navigate.TODAY);
  const handleViewChange = (newView: View) => onView(newView);

  const getFormattedDate = () => {
    if (view === 'month') return format(date, 'MMMM yyyy');
    if (view === 'week') return label;
    if (view === 'day') return format(date, 'EEEE, MMMM do');
    return label;
  };

  return (
    <ToolbarContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <DateHeader>
          <MainDate>{getFormattedDate()}</MainDate>
        </DateHeader>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <NavButton onClick={goToBack}>
            <ArrowBackIosNewIcon sx={{ fontSize: '14px' }} />
          </NavButton>
          <NavButton onClick={goToNext}>
            <ArrowForwardIosIcon sx={{ fontSize: '14px' }} />
          </NavButton>
        </Box>
      </Box>

      <ViewToggle variant="contained" aria-label="outlined primary button group">
        <Button
          onClick={() => { handleViewChange('day'); goToToday(); }}
          className={view === 'day' ? 'active' : ''}
          sx={{
            borderRadius: '6px', textTransform: 'none', fontSize: '13px', fontWeight: 500,
            color: '#94a3b8',
            '&.active': { color: '#ffffff', bgcolor: '#1e293b' },
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          Today
        </Button>
        <Button
          onClick={() => handleViewChange('week')}
          className={view === 'week' ? 'active' : ''}
          sx={{
            borderRadius: '6px', textTransform: 'none', fontSize: '13px', fontWeight: 500,
            color: '#94a3b8',
            '&.active': { color: '#ffffff', bgcolor: '#1e293b' },
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => handleViewChange('month')}
          className={view === 'month' ? 'active' : ''}
          sx={{
            borderRadius: '6px', textTransform: 'none', fontSize: '13px', fontWeight: 500,
            color: '#94a3b8',
            '&.active': { color: '#ffffff', bgcolor: '#1e293b' },
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          Month
        </Button>
      </ViewToggle>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Fade}
          transitionDuration={250}
          slotProps={{
            paper: {
              sx: {
                width: 360,
                maxHeight: 440,
                mt: 1,
                borderRadius: '16px',
                bgcolor: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                overflow: 'hidden',
              },
            },
          }}
        >
          <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  px: 1.2,
                  py: 0.3,
                  borderRadius: '6px',
                }}
              >
                {unreadCount} NEW
              </Box>
            )}
          </Box>

          <Divider />

          {/* Content */}
          <Box sx={{ overflowY: 'auto', maxHeight: 300 }}>
            {notifications.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 3, gap: 1.5 }}>
                <InboxIcon sx={{ fontSize: 44, color: alpha(theme.palette.text.primary, 0.15) }} />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  No notifications yet
                </Typography>
                <Typography variant="caption" color="text.disabled" textAlign="center">
                  You&apos;re all caught up! Notifications about tasks and focus sessions will appear here.
                </Typography>
              </Box>
            ) : (
              notifications.map((n) => (
                <Box
                  key={n.id}
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                    borderLeft: n.read ? 'none' : `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={n.read ? 400 : 600} noWrap>
                      {n.title}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {n.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.3, flexShrink: 0 }}>
                    {!n.read && (
                      <IconButton size="small" onClick={() => markAsRead(n.id)}
                        sx={{ color: theme.palette.primary.main, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
                      >
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                    <IconButton size="small" onClick={() => deleteNotification(n.id)}
                      sx={{ color: alpha(theme.palette.text.primary, 0.3), '&:hover': { bgcolor: alpha('#ef4444', 0.1), color: '#ef4444' } }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button size="small" startIcon={<DoneAllIcon />} onClick={markAllAsRead} disabled={unreadCount === 0}
                  sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.75rem' }}
                >
                  Mark all read
                </Button>
              </Box>
            </>
          )}
        </Popover>
    </ToolbarContainer>
  );
};

