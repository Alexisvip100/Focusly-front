import React, { useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';

import {
  DashboardContainer,
  GlowEffect,
  ContentWrapper,
  MainCard,
  StepWrapper,
} from './Dashboard.styles';
import GoalSelectionStep from './components/GoalSelectionStep';
import CalendarConnectionStep from './components/CalendarConnectionStep';
import WorkHoursStep from './components/WorkHoursStep';
import FocusBlocksStep from './components/FocusBlocksStep';
import FinalSetupLoadingStep from './components/FinalSetupLoadingStep';
import ProfileCompletionStep from './components/ProfileCompletionStep';
import Home from '@/pages/Home/Home';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { completeOnboarding } from '@/redux/auth/auth.slice';

import { FocuslyLogo } from '@/components/ui';

const Dashboard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const dispatch = useAppDispatch();
  const { onboardingCompleted } = useAppSelector((state) => state.auth);

  

  if (onboardingCompleted) {
    return <Home />;
  }

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleGoalSelect = (id: string) => {
    setSelectedGoal(id);
  };

  const handleFinalSetupComplete = () => {
    dispatch(completeOnboarding());
  };

  if (step === 7) {
    return <Home />;
  }

  return (
    <DashboardContainer>
      <GlowEffect />

      {/* Header */}
      <Box
        px={{ xs: 2, md: 4 }}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        zIndex={10}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <FocuslyLogo size={24} />
          <Typography variant="h6" fontWeight="bold" color="inherit">
            Focusly
          </Typography>
        </Stack>
        {step < 5 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
          >
            Skip
          </Typography>
        )}
      </Box>

      <ContentWrapper zIndex={10}>
        <MainCard>
          {step === 1 && (
            <StepWrapper key="step1">
              <ProfileCompletionStep onNext={handleNext} />
            </StepWrapper>
          )}
          {step === 2 && (
            <StepWrapper key="step2">
              <GoalSelectionStep
                selectedGoal={selectedGoal}
                onSelectGoal={handleGoalSelect}
                onNext={handleNext}
              />
            </StepWrapper>
          )}
          {step === 3 && (
            <StepWrapper key="step3">
              <CalendarConnectionStep onNext={handleNext} />
            </StepWrapper>
          )}
          {step === 4 && (
            <StepWrapper key="step4">
              <WorkHoursStep onNext={handleNext} />
            </StepWrapper>
          )}
          {step === 5 && (
            <StepWrapper key="step5">
              <FocusBlocksStep onNext={handleNext} />
            </StepWrapper>
          )}
          {step === 6 && (
            <StepWrapper key="step6">
              <FinalSetupLoadingStep onNext={handleFinalSetupComplete} />
            </StepWrapper>
          )}
        </MainCard>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
