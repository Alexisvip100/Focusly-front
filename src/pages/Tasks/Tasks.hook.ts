import { useQuery } from '@apollo/client';
import { GET_TAGS } from '@/pages/Home/components/CreateTaskModal/tasks.graphql';
import { useAppSelector } from '@/redux/hooks';
import { useMemo } from 'react';

import { useTasksData } from './hooks/useTasksData.hook';
import { useTasksUI } from './hooks/useTasksUI.hook';
import { useTasksFilters } from './hooks/useTasksFilters.hook';
import { useTasksMutations } from './hooks/useTasksMutations.hook';

export const useTasks = () => {
  const { user } = useAppSelector((state) => state.auth);

  // 1. UI Hook
  const ui = useTasksUI();

  // 2. Filters Hook
  const filters = useTasksFilters([]); // Placeholder tasks initially

  const data = useTasksData({
    userId: user?.id,
    filters: filters.activeFilters,
    sort: filters.activeSort,
  });

  // Re-inject tasks into filters hook (or just use logic in a unified way)
  const filterLogic = useTasksFilters(data.tasks);

  // 3. Mutations Hook
  const mutations = useTasksMutations({
    userId: user?.id,
    tasks: data.tasks,
    onSuccess: ui.triggerToast,
  });

  const { data: tagsData } = useQuery(GET_TAGS, {
    variables: { userId: user?.id },
    skip: !user?.id || !ui.filterAnchorEl,
  });
  const tags: string[] = useMemo(() => tagsData?.getTagsByUser || [], [tagsData]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
    if (type === 'filter') {
      ui.setFilterAnchorEl(event.currentTarget);
    } else if (type === 'sort') {
      ui.setSortAnchorEl(event.currentTarget);
    } else if (type === 'completed') {
      filterLogic.setIsCompletedFilterActive((prev) => !prev);
    }
  };

  return {
    // Data
    tasks: data.tasks,
    isLoading: data.isLoading,
    completedTasksCount: data.completedTasksCount,
    pendingTasksCount: data.pendingTasksCount,

    // UI State & Actions
    searchTerm: filterLogic.searchTerm,
    setSearchTerm: filterLogic.setSearchTerm,
    highPriorityTasks: filterLogic.highPriorityTasks,
    todayTasks: filterLogic.todayTasks,
    upcomingTasks: filterLogic.upcomingTasks,
    selectedTask: ui.selectedTask,
    isModalOpen: ui.isModalOpen,
    handleTaskClick: ui.handleTaskClick,
    handleCloseModal: ui.handleCloseModal,
    handleSaveModal: ui.handleCloseModal,
    filterAnchorEl: ui.filterAnchorEl,
    handleFilterClick,
    handleFilterClose: () => ui.setFilterAnchorEl(null),
    sortAnchorEl: ui.sortAnchorEl,
    isCompletedFilterActive: filterLogic.isCompletedFilterActive,
    dateRange: filterLogic.dateRange,
    setDateRange: filterLogic.setDateRange,
    handleSortClose: () => ui.setSortAnchorEl(null),
    activeSort: filterLogic.activeSort,
    expandedTaskIds: ui.expandedTaskIds,
    toggleTaskExpansion: ui.toggleTaskExpansion,
    showSuccessToast: ui.showSuccessToast,
    setShowSuccessToast: ui.setShowSuccessToast,
    toastMessage: ui.toastMessage,
    toastSubMessage: ui.toastSubMessage,

    // Methods
    updateTask: mutations.updateTask,
    handleAddSubtask: mutations.handleAddSubtask,
    handleApplySort: filterLogic.handleApplySort,
    handleApplyFilters: filterLogic.handleApplyFilters,
    filteredTasks: filterLogic.filteredTasks,
    tags,
  };
};
