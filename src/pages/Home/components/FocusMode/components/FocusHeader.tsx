import React from 'react';
import { IconButton, Typography, useTheme } from '@mui/material';
import {
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
  AccessTime as AccessTimeIcon,
  Remove as RemoveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  HeaderContainer,
  HeaderTitleGroup,
  HeaderActionGroup,
  HeaderIconButton,
} from '../FocusMode.styles';

interface FocusHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: 'full' | 'mini') => void;
  handleCloseRequest: () => void;
}

export const FocusHeader: React.FC<FocusHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setViewMode,
  handleCloseRequest,
}) => {
  const theme = useTheme();

  return (
    <HeaderContainer>
      <HeaderTitleGroup>
        {!isSidebarOpen && (
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            sx={{ color: theme.palette.text.secondary, mr: 1 }}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        )}
        <IconButton
          sx={{
            color: '#fff',
            p: 0.5,
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            mr: 1.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: '0.75rem',
          }}
        >
          FOCUS MODE
        </Typography>
      </HeaderTitleGroup>
      <HeaderActionGroup>
        <HeaderIconButton onClick={() => setViewMode('mini')}>
          <RemoveIcon />
        </HeaderIconButton>
        <HeaderIconButton onClick={handleCloseRequest}>
          <CloseIcon />
        </HeaderIconButton>
      </HeaderActionGroup>
    </HeaderContainer>
  );
};
