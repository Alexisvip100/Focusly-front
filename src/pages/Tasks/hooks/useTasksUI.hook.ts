import { useState } from 'react';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { sileo } from 'sileo';

export const useTasksUI = () => {
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | null>(null);
  const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string>>(new Set());
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSubMessage, setToastSubMessage] = useState('');

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTaskIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleTaskClick = (task: TaskResponse) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const triggerToast = (
    message: string,
    subMessage: string,
    type: 'success' | 'update' | 'delete' | 'warning' | 'error' = 'success'
  ) => {
    const method = type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'success';

    sileo[method]({
      title: message,
      description: subMessage,
      fill: `var(--sileo-${type}-bg)`,
      duration: 4000,
    });
  };

  return {
    selectedTask,
    setSelectedTask,
    isModalOpen,
    setIsModalOpen,
    filterAnchorEl,
    setFilterAnchorEl,
    sortAnchorEl,
    setSortAnchorEl,
    expandedTaskIds,
    toggleTaskExpansion,
    handleTaskClick,
    handleCloseModal,
    triggerToast,
    showSuccessToast,
    setShowSuccessToast,
    toastMessage,
    setToastMessage,
    toastSubMessage,
    setToastSubMessage,
  };
};
