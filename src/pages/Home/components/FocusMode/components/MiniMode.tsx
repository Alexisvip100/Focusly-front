import React from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Close as CloseIcon,
  OpenInFull as OpenInFullIcon,
} from '@mui/icons-material';
import {
  MiniModeContainer,
  RippleDot,
  MiniTimerBox,
  MiniInfoBox,
  MiniControlsBox,
  MiniPlayButton,
  MiniExpandButton,
} from '../FocusMode.styles';

interface MiniModeProps {
  position: { x: number; y: number } | null;
  handleMouseDown: (e: React.MouseEvent) => void;
  formatTime: (seconds: number) => string;
  timeLeft: number;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  activeItem: { title?: string } | null;
  progress: number;
  handleCloseRequest: () => void;
  setViewMode: (mode: 'full' | 'mini') => void;
}

export const MiniMode: React.FC<MiniModeProps> = ({
  position,
  handleMouseDown,
  formatTime,
  timeLeft,
  isActive,
  setIsActive,
  activeItem,
  progress,
  handleCloseRequest,
  setViewMode,
}) => {
  const theme = useTheme();

  return (
    <MiniModeContainer
      onMouseDown={handleMouseDown}
      sx={{
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
        transform: `translate3d(${position?.x || 0}px, ${position?.y || 0}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      <RippleDot />
      <Box
        sx={{
          borderRadius: '14px',
          padding: '2px',
          background: `conic-gradient(${theme.palette.primary.main} ${progress}%, transparent ${progress}%)`,
          display: 'flex',
        }}
      >
        <MiniTimerBox sx={{ border: 'none', width: '96px', m: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            {formatTime(timeLeft)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary, fontSize: '10px' }}
          >
            LEFT
          </Typography>
        </MiniTimerBox>
      </Box>
      <MiniInfoBox>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {activeItem?.title || 'Focus Session'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            {Math.round(progress)}% Complete
          </Typography>
        </Box>
      </MiniInfoBox>
      <MiniControlsBox>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MiniPlayButton size="small" onClick={() => setIsActive(!isActive)}>
            {isActive ? (
              <PauseIcon fontSize="small" />
            ) : (
              <PlayArrowIcon fontSize="small" />
            )}
          </MiniPlayButton>

          <IconButton
            size="small"
            sx={{ color: '#ef4444' }}
            onClick={handleCloseRequest}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <MiniExpandButton size="small" onClick={() => setViewMode('full')}>
          <OpenInFullIcon fontSize="small" />
        </MiniExpandButton>
      </MiniControlsBox>
    </MiniModeContainer>
  );
};
