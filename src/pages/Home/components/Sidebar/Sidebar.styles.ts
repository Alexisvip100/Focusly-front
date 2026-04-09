import { Box, Typography, Button, ListItemButton, styled, alpha } from '@mui/material';

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 260,
  backgroundColor: theme.palette.background.paper,
  borderRight: `2px solid ${theme.palette.divider}`,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

export const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.25rem',
  color: theme.palette.text.primary,
  padding: '0px 0px 20px 0px',
  display: 'flex',
  margin: '20px 0px 20px 0px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}));

export const AddTaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e2329' : theme.palette.grey[100],
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  textTransform: 'none',
  justifyContent: 'center',
  padding: '16px',
  margin: '20px',
  borderRadius: 12,
  alignItems: 'center',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2a2f36' : theme.palette.grey[200],
  },
}));

export const NavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 8,
  marginBottom: 4,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : alpha(theme.palette.primary.main, 0.1)
    : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : alpha(theme.palette.primary.main, 0.05),
    color: theme.palette.primary.main,
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
    minWidth: 40,
  },
}));

export const EnergyCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.action.hover} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: '16px',
  textAlign: 'center',
  margin: '16px',
}));
