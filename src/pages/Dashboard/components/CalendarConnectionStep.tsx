import React, { useState } from 'react';
import { Typography, Box, Stack, CircularProgress } from '@mui/material';
import { EventAvailable, CalendarMonth, Lock } from '@mui/icons-material';
import {
  ProgressBarContainer,
  ProgressBarTrack,
  ProgressBarFill,
  HeroContainer,
  HeroDecoration,
  HeroIconCard,
  IntegrationCard,
  IconContainer,
  ConnectButton,
} from '../Dashboard.styles';
import { useGoogleLogin } from '@react-oauth/google';
import axios from '@/api/axiosInstance';

interface CalendarConnectionStepProps {
  onNext: () => void;
}

import { useDispatch } from 'react-redux';
import { login } from '@/redux/auth/auth.slice';
import { AuthProviders } from '@/pages/Login/types/Login.types';
import { setEvents } from '@/redux/calendar/calendar.slice';
import type { GoogleCalendarEvent } from '@/redux/calendar/calendar.types';
import { fetchGoogleEvents } from '@/api/GoogleCalendar/googleCalendarApi';

const CalendarConnectionStep: React.FC<CalendarConnectionStepProps> = ({ onNext }) => {
  // token no longer needed here as we use useGoogleLogin for the specific scope
  const [events, setEventsLocal] = useState<GoogleCalendarEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getCalendarEvents = async () => {
    setIsLoading(true);
    setConnectingProvider('google');

    try {
      const fetchedEvents = await fetchGoogleEvents();

      const safeEvents = fetchedEvents || [];
      setEventsLocal(safeEvents);

      // Map and dispatch to store
      dispatch(setEvents(safeEvents));

      setIsConnected(true);
    } catch (error) {
      console.error('Error al obtener eventos de google:', error);
    } finally {
      setIsLoading(false);
      setConnectingProvider(null);
    }
  };

  const loginToGoogleCalendar = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar',
    // @ts-expect-error: prompt is a valid Google OAuth parameter not included in UseGoogleLoginOptionsAuthCodeFlow types
    prompt: 'consent',
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        setConnectingProvider('google');
        // Send code to backend to get tokens (and store refresh token)
        const response = await axios.post('/auth/google', {
          code: codeResponse.code,
        });

        // Update Redux with the new user info (which now has the calendar linked)
        dispatch(
          login({
            user: response.data.user,
            isLogged: true,
            provider: AuthProviders.google,
          })
        );

        // After successful link, fetch events via proxy
        await getCalendarEvents();
      } catch (error) {
        console.error('Error exchanging code with backend:', error);
      } finally {
        setIsLoading(false);
        setConnectingProvider(null);
      }
    },
    onError: (error: unknown) => {console.error(error);},
  });

  const calendars = [
    {
      id: 'google',
      name: 'Google Calendar',
      desc: 'Sync events from Google',
      icon: <CalendarMonth sx={{ color: '#EA4335' }} />,
      bgColor: '#f0f4f8',
      darkBgColor: '#233648',
      getEvents: () => loginToGoogleCalendar(),
    },
  ];

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
        {!isConnected ? (
          <>
            <Box textAlign="center" mb={4} mt={4}>
              <Typography
                variant="h5"
                fontWeight="900"
                gutterBottom
                sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}
              >
                Choose a provider
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select your calendar service to continue
              </Typography>
            </Box>

            <Stack spacing={2} mb={4}>
              {calendars.map((cal) => (
                <IntegrationCard key={cal.id}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    onClick={!isLoading ? cal.getEvents : undefined}
                    sx={{
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      width: '100%',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    <IconContainer>{cal.icon}</IconContainer>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {cal.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {cal.desc}
                      </Typography>
                    </Box>
                  </Stack>
                  <ConnectButton onClick={cal.getEvents} disabled={isLoading}>
                    {isLoading && connectingProvider === cal.id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Connect'
                    )}
                  </ConnectButton>
                </IntegrationCard>
              ))}
            </Stack>

            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="500"
                sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                onClick={onNext}
              >
                Skip for now
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <HeroContainer>
              <HeroDecoration />
              <HeroIconCard>
                <EventAvailable sx={{ fontSize: 40, color: 'primary.main' }} />
                <Stack direction="row" spacing={1}>
                  <Box width={8} height={8} borderRadius="50%" bgcolor="#f87171" />
                  <Box width={8} height={8} borderRadius="50%" bgcolor="#facc15" />
                  <Box width={8} height={8} borderRadius="50%" bgcolor="#4ade80" />
                </Stack>
              </HeroIconCard>
            </HeroContainer>

            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                fontWeight="900"
                gutterBottom
                sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
              >
                Calendar Connected!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We successfully retrieved {events.length} events from your calendar.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" px={2}>
              <ConnectButton onClick={onNext} style={{ width: 'auto', padding: '10px 40px' }}>
                Continue
              </ConnectButton>
            </Box>

            <Box display="flex" justifyContent="center" mt={3} gap={1} sx={{ opacity: 0.7 }}>
              <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Your data is encrypted and private.
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CalendarConnectionStep;
