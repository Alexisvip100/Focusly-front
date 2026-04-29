import { useState, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { getPriorityFromLevel } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { EditorSidebarProps } from './EditorSidebar.type';

export const useEditorSidebar = (props: EditorSidebarProps) => {
  const {
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    selectedSubtaskIndex,
    selectTask,
    handleUpdateTask,
  } = props;
  const theme = useTheme();

  const [priorityAnchor, setPriorityAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);

  const handleToggleSidebar = useCallback(() => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  }, [isRightSidebarOpen, setIsRightSidebarOpen]);

  const getPriorityColor = (level: number) => {
    const priority = getPriorityFromLevel(level);
    if (priority === 'High') return theme.palette.error.main;
    if (priority === 'Med') return theme.palette.warning.main;
    if (priority === 'Low') return theme.palette.success.main;
    return theme.palette.text.secondary;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Done') return theme.palette.success.main;
    if (status === 'Pending') return theme.palette.warning.main;
    if (status === 'Backlog') return theme.palette.secondary.main;
    if (status === 'Planning') return theme.palette.info.main;
    if (status === 'OnHold') return theme.palette.error.main;
    if (status === 'Review') return theme.palette.secondary.main;
    return theme.palette.info.main;
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchor(event.currentTarget);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchor(event.currentTarget);
  };

  const handlePrioritySelect = async (level: number) => {
    setPriorityAnchor(null);
    if (!selectTask || !handleUpdateTask) return;

    if (selectedSubtaskIndex !== null) {
      const updatedSubtasks = [...(selectTask.subtasks || [])];
      updatedSubtasks[selectedSubtaskIndex] = {
        ...updatedSubtasks[selectedSubtaskIndex],
        priority_level: level,
      };
      await handleUpdateTask(selectTask.id, { subtasks: updatedSubtasks });
    } else {
      await handleUpdateTask(selectTask.id, { priority_level: level });
    }
  };

  const handleStatusSelect = async (status: string) => {
    setStatusAnchor(null);
    if (!selectTask || !handleUpdateTask) return;

    if (selectedSubtaskIndex !== null) {
      const updatedSubtasks = [...(selectTask.subtasks || [])];
      updatedSubtasks[selectedSubtaskIndex] = {
        ...updatedSubtasks[selectedSubtaskIndex],
        status,
        completed: status === 'Done',
      };
      await handleUpdateTask(selectTask.id, { subtasks: updatedSubtasks });
    } else {
      await handleUpdateTask(selectTask.id, { status });
    }
  };

  const handleMarkDone = async () => {
    if (!selectTask || !handleUpdateTask) return;
    await handleStatusSelect('Done');
  };

  const currentStatus =
    selectedSubtaskIndex !== null
      ? selectTask?.subtasks?.[selectedSubtaskIndex]?.status ||
        (selectTask?.subtasks?.[selectedSubtaskIndex]?.completed
          ? 'Done'
          : 'Todo')
      : selectTask?.status || 'Todo';

  const currentPriorityLevel =
    selectedSubtaskIndex !== null
      ? (selectTask?.subtasks?.[selectedSubtaskIndex]?.priority_level ?? 0)
      : (selectTask?.priority_level ?? 0);

  const cleanDescription = (desc?: string) => {
    if (!desc) return 'No description provided.';
    return (
      desc
        .replace(/\[COLOR:(.*?)\]/g, '')
        .replace(/\[START_DATE:(.*?)\]/g, '')
        .replace(
          /https?:\/\/(www\.)?(calendar\.google\.com|google\.com\/calendar|meet\.google\.com)[^\s]*/g,
          '',
        )
        .trim() || 'No description provided.'
    );
  };

  return {
    priorityAnchor,
    setPriorityAnchor,
    statusAnchor,
    setStatusAnchor,
    handleToggleSidebar,
    getPriorityColor,
    getStatusColor,
    handlePriorityClick,
    handleStatusClick,
    handlePrioritySelect,
    handleStatusSelect,
    handleMarkDone,
    currentStatus,
    currentPriorityLevel,
    cleanDescription,
    theme,
  };
};
