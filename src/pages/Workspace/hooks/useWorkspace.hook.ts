import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOTAL_WORKSPACES } from '../workspaces.graphql';
import { useAppSelector } from '@/redux/hooks';
import { useWorkspaceForm } from './useWorkspaceForm.hook';
import { useWorkspaceTasks } from './useWorkspaceTasks.hook';
import { useWorkspaceActions } from './useWorkspaceActions.hook';

export const useWorkspace = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  // 1. Actions Hook (Delete, Search)
  const { open, handleOpen, handleClose, onConfirm, deleteWorkspace, searchWorkspaces } =
    useWorkspaceActions();

  // 2. Form Hook (useForm, Auto-save)
  const { register, watch, setValue, getValues, reset, control, saveStatus } = useWorkspaceForm();

  // 3. Tasks Hook (Selection, Sync, Updates)
  const {
    tasksData,
    isLoading,
    selectTask,
    selectedSubtaskIndex,
    handleSelectTask,
    handleUpdateTask,
    handleToggleSubtask,
  } = useWorkspaceTasks({
    userId: user?.id,
    onTaskSelect: (taskId) => setValue('taskId', taskId),
  });

  // 4. Local State & Layout
  const toggleEditor = (isOpen: boolean) => {
    setIsEditorOpen(isOpen);
  };

  // 5. Total workspaces data (used in Library)
  const { data, loading } = useQuery(GET_TOTAL_WORKSPACES);

  return {
    // Layout
    isEditorOpen,
    onEditorChange: toggleEditor,

    // Form
    register,
    setValue,
    watch,
    getValues,
    reset,
    control,
    saveStatus,
    data,
    loading,

    // Tasks
    tasksData,
    isLoading,
    handleSelectTask,
    selectTask,
    selectedSubtaskIndex,
    handleUpdateTask,
    handleToggleSubtask,

    // Actions
    searchWorkspaces,
    deleteWorkspace,
    open,
    handleOpen,
    handleClose,
    onConfirm,
  };
};
