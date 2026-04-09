import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import type { Task, TaskStatus } from '@/redux/tasks/task.types';
import { useFocusModeTimer } from './useFocusModeTimer.hook';
import { useFocusModeTasks } from './useFocusModeTasks.hook';
import { useFocusModeActions } from './useFocusModeActions.hook';
import { useFocusModeUI } from './useFocusModeUI.hook';

interface UseFocusModeProps {
  task?: Task | null;
  onClose: () => void;
  onActiveChange?: (isActive: boolean) => void;
  subtaskIndex?: number | null;
}

export const useFocusMode = ({
  task,
  onClose,
  onActiveChange,
  subtaskIndex,
}: UseFocusModeProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(false);

  // 1. Task Logic
  const tasks = useFocusModeTasks({
    initialTask: task,
    initialSubtaskIndex: subtaskIndex,
    userId: user?.id,
  });

  // 2. UI Logic
  const ui = useFocusModeUI();

  // 3. Actions Logic
  const actions = useFocusModeActions({
    userId: user?.id,
    onSessionComplete: () => {
      setIsActive(false);
      ui.setIsSessionCompleted(true);
    },
  });

  // 4. Timer Logic
  const initialMinutes = tasks.activeItem?.estimate_timer || 25;
  const timer = useFocusModeTimer({
    initialMinutes,
    isActive,
    setIsActive,
    onComplete: () => {
      setIsActive(false);
      ui.setIsSessionCompleted(true);
    },
    onTick: (secondsPassed) => {
      tasks.setActiveTask((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          real_timer: (prev.real_timer || 0) + secondsPassed / 60,
        };
      });
    },
  });

  useEffect(() => {
    onActiveChange?.(isActive);
  }, [isActive, onActiveChange]);

  const handleCloseRequest = () => {
    ui.setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    ui.setShowExitConfirmation(false);
    setIsActive(false);
    onClose();
  };

  const handleCompleteTask = async () => {
    if (!tasks.activeTask) return;
    const timeSpentSeconds = initialMinutes * 60 - timer.timeLeft;
    const timeSpentMinutes = Math.max(1, Math.round(timeSpentSeconds / 60));

    await actions.handleCompleteTask(tasks.activeTask, tasks.activeSubtaskIndex, timeSpentMinutes);
  };

  const handleUpdateStatus = (newStatus: TaskStatus) => {
    if (!tasks.activeTask) return;
    actions.handleUpdateStatus(tasks.activeTask, tasks.activeSubtaskIndex, newStatus);
    tasks.setActiveTask((prev) => {
      if (!prev) return null;
      if (tasks.activeSubtaskIndex !== null && prev.subtasks) {
        const updatedSubtasks = [...prev.subtasks];
        const currentSubtask = updatedSubtasks[tasks.activeSubtaskIndex];

        if (currentSubtask && typeof currentSubtask === 'object') {
          updatedSubtasks[tasks.activeSubtaskIndex] = {
            ...currentSubtask,
            status: newStatus,
          };
        }

        return { ...prev, subtasks: updatedSubtasks as Task['subtasks'] };
      }
      return { ...prev, status: newStatus };
    });
  };

  const handleUpdatePriority = (newPriority: number) => {
    if (!tasks.activeTask) return;
    actions.handleUpdatePriority(tasks.activeTask, tasks.activeSubtaskIndex, newPriority);
    tasks.setActiveTask((prev) => {
      if (!prev) return null;
      if (tasks.activeSubtaskIndex !== null && prev.subtasks) {
        const updatedSubtasks = [...prev.subtasks];
        const currentSubtask = updatedSubtasks[tasks.activeSubtaskIndex];

        if (currentSubtask && typeof currentSubtask === 'object') {
          updatedSubtasks[tasks.activeSubtaskIndex] = {
            ...currentSubtask,
            priority_level: newPriority,
          };
        }

        return { ...prev, subtasks: updatedSubtasks as Task['subtasks'] };
      }
      return { ...prev, priority_level: newPriority };
    });
  };

  return {
    // UI State & Actions
    ui: {
      viewMode: ui.viewMode,
      setViewMode: ui.setViewMode,
      isSidebarOpen: ui.isSidebarOpen,
      setIsSidebarOpen: ui.setIsSidebarOpen,
      showExitConfirmation: ui.showExitConfirmation,
      setShowExitConfirmation: ui.setShowExitConfirmation,
      isSessionCompleted: ui.isSessionCompleted,
      setIsSessionCompleted: ui.setIsSessionCompleted,
      position: ui.position,
      handleMouseDown: ui.handleMouseDown,
      isDragging: ui.isDragging,
      handleCloseRequest,
      confirmExit,
    },

    // Timer State & Actions
    timer: {
      timeLeft: timer.timeLeft,
      setTimeLeft: timer.setTimeLeft,
      progress: timer.progress,
      formatTime: timer.formatTime,
      isActive,
      setIsActive,
    },

    // Tasks State & Actions
    tasks: {
      activeTask: tasks.activeTask,
      setActiveTask: tasks.setActiveTask,
      activeSubtaskIndex: tasks.activeSubtaskIndex,
      setActiveSubtaskIndex: tasks.setActiveSubtaskIndex,
      activeItem: tasks.activeItem,
      todaysTasks: tasks.todaysTasks,
      tasksData: tasks.tasksData,
      handleCompleteTask,
      handleUpdateStatus,
      handleUpdatePriority,
    },
  };
};
