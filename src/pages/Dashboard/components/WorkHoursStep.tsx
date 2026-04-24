import React, { useState } from 'react';
import { Typography, Box, Stack, Divider, Button } from '@mui/material';
import { Schedule, WbSunny, NightsStay, Lock } from '@mui/icons-material';
import {
  ProgressBarContainer,
  ProgressBarTrack,
  ProgressBarFill,
  HeroContainer,
  HeroDecoration,
  DayButton,
  TimeInputContainer,
  TimeInput,
} from '../Dashboard.styles';

import { useAppSelector } from '@/redux/hooks';
import { UserUpdate } from '@/api/User/apiUser';
import type { UserResponse } from '@/api/User/apiUserType';

interface WorkHoursStepProps {
  onNext: () => void;
}

const WorkHoursStep: React.FC<WorkHoursStepProps> = ({ onNext }) => {
  const { user } = useAppSelector((state) => state.auth);
  const days = [
    { label: 'M', value: 'Mon' },
    { label: 'T', value: 'Tue' },
    { label: 'W', value: 'Wed' },
    { label: 'T', value: 'Thu' },
    { label: 'F', value: 'Fri' },
    { label: 'S', value: 'Sat' },
    { label: 'S', value: 'Sun' },
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    if (user?.id) {
      try {
        const currentSettings = (user.settings ?? {}) as Record<string, unknown>;
        await UserUpdate(user.id, {
          settings: {
            ...currentSettings,
            workHoursConfig: {
              selectedDays,
              startTime,
              endTime,
            },
          },
        } as unknown as Partial<UserResponse>);
      } catch (error) {
        console.error('Failed to save work hours', error);
      }
    }
    onNext();
  };

  return (
    <>
      <ProgressBarContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontWeight="500">
            Step 2 of 4
          </Typography>
          <Typography variant="caption" color="text.secondary">
            50% Completed
          </Typography>
        </Box>
        <ProgressBarTrack>
          <ProgressBarFill width="50%" />
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
            <Schedule sx={{ fontSize: 40, color: 'primary.main' }} />
            <Stack direction="row" spacing={1}>
              <Box width={6} height={6} borderRadius="50%" bgcolor="rgba(19, 127, 236, 0.4)" />
              <Box width={6} height={6} borderRadius="50%" bgcolor="rgba(19, 127, 236, 0.6)" />
              <Box width={6} height={6} borderRadius="50%" bgcolor="#137fec" />
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
            Set Your Work Hours
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Define your typical schedule so we can plan tasks during your most productive hours
            without encroaching on personal time.
          </Typography>
        </Box>

        <Box
          bgcolor="background.paper"
          p={3}
          borderRadius="12px"
          border="1px solid"
          borderColor="divider"
          boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
          mb={4}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="body2" fontWeight="bold">
                  Work Days
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Mon - Fri
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={1}>
                {days.map((day) => (
                  <DayButton
                    key={day.value} // Value is unique (Mon, Tue, etc.)
                    selected={selectedDays.includes(day.value)}
                    onClick={() => toggleDay(day.value)}
                  >
                    {day.label}
                  </DayButton>
                ))}
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" fontWeight="bold" mb={1.5}>
                Daily Schedule
              </Typography>
              <Box display="flex" gap={2}>
                <Box width="50%">
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography variant="caption" color="text.secondary" fontWeight="500">
                      Start Time
                    </Typography>
                    <TimeInputContainer>
                      <WbSunny
                        sx={{
                          position: 'absolute',
                          left: '12px',
                          fontSize: '20px',
                          color: 'text.secondary',
                        }}
                      />
                      <TimeInput
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </TimeInputContainer>
                  </Box>
                </Box>
                <Box width="50%">
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography variant="caption" color="text.secondary" fontWeight="500">
                      End Time
                    </Typography>
                    <TimeInputContainer>
                      <NightsStay
                        sx={{
                          position: 'absolute',
                          left: '12px',
                          fontSize: '20px',
                          color: 'text.secondary',
                        }}
                      />
                      <TimeInput
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </TimeInputContainer>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

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

        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={3}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="500"
            sx={{
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: 'text.primary' },
            }}
            onClick={onNext}
          >
            I'll set this later
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            bgcolor="background.paper"
            px={1.5}
            py={0.75}
            borderRadius="999px"
            border="1px solid"
            borderColor="divider"
          >
            <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Your schedule is private and encrypted.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WorkHoursStep;
