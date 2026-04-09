import { useDroppable } from '@dnd-kit/core';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import { DroppableArea, TaskPlaceholder } from './BoardView.styles';
import { SortableTaskCard } from './SortableTaskCard.tsx';
import { Typography } from '@mui/material';

interface BoardColumnProps {
  id: string;
  tasks: TaskResponse[];
  onTaskClick?: (task: TaskResponse) => void;
}

export const BoardColumn = ({ id, tasks, onTaskClick }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <DroppableArea ref={setNodeRef} isOver={isOver}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <SortableTaskCard key={task.id} task={task} onClick={() => onTaskClick?.(task)} />
        ))
      ) : (
        <TaskPlaceholder>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop tasks here
          </Typography>
        </TaskPlaceholder>
      )}
    </DroppableArea>
  );
};
