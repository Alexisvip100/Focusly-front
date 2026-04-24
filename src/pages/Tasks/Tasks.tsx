import {
  Typography,
  Box,
  LinearProgress,
  Skeleton,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react'; // Uncommented
import { useSearchParams } from 'react-router-dom';
import { TaskDetailModal } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal';
import { useTasks } from './Tasks.hook';
import type { DateRangeFilter } from './hooks/useTasksFilters.hook';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { Task } from '@/redux/tasks/task.types';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  CheckBox as CheckBoxIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  ViewColumn as ViewColumnIcon,
  Balance as BalanceIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

import {
  CompletedButton,
  ControlsBar,
  FilterButton,
  Header,
  MainContent,
  SectionTitle,
  SortButton,
  StyledTextField,
  TasksContainer,
  Title,
  ViewToggleGroup,
  ViewToggleButton,
  GridTaskContainer,
  AnimatedContainer,
} from './Tasks.styles';

import { TaskCard } from './components/ListViewTask/ListViewTask.styles';
import { GridTaskCard } from './components/GridViewTask/GridViewTask.styles';

import { EmptyState } from '@/utils/EmptyState';

import { FilterPopover } from './components/FilterPopover/FilterPopover';
import { SortPopover } from './components/SortPopover/SortPopover';
import { BoardView } from './components/BoardView/BoardView';
import { WorkloadDashboard } from './components/WorkloadDashboard/WorkloadDashboard';
import { DashboardMetrics } from './components/DashboardMetrics/DashboardMetrics';
import { ListViewTask } from './components/ListViewTask/ListViewTask';
import { GridViewTask } from './components/GridViewTask/GridViewTask';

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

  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'board' | 'workload'>('list');
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
    <ListViewTask
      key={task.id}
      task={task}
      expandedTaskIds={expandedTaskIds}
      toggleTaskExpansion={toggleTaskExpansion}
      handleSubtaskToggle={handleSubtaskToggle}
      handleOpenSubtaskModal={handleOpenSubtaskModal}
      onTaskClick={handleTaskClick}
    />
  );

  const renderGridTask = (task: TaskResponse) => (
    <GridViewTask
      key={task.id}
      task={task}
      onTaskClick={handleTaskClick}
    />
  );

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
        <TaskDetailModal
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
