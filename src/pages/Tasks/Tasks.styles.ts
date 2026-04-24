import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, TextField, Button } from '@mui/material';

const fadeInSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedContainer = styled(Box)(({ theme }) => ({
  animation: `${fadeInSlideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
  flex: 1,
  overflowY: 'auto',
  paddingTop: '16px',
  minHeight: 0,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.text.secondary,
  },
}));

export const TasksContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: theme.palette.background.default,
  height: '100vh', // Fixed height
  overflow: 'hidden', // Prevent body scroll
  color: theme.palette.text.primary,
  display: 'flex',
  gap: '24px',
}));

export const MainContent = styled(Box)({
  flex: 3,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const Sidebar = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

export const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '24px',
});

export const ControlsBar = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginBottom: '32px',
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
  },
}));

export const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '8px 16px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

export const SortButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '8px 16px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

export const CompletedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '8px 16px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

export const SectionTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'colorIndicator',
})<{ colorIndicator?: string }>(({ theme, colorIndicator }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: '16px',
  marginTop: '32px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  '&::before': {
    content: '""',
    display: 'block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: colorIndicator || theme.palette.text.secondary,
  },
}));


export const AddTaskInput = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '12px 16px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '24px',
  color: theme.palette.text.secondary,
  cursor: 'text',
  border: `1px solid ${theme.palette.divider}`,
}));

export const SidebarCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  padding: '20px',
}));

export const InsightScore = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export const ViewToggleGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  height: 'fit-content',
}));

export const ViewToggleButton = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  padding: '6px 10px',
  cursor: 'pointer',
  backgroundColor: active
    ? theme.palette.action.selected
    : 'transparent',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active
      ? theme.palette.action.selected
      : theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const GridTaskContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
  paddingTop: '16px',
  paddingBottom: '32px',
});

