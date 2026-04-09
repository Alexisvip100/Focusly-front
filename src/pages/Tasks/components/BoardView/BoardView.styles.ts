import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  overflowX: 'auto',
  paddingBottom: theme.spacing(2),
  width: '100%',
  alignItems: 'flex-start',
  height: '100%',
  minHeight: '600px',
}));

export const ColumnWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  minWidth: '320px',
  flexShrink: 0,
}));

export const ColumnHeader = styled(Box)<{ borderColor?: string }>(({ theme, borderColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderBottom: `3px solid ${borderColor || theme.palette.divider}`,
}));

export const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '14px',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const TaskCountBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#30363d' : theme.palette.grey[200],
  color: theme.palette.text.secondary,
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '12px',
  fontWeight: 600,
}));

export const DroppableArea = styled(Box)<{ isOver?: boolean }>(({ theme, isOver }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minHeight: '200px',
  height: '100%',
  padding: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: isOver
    ? theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)'
    : 'transparent',
  transition: 'background-color 0.2s ease',
}));

export const TaskPlaceholder = styled(Box)(({ theme }) => ({
  height: '120px',
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}));
