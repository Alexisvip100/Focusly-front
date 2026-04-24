import { 
  dialogActionsSx as baseDialogActionsSx,
  deleteButtonSx as baseDeleteButtonSx,
  saveButtonSx as baseSaveButtonSx,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.styles';

export const dialogActionsSx = baseDialogActionsSx;
export const deleteButtonSx = baseDeleteButtonSx;
export const saveButtonSx = baseSaveButtonSx;

export const deleteContainerSx = (hasTask: boolean) => ({
  display: hasTask ? 'flex' : 'none',
  flex: 1,
  justifyContent: 'flex-start'
});
