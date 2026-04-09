import React from 'react';
import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps, useTheme } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

export const TextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <MuiTextField
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          bgcolor: 'action.hover',
          fontSize: '1rem',
          fontWeight: 500,
          color: theme.palette.text.primary,
          transition: 'all 0.2s ease',
          '& fieldset': { borderColor: 'transparent' },
          '&:hover fieldset': { borderColor: theme.palette.primary.main },
          '&.Mui-focused': {
            bgcolor: 'background.paper',
            '& fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
          },
        },
        '& .MuiInputBase-input': {
          color: 'text.primary',
          '&::placeholder': {
            color: 'text.secondary',
            opacity: 0.5,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};
