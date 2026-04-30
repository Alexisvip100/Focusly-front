import { Box } from '@mui/material';
import { CheckBox as CheckBoxIcon } from '@mui/icons-material';
import {
  AnimatedContainer,
  SectionTitle,
  GridTaskContainer,
} from '../../Tasks.styles';
import { EmptyState } from '@/utils/EmptyState';
import { BoardView } from '../BoardView/BoardView';
import { WorkloadDashboard } from '../WorkloadDashboard/WorkloadDashboard';
import { ListViewTask } from '../ListViewTask/ListViewTask';
import { GridViewTask } from '../GridViewTask/GridViewTask';
import { TasksSkeletons } from '../TasksSkeletons/TasksSkeletons';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { TasksContentViewProps } from './TasksContentView.types';

const PRIORITY_SECTIONS = [
  {
    id: 'high',
    label: 'High Priority',
    color: 'error.main',
    filter: (t: TaskResponse) => (t.priority_level ?? 0) >= 3,
  },
  {
    id: 'medium',
    label: 'Medium Priority',
    color: '#f59e0b',
    filter: (t: TaskResponse) => (t.priority_level ?? 0) === 2,
  },
  {
    id: 'low',
    label: 'Low Priority',
    color: '#3b82f6',
    filter: (t: TaskResponse) => (t.priority_level ?? 0) === 1,
  },
  {
    id: 'none',
    label: 'Other Tasks',
    color: '#94a3b8',
    filter: (t: TaskResponse) => !t.priority_level || t.priority_level === 0,
  },
];

export const TasksContentView = ({
  viewMode,
  isLoading,
  tasks,
  filteredTasks,
  expandedTaskIds,
  toggleTaskExpansion,
  handleSubtaskToggle,
  handleOpenSubtaskModal,
  handleTaskClick,
  updateTask,
  setSearchTerm,
}: TasksContentViewProps) => {
  // Loading skeletons
  if (isLoading && filteredTasks.length === 0) {
    return (
      <AnimatedContainer id="joyride-tasks-list" key={viewMode}>
        <TasksSkeletons viewMode={viewMode} />
      </AnimatedContainer>
    );
  }

  // No tasks at all
  if (tasks.length === 0) {
    return (
      <AnimatedContainer id="joyride-tasks-list" key={viewMode}>
        <EmptyState
          icon={<CheckBoxIcon />}
          title="No tasks yet"
          description="Plan your day and boost your productivity. Create your first task to see it here."
        />
      </AnimatedContainer>
    );
  }

  // No tasks match filters
  if (filteredTasks.length === 0) {
    return (
      <AnimatedContainer id="joyride-tasks-list" key={viewMode}>
        <EmptyState
          title="No tasks match your search"
          description="Try a different keyword or filter to find what you're looking for, or create a new task above."
          actionText="Clear all filters"
          onAction={() => setSearchTerm('')}
        />
      </AnimatedContainer>
    );
  }

  // Render the active view
  return (
    <AnimatedContainer id="joyride-tasks-list" key={viewMode}>
      {viewMode === 'workload' ? (
        <WorkloadDashboard />
      ) : viewMode === 'board' ? (
        <BoardView
          tasks={filteredTasks}
          updateTask={updateTask}
          onTaskClick={handleTaskClick}
        />
      ) : viewMode === 'grid' ? (
        <GridTaskContainer>
          {filteredTasks.map((task) => (
            <GridViewTask
              key={task.id}
              task={task}
              onTaskClick={handleTaskClick}
            />
          ))}
        </GridTaskContainer>
      ) : (
        <>
          {PRIORITY_SECTIONS.map((section) => {
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
                      backgroundColor: `${section.color}1f`,
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
                <Box sx={{ paddingTop: 2 }}>
                  {sectionTasks.map((task) => (
                    <ListViewTask
                      key={task.id}
                      task={task}
                      expandedTaskIds={expandedTaskIds}
                      toggleTaskExpansion={toggleTaskExpansion}
                      handleSubtaskToggle={handleSubtaskToggle}
                      handleOpenSubtaskModal={handleOpenSubtaskModal}
                      onTaskClick={handleTaskClick}
                      updateTask={updateTask}
                    />
                  ))}
                </Box>
              </Box>
            );
          })}
        </>
      )}
    </AnimatedContainer>
  );
};
