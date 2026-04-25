import { Box, Typography, IconButton, Collapse } from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  History as HistoryIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  Add as AddIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

import { TaskCard, CardLeft } from './ListViewTask.styles';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
import { formatDuration } from '../../../Tasks/components/TaskDetailModal/TaskDetailModal.utils';

const formatTimeSinceCompletion = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h ago`;

  const days = differenceInDays(now, date);
  if (days < 7) return `${days}d ago`;

  const weeks = differenceInWeeks(now, date);
  if (weeks < 4) return `${weeks}w ago`;

  const months = differenceInMonths(now, date);
  if (months < 12) return `${months}mo ago`;

  const years = differenceInYears(now, date);
  return `${years}y ago`;
};

interface ListViewTaskProps {
  task: TaskResponse;
  expandedTaskIds: Set<string>;
  toggleTaskExpansion: (taskId: string) => void;
  handleSubtaskToggle: (task: TaskResponse, index: number) => void;
  handleOpenSubtaskModal: (task: TaskResponse, index?: number) => void;
  onTaskClick: (task: TaskResponse) => void;
}

export const ListViewTask = ({
  task,
  expandedTaskIds,
  toggleTaskExpansion,
  handleSubtaskToggle,
  handleOpenSubtaskModal,
  onTaskClick,
}: ListViewTaskProps) => {
    const taskColor = (() => {
      if (task.notes_encrypted) {
        const match = task.notes_encrypted.match(/\[COLOR:(.*?)\]/);
        if (match && match[1]) return match[1];
      }
      return task.priority_level === 3 ? '#58a6ff' : task.priority_level === 2 ? '#d29922' : '#ff7b72';
    })();

  return (
    <TaskCard
      onClick={() => onTaskClick(task)}
      sx={{
        borderLeft: '5px solid',
        borderLeftColor: taskColor,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardLeft>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{ p: 0, mr: 1 }}
        >
          {task.status === 'Done' && <CheckCircleIcon sx={{ fontSize: 24, color: '#3fb950' }} />}
          {task.status === 'Todo' && (
            <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: '#58a6ff' }} />
          )}
          {task.status === 'Pending' && <AccessTimeIcon sx={{ fontSize: 24, color: '#d29922' }} />}
          {task.status === 'Backlog' && (
            <HistoryIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
          )}
        </IconButton>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
              {task.title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 0.5 }}>
            {task.priority_level > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FlagIcon
                  sx={{
                    fontSize: 14,
                    color:
                      task.priority_level === 3
                        ? '#58a6ff'
                        : task.priority_level === 2
                          ? '#d29922'
                          : '#ff7b72',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      task.priority_level >= 3
                        ? '#ff7b72'
                        : task.priority_level === 2
                          ? '#d29922'
                          : '#58a6ff',
                  }}
                >
                  {task.priority_level >= 3
                    ? 'High Priority'
                    : task.priority_level === 2
                      ? 'Medium Priority'
                      : 'Low Priority'}
                </Typography>
              </Box>
            )}
            {(task.deadline || task.status === 'Done') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {task.status === 'Done' ? (
                  <CheckCircleIcon sx={{ fontSize: 14, color: '#3fb950' }} />
                ) : (
                  <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                )}
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.status === 'Done'
                    ? formatTimeSinceCompletion(task.updated_at)
                    : new Date(task.deadline!).toLocaleDateString()}
                </Typography>
              </Box>
            )}
            {task.estimate_minutes > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.estimate_minutes}m
                </Typography>
              </Box>
            )}
            {task.category && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CategoryIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.category}
                </Typography>
              </Box>
            )}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                toggleTaskExpansion(task.id);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                bgcolor: 'action.hover',
                padding: 0.5,
                borderRadius: 1,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <SubdirectoryArrowRightIcon
                sx={{
                  fontSize: 14,
                  color:
                    task.subtasks && task.subtasks.length > 0 ? 'text.secondary' : 'text.disabled',
                  transform: expandedTaskIds.has(task.id) ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {task.subtasks?.length || 0}
              </Typography>
            </Box>
            {task.links && task.links.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  padding: 0.5,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                }}
              >
                <LinkIcon sx={{ fontSize: 14, color: '#3b82f6' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.links.length}
                </Typography>
              </Box>
            )}
          </Box>
          <Collapse in={expandedTaskIds.has(task.id)} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 1,
                ml: 0.5,
              }}
            >
              {task.subtasks &&
                task.subtasks.length > 0 &&
                task.subtasks.map((subtask, index) => {
                  if (typeof subtask === 'string') return null;
                  const isLast = index === task.subtasks!.length - 1;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        position: 'relative',
                        alignItems: 'center',
                        gap: 1.5,
                        pl: 3,
                        pr: 2,
                        py: 0.5,
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: isLast ? '50%' : 0,
                          width: '1px',
                          bgcolor: 'divider',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          width: '16px',
                          height: '1px',
                          bgcolor: 'divider',
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubtaskToggle(task, index);
                        }}
                        sx={{ p: 0, minWidth: 0 }}
                      >
                        {subtask.status === 'Done' || subtask.completed ? (
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#3fb950' }} />
                        ) : subtask.status === 'Todo' ? (
                          <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#58a6ff' }} />
                        ) : subtask.status === 'Pending' ? (
                          <AccessTimeIcon sx={{ fontSize: 16, color: '#d29922' }} />
                        ) : subtask.status === 'Backlog' ? (
                          <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                          />
                        )}
                      </IconButton>
                      <Typography
                        variant="body2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenSubtaskModal(task, index);
                        }}
                        sx={{
                          color: subtask.completed ? 'text.secondary' : 'text.primary',
                          flexGrow: 1,
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: subtask.completed ? 'line-through' : 'underline',
                          },
                        }}
                      >
                        {subtask.title}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 'auto' }}>
                        {subtask.priority_level !== undefined && subtask.priority_level > 0 && (
                          <FlagIcon
                            sx={{
                              fontSize: 14,
                              color:
                                subtask.priority_level === 3
                                  ? '#58a6ff'
                                  : subtask.priority_level === 2
                                    ? '#d29922'
                                    : '#ff7b72',
                            }}
                          />
                        )}
                        {subtask.category && (
                          <CategoryIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        )}

                        {subtask.timer > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.primary',
                              fontSize: '11px',
                              backgroundColor: 'action.hover',
                              borderRadius: '4px',
                              padding: '1px 4px',
                            }}
                          >
                            {formatDuration(subtask.timer)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  pl: 3,
                  pr: 2,
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 1,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSubtaskModal(task);
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: '50%',
                    width: '1px',
                    bgcolor: 'divider',
                    visibility: 'hidden',
                  }}
                />
                <AddIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Add new subtask
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </CardLeft>
    </TaskCard>
  );
};
