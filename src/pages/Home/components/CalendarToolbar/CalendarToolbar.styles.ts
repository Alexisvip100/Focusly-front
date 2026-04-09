import { Box, ButtonGroup, Typography, styled } from '@mui/material';

export const ToolbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
  padding: '10px 36px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
  },
}));

export const DateHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const MainDate = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: '1.2',
}));

export const SubDate = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  marginTop: '4px',
}));

export const ViewToggle = styled(ButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  padding: '4px',
  display: 'flex',
  gap: '8px',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiButton-root': {
    border: 'none',
    color: theme.palette.text.secondary,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    padding: '6px 16px',
    borderRadius: '6px !important',
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    },
    '&.active': {
      backgroundColor: theme.palette.mode === 'dark' ? '#334155' : theme.palette.grey[200],
      color: theme.palette.text.primary,
    },
  },
}));

export const NavigationButtons = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const NavButton = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#334155' : theme.palette.grey[200],
    color: theme.palette.text.primary,
  },
}));
