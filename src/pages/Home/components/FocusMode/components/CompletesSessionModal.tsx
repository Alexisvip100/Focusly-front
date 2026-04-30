import React, { useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import type { Task } from '@/redux/tasks/task.types';

import {
  CompletionContainer,
  SuccessIconContainer,
  StatsContainer,
  StatCard,
  ActionButtonsContainer,
  NextTaskButton,
} from '../FocusMode.styles';

import confetti from 'canvas-confetti';

interface CompletesSessionModalProps {
  activeTask: Task | null;
  todaysTasks: Task[];
  onClose: () => void;
}

const formatHumanDuration = (minutes?: number) => {
  if (!minutes || minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);

  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

export const CompletesSessionModal: React.FC<CompletesSessionModalProps> = ({
  activeTask,
  onClose,
}) => {
  const theme = useTheme();
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 10001, // Above modal
      colors: [
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.error.main,
        theme.palette.warning.main,
        '#ffffff',
      ],
    });
  }, [theme]);

  return (
    <CompletionContainer>
      <SuccessIconContainer>
        <CheckIcon />
      </SuccessIconContainer>
      <Typography
        variant="h2"
        sx={{ fontWeight: 800, fontSize: '3rem', mb: 1 }}
      >
        Task Completed!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.text.secondary, fontSize: '1.25rem' }}
      >
        You crushed that session. Ready for the next one?
      </Typography>

      <StatsContainer>
        <StatCard>
          <Typography className="label">Estimated Time</Typography>
          <Typography className="value">
            {formatHumanDuration(activeTask?.estimate_timer)}
          </Typography>
        </StatCard>
        <StatCard>
          <Typography className="label">Real Time</Typography>
          <Typography className="value">
            {formatHumanDuration(
              Number(activeTask?.real_timer?.toFixed(2)) || 0,
            )}
          </Typography>
        </StatCard>
      </StatsContainer>

      <ActionButtonsContainer
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <NextTaskButton
          endIcon={<ArrowForwardIcon />}
          onClick={onClose}
          sx={{ width: 'auto', px: 4 }}
        >
          Finish & Exit to Workspace
        </NextTaskButton>
      </ActionButtonsContainer>
    </CompletionContainer>
  );
};
