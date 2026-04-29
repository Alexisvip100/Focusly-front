import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  AccessTime,
  CheckCircleOutline,
  Bolt,
  WbSunny,
  History as HistoryIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
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
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                Total Focus
              </Typography>
              <Tooltip
                title="The total time you've dedicated to your tasks using the focus timer."
                arrow
              >
                <InfoIcon
                  sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                />
              </Tooltip>
            </Box>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {totalFocusHours.value}
            </Typography>
          </Box>
          <IconWrapper color={theme.palette.primary.main}>
            <AccessTime />
          </IconWrapper>
        </Box>
        <TrendBadge
          change={totalFocusHours.change}
          trend={totalFocusHours.trend}
        />
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                Completed Tasks
              </Typography>
              <Tooltip
                title="Shows what percentage of your total tasks you've marked as finished so far."
                arrow
              >
                <InfoIcon
                  sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                />
              </Tooltip>
            </Box>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {taskCompletion.value}
            </Typography>
          </Box>
          <IconWrapper color="#6366f1">
            <CheckCircleOutline />
          </IconWrapper>
        </Box>
        <TrendBadge
          change={taskCompletion.change}
          trend={taskCompletion.trend}
        />
      </StatCard>

      <StatCard>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                Energy Score
              </Typography>
              <Tooltip
                title="A performance rating based on how many tasks you complete and how close you were to your estimated times."
                arrow
              >
                <InfoIcon
                  sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                />
              </Tooltip>
            </Box>
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
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                Breaks
              </Typography>
              <Tooltip
                title="We calculate your breaks automatically by measuring the time between when you finish a focus session and start the next one."
                arrow
              >
                <InfoIcon
                  sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                />
              </Tooltip>
            </Box>
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
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                Golden Window
              </Typography>
              <Tooltip
                title="We identify your most productive hours based on the times of day when you manage to concentrate for the longest period."
                arrow
              >
                <InfoIcon
                  sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                />
              </Tooltip>
            </Box>
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
