import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  TimerContainer,
  TimerCard,
  TimerSeparator,
  ProgressContainer,
  ProgressLabels,
} from '../FocusMode.styles';

interface FocusTimerDisplayProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  progress: number;
}

export const FocusTimerDisplay: React.FC<FocusTimerDisplayProps> = ({
  timeLeft,
  formatTime,
  progress,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <TimerContainer>
        {(() => {
          const timeParts = formatTime(timeLeft).split(':');
          const hasHours = timeParts.length === 3;

          return (
            <>
              {hasHours && (
                <>
                  <TimerCard label="HOURS" sx={{ width: 180, height: 200 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '5rem',
                        lineHeight: 1,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {timeParts[0]}
                    </Typography>
                  </TimerCard>
                  <TimerSeparator>:</TimerSeparator>
                </>
              )}
              <TimerCard
                label="MINUTES"
                sx={{ width: hasHours ? 180 : 220, height: hasHours ? 200 : 240 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: hasHours ? '5rem' : '6rem',
                    lineHeight: 1,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {hasHours ? timeParts[1] : timeParts[0]}
                </Typography>
              </TimerCard>
              <TimerSeparator>:</TimerSeparator>
              <TimerCard
                label="SECONDS"
                sx={{ width: hasHours ? 180 : 220, height: hasHours ? 200 : 240 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: hasHours ? '5rem' : '6rem',
                    lineHeight: 1,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {hasHours ? timeParts[2] : timeParts[1]}
                </Typography>
              </TimerCard>
            </>
          );
        })()}
      </TimerContainer>

      <ProgressContainer>
        <ProgressLabels>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            Session Progress
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            {Math.round(progress)}%
          </Typography>
        </ProgressLabels>
        <Box
          sx={{
            height: 6,
            width: '100%',
            bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.5)',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              bgcolor: '#3b82f6',
              transition: 'width 1s linear',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
          />
        </Box>
      </ProgressContainer>
    </>
  );
};
