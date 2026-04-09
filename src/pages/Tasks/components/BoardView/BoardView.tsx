import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';
import {
  BoardContainer,
  ColumnTitle,
  ColumnHeader,
  TaskCountBadge,
  ColumnWrapper,
} from './BoardView.styles';
import { BoardColumn } from './BoardColumn.tsx';
import { SortableTaskCard } from './SortableTaskCard.tsx';
import { 
  RadioButtonUnchecked as RadioButtonUncheckedIcon, 
  Assignment as AssignmentIcon, 
  AccessTime as AccessTimeIcon, 
  CheckCircle as CheckCircleIcon 
} from '@mui/icons-material';

// Define the 4 columns requested
const COLUMNS = [
  {
    id: 'Todo',
    title: 'To Do',
    color: '#3b82f6',
    badge: '#1e3a8a',
    Icon: RadioButtonUncheckedIcon,
  },
  { id: 'Planning', title: 'Planning', color: '#eab308', badge: '#713f12', Icon: AssignmentIcon },
  { id: 'Pending', title: 'Pending', color: '#a855f7', badge: '#581c87', Icon: AccessTimeIcon },
  { id: 'Done', title: 'Done', color: '#f43f5e', badge: '#881337', Icon: CheckCircleIcon },
] as const;

type ColumnId = (typeof COLUMNS)[number]['id'];

interface BoardViewProps {
  tasks: TaskResponse[];
  updateTask: (taskId: string, data: TaskResponse) => void | Promise<void>;
  onTaskClick?: (task: TaskResponse) => void;
}

export const BoardView = ({ tasks, updateTask, onTaskClick }: BoardViewProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Group tasks by column
  const tasksByColumn = useMemo(() => {
    const grouped = {
      Todo: [] as TaskResponse[],
      Planning: [] as TaskResponse[],
      Pending: [] as TaskResponse[],
      Done: [] as TaskResponse[],
    };

    tasks.forEach((task) => {
      // Map statuses that might not exactly match our 4 columns into 'Todo' as a fallback
      // For instance: 'Scheduled', 'Review', 'On Hold', 'Backlog'
      const status = task.status;
      if (status === 'Planning' || status === 'Pending' || status === 'Done' || status === 'Todo') {
        grouped[status].push(task);
      } else {
        // Fallback for other statuses to keep them visible
        grouped['Todo'].push(task);
      }
    });

    return grouped;
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require moving 5px before drag starts (helps prevent accidental drags when clicking)
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const activeColumnId = activeTask.status;
    let overColumnId = overId as ColumnId;

    // If we drop over a task instead of a column directly, find the column of that task
    if (activeId !== overId) {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask && Object.keys(tasksByColumn).includes(overTask.status)) {
        overColumnId = overTask.status as ColumnId;
      }
    }

    if (!overColumnId) return;

    if (activeColumnId !== overColumnId) {
      updateTask(activeId, { ...activeTask, status: overColumnId });
    }
  };

  const activeTask = useMemo(() => tasks.find((t) => t.id === activeId), [activeId, tasks]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        {COLUMNS.map((column) => (
          <ColumnWrapper key={column.id}>
            <ColumnHeader borderColor={column.color}>
              <ColumnTitle>
                <column.Icon sx={{ fontSize: 18, color: column.color }} />
                {column.title}
              </ColumnTitle>
              <TaskCountBadge sx={{ backgroundColor: column.badge, color: 'white' }}>
                {tasksByColumn[column.id].length}
              </TaskCountBadge>
            </ColumnHeader>

            <SortableContext
              items={tasksByColumn[column.id].map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <BoardColumn
                id={column.id}
                tasks={tasksByColumn[column.id]}
                onTaskClick={onTaskClick}
              />
            </SortableContext>
          </ColumnWrapper>
        ))}
      </BoardContainer>

      <DragOverlay>
        {activeTask ? <SortableTaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};
