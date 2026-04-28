import {
  Box,
  styled,
  keyframes,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import type { Theme } from '@mui/material';

// Animations
export const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

// Styled Components
export const MiniModeContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 9999,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: '16px',
  // Remove default positioning to rely on transform
  bottom: 'auto',
  right: 'auto',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 380,
  userSelect: 'none',
  overflow: 'hidden',
  // Optimize for dragging: avoid 'all' transitions
  transition: 'opacity 0.3s ease, box-shadow 0.3s ease, transform 0.05s linear',
  willChange: 'transform',
}));

export const RippleDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    animation: `${ripple} 1.2s infinite ease-in-out`,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    opacity: 0.7,
  },
}));

export const TimerCard = styled(Box)<{ label?: string }>(
  ({ theme, label }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(226, 232, 240, 0.4)',
    borderRadius: '32px',
    width: 220,
    height: 240,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
    '&::after': {
      content: `"${label || 'MINUTES'}"`,
      position: 'absolute',
      bottom: 24,
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: 2,
      color: theme.palette.text.secondary,
    },
  }),
);

// Redesigned Control Footer
export const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(241, 245, 249, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 600,
  border: `1px solid ${theme.palette.divider}`,
}));

export const ControlsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px', // Tighter spacing if grouped, or layout specific
});
export const CurrentTaskBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '10',
  color: theme.palette.primary.light,
  padding: `${theme.spacing(0.75)} ${theme.spacing(3)}`,
  borderRadius: '99px',
  border: `1px solid ${theme.palette.primary.light}20`,
  fontSize: '13px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}));

// Sx Props for Dialog
export const getDialogPaperProps = (theme: Theme) => ({
  sx: {
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? `radial-gradient(circle at 50% 0%, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 70%)`
        : 'radial-gradient(circle at 50% 0%, #f8fafc 0%, #e2e8f0 70%)',
  },
});

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const HeaderTitleGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const HeaderActionGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(0,0,0,0.05)',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(0,0,0,0.1)',
  },
}));

export const MainContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
}));

export const TaskTitleContainer = styled(Box)({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const TaskMetadataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  margin: `${theme.spacing(6)} 0`,
}));

export const TimerSeparator = styled(Typography)(({ theme }) => ({
  fontSize: '64px',
  fontWeight: 200,
  color: theme.palette.text.secondary,
  marginBottom: '16px',
}));

export const ProgressContainer = styled(Box)({
  width: '100%',
  maxWidth: 400,
});

export const ProgressLabels = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

// Replaced by FooterContainer definition block above, keeping export clean if needed
// export const FooterContainer = ... (Moved up)

export const AddTimeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: '16px',
  padding: `0 ${theme.spacing(2)}`,
  height: '48px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(0,0,0,0.05)',
    color: theme.palette.text.primary,
  },
}));

export const PlayPauseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(226, 232, 240, 0.8)',
  color: theme.palette.text.primary,
  width: 64,
  height: 64,
  borderRadius: '20px',
  margin: '0 16px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(51, 65, 85, 0.8)'
        : 'rgba(203, 213, 225, 0.8)',
  },
}));

export const CompleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '16px',
  padding: `0 ${theme.spacing(3)}`,
  height: '48px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  boxShadow: `0 4px 6px -1px ${theme.palette.primary.main}80`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const AmbientContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const AmbientIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.05)',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

// Mini Mode styles
export const MiniTimerBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? '#000000'
      : theme.palette.background.default,
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100px',
  border:
    theme.palette.mode === 'light'
      ? `1px solid ${theme.palette.divider}`
      : 'none',
}));

export const MiniInfoBox = styled(Box)({
  flex: 1,
});

export const MiniControlsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  borderLeft: `1px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
}));

export const MiniExpandButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '6px',
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const MiniPlayButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export const FocusModeLayout = styled(Box)({
  display: 'flex',
  height: '100%',
  width: '100%',
});

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 320,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const TaskQueueList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflowY: 'auto',
  flex: 1,
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
}));

export const QueueItemContainer = styled(Box)<{
  isActive?: boolean;
  isNext?: boolean;
}>(({ theme, isActive, isNext }) => ({
  backgroundColor: isActive
    ? theme.palette.mode === 'dark'
      ? 'rgba(59, 130, 246, 0.1)'
      : 'rgba(59, 130, 246, 0.05)'
    : theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(241, 245, 249, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  border: '1px solid',
  borderColor: isActive ? theme.palette.primary.main : theme.palette.divider,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive
      ? 'rgba(59, 130, 246, 0.15)'
      : 'rgba(255, 255, 255, 0.05)',
  },
  ...(isNext && {
    opacity: 0.8,
  }),
}));

export const QueueItemHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StatusBadge = styled(Box)<{
  status: 'CURRENT' | 'NEXT' | 'LATER' | 'SUBTASK';
}>(({ status }) => ({
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: 1,
  color:
    status === 'CURRENT'
      ? '#3b82f6'
      : status === 'SUBTASK'
        ? '#8b5cf6'
        : '#64748b',
  textTransform: 'uppercase',
  backgroundColor:
    status === 'SUBTASK' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
  padding: status === 'SUBTASK' ? '2px 8px' : '0',
  borderRadius: status === 'SUBTASK' ? '4px' : '0',
}));

export const QueueItemTime = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  color: theme.palette.text.secondary,
  fontWeight: 600,
}));

export const QueueItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
}));

export const MainArea = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '32px',
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
});

// Exit Confirmation Modal Styles
export const ExitModalOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(5px)',
  zIndex: 10000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ExitModalCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '24px',
  padding: theme.spacing(4),
  width: '400px',
  maxWidth: '90%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
}));

export const WarningIconWrapper = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: '40px',
  },
}));

export const ExitModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

export const ExitModalText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '16px',
  lineHeight: 1.5,
  marginBottom: theme.spacing(4),
}));

export const ExitModalActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(0,0,0,0.05)',
  },
}));

export const EndSessionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.error.main,
  color: 'white',
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.error.dark || '#dc2626',
  },
}));

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Completion Screen Styles
export const CompletionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'relative',
  zIndex: 10,
  animation: `${fadeInUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const SuccessIconContainer = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  boxShadow: `0 0 40px ${theme.palette.success.main}60`,

  '& svg': {
    fontSize: 64,
    color: 'white',
  },
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  margin: `${theme.spacing(6)} 0`,
  width: '100%',
  justifyContent: 'center',
}));

export const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(226, 232, 240, 0.4)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  minWidth: 200,
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,

  '& .label': {
    color: theme.palette.text.secondary,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },

  '& .value': {
    color: theme.palette.text.primary,
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
  },

  '& .sub': {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

export const NextTaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: '16px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: `0 4px 15px -3px ${theme.palette.primary.main}80`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: `0 8px 20px -3px ${theme.palette.primary.main}99`,
  },
}));

export const BreakButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(51, 65, 85, 0.5)'
      : 'rgba(226, 232, 240, 0.8)',
  color: theme.palette.text.primary,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderRadius: '16px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  '&:hover': {
    backgroundColor: 'rgba(71, 85, 105, 0.6)',
    color: 'white',
  },
}));
