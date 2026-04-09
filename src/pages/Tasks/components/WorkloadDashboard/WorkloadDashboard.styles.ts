import { Box, styled, LinearProgress, linearProgressClasses } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  width: '100%',
  alignItems: 'flex-start',
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
  },
}));

export const MainPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  minWidth: 0,
}));

export const SidePanel = styled(Box)(({ theme }) => ({
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  flexShrink: 0,
  '@media (max-width: 1024px)': {
    width: '100%',
  },
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export const FilterBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  padding: '4px 8px',
  gap: '8px',
}));

export const LegendDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
}));

export const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // similar to existing dark cards
  borderRadius: '16px',
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  flex: 1,
  minWidth: 0,
}));

export const StatBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

export const DailyCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const ProgressRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const ProgressHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledLinearProgress = styled(LinearProgress)<{ overLimit?: boolean }>(
  ({ theme, overLimit }) => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.divider,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 4,
      backgroundColor: overLimit ? theme.palette.error.main : theme.palette.primary.main,
    },
  })
);

export const RightCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

export const MiniProgress = styled(LinearProgress)<{ barColor?: string }>(
  ({ theme, barColor }) => ({
    height: 15,
    borderRadius: 2,
    backgroundColor: theme.palette.divider,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 2,
      backgroundColor: barColor || theme.palette.primary.main,
    },
  })
);

export const AlertBox = styled(Box)<{ type: 'error' | 'warning' }>(({ theme, type }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: type === 'error' ? 'rgba(255, 77, 79, 0.1)' : 'rgba(250, 173, 20, 0.1)',
  border: `1px solid ${type === 'error' ? 'rgba(255, 77, 79, 0.2)' : 'rgba(250, 173, 20, 0.2)'}`,
}));

export const SmartActionCard = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(47, 129, 247, 0.05)' : theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(47, 129, 247, 0.2)' : theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
