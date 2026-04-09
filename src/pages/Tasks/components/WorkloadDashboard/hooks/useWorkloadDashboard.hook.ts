import { useMemo, useCallback } from 'react';
import type { TWorkloadDashboard } from '../types/WorkloadDashboard.types';
import { useAppSelector } from '@/redux/hooks';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { RootState } from '@/redux/store';

export const useWorkloadDashboard = (): TWorkloadDashboard => {
  const { tasks } = useAppSelector((state: RootState) => state.task) as unknown as {
    tasks: TaskResponse[] | null;
  };

  const daysWeek = useMemo((): Date[] => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Start from today
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
    return days;
  }, []);

  const limitWeek = useMemo((): number => {
    const dailyLimitHours = 8;
    return dailyLimitHours * 7;
  }, []);

  const [dailyWorkload, estimationWeek] = useMemo((): [number[], number] => {
    if (daysWeek.length === 0 || !tasks) return [[0, 0, 0, 0, 0, 0, 0], 0];

    const startOfWeek = daysWeek[0];
    const endOfWeek = new Date(daysWeek[6]);
    endOfWeek.setHours(23, 59, 59, 999);

    const tasksThisWeek = tasks.filter((task: TaskResponse) => {
      if (!task.deadline) return false;
      const taskDate = new Date(task.deadline);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    const dailyMins = new Array(7).fill(0);

    const totalMinutes = tasksThisWeek.reduce((sum: number, task: TaskResponse) => {
      const mins = task.estimate_minutes || task.estimate_timer || 0;

      const taskDate = new Date(task.deadline);
      const dayIndex = Math.floor(
        (taskDate.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (dayIndex >= 0 && dayIndex < 7) {
        dailyMins[dayIndex] += mins;
      }

      return sum + mins;
    }, 0);

    return [dailyMins.map((m) => m / 60), totalMinutes / 60];
  }, [daysWeek, tasks]);

  const availableSlots = useMemo((): number => {
    return Math.max(0, limitWeek - estimationWeek);
  }, [limitWeek, estimationWeek]);

  // Maintain interface compatibility
  const getDaysWeek = useCallback((): void => {}, []);
  const GetEstimationForWeek = useCallback((): void => {}, []);
  const GetLimitForWeek = useCallback((): void => {}, []);
  const GetAvailableSlots = useCallback((): void => {}, []);

  return {
    daysWeek,
    getDaysWeek,
    estimationWeek,
    limitWeek,
    availableSlots,
    dailyWorkload,
    GetEstimationForWeek,
    GetLimitForWeek,
    GetAvailableSlots,
  };
};
