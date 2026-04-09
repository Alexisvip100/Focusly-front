import { useState, useEffect } from 'react';
import type { ViewMode } from '../FocusMode.types';

export const useFocusModeUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  /* Drag Logic */
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    showExitConfirmation,
    setShowExitConfirmation,
    viewMode,
    setViewMode,
    isSessionCompleted,
    setIsSessionCompleted,
    position,
    handleMouseDown,
    isDragging,
  };
};
