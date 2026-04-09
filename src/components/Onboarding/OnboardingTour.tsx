import React, { useState } from 'react';
import Joyride, { STATUS, type CallBackProps, type Step } from 'react-joyride';
import { useTheme } from '@mui/material';

const TOUR_STORAGE_KEY = 'focusly_tour_seen';

export const OnboardingTour: React.FC = () => {
  const theme = useTheme();
  const [run, setRun] = useState(() => !localStorage.getItem(TOUR_STORAGE_KEY));

  const steps: Step[] = [
    {
      target: '#joyride-logo',
      content: 'Welcome to Focusly! Your new hub for productivity and focus.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '#joyride-add-task',
      content: 'Start by adding your first task. You can set durations, priorities, and Folders.',
      placement: 'right',
    },
    {
      target: '#joyride-daily-plan',
      content: 'The Daily Plan shows your schedule. Drag and drop tasks to organize your day.',
      placement: 'right',
    },
    {
      target: '#joyride-calendar',
      content: 'This is your interactive calendar. Click anywhere to block time for focused work.',
      placement: 'bottom',
    },
    {
      target: '#joyride-insights',
      content:
        'Track your performance and "Golden Hours" to understand when you are most productive.',
      placement: 'right',
    },
    {
      target: '#joyride-energy',
      content: 'We predict your energy levels based on your habits to help you avoid slumps.',
      placement: 'top',
    },
    {
      target: '#joyride-chat-ai',
      content: 'Need help? Our AI assistant can help you organize tasks or give productivity tips.',
      placement: 'left',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: theme.palette.background.paper,
          backgroundColor: theme.palette.background.paper,
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: theme.palette.primary.main,
          textColor: theme.palette.text.primary,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 20,
          fontFamily: '"Outfit", sans-serif',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonBack: {
          color: theme.palette.text.secondary,
          marginRight: 10,
        },
        buttonNext: {
          borderRadius: 8,
          fontWeight: 700,
        },
        buttonSkip: {
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
};
