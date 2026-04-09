import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

export const MetricsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginBottom: '24px',
  overflowX: 'auto',
  paddingBottom: '8px',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
}));

export const MetricCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#222d3b53' : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  padding: '16px 20px',
  minWidth: '220px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const MetricHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
}));

export const MetricTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}));

export const MetricValueRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginTop: '4px',
}));

export const MetricValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 1,
}));

export const TrendBadge = styled(Typography)<{ isPositive?: boolean }>(({ theme, isPositive }) => ({
  color: isPositive ? '#3fb950' : theme.palette.error.main,
  fontSize: '12px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
}));

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  width: '60px',
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
    backgroundColor: '#3b82f6', // Focus Blue
  },
}));
