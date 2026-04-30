import type { FilterState } from '../FilterPopover/FilterPopover';
import type { SortState } from '../SortPopover/SortPopover';

export interface TasksControlsBarProps {
  viewMode: 'list' | 'grid' | 'board' | 'workload';
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterAnchorEl: HTMLElement | null;
  sortAnchorEl: HTMLElement | null;
  isCompletedFilterActive: boolean;
  activeSort: SortState | null;
  activeFilterState: FilterState;
  tags: string[];
  handleFilterClick: (
    event: React.MouseEvent<HTMLElement>,
    type: string,
  ) => void;
  handleFilterClose: () => void;
  handleApplyFilters: (filters: FilterState) => void;
  handleSortClose: () => void;
  handleApplySort: (sort: SortState) => void;
}
