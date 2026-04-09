import { Box, Typography, styled } from '@mui/material';

export const HeaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 0',
  height: '70px',
});

export const DayName = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  marginBottom: '4px',
}));

export const DayNumber = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: '16px',
  fontWeight: 700,
  color: active ? '#ffffff' : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
