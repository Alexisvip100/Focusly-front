import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import {
  CenterFocusStrong,
  Schedule,
  SelfImprovement,
  TrendingUp,
  Checklist,
  MoreHoriz,
  ArrowForward,
} from '@mui/icons-material';
import {
  ProgressBarContainer,
  ProgressBarTrack,
  ProgressBarFill,
  OptionCard,
  IconBox,
} from '../Dashboard.styles';

// Goals data could be moved to a constants file, but keeping here for now as it's specific to this step
const goals = [
  {
    id: 'focus',
    icon: <CenterFocusStrong fontSize="inherit" />,
    title: 'Improve Focus',
    subtitle: 'Minimize distractions & deep work',
  },
  {
    id: 'time',
    icon: <Schedule fontSize="inherit" />,
    title: 'Time Management',
    subtitle: 'Optimize your daily schedule',
  },
  {
    id: 'stress',
    icon: <SelfImprovement fontSize="inherit" />,
    title: 'Reduce Stress',
    subtitle: 'Achieve a healthier balance',
  },
  {
    id: 'productivity',
    icon: <TrendingUp fontSize="inherit" />,
    title: 'Increase Productivity',
    subtitle: 'Get more done in less time',
  },
  {
    id: 'organize',
    icon: <Checklist fontSize="inherit" />,
    title: 'Organize Tasks',
    subtitle: 'Stay on top of things',
  },
  {
    id: 'other',
    icon: <MoreHoriz fontSize="inherit" />,
    title: 'Other',
    subtitle: 'I have a different goal',
  },
];

interface GoalSelectionStepProps {
  selectedGoal: string;
  onSelectGoal: (id: string) => void;
  onNext: () => void;
}

const GoalSelectionStep: React.FC<GoalSelectionStepProps> = ({
  selectedGoal,
  onSelectGoal,
  onNext,
}) => {
  return (
    <>
      <ProgressBarContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontWeight="500">
            Step 1 of 4
          </Typography>
          <Typography variant="caption" color="text.secondary">
            25% Completed
          </Typography>
        </Box>
        <ProgressBarTrack>
          <ProgressBarFill width="25%" />
        </ProgressBarTrack>
      </ProgressBarContainer>

      <Box textAlign="center" mb={4} px={2}>
        <Typography
          variant="h4"
          fontWeight="900"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          What's your main goal?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We'll tailor your experience to help you achieve what matters most.
        </Typography>
      </Box>

      {/* Manual Grid Implementation using Flexbox */}
      <Box display="flex" flexWrap="wrap" mx={-1} px={2}>
        {goals.map((goal) => (
          <Box key={goal.id} width={{ xs: '100%', sm: '50%', md: '33.33%' }} p={1}>
            <OptionCard
              elevation={0}
              selected={selectedGoal === goal.id}
              onClick={() => onSelectGoal(goal.id)}
            >
              <IconBox selected={selectedGoal === goal.id}>
                {React.cloneElement(
                  goal.icon as React.ReactElement<{ style: React.CSSProperties }>,
                  {
                    style: { fontSize: '28px' },
                  }
                )}
              </IconBox>
              <Box>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {goal.title}
                </Typography>
                <Typography
                  variant="body2"
                  color={selectedGoal === goal.id ? 'text.primary' : 'text.secondary'}
                >
                  {goal.subtitle}
                </Typography>
              </Box>
            </OptionCard>
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="flex-end" px={2} mt={4}>
        <Button
          variant="contained"
          disabled={!selectedGoal}
          onClick={onNext}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)',
          }}
          endIcon={<ArrowForward />}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default GoalSelectionStep;
