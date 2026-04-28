import React from 'react';
import { Drawer, Box } from '@mui/material';
import { TaskDetailsFull } from './TaskDetailsFull';
import type { TaskSearchItems } from '../../types/workspace.types';

interface TaskDetailsFullModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskSearchItems | null;
  onStartFocus?: (task: TaskSearchItems, subtaskIndex?: number | null) => void;
  onMarkDone?: (task: TaskSearchItems) => void;
  onToggleSubtask?: (taskId: string, index: number) => void;
  activeFocusTaskId?: string | null;
}

export const TaskDetailsFullModal: React.FC<TaskDetailsFullModalProps> = ({
  open,
  onClose,
  task,
  onStartFocus,
  onMarkDone,
  onToggleSubtask,
  activeFocusTaskId,
}) => {
  if (!task) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 500,
          bgcolor: (theme) => theme.palette.background.paper,
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TaskDetailsFull
          task={task}
          onClose={onClose}
          onStartFocus={onStartFocus}
          onMarkDone={onMarkDone}
          onToggleSubtask={onToggleSubtask}
          activeFocusTaskId={activeFocusTaskId}
        />
      </Box>
    </Drawer>
  );
};
