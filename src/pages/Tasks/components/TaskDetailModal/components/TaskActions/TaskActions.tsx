import { Box, Button, CircularProgress, DialogActions } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  dialogActionsSx,
  deleteButtonSx,
  saveButtonSx,
  deleteContainerSx,
} from './TaskActions.styles';
import { sileo } from 'sileo';
import type { Task } from '@/redux/tasks/task.types';

interface TaskActionsProps {
  initialTask: Task | null | undefined;
  handleDelete: () => Promise<void>;
  onClose: () => void;
  handleUpdate: () => void;
  handleSave: () => void;
  loadingSave: boolean;
}

export const TaskActions = ({
  initialTask,
  handleDelete,
  onClose,
  handleUpdate,
  handleSave,
  loadingSave,
}: TaskActionsProps) => {
  return (
    <DialogActions sx={dialogActionsSx}>
      <Box sx={deleteContainerSx(!!initialTask)}>
        <Button
          onClick={() => {
            sileo.warning({
              title: 'Delete Task',
              description: 'Are you sure you want to delete this task?',
              fill: 'var(--sileo-warning-bg)',
              button: {
                title: 'Confirm',
                onClick: () => {
                  sileo.promise(handleDelete(), {
                    loading: { title: 'Deleting...', fill: 'var(--sileo-update-bg)', },
                    success: {
                      title: 'Task deleted successfully!',
                      duration: 4000,
                      fill: 'var(--sileo-delete-bg)',
                      },
                    error: { title: 'Error deleting task', fill: 'var(--sileo-error-bg)', },
                  });
                  onClose();
                },
              },
            });
          }}
          variant="contained"
          disableElevation
          sx={deleteButtonSx}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
          Delete
        </Button>
      </Box>
      <Button
        onClick={
          initialTask && initialTask.task_type !== 'GoogleTask'
            ? handleUpdate
            : handleSave
        }
        variant="contained"
        sx={saveButtonSx}
      >
        {loadingSave ? (
          <CircularProgress size={24} color="inherit" />
        ) : initialTask && (initialTask?.task_type === 'PlatformTask' || initialTask?.task_type === 'GoogleTask') ? (
          'Save Changes'
        ) : (
          'Create Task'
        )}
      </Button>
    </DialogActions>
  );
};
