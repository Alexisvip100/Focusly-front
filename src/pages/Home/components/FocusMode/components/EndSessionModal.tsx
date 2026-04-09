import React from 'react';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  ExitModalOverlay,
  ExitModalCard,
  WarningIconWrapper,
  ExitModalTitle,
  ExitModalText,
  ExitModalActions,
  CancelButton,
  EndSessionButton,
} from '../FocusMode.styles';

interface EndSessionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EndSessionModal: React.FC<EndSessionModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <ExitModalOverlay>
      <ExitModalCard>
        <WarningIconWrapper>
          <WarningAmberRoundedIcon />
        </WarningIconWrapper>
        <ExitModalTitle>End Focus Session?</ExitModalTitle>
        <ExitModalText>
          Are you sure you want to end this session early?
          <br />
          Stopping now might affect your daily progress tracking and streak.
        </ExitModalText>
        <ExitModalActions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <EndSessionButton onClick={onConfirm}>End Session</EndSessionButton>
        </ExitModalActions>
      </ExitModalCard>
    </ExitModalOverlay>
  );
};
