import { styled, Box, InputBase, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

export const WorkspaceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const WorkspaceHeader = styled(Box)(({ theme }) => ({
  height: '60px',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
}));

export const HeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  justifyContent: 'flex-start',
});

export const HeaderCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 2,
  padding: '0 24px',
});

export const HeaderRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flex: 1,
  justifyContent: 'flex-end',
});

export const SearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px', // Pill shape
  padding: '4px 12px 4px 36px', // Left padding for icon
  fontSize: '13px',
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  width: '100%', // Changed to 100%
  '& input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '&:hover': {
    borderColor: theme.palette.text.primary,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
  },
}));

export const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
});

export const IllustrationContainer = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'center',
});

export const RobotIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '24px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 0 40px ${theme.palette.mode === 'dark' ? 'rgba(19, 127, 236, 0.1)' : 'rgba(19, 127, 236, 0.3)'}`, // Glow effect
}));

export const LightningBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: theme.palette.info.main, // Cyan color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px solid ${theme.palette.background.default}`,
}));

export const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
});

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main, // Cyan
  color: '#fff', // White text on cyan
  fontWeight: 700,
  fontSize: '13px',
  padding: '10px 24px',
  borderRadius: '8px',
  letterSpacing: '0.5px',
  '&:hover': {
    backgroundColor: theme.palette.info.dark,
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '13px',
  padding: '10px 24px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  letterSpacing: '0.5px',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    borderColor: theme.palette.text.secondary,
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Command Palette Styles
export const CommandPaletteContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-16px',
  left: '0',
  right: '0',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  zIndex: 10,
  overflow: 'hidden',
  width: '100%',
  animation: `${fadeIn} 0.2s ease-out`,
  transformOrigin: 'top center',
}));

export const CollapsedSearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.action.hover,
  borderRadius: '8px',
  padding: '12px 16px',
  cursor: 'text',
  border: '1px solid transparent',
  animation: `${fadeIn} 0.2s ease-out`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

export const CommandInputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CommandInput = styled('input')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.text.primary,
  fontSize: '14px',
  width: '100%',
  marginLeft: '8px',
  outline: 'none',
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export const ResultList = styled(Box)({
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '8px 0',
});

export const ResultSectionTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  padding: '8px 16px',
  textTransform: 'uppercase',
}));

export const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const ItemLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const StatusDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
  boxShadow: `0 0 8px ${color}`,
}));

export const ItemText = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '13px',
  fontWeight: 500,
}));

export const ItemTag = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  fontSize: '11px',
  fontWeight: 500,
  padding: '2px 8px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.divider}`,
}));

export const PaletteFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  fontSize: '11px',
}));

export const ResultHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px 8px 16px',
});

export const CustomTabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: '0 16px 12px 16px',
  padding: '4px',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  gap: '4px',
}));

export const CustomTabButton = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  flex: 1,
  padding: '6px 0',
  textAlign: 'center',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  color: active ? theme.palette.info.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
    color: active ? theme.palette.info.main : theme.palette.text.primary,
  },
}));

export const ResultTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}));

export const ResultCount = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.5px',
}));

export const TaskItemContainer = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  padding: '10px 16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  borderLeft: active ? `2px solid ${theme.palette.info.main}` : '2px solid transparent',
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SubTaskItemContainer = styled(Box)(({ theme }) => ({
  padding: '8px 16px 8px 48px', // Indented
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledBadge = styled(Box)<{ color: string; bgColor: string }>(
  ({ color, bgColor }) => ({
    backgroundColor: bgColor,
    color: color,
    fontSize: '9px',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginRight: '8px',
  })
);

export const StyledCategory = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '10px', // Smaller than badge
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

export const AddTaskButton = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.info.main,
  fontSize: '11px',
  fontWeight: 700,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const RadioCircle = styled(Box)<{ selected?: boolean; color: string }>(
  ({ theme, selected, color }) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `1px solid ${selected ? color : theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: '""',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
      display: selected ? 'block' : 'none',
    },
  })
);

export const CheckSquare = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '4px',
  border: `1px solid ${selected ? theme.palette.info.main : theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: selected ? theme.palette.info.main : 'transparent',
}));
