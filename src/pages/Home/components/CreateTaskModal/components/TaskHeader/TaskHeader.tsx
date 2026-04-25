import { Box, Typography, IconButton } from '@mui/material';
import {
  Close as CloseIcon,
  OpenInFull as OpenInFullIcon,
  CloseFullscreen as CloseFullscreenIcon,
  Palette as PaletteIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  ArrowForwardIos,
} from '@mui/icons-material';
import { headerIconSx } from '../../CreateTaskModal.styles';
import { TASK_COLORS } from '../../CreateTaskModal.utils';

interface TaskHeaderProps {
  color: string;
  isFullScreen: boolean;
  setIsFullScreen: (v: boolean) => void;
  setColorAnchor: (el: HTMLElement) => void;
  onClose: () => void;
  parentTask?: { id: string; title: string; subtasks?: unknown[] };
  title: string;
}

export const TaskHeader = ({
  color,
  isFullScreen,
  setIsFullScreen,
  setColorAnchor,
  onClose,
  parentTask,
  title,
}: TaskHeaderProps) => {
  const hasColor = TASK_COLORS.includes(color);

  const iconSx = {
    ...headerIconSx,
    color: hasColor ? '#fff' : 'text.secondary',
    '&:hover': {
      backgroundColor: hasColor ? 'rgba(255, 255, 255, 0.2)' : 'action.hover',
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        ...(hasColor
          ? { pt: 1, pb: 20, margin: '15px' }
          : { pt: 2, pb: 1 }),
        color: hasColor ? '#fff' : 'text.secondary',
        backgroundColor: hasColor ? color : 'transparent',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <Box display="flex" gap={1}>
        <IconButton size="small" onClick={() => setIsFullScreen(!isFullScreen)} sx={iconSx}>
          {isFullScreen ? (
            <CloseFullscreenIcon sx={{ fontSize: 18 }} />
          ) : (
            <OpenInFullIcon sx={{ fontSize: 18 }} />
          )}
        </IconButton>
        <IconButton size="small" onClick={(e) => setColorAnchor(e.currentTarget)} sx={iconSx}>
          <PaletteIcon sx={{ fontSize: 18, color: hasColor ? '#fff' : 'text.secondary' }} />
        </IconButton>
        {parentTask && (
          <Box display="flex" alignItems="center" gap={1} sx={{ px: 5, mb: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <SubdirectoryArrowRightIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              {parentTask.title}
            </Typography>
            <IconButton size="small" onClick={onClose} disabled sx={{ padding: 0 }}>
              <ArrowForwardIos sx={{ fontSize: 10, color: 'text.secondary' }} />
            </IconButton>
            <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
              {title.length === 0 ? 'New SubTask' : title}
            </Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton size="small" onClick={onClose} sx={iconSx}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
