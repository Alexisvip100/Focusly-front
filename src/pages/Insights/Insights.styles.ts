import { Box, Paper, styled, alpha } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '32px',
  height: '100%',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.default, // Matches app background
  color: theme.palette.text.primary,
}));

export const HeaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
});

// Top row of stats cards
export const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '16px',
  width: '100%',
});

export const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Card background
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow:
      theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
  },
}));

export const IconWrapper = styled(Box)<{ color?: string }>(({ theme, color }) => {
  const getColor = (c: string) => {
    if (c.includes('.')) {
      const parts = c.split('.');
      let current: Record<string, unknown> = theme.palette as unknown as Record<string, unknown>;
      for (const part of parts) {
        const next = current[part];
        if (next && typeof next === 'object') {
          current = next as Record<string, unknown>;
        } else if (typeof next === 'string') {
          return next;
        } else {
          return c;
        }
      }
    }
    return c;
  };

  const resolvedColor = color ? getColor(color) : undefined;

  return {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: resolvedColor ? alpha(resolvedColor, 0.1) : theme.palette.action.hover,
    color: resolvedColor || theme.palette.text.primary,
  };
});

// Middle section with Charts
export const ChartsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '16px',
  width: '100%',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
});

export const ChartCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: '24px',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  height: '400px',
}));

// Bottom section
export const BottomRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '16px',
  width: '100%',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
});

export const FilterButton = styled('button')<{ active?: boolean }>(({ theme, active }) => ({
  padding: '8px 16px',
  borderRadius: '20px',
  border: 'none',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '14px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const ActionButton = styled('button')<{ primary?: boolean }>(({ theme, primary }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  border: primary ? 'none' : `1px solid ${theme.palette.divider}`,
  backgroundColor: primary ? theme.palette.primary.main : 'transparent',
  color: primary ? theme.palette.primary.contrastText : theme.palette.text.primary,
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: primary ? theme.palette.primary.dark : theme.palette.action.hover,
  },
}));

export const HeatmapGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(14, 1fr)', // Approximate for hours/days segments
  gap: '4px',
  marginTop: '16px',
});

export const HeatmapCell = styled(Box)<{ intensity: number }>(({ theme, intensity }) => ({
  aspectRatio: '1',
  borderRadius: '4px',
  backgroundColor: theme.palette.primary.main,
  opacity: 0.1 + intensity * 0.15, // distinct opacities
}));
