import {
  Typography,
  Box,
  Collapse,
  LinearProgress,
  IconButton,
  Skeleton,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react'; // Uncommented
import { useSearchParams } from 'react-router-dom';
import { CreateTaskModal } from '../Home/components/CreateTaskModal/CreateTaskModal';
import { useTasks } from './Tasks.hook';
import type { DateRangeFilter } from './hooks/useTasksFilters.hook';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { Task } from '@/redux/tasks/task.types';
import {
  CalendarToday as CalendarTodayIcon,
  Flag as FlagIcon,
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  CheckCircle as CheckCircleIcon,
  CheckBox as CheckBoxIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  History as HistoryIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  MoreHoriz as MoreHorizIcon,
  ViewColumn as ViewColumnIcon,
  Balance as BalanceIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

import {
  CardLeft,
  CompletedButton,
  ControlsBar,
  FilterButton,
  Header,
  MainContent,
  SectionTitle,
  SortButton,
  StyledTextField,
  Tag,
  TaskCard,
  TasksContainer,
  Title,
  // New Imports
  ViewToggleGroup,
  ViewToggleButton,
  GridTaskContainer,
  GridTaskCard,
  GridCardHeader,
  GridCardFooter,
  ProgressBarContainer,
  ProgressLabel,
  AnimatedContainer,
} from './Tasks.styles';

import { EmptyState } from '@/utils/EmptyState';

import { FilterPopover } from './components/FilterPopover/FilterPopover';
import { SortPopover } from './components/SortPopover/SortPopover';
import { BoardView } from './components/BoardView/BoardView';
import { WorkloadDashboard } from './components/WorkloadDashboard/WorkloadDashboard';
import { DashboardMetrics } from './components/DashboardMetrics/DashboardMetrics';
import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import {
  formatDuration,
  getTagColors,
} from '../Home/components/CreateTaskModal/CreateTaskModal.utils';

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

export const Tasks = () => {
  const {
    searchTerm,
    setSearchTerm,

    // Removed hook modal handlers in favor of URL
    tasks,
    filteredTasks,
    filterAnchorEl,
    handleFilterClick,
    handleFilterClose,
    handleApplyFilters,
    sortAnchorEl,
    isCompletedFilterActive,
    dateRange,
    setDateRange,

    handleSortClose,
    handleApplySort,
    expandedTaskIds,
    toggleTaskExpansion,
    updateTask, // Add this
    tags,
    isLoading,
  } = useTasks();

  const [, setSearchParams] = useSearchParams();
  const handleTaskClick = (task: TaskResponse) => {
    setSearchParams({ tab: 'Tasks', taskId: task.id });
  };

  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'board' | 'workload'>('workload');
  const [activeParentTask, setActiveParentTask] = useState<TaskResponse | null>(null);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [activeSubtaskIndex, setActiveSubtaskIndex] = useState<number | null>(null);

  const handleOpenSubtaskModal = (task: TaskResponse, index?: number) => {
    setActiveParentTask(task);
    if (typeof index === 'number') {
      setActiveSubtaskIndex(index);
    } else {
      setActiveSubtaskIndex(null);
    }
    setIsSubtaskModalOpen(true);
  };

  const handleSaveSubtask = async () => {
    if (activeSubtaskIndex !== null) {
      setIsSubtaskModalOpen(false);
      setActiveParentTask(null);
      setActiveSubtaskIndex(null);
    }
  };

  const handleSubtaskToggle = (task: TaskResponse, index: number) => {
    const newSubtasks = [...(task.subtasks || [])];
    newSubtasks[index] = {
      ...newSubtasks[index],
      completed: !newSubtasks[index].completed,
    };
    updateTask(task.id, { ...task, subtasks: newSubtasks });
  };

  const renderTask = (task: TaskResponse) => (
    <TaskCard
      key={task.id}
      onClick={() => handleTaskClick(task)}
      sx={{
        borderLeft: '5px solid',
        borderLeftColor:
          task.priority_level === 3 ? '#58a6ff' : task.priority_level === 2 ? '#d29922' : '#ff7b72',
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
                    task.subtasks && task.subtasks.length > 0 ? 'text.secondary' : 'text.disabled', // Dim if empty
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
          {/* Subtasks Expansion using Collapse for smooth transition */}
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
                  const isLast = index === task.subtasks.length - 1;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        position: 'relative',
                        alignItems: 'center',
                        gap: 1.5,
                        pl: 3, // Indent for the connector
                        pr: 2,
                        py: 0.5,
                        width: '100%',
                      }}
                    >
                      {/* Tree Lines */}
                      {/* Vertical Line */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: isLast ? '50%' : 0, // Stop at middle for last item to make L shape
                          width: '1px',
                          bgcolor: 'divider',
                        }}
                      />
                      {/* Horizontal Line */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          width: '16px', // Length of the horizontal connector
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
                        {/* Dynamic Status Icon for Subtask */}
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
              {/* Add New Subtask Button */}
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

  const renderGridTask = (task: TaskResponse) => {
    const subtaskCount = task.subtasks?.length || 0;
    const completedSubtasks = (task.subtasks || []).filter(
      (s: string | { completed: boolean }) => typeof s !== 'string' && s.completed
    ).length;
    const progress = subtaskCount > 0 ? (completedSubtasks / subtaskCount) * 100 : 0;

    return (
      <GridTaskCard key={task.id} onClick={() => handleTaskClick(task)}>
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

  return (
    <TasksContainer sx={{ position: 'relative' }}>
      {/* YouTube-style top progress bar */}
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            zIndex: 1000,
            bgcolor: 'transparent',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'primary.main',
            },
          }}
        />
      )}

      <MainContent>
        <Header>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Manage and prioritize your work
            </Typography>
            <Title>My Tasks</Title>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                px: 2,
                py: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                gap: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {filteredTasks.filter((t) => t.status !== 'Done').length} Pending
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                •
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {filteredTasks.filter((t) => t.status === 'Done').length} Completed
              </Typography>
            </Box>

            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRangeFilter)}
              size="small"
              sx={{
                height: 38,
                bgcolor: 'background.paper',
                fontSize: '0.875rem',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
              }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="last7">Last 7 Days</MenuItem>
              <MenuItem value="last30">Last 30 Days</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>

            <ViewToggleGroup>
              <ViewToggleButton active={viewMode === 'list'} onClick={() => setViewMode('list')}>
                <ViewListIcon fontSize="small" />
              </ViewToggleButton>
              <ViewToggleButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')}>
                <GridViewIcon fontSize="small" />
              </ViewToggleButton>
              <ViewToggleButton active={viewMode === 'board'} onClick={() => setViewMode('board')}>
                <ViewColumnIcon fontSize="small" />
              </ViewToggleButton>
              <ViewToggleButton
                active={viewMode === 'workload'}
                onClick={() => setViewMode('workload')}
              >
                <BalanceIcon fontSize="small" />
              </ViewToggleButton>
            </ViewToggleGroup>
          </Box>
        </Header>

        <ControlsBar>
          <StyledTextField
            placeholder="Search tasks, tags, or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            size="small"
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FilterButton
              onClick={(e) => handleFilterClick(e, 'filter')}
              sx={{ backgroundColor: filterAnchorEl ? '#257df0' : 'background.paper' }}
            >
              <FilterListIcon sx={{ color: 'text.primary', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Filter
              </Typography>
            </FilterButton>
            <FilterPopover
              open={Boolean(filterAnchorEl)}
              anchorEl={filterAnchorEl}
              onClose={handleFilterClose}
              tags={tags}
              onApply={handleApplyFilters}
            />
            <SortButton
              onClick={(e) => handleFilterClick(e, 'sort')}
              sx={{ backgroundColor: sortAnchorEl ? '#257df0' : 'background.paper' }}
            >
              <SortIcon sx={{ color: 'text.primary', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Sort
              </Typography>
            </SortButton>
            <SortPopover
              open={Boolean(sortAnchorEl)}
              anchorEl={sortAnchorEl}
              onClose={handleSortClose}
              onApply={handleApplySort}
            />
            <CompletedButton
              onClick={(e) => handleFilterClick(e, 'completed')}
              sx={{
                backgroundColor: isCompletedFilterActive ? '#14913e' : 'background.paper',
                color: isCompletedFilterActive ? '#ffffff' : 'text.primary',
                '&:hover': {
                  backgroundColor: isCompletedFilterActive ? '#117a34' : 'action.hover',
                },
              }}
            >
              <CheckCircleIcon
                sx={{ color: isCompletedFilterActive ? '#ffffff' : 'text.primary', fontSize: 20 }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isCompletedFilterActive ? '#ffffff' : 'text.primary',
                  fontWeight: 600,
                }}
              >
                Completed
              </Typography>
            </CompletedButton>
          </Box>
        </ControlsBar>

        <AnimatedContainer key={viewMode}>
          {isLoading && filteredTasks.length === 0 ? (
            // Structured skeletons for Tasks
            viewMode === 'grid' ? (
              <GridTaskContainer>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <GridTaskCard key={i} sx={{ borderStyle: 'solid', cursor: 'default' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Skeleton
                        variant="rectangular"
                        width="40%"
                        height={24}
                        sx={{ borderRadius: '12px' }}
                        animation="wave"
                      />
                      <Skeleton variant="circular" width={24} height={24} animation="wave" />
                    </Box>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={28}
                      sx={{ mb: 1 }}
                      animation="wave"
                    />
                    <Skeleton variant="text" width="100%" height={20} animation="wave" />
                    <Skeleton variant="text" width="90%" height={20} animation="wave" />
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Skeleton variant="text" width="20%" height={20} animation="wave" />
                      <Skeleton variant="text" width="30%" height={20} animation="wave" />
                    </Box>
                    <Box sx={{ mt: 'auto', width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Skeleton variant="text" width="30%" height={14} animation="wave" />
                        <Skeleton variant="text" width="10%" height={14} animation="wave" />
                      </Box>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={4}
                        sx={{ borderRadius: 2 }}
                        animation="wave"
                      />
                    </Box>
                  </GridTaskCard>
                ))}
              </GridTaskContainer>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TaskCard key={i} sx={{ cursor: 'default', borderLeft: '5px solid #30363d' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                      <Skeleton variant="circular" width={24} height={24} animation="wave" />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Skeleton variant="text" width="40%" height={24} animation="wave" />
                          <Skeleton
                            variant="rectangular"
                            width="60px"
                            height={20}
                            sx={{ borderRadius: '10px' }}
                            animation="wave"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Skeleton variant="text" width="20%" height={16} animation="wave" />
                          <Skeleton variant="text" width="25%" height={16} animation="wave" />
                          <Skeleton variant="text" width="15%" height={16} animation="wave" />
                        </Box>
                      </Box>
                    </Box>
                  </TaskCard>
                ))}
              </Box>
            )
          ) : tasks.length === 0 ? (
            <EmptyState
              icon={<CheckBoxIcon />}
              title="No tasks yet"
              description="Plan your day and boost your productivity. Create your first task to see it here."
            />
          ) : filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks match your search"
              description="Try a different keyword or filter to find what you're looking for, or create a new task above."
              actionText="Clear all filters"
              onAction={() => setSearchTerm('')}
            />
          ) : viewMode === 'workload' ? (
            <WorkloadDashboard />
          ) : viewMode === 'board' ? (
            <>
              <DashboardMetrics tasks={filteredTasks} />
              <BoardView
                tasks={filteredTasks}
                updateTask={updateTask}
                onTaskClick={handleTaskClick}
              />
            </>
          ) : viewMode === 'grid' ? (
            <GridTaskContainer>{filteredTasks.map(renderGridTask)}</GridTaskContainer>
          ) : (
            <>
              {[
                {
                  id: 'high',
                  label: 'High Priority',
                  color: 'error.main',
                  filter: (t: TaskResponse) => t.priority_level >= 3,
                },
                {
                  id: 'medium',
                  label: 'Medium Priority',
                  color: '#f59e0b',
                  filter: (t: TaskResponse) => t.priority_level === 2,
                },
                {
                  id: 'low',
                  label: 'Low Priority',
                  color: '#3b82f6',
                  filter: (t: TaskResponse) => t.priority_level <= 1,
                },
              ].map((section) => {
                const sectionTasks = filteredTasks.filter(section.filter);
                if (sectionTasks.length === 0) return null;

                return (
                  <Box key={section.id}>
                    <SectionTitle colorIndicator={section.color}>
                      {section.label}
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontSize: '11px',
                          backgroundColor: `${section.color}1f`, // ~12% opacity
                          color: section.color,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '20px',
                        }}
                      >
                        {sectionTasks.length}
                      </Box>
                    </SectionTitle>
                    <Box
                      sx={{
                        paddingTop: 2,
                      }}
                    >
                      {sectionTasks.map(renderTask)}
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </AnimatedContainer>
      </MainContent>

      {isSubtaskModalOpen && (
        <CreateTaskModal
          key={activeParentTask?.id ? `subtask-${activeParentTask.id}-${activeSubtaskIndex}` : 'new-subtask'}
          open={isSubtaskModalOpen}
          onClose={() => setIsSubtaskModalOpen(false)}
          onSave={handleSaveSubtask}
          initialStart={null}
          initialEnd={null}
          parentTask={
            activeParentTask
              ? {
                  id: activeParentTask.id,
                  title: activeParentTask.title,
                  subtasks: activeParentTask.subtasks,
                }
              : undefined
          }
          subtaskIndex={activeSubtaskIndex === null ? undefined : activeSubtaskIndex}
          initialTask={
            activeParentTask &&
            activeSubtaskIndex !== null &&
            activeParentTask.subtasks &&
            activeParentTask.subtasks[activeSubtaskIndex]
              ? ({
                  id: 'temp-subtask-id',
                  title: activeParentTask.subtasks[activeSubtaskIndex].title,
                  status:
                    activeParentTask.subtasks[activeSubtaskIndex].status ||
                    (activeParentTask.subtasks[activeSubtaskIndex].completed ? 'Done' : 'Todo'),
                  estimate_timer: activeParentTask.subtasks[activeSubtaskIndex].timer,
                  priority_level: activeParentTask.priority_level,
                  category: activeParentTask.category,
                  deadline: activeParentTask.deadline,
                  notes_encrypted: '',
                  subtasks: [],
                  tags: [],
                  links: activeParentTask.subtasks[activeSubtaskIndex].links || [],
                  user_id: activeParentTask.user_id,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                } as unknown as Task)
              : undefined
          }
        />
      )}
    </TasksContainer>
  );
};
