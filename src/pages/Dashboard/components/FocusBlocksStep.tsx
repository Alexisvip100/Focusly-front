import React, { useState } from 'react';
import { Typography, Box, Stack, Divider, Button } from '@mui/material';
import { Tune, Timelapse, LocalCafe, Info } from '@mui/icons-material';
import {
  ProgressBarContainer,
  ProgressBarTrack,
  ProgressBarFill,
  HeroContainer,
  HeroDecoration,
  StyledSlider,
} from '../Dashboard.styles';

import { useAppSelector } from '@/redux/hooks';
import { UserUpdate } from '@/api/User/apiUser';
import type { UserResponse } from '@/api/User/apiUserType';

interface FocusBlocksStepProps {
  onNext: () => void;
}

const FocusBlocksStep: React.FC<FocusBlocksStepProps> = ({ onNext }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [focusLength, setFocusLength] = useState<number>(45);
  const [shortBreak, setShortBreak] = useState<number>(5);
  const [longBreak, setLongBreak] = useState<number>(15);

  const handleFocusChange = (_event: Event, newValue: number | number[]) => {
    setFocusLength(newValue as number);
  };

  const handleShortBreakChange = (_event: Event, newValue: number | number[]) => {
    setShortBreak(newValue as number);
  };

  const handleLongBreakChange = (_event: Event, newValue: number | number[]) => {
    setLongBreak(newValue as number);
  };

  const handleUseDefaults = () => {
    setFocusLength(25);
    setShortBreak(5);
    setLongBreak(15);
  };

  const handleSave = async () => {
    if (user?.id) {
      try {
        const currentSettings = (user.settings ?? {}) as Record<string, unknown>;
        await UserUpdate(user.id, {
          settings: {
            ...currentSettings,
            focusDurationPref: focusLength,
            breakDurationPref: shortBreak,
          },
        } as Partial<UserResponse>);
      } catch (error) {
        console.error('Failed to save focus blocks', error);
      }
    }
    onNext();
  };

  return (
    <>
      <ProgressBarContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontWeight="500">
            Step 3 of 4
          </Typography>
          <Typography variant="caption" color="text.secondary">
            75% Completed
          </Typography>
        </Box>
        <ProgressBarTrack>
          <ProgressBarFill width="75%" />
        </ProgressBarTrack>
      </ProgressBarContainer>

      <Box px={2}>
        <HeroContainer>
          <HeroDecoration />
          <Box
            position="relative"
            zIndex={10}
            p={3}
            bgcolor="background.paper"
            borderRadius="16px"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1.5}
            border="1px solid"
            borderColor="divider"
          >
            <Tune sx={{ fontSize: 40, color: 'primary.main' }} />
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box width={24} height={8} borderRadius={1} bgcolor="primary.main" />
              <Box width={8} height={8} borderRadius={1} bgcolor="rgba(19, 127, 236, 0.3)" />
              <Box width={24} height={8} borderRadius={1} bgcolor="primary.main" />
              <Box width={8} height={8} borderRadius={1} bgcolor="rgba(19, 127, 236, 0.3)" />
              <Box width={24} height={8} borderRadius={1} bgcolor="primary.main" />
            </Stack>
          </Box>
        </HeroContainer>

        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="900"
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', md: '2rem' } }}
          >
            Customize Focus Blocks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set your preferred duration for deep work sessions and breaks. We'll structure your
            intelligent calendar around your rhythm.
          </Typography>
        </Box>

        <Stack spacing={3} mb={4}>
          <Box
            bgcolor="background.paper"
            p={3}
            borderRadius="12px"
            border="1px solid"
            borderColor="divider"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
            sx={{ transition: 'all 0.2s', '&:hover': { borderColor: 'rgba(19, 127, 236, 0.3)' } }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                width={40}
                height={40}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="rgba(19, 127, 236, 0.1)"
                borderRadius="8px"
                color="primary.main"
              >
                <Timelapse />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Focus Session
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Deep work duration
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight="500" color="text.secondary">
                  Length
                </Typography>
                <Box
                  bgcolor="action.hover"
                  px={1.5}
                  py={0.5}
                  borderRadius="6px"
                  border="1px solid"
                  borderColor="divider"
                >
                  <Typography variant="body2" fontWeight="bold">
                    {focusLength} min
                  </Typography>
                </Box>
              </Box>

              <Box>
                <StyledSlider
                  value={focusLength}
                  min={15}
                  max={90}
                  step={5}
                  onChange={handleFocusChange}
                />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500">
                    15M
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight="500">
                    90M
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            bgcolor="background.paper"
            p={3}
            borderRadius="12px"
            border="1px solid"
            borderColor="divider"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
            sx={{ transition: 'all 0.2s', '&:hover': { borderColor: 'rgba(19, 127, 236, 0.3)' } }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                width={40}
                height={40}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="rgba(19, 127, 236, 0.1)"
                borderRadius="8px"
                color="primary.main"
              >
                <LocalCafe />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Recovery Breaks
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Rest & recharge
                </Typography>
              </Box>
            </Box>

            <Stack spacing={3}>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" fontWeight="500">
                    Short Break
                  </Typography>
                  <Box
                    bgcolor="action.hover"
                    px={1.5}
                    py={0.5}
                    borderRadius="6px"
                    border="1px solid"
                    borderColor="divider"
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {shortBreak} min
                    </Typography>
                  </Box>
                </Box>
                <StyledSlider
                  value={shortBreak}
                  min={2}
                  max={15}
                  step={1}
                  onChange={handleShortBreakChange}
                />
                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                  Taken after every focus session.
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" fontWeight="500">
                    Long Break
                  </Typography>
                  <Box
                    bgcolor="action.hover"
                    px={1.5}
                    py={0.5}
                    borderRadius="6px"
                    border="1px solid"
                    borderColor="divider"
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {longBreak} min
                    </Typography>
                  </Box>
                </Box>
                <StyledSlider
                  value={longBreak}
                  min={10}
                  max={60}
                  step={5}
                  onChange={handleLongBreakChange}
                />
                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                  Taken after 4 consecutive sessions.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            bgcolor="rgba(19, 127, 236, 0.05)"
            p={2}
            borderRadius="12px"
            border="1px solid rgba(19, 127, 236, 0.1)"
            display="flex"
            gap={2}
          >
            <Info sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              <Box component="span" fontWeight="600" color="primary.main">
                How this affects your day:{' '}
              </Box>
              We will look for available slots in your calendar and fill them with these focus
              blocks, ensuring you never overwork without a break.
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2} mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 10px 15px -3px rgba(19, 127, 236, 0.25)',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            Save & Continue
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={handleUseDefaults}
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                bgcolor: 'transparent',
              },
            }}
          >
            Use Pomodoro defaults (25m / 5m)
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default FocusBlocksStep;
