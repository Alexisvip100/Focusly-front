import { Box, Paper, Button, TextField, styled } from '@mui/material';

export const ProfilePageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
}));

export const TopBar = styled(Box)(({ theme }) => ({
  height: '64px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 32px',
  backgroundColor: theme.palette.background.default,
}));

export const ContentContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  overflow: 'hidden', // Prevent full page scroll if inner scrolls
});

export const Sidebar = styled(Box)(({ theme }) => ({
  width: '280px',
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

export const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '40px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.default,
}));

export const UserCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: '24px',
}));

export const MenuButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  fontWeight: active ? 600 : 400,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  gap: '12px',
  marginBottom: '4px',
}));

export const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage: 'none',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
}));

export const DarkInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    color: theme.palette.text.primary,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));
