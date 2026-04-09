import { Box, Typography, Tooltip } from '@mui/material';
import {
  DashboardContainer,
  MainPanel,
  HeaderRow,
  StatCard,
  StatBoxContainer,
  DailyCard,
  ProgressRow,
  ProgressHeader,
  StyledLinearProgress,
} from './WorkloadDashboard.styles';
import { 
  WarningAmber as WarningAmberIcon, 
  FlashOn as FlashOnIcon, 
  AccessTime as AccessTimeIcon, 
  HelpOutline as HelpOutlineIcon 
} from '@mui/icons-material';
import { useWorkloadDashboard } from './hooks/useWorkloadDashboard.hook';
import { useEffect } from 'react';

export const WorkloadDashboard = () => {
  const { daysWeek, getDaysWeek, estimationWeek, limitWeek, availableSlots, dailyWorkload } =
    useWorkloadDashboard();

  const dailyLimit = limitWeek / 7;

  useEffect(() => {
    getDaysWeek();
  }, [getDaysWeek]);

  const avgDailyWorkload = (estimationWeek / 7).toFixed(1);

  return (
    <DashboardContainer>
      <MainPanel>
        {/* Header Row */}
        <HeaderRow>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Weekly Capacity Overview
          </Typography>
        </HeaderRow>

        {/* 3 Summary Cards */}
        <StatBoxContainer>
          <StatCard>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  AVG DAILY WORKLOAD
                </Typography>
                <Tooltip
                  title="Your average daily estimated time across all tasks this week"
                  arrow
                  placement="top"
                >
                  <HelpOutlineIcon sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <AccessTimeIcon sx={{ color: '#2f81f7', fontSize: 25 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, display: 'inline', mr: 1 }}>
                {avgDailyWorkload}h
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                / {(limitWeek / 7).toFixed(1)}h limit
              </Typography>
            </Box>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, (parseFloat(avgDailyWorkload) / (limitWeek / 7)) * 100) || 0}
              sx={{ mt: 'auto', height: 6 }}
            />
          </StatCard>

          <StatCard>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  TOTAL ESTIMATED TIME
                </Typography>
                <Tooltip
                  title="Total hours of work scheduled for the entire week"
                  arrow
                  placement="top"
                >
                  <HelpOutlineIcon sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <FlashOnIcon sx={{ color: '#8a2be2', fontSize: 16 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, display: 'inline', mr: 1 }}>
                {estimationWeek.toFixed(1)}h
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                this week
              </Typography>
            </Box>
          </StatCard>

          <StatCard>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  AVAILABLE SLOTS
                </Typography>
                <Tooltip
                  title="Remaining unscheduled hours based on your daily limits"
                  arrow
                  placement="top"
                >
                  <HelpOutlineIcon sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <FlashOnIcon sx={{ color: '#3fb950', fontSize: 16 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, display: 'inline', mr: 1 }}>
                {availableSlots.toFixed(1)}h
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#3fb950', display: 'inline', fontWeight: 500 }}
              >
                Ready to plan
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#3fb950', mt: 'auto' }}>
              Focus Score: Excellent
            </Typography>
          </StatCard>
        </StatBoxContainer>

        <DailyCard>
          <ProgressRow>
            <ProgressHeader>
              <Box display="flex" gap={1} alignItems="baseline">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Monday
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {daysWeek[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Est:{' '}
                    <strong
                      style={{
                        color: (dailyWorkload[0] || 0) > dailyLimit ? '#ff4d4f' : 'inherit',
                      }}
                    >
                      {(dailyWorkload[0] || 0).toFixed(1)}h
                    </strong>
                  </Typography>
                  <Tooltip
                    title="Total estimated time for tasks scheduled on this day"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Limit: <strong style={{ color: 'inherit' }}>8h</strong>
                  </Typography>
                  <Tooltip
                    title="Your max daily capacity. Tasks beyond this limit will be flagged"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {(dailyWorkload[0] || 0) > dailyLimit && (
                    <WarningAmberIcon sx={{ color: '#ff4d4f', fontSize: 14 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: (dailyWorkload[0] || 0) > dailyLimit ? '#ff4d4f' : '#2f81f7',
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(((dailyWorkload[0] || 0) / dailyLimit) * 100)}%
                  </Typography>
                  <Tooltip title="Percentage of daily capacity used" arrow placement="top">
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </ProgressHeader>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, ((dailyWorkload[0] || 0) / dailyLimit) * 100)}
              overLimit={(dailyWorkload[0] || 0) > dailyLimit}
            />
          </ProgressRow>

          <ProgressRow>
            <ProgressHeader>
              <Box display="flex" gap={1} alignItems="baseline">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Tuesday
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {daysWeek[1]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Est:
                    <strong
                      style={{
                        color: (dailyWorkload[1] || 0) > dailyLimit ? '#ff4d4f' : 'inherit',
                      }}
                    >
                      {(dailyWorkload[1] || 0).toFixed(1)}h
                    </strong>
                  </Typography>
                  <Tooltip
                    title="Total estimated time for tasks scheduled on this day"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Limit: <strong style={{ color: 'inherit' }}>{dailyLimit.toFixed(1)}h</strong>
                  </Typography>
                  <Tooltip
                    title="Your max daily capacity. Tasks beyond this limit will be flagged"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {(dailyWorkload[1] || 0) > dailyLimit && (
                    <WarningAmberIcon sx={{ color: '#ff4d4f', fontSize: 14 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: (dailyWorkload[1] || 0) > dailyLimit ? '#ff4d4f' : '#2f81f7',
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(((dailyWorkload[1] || 0) / dailyLimit) * 100)}%
                  </Typography>
                  <Tooltip title="Percentage of daily capacity used" arrow placement="top">
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </ProgressHeader>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, ((dailyWorkload[1] || 0) / dailyLimit) * 100)}
              overLimit={(dailyWorkload[1] || 0) > dailyLimit}
            />
          </ProgressRow>

          <ProgressRow>
            <ProgressHeader>
              <Box display="flex" gap={1} alignItems="baseline">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Wednesday
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {daysWeek[2]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Est:{' '}
                    <strong
                      style={{
                        color: (dailyWorkload[2] || 0) > dailyLimit ? '#ff4d4f' : 'inherit',
                      }}
                    >
                      {(dailyWorkload[2] || 0).toFixed(1)}h
                    </strong>
                  </Typography>
                  <Tooltip
                    title="Total estimated time for tasks scheduled on this day"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Limit: <strong style={{ color: 'inherit' }}>{dailyLimit.toFixed(1)}h</strong>
                  </Typography>
                  <Tooltip
                    title="Your max daily capacity. Tasks beyond this limit will be flagged"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {(dailyWorkload[2] || 0) > dailyLimit && (
                    <WarningAmberIcon sx={{ color: '#ff4d4f', fontSize: 14 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: (dailyWorkload[2] || 0) > dailyLimit ? '#ff4d4f' : '#2f81f7',
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(((dailyWorkload[2] || 0) / dailyLimit) * 100)}%
                  </Typography>
                  <Tooltip title="Percentage of daily capacity used" arrow placement="top">
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </ProgressHeader>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, ((dailyWorkload[2] || 0) / dailyLimit) * 100)}
              overLimit={(dailyWorkload[2] || 0) > dailyLimit}
            />
          </ProgressRow>

          <ProgressRow>
            <ProgressHeader>
              <Box display="flex" gap={1} alignItems="baseline">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Thursday
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {daysWeek[3]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Est:{' '}
                    <strong
                      style={{
                        color: (dailyWorkload[3] || 0) > dailyLimit ? '#ff4d4f' : 'inherit',
                      }}
                    >
                      {(dailyWorkload[3] || 0).toFixed(1)}h
                    </strong>
                  </Typography>
                  <Tooltip
                    title="Total estimated time for tasks scheduled on this day"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Limit: <strong style={{ color: 'inherit' }}>{dailyLimit.toFixed(1)}h</strong>
                  </Typography>
                  <Tooltip
                    title="Your max daily capacity. Tasks beyond this limit will be flagged"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {(dailyWorkload[3] || 0) > dailyLimit && (
                    <WarningAmberIcon sx={{ color: '#ff4d4f', fontSize: 14 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: (dailyWorkload[3] || 0) > dailyLimit ? '#ff4d4f' : '#2f81f7',
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(((dailyWorkload[3] || 0) / dailyLimit) * 100)}%
                  </Typography>
                  <Tooltip title="Percentage of daily capacity used" arrow placement="top">
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </ProgressHeader>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, ((dailyWorkload[3] || 0) / dailyLimit) * 100)}
              overLimit={(dailyWorkload[3] || 0) > dailyLimit}
            />
          </ProgressRow>

          <ProgressRow>
            <ProgressHeader>
              <Box display="flex" gap={1} alignItems="baseline">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Friday
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {daysWeek[4]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Est:{' '}
                    <strong
                      style={{
                        color: (dailyWorkload[4] || 0) > dailyLimit ? '#ff4d4f' : 'inherit',
                      }}
                    >
                      {(dailyWorkload[4] || 0).toFixed(1)}h
                    </strong>
                  </Typography>
                  <Tooltip
                    title="Total estimated time for tasks scheduled on this day"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Limit: <strong style={{ color: 'inherit' }}>{dailyLimit.toFixed(1)}h</strong>
                  </Typography>
                  <Tooltip
                    title="Your max daily capacity. Tasks beyond this limit will be flagged"
                    arrow
                    placement="top"
                  >
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {(dailyWorkload[4] || 0) > dailyLimit && (
                    <WarningAmberIcon sx={{ color: '#ff4d4f', fontSize: 14 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: (dailyWorkload[4] || 0) > dailyLimit ? '#ff4d4f' : '#2f81f7',
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(((dailyWorkload[4] || 0) / dailyLimit) * 100)}%
                  </Typography>
                  <Tooltip title="Percentage of daily capacity used" arrow placement="top">
                    <HelpOutlineIcon
                      sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </ProgressHeader>
            <StyledLinearProgress
              variant="determinate"
              value={Math.min(100, ((dailyWorkload[4] || 0) / dailyLimit) * 100)}
              overLimit={(dailyWorkload[4] || 0) > dailyLimit}
            />
          </ProgressRow>
        </DailyCard>
      </MainPanel>
    </DashboardContainer>
  );
};
