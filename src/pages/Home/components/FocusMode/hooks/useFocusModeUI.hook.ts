import { useState, useEffect, useCallback } from 'react';
import type { ViewMode } from '../FocusMode.types';

export const useFocusModeUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem('focus_mode_view') as ViewMode) || 'full';
  });

  useEffect(() => {
    localStorage.setItem('focus_mode_view', viewMode);
  }, [viewMode]);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  /* Drag Logic */
  // Initial position: Bottom Right
  const [position, setPosition] = useState<{ x: number; y: number }>(() => ({
    x: window.innerWidth - 420, // Approx width of mini mode
    y: window.innerHeight - 150, // Approx height of mini mode
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      // Use the current translate position to calculate offset correctly
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position],
  );

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const updatePosition = () => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      };

      // Throttle updates with requestAnimationFrame
      animationFrameId = requestAnimationFrame(updatePosition);
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
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging, dragOffset]);

  // Handle window resize to keep mini mode visible
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 400),
        y: Math.min(prev.y, window.innerHeight - 100),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
