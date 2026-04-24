import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Tag } from '../GridViewTask/GridViewTask.styles';
import { getTagColors } from '../../../Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import { memo } from 'react';

interface SortableTaskCardProps {
  task: TaskResponse;
  onClick?: () => void;
  isOverlay?: boolean;
}

export const SortableTaskCard = memo(({ task, onClick, isOverlay }: SortableTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: isOverlay ? 'grabbing' : 'grab',
    zIndex: isOverlay ? 999 : 1,
  };

  const tagColors = getTagColors(task.category);

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Prevent click if we are dragging
        if (isDragging) return;
        onClick?.();
        e.stopPropagation();
      }}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: isOverlay
          ? (theme) =>
              theme.palette.mode === 'dark'
                ? '0 12px 24px -10px rgba(0, 0, 0, 0.8)'
                : '0 12px 24px -10px rgba(0, 0, 0, 0.2)'
          : 'none',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 12px -5px rgba(0, 0, 0, 0.5)'
              : '0 4px 12px -5px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
        <Tag tagColor={tagColors.bgcolor} textColor={tagColors.color}>
          {task.category || 'General'}
        </Tag>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {task.estimate_timer || 0}m
        </Typography>
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {task.title}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
        {task.deadline ? (
          <Box display="flex" alignItems="center" gap={0.5}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {new Date(task.deadline).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </Box>
        ) : (
          <Box /> // Empty box to maintain flex layout
        )}

        {/* Placeholder Avatar - matching mockup */}
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: 10, fontWeight: 600 }}>
            {task.title ? task.title.charAt(0).toUpperCase() : 'U'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

SortableTaskCard.displayName = 'SortableTaskCard';
