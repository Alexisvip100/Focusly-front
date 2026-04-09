import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  alpha,
  useTheme,
  Fade,
  Slide,
  Chip,
} from '@mui/material';
import {
  NotificationsNone as NotificationsNoneIcon,
  CheckCircleOutline as CheckIcon,
  DeleteOutline as DeleteIcon,
  DoneAll as DoneAllIcon,
  InboxOutlined as InboxIcon,
} from '@mui/icons-material';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const initialNotifications: Notification[] = [];

export const Notifications = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          flex: 1,
          height: '100vh',
          overflow: 'auto',
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NotificationsNoneIcon sx={{ color: theme.palette.primary.main, fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stay updated with your latest activity
              </Typography>
            </Box>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} NEW`}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
          </Box>

          {notifications.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="text"
                size="small"
                startIcon={<DoneAllIcon />}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Mark all read
              </Button>
              <Button
                variant="text"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={deleteAll}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#ef4444',
                }}
              >
                Clear all
              </Button>
            </Box>
          )}
        </Box>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <Fade in timeout={600}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.03)})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon sx={{ fontSize: 48, color: alpha(theme.palette.text.primary, 0.2) }} />
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.secondary">
                No notifications yet
              </Typography>
              <Typography
                variant="body2"
                color="text.disabled"
                textAlign="center"
                maxWidth={320}
              >
                When you receive notifications about your tasks, focus sessions, or AI
                recommendations, they will appear here.
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {notifications.map((notification, index) => (
              <Slide
                key={notification.id}
                direction="up"
                in
                timeout={300 + index * 80}
              >
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '14px',
                    bgcolor: notification.read
                      ? alpha(theme.palette.background.paper, 0.5)
                      : alpha(theme.palette.primary.main, 0.04),
                    border: '1px solid',
                    borderColor: notification.read
                      ? theme.palette.divider
                      : alpha(theme.palette.primary.main, 0.15),
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {/* Unread dot */}
                  {!notification.read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={notification.read ? 500 : 700}>
                      {notification.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.3, lineHeight: 1.5 }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ mt: 0.5, display: 'block' }}
                    >
                      {notification.time}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                    {!notification.read && (
                      <IconButton
                        size="small"
                        onClick={() => markAsRead(notification.id)}
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                        }}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => deleteNotification(notification.id)}
                      sx={{
                        color: alpha(theme.palette.text.primary, 0.4),
                        '&:hover': { bgcolor: alpha('#ef4444', 0.1), color: '#ef4444' },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Slide>
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default Notifications;
