import React from 'react';

interface CalendarSlotWrapperProps {
  children: React.ReactNode;
  value?: Date;
  onContextMenu?: (e: React.MouseEvent, date: Date) => void;
}

/**
 * Custom wrapper for time slots in Day and Week views.
 * Captures right-clicks to trigger the slot context menu.
 */
export const CalendarSlotWrapper: React.FC<CalendarSlotWrapperProps> = ({ children, value, onContextMenu }) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (onContextMenu && value) {
      e.preventDefault();
      onContextMenu(e, value);
    }
  };

  return (
    <div 
      onContextMenu={handleContextMenu}
      style={{ height: '100%', width: '100%' }}
    >
      {React.Children.only(children)}
    </div>
  );
};
