import type { Theme } from '@mui/material/styles';

export const collaboratorContainerSx = { 
  px: 4, 
  mb: 4 
};

export const collaboratorHeaderSx = (isExpanded: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  mb: isExpanded ? 2 : 0 
});

export const collaboratorCountSx = {
  ml: 1,
  px: 0.8,
  py: 0.1,
  borderRadius: '6px',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  fontSize: '10px',
  fontWeight: 800,
};

export const addCollaboratorButtonSx = {
  textTransform: 'none',
  borderRadius: '8px',
  px: 1.5,
  py: 0.5,
  fontSize: '12px',
  fontWeight: 700,
  color: 'primary.main',
  bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
  '&:hover': { 
    bgcolor: 'primary.main',
    color: '#fff' 
  }
};

export const collaboratorsListSx = {
  maxHeight: '220px',
  overflowY: 'auto',
  pr: 1,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    bgcolor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    borderRadius: '10px',
    '&:hover': {
      bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    }
  }
};

export const addCollaboratorFormSx = { 
  mb: 1, 
  p: 2, 
  borderRadius: '12px', 
  bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
  border: '1px solid',
  borderColor: 'primary.main'
};

export const collaboratorItemSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: 1.5,
  borderRadius: '12px',
  bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  border: '1px solid',
  borderColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  transition: 'all 0.2s',
  '&:hover': {
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
    borderColor: 'divider'
  }
};

export const avatarSx = (hasAvatar: boolean) => ({
  width: 36,
  height: 36,
  fontSize: '14px',
  fontWeight: 700,
  bgcolor: (theme: Theme) => {
    if (hasAvatar) return 'transparent';
    return theme.palette.mode === 'dark' ? 'primary.main' : 'primary.light';
  },
  color: '#fff',
  border: (theme: Theme) => hasAvatar ? `1px solid ${theme.palette.divider}` : 'none',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});
