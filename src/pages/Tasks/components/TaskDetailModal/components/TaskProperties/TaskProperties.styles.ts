import {  type Theme } from '@mui/material/styles';

export const propertiesContainerSx = { 
  mt: 2, 
  px: 4, 
  mb: 4, 
  display: 'flex', 
  flexDirection: 'column', 
  gap: 2 
};

export const metadataRowSx = { 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: 2, 
  mb: 1 
};

export const metadataChipSx = (color?: string) => ({
  bgcolor: (theme: Theme) =>
    theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(0, 0, 0, 0.04)',
  border: '1px solid',
  borderColor: 'divider',
  color: color || 'text.secondary',
  borderRadius: '8px',
  px: 1,
  height: '32px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  '&:hover': { bgcolor: 'action.hover' },
  '& .MuiChip-icon': {
    marginRight: '-4px',
    color: 'inherit'
  }
});

export const colorCircleSx = (color: string) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  bgcolor: color,
  cursor: 'pointer',
  border: '2px solid white',
  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.1)' }
});

export const timerInputSx = (isReal?: boolean) => ({
  width: '80px',
  bgcolor: 'background.default',
  borderRadius: '10px',
  px: 1,
  '& .MuiInputBase-input': {
    fontSize: '15px',
    fontWeight: 700,
    color: isReal ? 'info.main' : 'text.primary',
  }
});

export const popoverPaperSx = { 
  borderRadius: '12px', 
  mt: 1, 
  boxShadow: 'none' 
};

export const timerPopoverPaperSx = { 
  minWidth: 80, 
  borderRadius: '12px', 
};

export const colorPopoverPaperSx = { 
  borderRadius: '16px', 
  mt: 1, 
  boxShadow: 'none' 
};

export const colorGridSx = { 
  p: 2, 
  display: 'grid', 
  gridTemplateColumns: 'repeat(6, 1fr)', 
  gap: 1.5 
};
