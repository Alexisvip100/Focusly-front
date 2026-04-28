import Joyride, { STATUS, type Step, type CallBackProps } from 'react-joyride';
import { useTheme } from '@mui/material';

interface OnboardingWrapperProps {
  steps: Step[];
  run: boolean;
  onFinish?: () => void;
}

export const OnboardingWrapper = ({
  steps,
  run,
  onFinish,
}: OnboardingWrapperProps) => {
  const theme = useTheme();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      if (onFinish) onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          textColor: theme.palette.text.primary,
          arrowColor: theme.palette.background.paper,
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
          borderRadius: '12px',
          padding: '10px',
        },
        buttonNext: {
          borderRadius: '8px',
          fontWeight: 600,
          padding: '8px 16px',
        },
        buttonBack: {
          marginRight: '10px',
          color: theme.palette.text.secondary,
        },
        buttonSkip: {
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
};
