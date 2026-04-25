import React from 'react';
import {
  History as HistoryIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import {
  FooterContainer,
  AddTimeButton,
  PlayPauseButton,
  CompleteButton,
} from '../FocusMode.styles';

interface FocusFooterProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  handleCompleteTask: () => void;
}

export const FocusFooter: React.FC<FocusFooterProps> = ({
  isActive,
  setIsActive,
  setTimeLeft,
  handleCompleteTask,
}) => {
  return (
    <FooterContainer sx={{ mt: 8 }}>
      <AddTimeButton
        startIcon={<HistoryIcon />}
        onClick={() => setTimeLeft((prev) => prev + 5 * 60)}
      >
        +5m
      </AddTimeButton>

      <PlayPauseButton onClick={() => setIsActive(!isActive)}>
        {isActive ? (
          <PauseIcon sx={{ fontSize: 32 }} />
        ) : (
          <PlayArrowIcon sx={{ fontSize: 32 }} />
        )}
      </PlayPauseButton>

      <CompleteButton
        startIcon={<CheckIcon />}
        onClick={handleCompleteTask}
      >
        Complete Task
      </CompleteButton>
    </FooterContainer>
  );
};
