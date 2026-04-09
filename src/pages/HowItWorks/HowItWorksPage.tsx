import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  PageWrapper,
  MainContent as MainWrapper,
  Footer,
  FooterText,
} from '@/pages/LandingPage/LandingPage.styles';
import {
  HowItWorksSection,
  SectionHeader,
  SectionBadge,
  SectionBadgeText,
  SectionTitle,
  SectionDescription,
  StepGrid,
  StepCard,
  StepNumber,
  StepContent,
  StepIconContainer,
  CTASection,
  CTAContainer,
  CTABackground,
  CTAContent,
  CTATitle,
  CTADescription,
  CTASecondaryButton,
} from './HowItWorksPage.styles';
import {
  HeroPrimaryButton,
  FeatureTitle,
  FeatureDescription,
} from '@/pages/LandingPage/LandingPage.styles';
import Navbar from '@/components/layout/Navbar';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: 'calendar_add_on',
      title: 'Connect your calendar',
      description:
        'Link your Google or Outlook calendars in seconds. We instantly import your meetings and appointments to establish your baseline availability and protect your hard landscape.',
      color: '#137fec',
    },
    {
      number: '2',
      icon: 'psychology',
      title: 'Habit analysis',
      description:
        'Our AI observes your work patterns over time, identifying your peak energy hours, average task duration, and when you naturally need breaks.',
      color: '#a855f7',
    },
    {
      number: '3',
      icon: 'auto_awesome',
      title: 'Automatic daily plan',
      description:
        'Every morning, get a generated schedule that slots your to-do list into the perfect time blocks based on urgency and your energy levels.',
      color: '#14b8a6',
    },
    {
      number: '4',
      icon: 'timelapse',
      title: 'Focus Mode',
      description:
        'When it\'s time for deep work, one click silences notifications, starts a timer, and updates your status on Slack and Teams to "Do Not Disturb".',
      color: '#f97316',
    },
    {
      number: '5',
      icon: 'published_with_changes',
      title: 'Automatic re-organization',
      description:
        'Meeting ran late or an urgent task popped up? The system intelligently reshuffles the rest of your day instantly, so you never have to manually reschedule.',
      color: '#ec4899',
    },
    {
      number: '6',
      icon: 'monitoring',
      title: 'Metrics & insights',
      description:
        'Visualize your productivity trends with detailed analytics. Understand where your time actually goes and receive actionable tips to improve.',
      color: '#6366f1',
    },
  ];

  return (
    <PageWrapper>
      <Navbar />

      <MainWrapper>
        <HowItWorksSection>
          <Container maxWidth="lg">
            <SectionHeader>
              <SectionBadge>
                <SectionBadgeText variant="caption">System Overview</SectionBadgeText>
              </SectionBadge>
              <SectionTitle variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
                How Focusly Works
              </SectionTitle>
              <SectionDescription
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.2rem' }}
              >
                A smart productivity platform that combines calendar, tasks, automatic planning, and
                focus sessions, optimizing your time based on your energy, availability, and real
                habits.
              </SectionDescription>
            </SectionHeader>

            <StepGrid container spacing={4}>
              {steps.map((step) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={step.number}>
                  <StepCard>
                    <StepNumber className="step-number">{step.number}</StepNumber>
                    <StepContent>
                      <StepIconContainer color={step.color} className="step-icon">
                        <span className="material-symbols-outlined">{step.icon}</span>
                      </StepIconContainer>
                      <FeatureTitle variant="h6">{step.title}</FeatureTitle>
                      <FeatureDescription variant="body2">{step.description}</FeatureDescription>
                    </StepContent>
                  </StepCard>
                </Grid>
              ))}
            </StepGrid>
          </Container>
        </HowItWorksSection>

        <CTASection>
          <Container maxWidth="lg">
            <CTAContainer>
              <CTABackground />
              <CTAContent>
                <CTATitle variant="h3">Ready to reclaim your time?</CTATitle>
                <CTADescription variant="body1">
                  Join thousands of professionals who have automated their schedule and multiplied
                  their focus.
                </CTADescription>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    pt: 4,
                  }}
                >
                  <HeroPrimaryButton variant="contained" endIcon={<ArrowForwardIcon />}>
                    Start Free Trial
                  </HeroPrimaryButton>
                  <CTASecondaryButton variant="outlined">View Pricing</CTASecondaryButton>
                </Box>
              </CTAContent>
            </CTAContainer>
          </Container>
        </CTASection>
      </MainWrapper>

      <Footer>
        <FooterText variant="body2">© 2024 Focusly. All rights reserved.</FooterText>
      </Footer>
    </PageWrapper>
  );
};

export default HowItWorksPage;
