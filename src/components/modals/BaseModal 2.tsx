import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  hideCloseButton?: boolean;
  icon?: React.ReactNode;
  iconBgColor?: string;
  sx?: SxProps<Theme>;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = 'xs',
  fullWidth = true,
  hideCloseButton = false,
  icon,
  iconBgColor,
  sx,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          backgroundImage: 'none',
          bgcolor: 'background.paper',
          p: 1,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          ...sx,
        },
      }}
    >
      {(title || !hideCloseButton) && (
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 3,
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '16px',
                  bgcolor: iconBgColor || 'primary.main',
                  color: 'white',
                  boxShadow: iconBgColor ? `0 8px 16px ${iconBgColor}44` : 'none',
                }}
              >
                {icon}
              </Box>
            )}
            <Box>
              {title && <Typography variant="inherit">{title}</Typography>}
              {subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ opacity: 0.8, fontSize: '0.95rem', fontWeight: 400 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          {!hideCloseButton && (
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={{ pb: actions ? 1 : 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ p: 4, pt: 1 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
