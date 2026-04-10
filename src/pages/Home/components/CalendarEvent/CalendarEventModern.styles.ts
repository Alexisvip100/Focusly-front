import { Box, styled, alpha, keyframes } from '@mui/material';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const ModernEventContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'isMeeting' && prop !== 'overlapIndex',
})<{ variant: { main: string }; isMeeting?: boolean; overlapIndex?: number }>(
  ({ theme, variant, isMeeting, overlapIndex: _overlapIndex = 0 }) => {
    const isDark = theme.palette.mode === 'dark';
    
    // Glassmorphism constants
    const surface = alpha(theme.palette.background.paper, isDark ? 0.75 : 0.9);
    const accentColor = variant.main;
    const MEETING_BLUE = '#3B82F6';

    const baseStyles = {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '4px 8px',
      position: 'relative' as const,
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: surface,
      border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
      boxShadow: isDark 
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)',
      
      '&:hover': {
        transform: 'translateY(-1px)',
        backgroundColor: alpha(surface, 1),
        borderColor: alpha(accentColor, 0.5),
        boxShadow: isDark 
          ? `0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px ${alpha(accentColor, 0.2)}`
          : `0 4px 12px rgba(0,0,0,0.1), 0 0 0 1px ${alpha(accentColor, 0.3)}`,
        zIndex: 100,
      },

      '&::before': {
        content: '""',
        position: 'absolute' as const,
        top: '4px',
        left: 0,
        bottom: '4px',
        width: '3px',
        backgroundColor: accentColor,
        borderRadius: '0 2px 2px 0',
      }
    };

    if (isMeeting) {
      return {
        ...baseStyles,
        borderColor: alpha(MEETING_BLUE, 0.3),
        background: isDark 
          ? `linear-gradient(135deg, ${alpha('#1e293b', 0.85)} 0%, ${alpha('#0f172a', 0.9)} 100%)`
          : `linear-gradient(135deg, ${alpha('#eff6ff', 0.85)} 0%, ${alpha('#ffffff', 0.9)} 100%)`,
        '&::before': {
          ...baseStyles['&::before'],
          backgroundColor: MEETING_BLUE,
        },
        '& .meeting-indicator': {
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: MEETING_BLUE,
          animation: `${pulse} 2s infinite ease-in-out`,
          marginRight: '6px',
        }
      };
    }

    return baseStyles;
  }
);

export const ModernPriorityDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: color,
  boxShadow: `0 0 6px ${alpha(color, 0.4)}`,
}));
