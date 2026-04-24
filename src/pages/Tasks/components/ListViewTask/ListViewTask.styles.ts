import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TaskCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '20px',
  padding: '16px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.2s, border-color 0.2s',

  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.main,
  },
}));

export const CardLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const CardRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});
