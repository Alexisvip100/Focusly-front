import { Box, styled } from '@mui/material';

interface PanelContainerProps {
  isOpen: boolean;
}

export const PanelContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<PanelContainerProps>(({ theme, isOpen }) => ({
  width: isOpen ? 320 : 60,
  transition: 'width 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
  height: '100vh',
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
}));

export const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 12,
  padding: 24,
  border: `1px solid ${theme.palette.divider}`,
}));

export const NextUpItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  marginBottom: 16,
});
export const ItemBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'task' | 'subtask' }>(({ theme, type }) => ({
  fontSize: '10px',
  fontWeight: 'bold',
  padding: '2px 6px',
  borderRadius: '4px',
  textTransform: 'uppercase',
  backgroundColor: type === 'task' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
  color: type === 'task' ? theme.palette.primary.main : theme.palette.secondary.main,
  letterSpacing: '0.5px',
}));
