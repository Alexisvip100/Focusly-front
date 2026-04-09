import type { Theme } from '@mui/material/styles';

// Common Input Sx
export const darkInputSx = {
  backgroundColor: 'background.default',
  borderRadius: '15px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'background.default',
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    fontSize: '14px',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'action.hover' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    '& input': {
      padding: '10px 14px',
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
    '& textarea': {
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
  },
  '& .MuiPickersInputBase-root': {
    borderRadius: '15px',
  },
  '& css-mxuir2-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item.Mui-selected':
    {
      borderRadius: '15px',
    },
  '& .MuiInputBase-input': { color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
  '& .MuiSvgIcon-root': { color: 'text.secondary' },
};

export const darkInputSxTimers = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'background.default',
    borderRadius: '10px',
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    fontSize: '14px',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'action.hover' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    '& input': {
      padding: '5px 5px',
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
    '& textarea': {
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
  },
  '& .MuiInputBase-input': { color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
  '& .MuiSvgIcon-root': { color: 'text.secondary' },
};

export const labelSx = {
  color: 'text.secondary',
  mb: 0.5,
  display: 'block',
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

export const paperPropsSx = {
  backgroundColor: 'background.paper',
  backgroundImage: 'none',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
};

export const deleteButtonSx = {
  bgcolor: '#f24848',
  color: 'white',
  textTransform: 'none' as const,
  fontWeight: 600,
  borderRadius: '8px',
  px: 2,
  boxShadow: 'none',
  '&:hover': {
    bgcolor: '#d83a3a',
    boxShadow: 'none',
  },
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

export const dialogTitleSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 600,
  borderBottom: '1px solid',
  borderColor: 'divider',
  padding: '16px 24px',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
};

export const iconBoxSx = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  bgcolor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const headerIconSx = {
  color: 'text.secondary',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

export const dialogContentSx = { p: 3, paddingTop: '12px !important' };

export const propertyListSx = {
  mt: 2,
  px: 4,
  mb: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const propertyRowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  minHeight: '36px',
};

export const propertyLabelSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  minWidth: '150px',
  color: 'text.secondary',
};

export const propertyValueSx = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  flex: 1,
};

export const titleInputPropsSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'background.default',
    borderRadius: '12px',
    padding: '4px 8px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'divider' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    '& input': {
      color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
      padding: '8px 12px',
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 0.5,
      },
    },
  },
};

export const statusSelectSx = {
  ...darkInputSx,
  borderRadius: '15px',
  width: '100%',
  '& .MuiSelect-select': { display: 'flex', alignItems: 'center' },
};

export const menuPaperPropsSx = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  mt: 1,
  '& .MuiMenuItem-root': {
    borderRadius: '8px',
    mx: 1,
    my: 0.5,
    '&:hover': { bgcolor: 'action.hover' },
    '&.Mui-selected': { bgcolor: 'action.selected' },
  },
};

// removed duplicate labelSx

export const dialogActionsSx = {
  padding: '16px 24px',
  backgroundColor: 'background.paper',
  borderTop: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
};

export const cancelButtonSx = {
  color: 'text.secondary',
  textTransform: 'none' as const,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

export const saveButtonSx = {
  bgcolor: 'primary.main',
  color: '#fff',
  textTransform: 'none' as const,
  borderRadius: '8px',
  boxShadow: 'none',
  fontWeight: 600,
  px: 3,
  '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' },
};

export const descriptionInputSx = {
  backgroundColor: 'background.default',
  borderRadius: '12px',
  mt: 1,
  '& .MuiOutlinedInput-root': {
    padding: '12px 16px',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'divider' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& textarea': {
    fontSize: '14px',
    lineHeight: 1.6,
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 0.6,
    },
  },
};

export const tagChipSx = {
  height: 24,
  fontSize: 12,
  bgcolor: 'action.hover',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
};

export const addTagInputSx = {
  height: 24,
  width: 80,
  fontSize: 12,
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  bgcolor: 'background.default',
};

export const smallLabelSx = {
  ...labelSx,
  mb: 1,
  display: 'block',
  fontSize: '10px',
};

export const autocompletePaperSx = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '8px',
  mt: 1,
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
};

// removed duplicate autocompletePaperSx

export const timeSlotBoxSx = {
  backgroundColor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '16px',
  p: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  mb: 2,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

export const datePickerPopperSx = {
  '& .MuiPickersLayout-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPickersDay-root': {
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: 'primary.main',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  '& .MuiPickersDay-today': {
    border: '1px solid',
    borderColor: 'primary.main',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: 'text.secondary',
  },
  '& .MuiPickersCalendarHeader-label': {
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiPickersCalendarHeader-switchViewButton': {
    color: 'text.secondary',
  },
  '& .MuiPickersArrowSwitcher-button': {
    color: 'text.secondary',
  },
  '& .MuiPickersYear-yearButton': {
    color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiPickersYear-yearButton.Mui-selected': {
    backgroundColor: 'primary.main',
    color: '#fff',
  },
};

export const datePickerPaperSx = {
  backgroundColor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '24px',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

export const timePickerPopperSx = {
  '& .MuiPickersLayout-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiClockPointer-root': {
    backgroundColor: 'primary.main',
  },
  '& .MuiClockPointer-thumb': {
    backgroundColor: 'primary.main',
    borderColor: 'background.default',
  },
  '& .MuiClock-pin': {
    backgroundColor: 'primary.main',
  },
  '& .MuiClockNumber-root': {
    color: 'text.secondary',
  },
  '& .MuiClockNumber-root.Mui-selected': {
    backgroundColor: 'primary.main',
    color: '#fff',
  },
  '& .MuiMultiSectionDigitalClockSection-item, & .MuiMultiSectionDigitalClockSectionItem-root': {
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
    },
  },
  '& .MuiMultiSectionDigitalClockSection-item.Mui-selected, & .MuiMultiSectionDigitalClockSectionItem-root.Mui-selected': {
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '12px',
    backgroundColor: 'rgba(56, 189, 248, 0.15)', // Slightly stronger primary light bg for selected
    color: 'primary.main',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: 'rgba(56, 189, 248, 0.25)',
    }
  },
  '& .MuiDialogActions-root': {
    '& .MuiButton-root': {
      color: 'primary.main',
      fontWeight: 600,
    },
  },
};

export const timePickerPaperSx = {
  backgroundColor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '24px',
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: '0 8px 32px rgba(238, 0, 0, 0.3)',
};

export const timePickerLayoutSx = {
  '& .MuiPickersLayout-contentWrapper': {
    bgcolor: 'background.default',
  },
  '& .MuiMultiSectionDigitalClockSection-item.Mui-selected, & .MuiMultiSectionDigitalClockSectionItem-root.Mui-selected': {
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '8px',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'primary.main',
    fontWeight: 700,
  }
};

export const modalBackdropSx = {
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

export const categorySelectSx = {
  color: (theme: Theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
  bgcolor: 'background.default',
  borderRadius: '15px',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
};

export const durationInputPropsSx = { borderRadius: '15px', bgcolor: 'background.default' };
