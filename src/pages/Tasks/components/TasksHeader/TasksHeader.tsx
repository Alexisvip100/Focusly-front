import { Typography, Box, Select, MenuItem } from '@mui/material';
import {
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  ViewColumn as ViewColumnIcon,
  Balance as BalanceIcon,
} from '@mui/icons-material';
import {
  Header,
  Title,
  ViewToggleGroup,
  ViewToggleButton,
} from '../../Tasks.styles';
import type { DateRangeFilter } from '../../hooks/useTasksFilters.hook';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';

interface TasksHeaderProps {
  filteredTasks: TaskResponse[];
  dateRange: string;
  setDateRange: (range: DateRangeFilter) => void;
  viewMode: 'list' | 'grid' | 'board' | 'workload';
  setViewMode: (mode: 'list' | 'grid' | 'board' | 'workload') => void;
}

export const TasksHeader = ({
  filteredTasks,
  dateRange,
  setDateRange,
  viewMode,
  setViewMode,
}: TasksHeaderProps) => {
  return (
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

        <ViewToggleGroup id="joyride-tasks-view-toggle">
          <ViewToggleButton
            active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          >
            <ViewListIcon fontSize="small" />
          </ViewToggleButton>
          <ViewToggleButton
            active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
          >
            <GridViewIcon fontSize="small" />
          </ViewToggleButton>
          <ViewToggleButton
            active={viewMode === 'board'}
            onClick={() => setViewMode('board')}
          >
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
  );
};
