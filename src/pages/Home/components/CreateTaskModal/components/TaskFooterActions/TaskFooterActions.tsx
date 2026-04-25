import { Box, Button, CircularProgress, DialogActions } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { sileo } from 'sileo';
import { dialogActionsSx, cancelButtonSx, saveButtonSx, deleteButtonSx } from '../../CreateTaskModal.styles';
import type { Task } from '@/redux/tasks/task.types';

interface TaskFooterActionsProps {
  initialTask?: Task | null;
  onClose: () => void;
  handleSave: () => void;
  handleUpdate: () => void;
  handleDelete: () => Promise<void>;
  loadingSave: boolean;
}

export const TaskFooterActions = ({
  initialTask,
  onClose,
  handleSave,
  handleUpdate,
  handleDelete,
  loadingSave,
}: TaskFooterActionsProps) => (
  <DialogActions sx={dialogActionsSx}>
    <Box display={initialTask ? 'flex' : 'none'} sx={{ flex: 1 }} justifyContent="flex-start">
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
                  loading: { title: 'Deleting...', fill: 'var(--sileo-update-bg)' },
                  success: { title: 'Task deleted successfully!', duration: 4000, fill: 'var(--sileo-delete-bg)' },
                  error: { title: 'Error deleting task', fill: 'var(--sileo-error-bg)' },
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
    <Button onClick={onClose} sx={cancelButtonSx}>
      Cancel
    </Button>
    <Button
      onClick={
        initialTask && initialTask.user_id !== 'google-user'
          ? handleUpdate
          : handleSave
      }
      variant="contained"
      sx={saveButtonSx}
    >
      {loadingSave ? (
        <CircularProgress size={24} color="inherit" />
      ) : initialTask && initialTask.user_id !== 'google-user' ? (
        'Save Changes'
      ) : (
        'Create Task'
      )}
    </Button>
  </DialogActions>
);
