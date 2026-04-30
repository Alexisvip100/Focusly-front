import { Typography, Box, LinearProgress } from '@mui/material';
import { useTasks } from './Tasks.hook';
import { TasksContainer, MainContent } from './Tasks.styles';
import { TasksHeader } from './components/TasksHeader/TasksHeader';
import { TasksControlsBar } from './components/TasksControlsBar/TasksControlsBar';
import { TasksContentView } from './components/TasksContentView/TasksContentView';
import { SubtaskModal } from './components/SubtaskModal/SubtaskModal';
import { OnboardingWrapper } from '@/components/Onboarding/OnboardingWrapper';
import type { Step } from 'react-joyride';

export const Tasks = () => {
  const {
    tasks,
    filteredTasks,
    isLoading,
    tags,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    isCompletedFilterActive,
    activeSort,
    activeFilterState,
    filterAnchorEl,
    sortAnchorEl,
    expandedTaskIds,
    toggleTaskExpansion,
    updateTask,
    viewMode,
    setViewMode,
    activeParentTask,
    isSubtaskModalOpen,
    activeSubtaskIndex,
    setIsSubtaskModalOpen,
    runOnboarding,
    handleTaskClick,
    handleFilterClick,
    handleFilterClose,
    handleApplyFilters,
    handleSortClose,
    handleApplySort,
    handleFinishOnboarding,
    handleOpenSubtaskModal,
    handleSaveSubtask,
    handleSubtaskToggle,
  } = useTasks();

  const onboardingSteps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <Box>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Welcome to Your Tasks! 🚀
          </Typography>
          <Typography variant="body2">
            This is where you manage and prioritize your work. Let's take a
            quick tour!
          </Typography>
        </Box>
      ),
      disableBeacon: true,
    },
    {
      target: '#joyride-tasks-view-toggle',
      content:
        'Switch between List, Grid, Board, and Workload views to find what works best for you.',
    },
    {
      target: '#joyride-tasks-search',
      content:
        'Quickly find any task by searching for its title, tags, or projects.',
    },
    {
      target: '#joyride-tasks-filters',
      content:
        'Use filters and sorting to stay focused on what matters most right now.',
    },
    {
      target: '#joyride-tasks-completed',
      content:
        'Toggle completed tasks to review your progress or clear your workspace.',
    },
  ];

  return (
    <TasksContainer sx={{ position: 'relative' }}>
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
        <TasksHeader
          filteredTasks={filteredTasks}
          dateRange={dateRange}
          setDateRange={setDateRange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <TasksControlsBar
          viewMode={viewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterAnchorEl={filterAnchorEl}
          sortAnchorEl={sortAnchorEl}
          isCompletedFilterActive={isCompletedFilterActive}
          activeSort={activeSort ?? null}
          activeFilterState={
            activeFilterState ?? {
              priorities: [],
              categories: [],
              statuses: [],
            }
          }
          tags={tags}
          handleFilterClick={handleFilterClick}
          handleFilterClose={handleFilterClose}
          handleApplyFilters={handleApplyFilters}
          handleSortClose={handleSortClose}
          handleApplySort={handleApplySort}
        />

        <TasksContentView
          viewMode={viewMode}
          isLoading={isLoading}
          tasks={tasks}
          filteredTasks={filteredTasks}
          expandedTaskIds={expandedTaskIds}
          toggleTaskExpansion={toggleTaskExpansion}
          handleSubtaskToggle={handleSubtaskToggle}
          handleOpenSubtaskModal={handleOpenSubtaskModal}
          handleTaskClick={handleTaskClick}
          updateTask={updateTask}
          setSearchTerm={setSearchTerm}
        />
      </MainContent>

      <SubtaskModal
        isOpen={isSubtaskModalOpen}
        onClose={() => setIsSubtaskModalOpen(false)}
        onSave={handleSaveSubtask}
        activeParentTask={activeParentTask}
        activeSubtaskIndex={activeSubtaskIndex}
      />

      <OnboardingWrapper
        steps={onboardingSteps}
        run={runOnboarding}
        onFinish={handleFinishOnboarding}
      />
    </TasksContainer>
  );
};
