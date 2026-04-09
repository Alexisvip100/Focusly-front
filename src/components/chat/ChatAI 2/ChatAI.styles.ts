import { Box, Paper, styled, IconButton, TextField } from '@mui/material';

export const ChatContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rightOffset',
})<{ rightOffset?: number }>(({ rightOffset = 100 }) => ({
  position: 'fixed',
  bottom: '32px',
  right: `${rightOffset}px`,
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '16px',
  transition: 'right 0.3s ease',
}));

export const FloatingButton = styled(IconButton)(() => ({
  width: '64px',
  height: '64px',
  background: 'linear-gradient(135deg, #2563eb, #7c3aed)', // Blue to Purple gradient
  color: '#ffffff',
  boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)',
  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'scale(1.1) rotate(-5deg)',
    background: 'linear-gradient(135deg, #1d4ed8, #6d28d9)',
  },
}));

export const NotificationCard = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  padding: '16px',
  width: '320px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.4)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  marginBottom: '8px',
  '@keyframes slideIn': {
    from: { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    right: '24px',
    width: '16px',
    height: '16px',
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    transform: 'rotate(45deg)',
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const ChatWindow = styled(Paper)(({ theme }) => ({
  width: '380px',
  height: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 24px 48px -12px rgba(0, 0, 0, 0.7)'
      : '0 24px 48px -12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transformOrigin: 'bottom right',
}));

export const Header = styled(Box)({
  padding: '20px',
  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

export const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '3px',
  },
}));

export const MessageBubble = styled(Box)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.action.hover,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: '12px 16px',
  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  maxWidth: '85%',
  fontSize: '14px',
  lineHeight: '1.5',
  boxShadow: isUser ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none',
  border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
}));

export const InputArea = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    color: theme.palette.text.primary,
    fontSize: '14px',
    padding: '8px 12px',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      '& fieldset': { borderWidth: 0 },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& input': {
    padding: '8px 0',
  },
}));

export const RobotIconWrapper = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.2)',
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '12px',
  padding: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
  },
}));

/* Helper Components for the Rich Content */
export const SubtaskCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  padding: '12px',
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const AddButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
