import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';
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
  Visibility as VisibilityIcon,
  EventNote as PlannedIcon,
} from '@mui/icons-material';

import { TaskCard, CardLeft } from './ListViewTask.styles';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
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
  updateTask?: (taskId: string, updates: TaskResponse) => Promise<void>;
}

const getSubtaskStatusIcon = (
  status: string | undefined,
  completed: boolean,
) => {
  if (status === 'Done' || completed)
    return <CheckCircleIcon sx={{ fontSize: 16, color: '#3fb950' }} />;
  if (status === 'Pending')
    return <AccessTimeIcon sx={{ fontSize: 16, color: '#d29922' }} />;
  if (status === 'Backlog')
    return <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />;
  if (status === 'Planning')
    return <PlannedIcon sx={{ fontSize: 16, color: '#58a6ff' }} />;
  if (status === 'OnHold')
    return <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#ff7b72' }} />;
  if (status === 'Review')
    return <VisibilityIcon sx={{ fontSize: 16, color: '#a78bfa' }} />;
  if (status === 'Todo')
    return <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#58a6ff' }} />;
  return (
    <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
  );
};

const STATUS_MENU_ICON: Record<string, React.ReactNode> = {
  Todo: <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#58a6ff' }} />,
  Planning: <PlannedIcon sx={{ fontSize: 16, color: '#58a6ff' }} />,
  Pending: <AccessTimeIcon sx={{ fontSize: 16, color: '#d29922' }} />,
  OnHold: <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#ff7b72' }} />,
  Review: <VisibilityIcon sx={{ fontSize: 16, color: '#a78bfa' }} />,
  Done: <CheckCircleIcon sx={{ fontSize: 16, color: '#3fb950' }} />,
  Backlog: <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />,
};

export const ListViewTask = ({
  task,
  expandedTaskIds,
  toggleTaskExpansion,
  handleOpenSubtaskModal,
  onTaskClick,
  updateTask,
}: ListViewTaskProps) => {
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [activeSubtaskIdx, setActiveSubtaskIdx] = useState<number | null>(null);

  const handleStatusIconClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    e.stopPropagation();
    setActiveSubtaskIdx(index);
    setStatusAnchor(e.currentTarget);
  };

  const handleStatusSelect = (status: string) => {
    setStatusAnchor(null);
    if (activeSubtaskIdx === null || !updateTask) return;
    const newSubtasks = [...(task.subtasks || [])].map((st) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...clean } = st as Record<string, unknown>;
      return clean;
    });
    newSubtasks[activeSubtaskIdx] = {
      ...newSubtasks[activeSubtaskIdx],
      status: status as TaskResponse['subtasks'][number]['status'],
      completed: status === 'Done',
    };
    updateTask(task.id, { ...task, subtasks: newSubtasks } as TaskResponse);
    setActiveSubtaskIdx(null);
  };
  const taskColor = (() => {
    if (task.notes_encrypted) {
      const match = task.notes_encrypted.match(/\[COLOR:(.*?)\]/);
      if (match && match[1]) return match[1];
    }
    return task.priority_level === 3
      ? '#58a6ff'
      : task.priority_level === 2
        ? '#d29922'
        : '#ff7b72';
  })();

  return (
    <>
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
            {task.status === 'Done' && (
              <CheckCircleIcon sx={{ fontSize: 24, color: '#3fb950' }} />
            )}
            {task.status === 'Todo' && (
              <RadioButtonUncheckedIcon
                sx={{ fontSize: 24, color: '#58a6ff' }}
              />
            )}
            {task.status === 'Pending' && (
              <AccessTimeIcon sx={{ fontSize: 24, color: '#d29922' }} />
            )}
            {task.status === 'Backlog' && (
              <HistoryIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
            )}
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: 'text.primary' }}
              >
                {task.title}
              </Typography>
            </Box>

            <Box
              sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 0.5 }}
            >
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
                    <CalendarTodayIcon
                      sx={{ fontSize: 14, color: 'text.secondary' }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {task.status === 'Done'
                      ? formatTimeSinceCompletion(task.updated_at)
                      : new Date(task.deadline!).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
              {task.estimate_minutes > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon
                    sx={{ fontSize: 14, color: 'text.secondary' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {task.estimate_minutes}m
                  </Typography>
                </Box>
              )}
              {task.category && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CategoryIcon
                    sx={{ fontSize: 14, color: 'text.secondary' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
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
                      task.subtasks && task.subtasks.length > 0
                        ? 'text.secondary'
                        : 'text.disabled',
                    transform: expandedTaskIds.has(task.id)
                      ? 'rotate(90deg)'
                      : 'none',
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
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {task.links.length}
                  </Typography>
                </Box>
              )}
            </Box>
            <Collapse
              in={expandedTaskIds.has(task.id)}
              timeout="auto"
              unmountOnExit
            >
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
                          onClick={(e) => handleStatusIconClick(e, index)}
                          sx={{ p: 0, minWidth: 0 }}
                        >
                          {getSubtaskStatusIcon(
                            subtask.status,
                            subtask.completed,
                          )}
                        </IconButton>
                        <Typography
                          variant="body2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenSubtaskModal(task, index);
                          }}
                          sx={{
                            color: subtask.completed
                              ? 'text.secondary'
                              : 'text.primary',
                            flexGrow: 1,
                            textDecoration: subtask.completed
                              ? 'line-through'
                              : 'none',
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: subtask.completed
                                ? 'line-through'
                                : 'underline',
                            },
                          }}
                        >
                          {subtask.title}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            ml: 'auto',
                          }}
                        >
                          {subtask.priority_level !== undefined &&
                            subtask.priority_level > 0 && (
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
                            <CategoryIcon
                              sx={{ fontSize: 14, color: 'text.secondary' }}
                            />
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

      <Menu
        anchorEl={statusAnchor}
        open={Boolean(statusAnchor)}
        onClose={() => setStatusAnchor(null)}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: '180px',
            mt: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {[
          'Todo',
          'Planning',
          'Pending',
          'OnHold',
          'Review',
          'Done',
          'Backlog',
        ].map((s) => (
          <MenuItem
            key={s}
            onClick={() => handleStatusSelect(s)}
            sx={{ gap: 1.5, py: 1.2, borderRadius: '8px', mx: 1, my: 0.5 }}
          >
            {STATUS_MENU_ICON[s]}
            <Typography variant="body2" fontWeight={600}>
              {s === 'OnHold' ? 'On Hold' : s}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
