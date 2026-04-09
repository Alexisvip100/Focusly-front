import { useMemo } from 'react';
import { Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BoltIcon from '@mui/icons-material/Bolt';
import { isToday } from 'date-fns';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import {
  MetricsContainer,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricValueRow,
  MetricValue,
  TrendBadge,
  StyledLinearProgress,
} from './DashboardMetrics.styles';

interface DashboardMetricsProps {
  tasks: TaskResponse[];
}

export const DashboardMetrics = ({ tasks }: DashboardMetricsProps) => {
  const metrics = useMemo(() => {
    // 1. Time Optimised
    const completedTasksToday = tasks.filter(
      (t) => t.status === 'Done' && t.updated_at && isToday(new Date(t.updated_at))
    );

    const totalMinutesFocused = completedTasksToday.reduce((total, task) => {
      return total + (task.estimate_timer || 0); // Assuming estimate_timer is in minutes
    }, 0);

    const hoursFocused = (totalMinutesFocused / 60).toFixed(1);

    // Mock trend for now - perfectly would need historical data
    const timeTrend = '+15%';

    // 2. Tasks Completed
    const tasksCompletedToday = completedTasksToday.length;
    const tasksTrend = '+20%';

    // 3. Focus Score
    const tasksPlannedForToday = tasks.filter((t) => t.deadline && isToday(new Date(t.deadline)));
    const completedPlannedTasks = tasksPlannedForToday.filter((t) => t.status === 'Done');

    let focusScore = 0;
    if (tasksPlannedForToday.length > 0) {
      focusScore = Math.round((completedPlannedTasks.length / tasksPlannedForToday.length) * 100);
    } else if (tasksCompletedToday > 0) {
      // If no tasks planned but some completed, that's 100% focus!
      focusScore = 100;
    }

    // 4. Energy Level
    const energyScore = completedTasksToday.reduce((score, task) => {
      if (task.priority_level === 3) return score + 3;
      if (task.priority_level === 2) return score + 2;
      return score + 1;
    }, 0);

    let energyLevel = 'Low';
    let energyColor = '#8b949e';
    if (energyScore >= 10) {
      energyLevel = 'High';
      energyColor = '#06b6d4'; // Cyan for high energy
    } else if (energyScore >= 5) {
      energyLevel = 'Medium';
      energyColor = '#f59e0b'; // Amber for medium
    }

    return {
      timeOptimised: `${hoursFocused}h`,
      timeTrend,
      tasksCompletedToday,
      tasksTrend,
      focusScore,
      energyLevel,
      energyColor,
    };
  }, [tasks]);

  return (
    <MetricsContainer>
      {/* Time Optimised Card */}
      <MetricCard>
        <MetricHeader>
          <MetricTitle>Time Optimised</MetricTitle>
        </MetricHeader>
        <MetricValueRow>
          <MetricValue>{metrics.timeOptimised}</MetricValue>
          <TrendBadge isPositive={true}>
            {metrics.timeTrend} <TrendingUpIcon sx={{ fontSize: 14 }} />
          </TrendBadge>
        </MetricValueRow>
      </MetricCard>

      {/* Tasks Completed Card */}
      <MetricCard>
        <MetricHeader>
          <MetricTitle>Tasks Completed</MetricTitle>
        </MetricHeader>
        <MetricValueRow>
          <MetricValue>{metrics.tasksCompletedToday}</MetricValue>
          <TrendBadge isPositive={true}>
            {metrics.tasksTrend} <TrendingUpIcon sx={{ fontSize: 14 }} />
          </TrendBadge>
        </MetricValueRow>
      </MetricCard>

      {/* Focus Score Card */}
      <MetricCard>
        <MetricHeader>
          <MetricTitle>Focus Score</MetricTitle>
        </MetricHeader>
        <MetricValueRow>
          <MetricValue>{metrics.focusScore}%</MetricValue>
          <Box sx={{ pb: 1 }}>
            <StyledLinearProgress variant="determinate" value={metrics.focusScore} />
          </Box>
        </MetricValueRow>
      </MetricCard>

      {/* Energy Level Card */}
      <MetricCard>
        <MetricHeader>
          <MetricTitle>Energy Level</MetricTitle>
        </MetricHeader>
        <MetricValueRow>
          <MetricValue sx={{ color: metrics.energyColor }}>{metrics.energyLevel}</MetricValue>
          <Box sx={{ pb: 0.5 }}>
            <BoltIcon sx={{ color: metrics.energyColor, fontSize: 24 }} />
          </Box>
        </MetricValueRow>
      </MetricCard>
    </MetricsContainer>
  );
};
