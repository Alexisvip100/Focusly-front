import { headerIconSx } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.styles';

export const headerContainerSx = (isCustomColor: boolean, color: string) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 3,
  ...(isCustomColor
    ? {
        pt: 1,
        pb: 20,
        margin: '15px',
      }
    : {
        pt: 2,
        pb: 1,
      }),
  color: isCustomColor ? '#fff' : 'text.secondary',
  backgroundColor: isCustomColor ? color : 'transparent',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

export const headerIconButtonSx = (isCustomColor: boolean) => ({
  ...headerIconSx,
  color: isCustomColor ? '#fff' : 'text.secondary',
  '&:hover': {
    backgroundColor: isCustomColor
      ? 'rgba(255, 255, 255, 0.2)'
      : 'action.hover',
  },
});

export const parentTaskContainerSx = { 
  px: 5, 
  mb: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 1
};

export const parentTaskTypographySx = (isCustomColor: boolean) => ({
  fontWeight: 500,
  color: isCustomColor ? '#fff' : 'text.primary',
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
});

export const subtaskTypographySx = (isCustomColor: boolean) => ({ 
  fontSize: 12, 
  color: isCustomColor ? 'rgba(255,255,255,0.9)' : 'text.secondary' 
});
