import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  AccessTime,
  CheckCircleOutline,
  Bolt,
  WbSunny,
  History as HistoryIcon,
} from '@mui/icons-material';
import { StatsGrid, StatCard, IconWrapper } from '../../Insights.styles';
import type { StatsCardsProps } from './StatsCards.types';

const TrendBadge: React.FC<{ change: string; trend: string }> = ({
  change,
  trend,
}) => (
  <Typography
    variant="caption"
    sx={{
      color:
        trend === 'up'
          ? 'success.main'
          : trend === 'down'
            ? 'error.main'
            : 'text.secondary',
      bgcolor:
        trend === 'up'
          ? 'success.light'
          : trend === 'down'
            ? 'error.light'
            : 'action.hover',
      py: 0.5,
      px: 1,
      borderRadius: 1,
      width: 'fit-content',
    }}
  >
    {change}
  </Typography>
);

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalFocusHours,
  taskCompletion,
  energyScore,
  breakHours,
  goldenWindow,
}) => {
  const theme = useTheme();

  return (
    <StatsGrid>
      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Focus Hours
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {totalFocusHours.value}
            </Typography>
          </Box>
          <IconWrapper color={theme.palette.primary.main}>
            <AccessTime />
          </IconWrapper>
        </Box>
        <TrendBadge change={totalFocusHours.change} trend={totalFocusHours.trend} />
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Task Completion
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {taskCompletion.value}
            </Typography>
          </Box>
          <IconWrapper color="#6366f1">
            <CheckCircleOutline />
          </IconWrapper>
        </Box>
        <TrendBadge change={taskCompletion.change} trend={taskCompletion.trend} />
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Energy Score
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {energyScore.value}
            </Typography>
          </Box>
          <IconWrapper color="#8b5cf6">
            <Bolt />
          </IconWrapper>
        </Box>
        <TrendBadge change={energyScore.change} trend={energyScore.trend} />
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Break Hours
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {breakHours.value}
            </Typography>
          </Box>
          <IconWrapper color="#10b981">
            <HistoryIcon />
          </IconWrapper>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {breakHours.change}
        </Typography>
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Golden Window
            </Typography>
            <Typography variant="h5" fontWeight="bold" mt={1}>
              {goldenWindow.value}
            </Typography>
          </Box>
          <IconWrapper color={theme.palette.warning.main}>
            <WbSunny />
          </IconWrapper>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {goldenWindow.change}
        </Typography>
      </StatCard>
    </StatsGrid>
  );
};
