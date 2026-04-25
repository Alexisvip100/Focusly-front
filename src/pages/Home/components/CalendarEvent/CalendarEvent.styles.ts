import { Box, styled, darken, lighten } from '@mui/material';
import type { Task } from '@/redux/tasks/task.types';

// Priority-based color palette (6 colors)
export const PRIORITY_COLORS: Record<number, { main: string }> = {
  1: { main: '#22C55E' }, // Low → Green
  2: { main: '#3B82F6' }, // Medium → Blue
  3: { main: '#F59E0B' }, // High → Amber/Orange
  4: { main: '#EF4444' }, // Critical → Red
};

const GOOGLE_EVENT_COLOR = { main: '#06B6D4' }; // Teal for Google events
const DEFAULT_COLOR = { main: '#A855F7' };       // Purple fallback

export const getEventColor = (
  event: { id?: string; type?: string; resource?: unknown },
) => {
  if (event.type === 'event') return GOOGLE_EVENT_COLOR;

  const task = event.resource as Task | undefined;
  
  // 1. Check for custom color tag in notes
  if (task?.notes_encrypted) {
    const colorMatch = task.notes_encrypted.match(/\[COLOR:(.*?)\]/);
    if (colorMatch && colorMatch[1]) {
      return { main: colorMatch[1] };
    }
  }

  // 2. Fallback to priority color
  if (task?.priority_level) {
    return PRIORITY_COLORS[task.priority_level] || DEFAULT_COLOR;
  }

  return DEFAULT_COLOR;
};

export const EventContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'isMeeting' && prop !== 'overlapIndex',
})<{ variant: { main: string }; isMeeting?: boolean; overlapIndex?: number }>(
  ({ theme, variant, isMeeting, overlapIndex = 0 }) => {
    const isDark = theme.palette.mode === 'dark';
    const MEETING_COLOR = '#3B82F6'; // Medium priority blue

    // Dynamic rotation if overlap detected
    const hueRotation = overlapIndex > 0 ? (overlapIndex * 40) % 360 : 0;
    const brightnessIdx = overlapIndex > 0 ? 1 - (overlapIndex * 0.1) : 1;

    if (isMeeting) {
      return {
        backgroundColor: isDark ? 'rgba(30, 41, 59, 1)' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2px 8px',
        position: 'relative',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isDark ? '0 0 12px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
        filter: overlapIndex > 0 ? `hue-rotate(${hueRotation}deg) brightness(${brightnessIdx})` : 'none',
        zIndex: overlapIndex + 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 1.5, // Lifted slightly from bottom to avoid clipping
          border: `2px dashed ${MEETING_COLOR}`,
          borderRadius: 'inherit',
          pointerEvents: 'none',
        },
        '&:hover': {
          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.3)' : '#f0f9ff', // Opaque light blue 
          zIndex: 50, // Jump to top
          '&::before': {
            borderColor: lighten(MEETING_COLOR, 0.2),
          },
        },
      };
    }

    return {
      backgroundColor: isDark ? darken(variant.main, 0.35) : lighten(variant.main, 0.3),
      color: '#ffffff',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '1px 6px',
      borderLeft: `3px solid ${variant.main}`,
      borderRadius: '4px',
      overflow: 'hidden',
      cursor: 'pointer',
      zIndex: overlapIndex + 1,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      filter: overlapIndex > 0 ? `hue-rotate(${hueRotation}deg) brightness(${brightnessIdx})` : 'none',
      '&:hover': {
        backgroundColor: isDark ? darken(variant.main, 0.2) : lighten(variant.main, 0.1),
        zIndex: 50,
      },
    };
  }
);

export const priorityCircleSx = (color: string, isSelected: boolean) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  backgroundColor: color,
  border: isSelected ? '2px solid' : '2px solid transparent',
  borderColor: isSelected ? 'text.primary' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: '0 0 8px rgba(0,0,0,0.2)',
  },
});

export const contextMenuSx = {
  '& .MuiPaper-root': {
    borderRadius: '12px',
    minWidth: '180px',
    padding: '4px 0',
    boxShadow: '0px 10px 25px -5px rgba(0,0,0,0.2), 0px 8px 10px -6px rgba(0,0,0,0.1)',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    backgroundImage: 'none',
  },
  '& .MuiMenuItem-root': {
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 12px',
    margin: '2px 8px',
    borderRadius: '8px',
    transition: 'all 0.15s ease',
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'primary.main',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
      opacity: 0.8,
    },
  },
  '& .MuiDivider-root': {
    margin: '4px 0',
    opacity: 0.6,
  },
};
