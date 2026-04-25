import { useState, useMemo, useEffect } from 'react';
import type { TaskResponse, TaskFilterInput, TaskSortInput } from '@/api/Tasks/apiTaskTypes';
import type { FilterState } from '../components/FilterPopover/FilterPopover';
import type { SortState } from '../components/SortPopover/SortPopover';

export type DateRangeFilter = 'today' | 'last7' | 'last30' | 'all';

export const useTasksFilters = (tasks: TaskResponse[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<TaskFilterInput | undefined>(undefined);
  const [activeFilterState, setActiveFilterState] = useState<FilterState | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<TaskSortInput | undefined>(undefined);
  const [isCompletedFilterActive, setIsCompletedFilterActive] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeFilter>(() => {
    const saved = localStorage.getItem('tasksDateRange');
    return (saved as DateRangeFilter) || 'all';
  });

  useEffect(() => {
    localStorage.setItem('tasksDateRange', dateRange);
  }, [dateRange]);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      let startDateStr = '';

      if (dateRange === 'today') {
        const today = new Date();
        startDateStr = today.toLocaleDateString('en-CA');
      } else if (dateRange === 'last7') {
        const past = new Date(now);
        past.setDate(now.getDate() - 7);
        startDateStr = past.toLocaleDateString('en-CA');
      } else if (dateRange === 'last30') {
        const past = new Date(now);
        past.setDate(now.getDate() - 30);
        startDateStr = past.toLocaleDateString('en-CA');
      }

      result = result.filter((task) => {
        const dateToUse =
          task.status === 'Done' || !task.deadline
            ? task.created_at || task.updated_at
            : task.deadline;
        if (!dateToUse) return false; // If no date, maybe keep it? Let's keep it to be safe for tasks without dates if we only want to strict filter. Actually let's assume if it has no date, it's not strictly in a specific past/future day unless requested
        const taskDateObj = new Date(dateToUse);
        const taskDateStr = taskDateObj.toLocaleDateString('en-CA');

        if (dateRange === 'today') {
          return taskDateStr === startDateStr;
        }
        return taskDateStr >= startDateStr;
      });
    }

    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.notes_encrypted?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (isCompletedFilterActive) {
      result = result.filter((task) => ['Done', 'Pending', 'Backlog'].includes(task.status));
      // Note: The original logic had multiple sequential filters that seemed to conflict.
      // Replaced with a more logical interpretation if needed, or keeping it as requested if strictly following.
      // Let's stick closer to the original but fix the evident bug (overwriting filter).
    }
    return result;
  }, [tasks, searchTerm, isCompletedFilterActive, dateRange]);

  const { highPriorityTasks, todayTasks, upcomingTasks } = useMemo(() => {
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-CA');

    const high: TaskResponse[] = [];
    const today: TaskResponse[] = [];
    const upcoming: TaskResponse[] = [];

    filteredTasks.forEach((task) => {
      if (task.status === 'Done') return;

      const dateToUse = task.deadline;
      const taskDateStr = dateToUse ? new Date(dateToUse).toLocaleDateString('en-CA') : '';
      const isHighPriority = (task.priority_level ?? 0) >= 3;
      const isOverdue = taskDateStr && taskDateStr < todayStr;

      if (isHighPriority || isOverdue) {
        high.push(task);
      } else if (taskDateStr === todayStr) {
        today.push(task);
      } else {
        upcoming.push(task);
      }
    });

    return { highPriorityTasks: high, todayTasks: today, upcomingTasks: upcoming };
  }, [filteredTasks]);

  const handleApplySort = (sort: SortState) => {
    const { sort: mappedSort, order: mappedOrder } = sort;
    if (!mappedSort && mappedOrder === undefined) {
      setActiveSort(undefined);
    } else {
      setActiveSort({ sort: mappedSort, order: mappedOrder });
    }
  };

  const handleApplyFilters = (filters: FilterState) => {
    const statusMap: Record<string, string> = {
      ToDo: 'Todo',
      OnHold: 'OnHold',
      Completed: 'Done',
    };

    const mappedStatus = filters.statuses.length > 0 ? statusMap[filters.statuses[0]] : undefined;

    const priorityMap: Record<string, number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
    const mappedPriority =
      filters.priorities.length > 0 ? priorityMap[filters.priorities[0]] : undefined;

    const mappedCategory = filters.categories.length > 0 ? filters.categories[0] : undefined;

    const newFilterInput: TaskFilterInput = {
      status: mappedStatus as TaskFilterInput['status'],
      priorityLevel: mappedPriority,
      category: mappedCategory,
    };

    if (!mappedStatus && mappedPriority === undefined && !mappedCategory) {
      setActiveFilters(undefined);
      setActiveFilterState(undefined);
    } else {
      setActiveFilters(newFilterInput);
      setActiveFilterState(filters);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    activeFilterState,
    activeSort,
    isCompletedFilterActive,
    setIsCompletedFilterActive,
    dateRange,
    setDateRange,
    filteredTasks,
    highPriorityTasks,
    todayTasks,
    upcomingTasks,
    handleApplySort,
    handleApplyFilters,
  };
};
