import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { GET_TASKS } from '@/pages/Tasks/components/TaskDetailModal/tasks.graphql';
import type { Task, TaskStatus } from '@/redux/tasks/task.types';

interface UseFocusModeTasksProps {
  initialTask?: Task | null;
  initialSubtaskIndex?: number | null;
  userId?: string;
}

export const useFocusModeTasks = ({
  initialTask,
  initialSubtaskIndex,
  userId,
}: UseFocusModeTasksProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(
    initialTask || null,
  );
  const [activeSubtaskIndex, setActiveSubtaskIndex] = useState<number | null>(
    initialSubtaskIndex ?? null,
  );

  const { data: tasksData } = useQuery(GET_TASKS, {
    variables: { userId: userId || '' },
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  const activeItem = useMemo(() => {
    if (
      activeSubtaskIndex !== null &&
      activeTask?.subtasks &&
      activeTask.subtasks[activeSubtaskIndex as number]
    ) {
      const st = activeTask.subtasks[activeSubtaskIndex as number];
      if (typeof st !== 'string') {
        return {
          id: `${activeTask.id}-sub-${activeSubtaskIndex}`,
          title: st.title,
          estimate_timer: st.estimate_timer || st.timer,
          real_timer: st.timer,
          category: st.category || activeTask.category,
          status: st.status || ('Todo' as TaskStatus),
          priority_level: st.priority_level || activeTask.priority_level,
          isSubtask: true,
          parentId: activeTask.id,
          originalIndex: activeSubtaskIndex,
          workspaces: activeTask.workspaces,
        };
      }
    }
    return activeTask ? { ...activeTask, isSubtask: false } : null;
  }, [activeTask, activeSubtaskIndex]);

  const todaysTasks = useMemo(() => {
    const allTasks: Task[] = tasksData?.tasks || [];
    if (!allTasks.length) return [];

    const today = moment();
    const flattened: (Task & {
      isSubtask?: boolean;
      parentId?: string;
      originalIndex?: number;
    })[] = [];

    allTasks.forEach((t) => {
      if (
        !t.deadline ||
        !moment(t.deadline).isSame(today, 'day') ||
        t.status === 'Done'
      )
        return;

      flattened.push(t);

      if (t.subtasks && Array.isArray(t.subtasks)) {
        t.subtasks.forEach((st, idx: number) => {
          if (typeof st !== 'string' && !st.completed) {
            flattened.push({
              ...t,
              id: `${t.id}-sub-${idx}`,
              title: st.title,
              estimate_timer: st.estimate_timer || st.timer,
              category: st.category || t.category,
              isSubtask: true,
              parentId: t.id,
              originalIndex: idx,
            });
          }
        });
      }
    });
    return flattened;
  }, [tasksData]);

  return {
    activeTask,
    setActiveTask,
    activeSubtaskIndex,
    setActiveSubtaskIndex,
    activeItem,
    todaysTasks,
    tasksData,
  };
};
