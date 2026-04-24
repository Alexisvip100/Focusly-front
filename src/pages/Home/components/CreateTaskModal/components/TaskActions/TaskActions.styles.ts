import { 
  dialogActionsSx as baseDialogActionsSx,
  deleteButtonSx as baseDeleteButtonSx,
  cancelButtonSx as baseCancelButtonSx,
  saveButtonSx as baseSaveButtonSx,
} from '../../CreateTaskModal.styles';

export const dialogActionsSx = baseDialogActionsSx;
export const deleteButtonSx = baseDeleteButtonSx;
export const cancelButtonSx = baseCancelButtonSx;
export const saveButtonSx = baseSaveButtonSx;

export const deleteContainerSx = (hasTask: boolean) => ({
  display: hasTask ? 'flex' : 'none',
  flex: 1,
  justifyContent: 'flex-start'
});
