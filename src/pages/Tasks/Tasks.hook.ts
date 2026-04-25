import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useAppSelector } from '@/redux/hooks';
import { GET_TAGS } from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import { useTasksData } from '@/pages/Tasks/hooks/useTasksData.hook';
import { useTasksFilters } from '@/pages/Tasks/hooks/useTasksFilters.hook';
import { useTasksMutations } from '@/pages/Tasks/hooks/useTasksMutations.hook';
import { useTasksUI } from '@/pages/Tasks/hooks/useTasksUI.hook';

export const useTasks = () => {
  const { user } = useAppSelector((state) => state.auth);

  // 1. UI Hook
  const ui = useTasksUI();

  // 2. Filter Logic & State
  // This hook manages the searchTerm, activeFilters (for server), and activeSort (for server)
  // It also performs client-side filtering on whatever tasks are passed to it.
  // We'll use a single instance and handle the "initial empty" case.
  const filterLogic = useTasksFilters([]); 

  // 3. Data Fetching
  const data = useTasksData({
    userId: user?.id,
    filters: filterLogic.activeFilters,
    sort: filterLogic.activeSort,
  });

  // Re-run filter logic on the fetched data
  // Since useTasksFilters is a hook that manages its own state,
  // we can't easily "inject" tasks into it after initialization without a second instance
  // or a refactor of useTasksFilters. 
  // Let's use the second instance approach but ENSURE they share the SAME state if needed.
  // Actually, for now, we'll just filter the data.tasks manually for the UI part
  // so we don't have multiple states.
  
  const filteredTasks = useMemo(() => {
    let result = data.tasks;
    if (filterLogic.searchTerm) {
      result = result.filter(t => t.title.toLowerCase().includes(filterLogic.searchTerm.toLowerCase()));
    }
    // We don't need to apply activeFilters/activeSort here because the server already did it!
    return result;
  }, [data.tasks, filterLogic.searchTerm]);

  // 4. Mutations Hook
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
    updateTask: mutations.updateTask,
    handleAddSubtask: mutations.handleAddSubtask,
    handleApplySort: filterLogic.handleApplySort,
    handleApplyFilters: filterLogic.handleApplyFilters,
    activeFilterState: filterLogic.activeFilterState,
    filteredTasks,
    tags,
  };
};
