import { TaskDetailModal } from '../TaskDetailModal/TaskDetailModal';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import type { Task } from '@/redux/tasks/task.types';

interface SubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  activeParentTask: TaskResponse | null;
  activeSubtaskIndex: number | null;
}

export const SubtaskModal = ({
  isOpen,
  onClose,
  onSave,
  activeParentTask,
  activeSubtaskIndex,
}: SubtaskModalProps) => {
  if (!isOpen) return null;

  const subtask =
    activeParentTask &&
    activeSubtaskIndex !== null &&
    activeParentTask.subtasks &&
    activeParentTask.subtasks[activeSubtaskIndex]
      ? activeParentTask.subtasks[activeSubtaskIndex]
      : null;

  return (
    <TaskDetailModal
      key={
        activeParentTask?.id
          ? `subtask-${activeParentTask.id}-${activeSubtaskIndex}`
          : 'new-subtask'
      }
      open={isOpen}
      onClose={onClose}
      onSave={onSave}
      initialStart={null}
      initialEnd={null}
      parentTask={
        activeParentTask
          ? {
              id: activeParentTask.id,
              title: activeParentTask.title,
              subtasks: activeParentTask.subtasks,
            }
          : undefined
      }
      subtaskIndex={
        activeSubtaskIndex === null ? undefined : activeSubtaskIndex
      }
      initialTask={
        subtask
          ? ({
              id: 'temp-subtask-id',
              title: subtask.title,
              status: subtask.status || (subtask.completed ? 'Done' : 'Todo'),
              estimate_timer: subtask.estimate_timer || subtask.timer,
              real_timer: subtask.timer,
              priority_level: activeParentTask!.priority_level,
              category: activeParentTask!.category,
              deadline: activeParentTask!.deadline,
              notes_encrypted: '',
              subtasks: [],
              tags: [],
              links: subtask.links || [],
              user_id: activeParentTask!.user_id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } as unknown as Task)
          : undefined
      }
    />
  );
};
