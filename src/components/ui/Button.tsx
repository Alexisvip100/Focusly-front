import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  rounded = true,
  sx,
  ...props
}) => {
  return (
    <MuiButton
      disabled={disabled || loading}
      sx={{
        borderRadius: rounded ? '16px' : '8px',
        textTransform: 'none',
        px: 4,
        py: 1.2,
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: props.variant === 'contained' ? `0 8px 16px rgba(0,0,0,0.1)` : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          filter: 'brightness(1.1)',
          boxShadow: props.variant === 'contained' ? `0 12px 24px rgba(0,0,0,0.2)` : 'none',
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};
