import { Box, Typography, IconButton, LinearProgress } from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  Flag as FlagIcon,
  MoreHoriz as MoreHorizIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

import {
  GridTaskCard,
  GridCardHeader,
  GridCardFooter,
  ProgressBarContainer,
  ProgressLabel,
  Tag,
} from './GridViewTask.styles';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { getTagColors } from '../../../Tasks/components/TaskDetailModal/TaskDetailModal.utils';

interface GridViewTaskProps {
  task: TaskResponse;
  onTaskClick: (task: TaskResponse) => void;
}

export const GridViewTask = ({ task, onTaskClick }: GridViewTaskProps) => {
  const subtaskCount = task.subtasks?.length || 0;
  const completedSubtasks = (task.subtasks || []).filter(
    (s: string | { completed: boolean }) => typeof s !== 'string' && s.completed
  ).length;
  const progress = subtaskCount > 0 ? (completedSubtasks / subtaskCount) * 100 : 0;

  return (
    <GridTaskCard onClick={() => onTaskClick(task)}>
      <GridCardHeader>
        <Tag
          tagColor={getTagColors(task.category || 'General').bgcolor}
          textColor={getTagColors(task.category || 'General').color}
          sx={{
            border: '1px solid',
            borderColor: getTagColors(task.category || 'General').borderColor,
            px: 1,
            py: 0.25,
            borderRadius: '6px',
          }}
        >
          {task.category || 'General'}
        </Tag>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {task.links && task.links.length > 0 && (
            <LinkIcon sx={{ fontSize: 16, color: 'primary.main' }} titleAccess={`${task.links.length} links`} />
          )}
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0 }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </GridCardHeader>

      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.4,
            mb: 1,
          }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '13px',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {/* Description placeholder if not in task object, using title for now or empty */}
          Manage consistency across mobile and web dashboards...
        </Typography>
      </Box>

      <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
        {task.priority_level > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FlagIcon
              sx={{
                fontSize: 14,
                color:
                  task.priority_level === 3
                    ? 'error.main'
                    : task.priority_level === 2
                      ? '#f59e0b'
                      : '#3b82f6',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {task.priority_level === 3 ? 'High' : task.priority_level === 2 ? 'Medium' : 'Low'}
            </Typography>
          </Box>
        )}
        {task.deadline && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {new Date(task.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </Box>
        )}
      </Box>

      <GridCardFooter>
        <ProgressBarContainer>
          <ProgressLabel>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px' }}>
              Subtasks: {completedSubtasks}/{subtaskCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px' }}>
              {Math.round(progress)}%
            </Typography>
          </ProgressLabel>
          <LinearProgress
            variant="determinate"
            value={Math.max(progress, 5)} // Min 5% to show bar
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#3b82f6',
                borderRadius: 2,
              },
            }}
          />
        </ProgressBarContainer>
      </GridCardFooter>
    </GridTaskCard>
  );
};
