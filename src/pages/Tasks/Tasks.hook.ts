import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { GET_TAGS } from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import { useTasksData } from '@/pages/Tasks/hooks/useTasksData.hook';
import { useTasksFilters } from '@/pages/Tasks/hooks/useTasksFilters.hook';
import { useTasksMutations } from '@/pages/Tasks/hooks/useTasksMutations.hook';
import { useTasksUI } from '@/pages/Tasks/hooks/useTasksUI.hook';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';

export const useTasks = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [, setSearchParams] = useSearchParams();

  // ── View & UI local state ──────────────────────────────────────────
  const [viewMode, setViewMode] = useState<
    'list' | 'grid' | 'board' | 'workload'
  >('list');
  const [activeParentTask, setActiveParentTask] = useState<TaskResponse | null>(
    null,
  );
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [activeSubtaskIndex, setActiveSubtaskIndex] = useState<number | null>(
    null,
  );
  const [runOnboarding, setRunOnboarding] = useState(
    () => localStorage.getItem('onboarding_tasks_completed') !== 'true',
  );

  // ── Composed hooks ─────────────────────────────────────────────────
  const ui = useTasksUI();
  const filterLogic = useTasksFilters([]);

  const data = useTasksData({
    userId: user?.id,
    filters: filterLogic.activeFilters,
    sort: filterLogic.activeSort,
  });

  const mutations = useTasksMutations({
    userId: user?.id,
    tasks: data.tasks,
    onSuccess: ui.triggerToast,
  });

  const { data: tagsData } = useQuery(GET_TAGS, {
    variables: { userId: user?.id },
    skip: !user?.id || !ui.filterAnchorEl,
  });

  const tags: string[] = useMemo(
    () => tagsData?.getTagsByUser || [],
    [tagsData],
  );

  // ── Derived data ───────────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    let result = data.tasks;
    if (filterLogic.searchTerm) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(filterLogic.searchTerm.toLowerCase()),
      );
    }
    return result;
  }, [data.tasks, filterLogic.searchTerm]);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleTaskClick = (task: TaskResponse): void => {
    setSearchParams({ tab: 'Tasks', taskId: task.id });
  };

  const handleFilterClick = (
    event: React.MouseEvent<HTMLElement>,
    type: string,
  ): void => {
    if (type === 'filter') {
      ui.setFilterAnchorEl(event.currentTarget);
    } else if (type === 'sort') {
      ui.setSortAnchorEl(event.currentTarget);
    } else if (type === 'completed') {
      filterLogic.setIsCompletedFilterActive((prev) => !prev);
    }
  };

  const handleFinishOnboarding = (): void => {
    setRunOnboarding(false);
    localStorage.setItem('onboarding_tasks_completed', 'true');
  };

  const handleOpenSubtaskModal = (task: TaskResponse, index?: number): void => {
    setActiveParentTask(task);
    setActiveSubtaskIndex(typeof index === 'number' ? index : null);
    setIsSubtaskModalOpen(true);
  };

  const handleSaveSubtask = async (): Promise<void> => {
    if (activeSubtaskIndex !== null) {
      setIsSubtaskModalOpen(false);
      setActiveParentTask(null);
      setActiveSubtaskIndex(null);
    }
  };

  const handleSubtaskToggle = (task: TaskResponse, index: number): void => {
    const newSubtasks = [...(task.subtasks || [])];
    newSubtasks[index] = {
      ...newSubtasks[index],
      completed: !newSubtasks[index].completed,
    };
    mutations.updateTask(task.id, { ...task, subtasks: newSubtasks });
  };

  // ── Return ─────────────────────────────────────────────────────────
  return {
    // Data
    tasks: data.tasks,
    isLoading: data.isLoading,
    completedTasksCount: data.completedTasksCount,
    pendingTasksCount: data.pendingTasksCount,
    filteredTasks,
    tags,

    // Filters & search
    searchTerm: filterLogic.searchTerm,
    setSearchTerm: filterLogic.setSearchTerm,
    highPriorityTasks: filterLogic.highPriorityTasks,
    todayTasks: filterLogic.todayTasks,
    upcomingTasks: filterLogic.upcomingTasks,
    isCompletedFilterActive: filterLogic.isCompletedFilterActive,
    dateRange: filterLogic.dateRange,
    setDateRange: filterLogic.setDateRange,
    activeSort: filterLogic.activeSort,
    activeFilterState: filterLogic.activeFilterState,
    handleApplySort: filterLogic.handleApplySort,
    handleApplyFilters: filterLogic.handleApplyFilters,

    // UI state
    selectedTask: ui.selectedTask,
    isModalOpen: ui.isModalOpen,
    handleCloseModal: ui.handleCloseModal,
    handleSaveModal: ui.handleCloseModal,
    filterAnchorEl: ui.filterAnchorEl,
    sortAnchorEl: ui.sortAnchorEl,
    expandedTaskIds: ui.expandedTaskIds,
    toggleTaskExpansion: ui.toggleTaskExpansion,
    showSuccessToast: ui.showSuccessToast,
    setShowSuccessToast: ui.setShowSuccessToast,
    toastMessage: ui.toastMessage,
    toastSubMessage: ui.toastSubMessage,

    // Mutations
    updateTask: mutations.updateTask,
    handleAddSubtask: mutations.handleAddSubtask,

    // View & modal
    viewMode,
    setViewMode,
    activeParentTask,
    setActiveParentTask,
    isSubtaskModalOpen,
    setIsSubtaskModalOpen,
    activeSubtaskIndex,
    setActiveSubtaskIndex,
    runOnboarding,
    setRunOnboarding,

    // Actions
    handleTaskClick,
    handleFilterClick,
    handleFilterClose: () => ui.setFilterAnchorEl(null),
    handleSortClose: () => ui.setSortAnchorEl(null),
    handleFinishOnboarding,
    handleOpenSubtaskModal,
    handleSaveSubtask,
    handleSubtaskToggle,
  };
};
