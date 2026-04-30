import { Typography, Box } from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import {
  ControlsBar,
  FilterButton,
  SortButton,
  CompletedButton,
  StyledTextField,
} from '../../Tasks.styles';
import { FilterPopover } from '../FilterPopover/FilterPopover';
import { SortPopover } from '../SortPopover/SortPopover';
import type { TasksControlsBarProps } from './TasksControlsBar.types';

export const TasksControlsBar = ({
  viewMode,
  searchTerm,
  setSearchTerm,
  filterAnchorEl,
  sortAnchorEl,
  isCompletedFilterActive,
  activeSort,
  activeFilterState,
  tags,
  handleFilterClick,
  handleFilterClose,
  handleApplyFilters,
  handleSortClose,
  handleApplySort,
}: TasksControlsBarProps) => {
  if (viewMode === 'board' || viewMode === 'workload') {
    return <ControlsBar id="joyride-tasks-filters" />;
  }

  return (
    <ControlsBar id="joyride-tasks-filters">
      <StyledTextField
        id="joyride-tasks-search"
        placeholder="Search tasks, tags, or projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          ),
        }}
        size="small"
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FilterButton
          onClick={(e) => handleFilterClick(e, 'filter')}
          sx={{
            backgroundColor: filterAnchorEl ? '#257df0' : 'background.paper',
          }}
        >
          <FilterListIcon sx={{ color: 'text.primary', fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            Filter
          </Typography>
        </FilterButton>
        <FilterPopover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          tags={tags}
          onApply={handleApplyFilters}
          activeFilterState={activeFilterState}
        />
        <SortButton
          onClick={(e) => handleFilterClick(e, 'sort')}
          sx={{
            backgroundColor: sortAnchorEl ? '#257df0' : 'background.paper',
          }}
        >
          <SortIcon sx={{ color: 'text.primary', fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            Sort
          </Typography>
        </SortButton>
        <SortPopover
          open={Boolean(sortAnchorEl)}
          anchorEl={sortAnchorEl}
          onClose={handleSortClose}
          onApply={handleApplySort}
          activeSort={activeSort ?? undefined}
        />
        <CompletedButton
          id="joyride-tasks-completed"
          onClick={(e) => handleFilterClick(e, 'completed')}
          sx={{
            backgroundColor: isCompletedFilterActive
              ? '#14913e'
              : 'background.paper',
            color: isCompletedFilterActive ? '#ffffff' : 'text.primary',
            '&:hover': {
              backgroundColor: isCompletedFilterActive
                ? '#117a34'
                : 'action.hover',
            },
          }}
        >
          <CheckCircleIcon
            sx={{
              color: isCompletedFilterActive ? '#ffffff' : 'text.primary',
              fontSize: 20,
            }}
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
  );
};
