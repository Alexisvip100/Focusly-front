import React from 'react';
import { Box, Typography, Button, type SxProps, type Theme } from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  sx?: SxProps<Theme>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1,
        textAlign: 'center',
        p: 4,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '24px',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          position: 'relative',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 8px 32px rgba(0,0,0,0.05)',
        }}
      >
        {React.isValidElement(icon) ? (
          React.cloneElement(icon as React.ReactElement<{ sx?: SxProps<Theme> }>, {
            sx: {
              fontSize: 40,
              color: 'primary.main',
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
              ...((icon.props as { sx?: SxProps<Theme> }).sx || {}),
            },
          })
        ) : (
          <SearchOffIcon
            sx={{
              fontSize: 40,
              color: 'primary.main',
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
            }}
          />
        )}
      </Box>

      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          mb: 1,
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 320,
            mb: 3,
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {description}
        </Typography>
      )}

      {actionText && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            textTransform: 'none',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            px: 3,
            py: 1,
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.6)',
            },
            transition: 'all 0.2s',
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};
