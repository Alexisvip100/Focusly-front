import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { SyncAlt, Bolt, Check } from '@mui/icons-material';
import {
  ProgressBarTrack,
  ProgressBarFill,
  GradientText,
  LoadingCircleContainer,
  StepItemContainer,
  StepIndicator,
  StepText,
} from '../Dashboard.styles';

interface FinalSetupLoadingStepProps {
  onNext: () => void;
}

const FinalSetupLoadingStep: React.FC<FinalSetupLoadingStepProps> = ({ onNext }) => {
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Importing tasks from integrations' },
    { label: 'Analyzing energy peaks & habits' },
    { label: 'Finalizing weekly schedule' },
  ];

  useEffect(() => {
    // Simulate progress filling up over 4 seconds
    const duration = 4000;
    const intervalTime = 50;
    const stepsCount = duration / intervalTime;
    const increment = 100 / stepsCount;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Calculate currentStepIndex derived from progress to avoid sync setState in effect
  let calculatedStepIndex = 0;
  if (progress < 33) calculatedStepIndex = 0;
  else if (progress < 66) calculatedStepIndex = 1;
  else if (progress < 100) calculatedStepIndex = 2;
  else calculatedStepIndex = 3;

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onNext, 800);
    }
  }, [progress, onNext]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      maxWidth="600px"
      margin="0 auto"
    >
      {/* Central Visual */}
      <LoadingCircleContainer>
        {/* Outer decorative rings mock */}
        <Box
          position="absolute"
          width="160px"
          height="160px"
          borderRadius="50%"
          border="1px solid"
          borderColor="divider"
          sx={{ opacity: 0.5 }}
        />
        <Box
          position="absolute"
          width="224px"
          height="224px"
          borderRadius="50%"
          border="1px dashed"
          borderColor="divider"
          sx={{ opacity: 0.3 }}
        />
        {/* Center Icon */}
        <Box
          width="96px"
          height="96px"
          borderRadius="50%"
          bgcolor="background.default"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="divider"
          boxShadow="0 0 60px -15px rgba(19,127,236,0.3)"
          zIndex={10}
        >
          <SyncAlt
            sx={{
              fontSize: '48px',
              color: 'primary.main',
              animation: 'spin 3s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        </Box>
      </LoadingCircleContainer>

      {/* Headline & Progress */}
      <Box textAlign="center" mb={6} mt={2}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
          Fine-tuning your <br />
          <GradientText>intelligent calendar...</GradientText>
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="400px" mx="auto">
          We are analyzing your habits to create the perfect schedule.
        </Typography>
      </Box>

      {/* Progress Bar Section */}
      <Box width="100%" maxWidth="400px" mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1} px={0.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <Bolt
              sx={{
                color: 'text.secondary',
                fontSize: '20px',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            />
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Optimizing focus blocks...
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight="bold" color="primary.main" fontFamily="monospace">
            {Math.round(progress)}%
          </Typography>
        </Box>

        <ProgressBarTrack sx={{ bgcolor: 'action.hover', height: '12px', padding: '2px' }}>
          <ProgressBarFill
            width={`${progress}%`}
            sx={{
              borderRadius: '999px',
              position: 'relative',
              background: 'linear-gradient(to right, #2563eb, #137fec)',
            }}
          >
            {/* Shiny effect */}
            <Box
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              width="4px"
              bgcolor="rgba(255,255,255,0.3)"
              borderRadius="999px"
            />
          </ProgressBarFill>
        </ProgressBarTrack>
      </Box>

      {/* Smart Processing Steps */}
      <Box
        width="100%"
        maxWidth="400px"
        bgcolor="background.paper"
        border="1px solid"
        borderColor="divider"
        borderRadius="12px"
        p={3}
        boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        sx={{ backdropFilter: 'blur(12px)' }}
      >
        <Stack spacing={2}>
          {steps.map((step, index) => {
            let state: 'completed' | 'active' | 'pending' = 'pending';
            if (index < calculatedStepIndex) state = 'completed';
            else if (index === calculatedStepIndex) state = 'active';

            return (
              <StepItemContainer key={index}>
                <StepIndicator state={state}>
                  {state === 'completed' && <Check sx={{ fontSize: '14px' }} />}
                  {state === 'active' && (
                    <Box
                      width="10px"
                      height="10px"
                      borderRadius="50%"
                      bgcolor="primary.main"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        borderRadius="50%"
                        bgcolor="primary.main"
                        sx={{
                          animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                          '@keyframes ping': {
                            '75%, 100%': { transform: 'scale(2)', opacity: 0 },
                          },
                        }}
                      />
                    </Box>
                  )}
                </StepIndicator>
                <StepText state={state}>{step.label}</StepText>
              </StepItemContainer>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default FinalSetupLoadingStep;
