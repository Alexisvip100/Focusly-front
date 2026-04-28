import { Box, Typography, Popover, Stack, MenuItem } from '@mui/material';
import { Flag as FlagIcon } from '@mui/icons-material';
import {
  getStatusIcon,
  getCategoryIcon,
  STATUS_LIST,
  PRIORITY_LIST,
  CATEGORY_LIST,
} from '../TaskIcons';
import { TASK_COLORS } from '../../CreateTaskModal.utils';
import type { TaskStatus } from '@/redux/tasks/task.types';

interface TaskPopoversProps {
  // Status
  statusAnchor: HTMLElement | null;
  setStatusAnchor: (el: HTMLElement | null) => void;
  setStatus: (s: TaskStatus) => void;
  // Priority
  priorityAnchor: HTMLElement | null;
  setPriorityAnchor: (el: HTMLElement | null) => void;
  setPriority: (p: string) => void;
  // Category
  categoryAnchor: HTMLElement | null;
  setCategoryAnchor: (el: HTMLElement | null) => void;
  setCategory: (c: string) => void;
  // Color
  colorAnchor: HTMLElement | null;
  setColorAnchor: (el: HTMLElement | null) => void;
  color: string;
  setColor: (c: string) => void;
}

const popoverPaperSx = {
  borderRadius: '12px',
  mt: 1,
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
};

export const TaskPopovers = ({
  statusAnchor,
  setStatusAnchor,
  setStatus,
  priorityAnchor,
  setPriorityAnchor,
  setPriority,
  categoryAnchor,
  setCategoryAnchor,
  setCategory,
  colorAnchor,
  setColorAnchor,
  color,
  setColor,
}: TaskPopoversProps) => (
  <>
    {/* Status Popover */}
    <Popover
      open={Boolean(statusAnchor)}
      anchorEl={statusAnchor}
      onClose={() => setStatusAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{ sx: popoverPaperSx }}
    >
      <Stack sx={{ p: 1, minWidth: '180px' }}>
        {STATUS_LIST.map((s) => (
          <MenuItem
            key={s}
            onClick={() => {
              setStatus(s as TaskStatus);
              setStatusAnchor(null);
            }}
            sx={{ borderRadius: '8px', py: 1 }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              {getStatusIcon(s === 'On Hold' ? 'OnHold' : s, 18)}
              <Typography variant="body2" fontWeight={500}>
                {s}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Stack>
    </Popover>

    {/* Priority Popover */}
    <Popover
      open={Boolean(priorityAnchor)}
      anchorEl={priorityAnchor}
      onClose={() => setPriorityAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{ sx: popoverPaperSx }}
    >
      <Stack sx={{ p: 1, minWidth: '150px' }}>
        {PRIORITY_LIST.map((p) => (
          <MenuItem
            key={p}
            onClick={() => {
              setPriority(p);
              setPriorityAnchor(null);
            }}
            sx={{ borderRadius: '8px', py: 1 }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <FlagIcon
                sx={{
                  fontSize: 18,
                  color:
                    p === 'High'
                      ? 'error.main'
                      : p === 'Med'
                        ? 'warning.main'
                        : p === 'Low'
                          ? 'success.main'
                          : 'text.secondary',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                {p}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Stack>
    </Popover>

    {/* Category Popover */}
    <Popover
      open={Boolean(categoryAnchor)}
      anchorEl={categoryAnchor}
      onClose={() => setCategoryAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{ sx: popoverPaperSx }}
    >
      <Stack sx={{ p: 1, minWidth: '180px' }}>
        {CATEGORY_LIST.map((c) => (
          <MenuItem
            key={c}
            onClick={() => {
              setCategory(c);
              setCategoryAnchor(null);
            }}
            sx={{ borderRadius: '8px', py: 1 }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              {getCategoryIcon(c, 18)}
              <Typography variant="body2" fontWeight={500}>
                {c}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Stack>
    </Popover>

    {/* Color Popover */}
    <Popover
      open={Boolean(colorAnchor)}
      anchorEl={colorAnchor}
      onClose={() => setColorAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          mt: 1,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1.5,
        }}
      >
        {TASK_COLORS.map((c) => (
          <Box
            key={c}
            onClick={() => {
              setColor(c);
              setColorAnchor(null);
            }}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: c,
              cursor: 'pointer',
              border: color === c ? '2px solid white' : 'none',
              outline: color === c ? '1px solid black' : 'none',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          />
        ))}
      </Box>
    </Popover>
  </>
);
