import React from 'react';
import { Container, Stack, Avatar, Box, Grid } from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon, 
  PlayCircleOutline as PlayCircleOutlineIcon 
} from '@mui/icons-material';
import {
  PageWrapper,
  MainContent as MainWrapper,
  HeroSection,
  HeroGrid,
  HeroBgDecoration,
  HeroContentStack,
  HeroBadge,
  HeroBadgeText,
  StatusDotWrapper,
  StatusDotPulse,
  StatusDotCenter,
  HeroTitle,
  HeroGradientText,
  HeroDescription,
  HeroPrimaryButton,
  HeroSecondaryButton,
  HeroSocialAvatarGroup,
  HeroImageWrapper,
  HeroImageBackground,
  OverlayCard,
  BadgeIconBox,
  StatusIndicatorIcon,
  StatusLabel,
  StatusValue,
  EnergyCard,
  EnergyIconBox,
  EnergyIcon,
  EnergyLabel,
  ProgressBarWrapper,
  ProgressBarFill,
  MetricLabel,
  FeaturesStrip,
  FeatureCard,
  FeatureIconBox,
  FeatureTitle,
  FeatureDescription,
  Footer,
  FooterText,
} from './LandingPage.styles';
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
} from '@/pages/HowItWorks/HowItWorksPage.styles';
import Navbar from '@/components/layout/Navbar';

const LandingPage: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: 'calendar_add_on',
      title: 'Connect your calendar',
      description:
        'Link your Google or Outlook calendars in seconds. We instantly import your meetings and appointments to establish your baseline availability.',
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
        'When it\'s time for deep work, one click silences notifications, starts a timer, and updates your status to "Do Not Disturb".',
      color: '#f97316',
    },
    {
      number: '5',
      icon: 'published_with_changes',
      title: 'Automatic re-organization',
      description:
        'Meeting ran late or an urgent task popped up? The system intelligently reshuffles the rest of your day instantly.',
      color: '#ec4899',
    },
    {
      number: '6',
      icon: 'monitoring',
      title: 'Metrics & insights',
      description:
        'Visualize your productivity trends with detailed analytics. Understand where your time actually goes and receive actionable tips.',
      color: '#6366f1',
    },
  ];

  return (
    <PageWrapper>
      <Navbar />

      <MainWrapper>
        <HeroSection>
          <HeroBgDecoration />

          <Container maxWidth="lg">
            <HeroGrid container spacing={8}>
              <Grid size={{ xs: 12, md: 6 }}>
                <HeroContentStack spacing={4}>
                  <HeroBadge>
                    <StatusDotWrapper>
                      <StatusDotPulse />
                      <StatusDotCenter />
                    </StatusDotWrapper>
                    <HeroBadgeText variant="caption">AI Powered Productivity</HeroBadgeText>
                  </HeroBadge>

                  <HeroTitle variant="h1">
                    Organize your day with AI and{' '}
                    <HeroGradientText>focus on what matters.</HeroGradientText>
                  </HeroTitle>

                  <HeroDescription variant="body1">
                    Focusly learns your habits and energy levels to build the perfect schedule for
                    you. Stop planning, start doing.
                  </HeroDescription>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <HeroPrimaryButton
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Start Your Journey
                    </HeroPrimaryButton>
                    <HeroSecondaryButton
                      variant="outlined"
                      size="large"
                      startIcon={<PlayCircleOutlineIcon />}
                    >
                      Watch Demo
                    </HeroSecondaryButton>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <HeroSocialAvatarGroup max={4}>
                      <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuASvp08irYPQnxkzbjjLwJyRG7en12csWr8DYSXylHoWBTrL8UykeXCAA-iGmI4sAtu4PAqvnR9IXgY8-d3JJkRPiP6sBMpjUgBp7IqW-eElWCam725z38w9k7BP4DDcyfynSyeJqIXJd8n4yxtAZApsZtbZg6Ztm-RVNPWh0B_wdzlL_VXARvbB744jKYMqC4g5eXrdTpP_V4k5vtADFibcesvGXVhf5188drmS1llcWWuEcbfI1jpx2vBBRa23f7DvAU4_f2wbCk" />
                      <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuA55VmqkCP_oPHKHMJMC6gFyEjJVlAyOqObWU0VwCQEYQbzemo62ZA50tW59qDr0qom-ggc-0PIO_6vD0I512AQjo5XrD5aDCyCmbNatiiSi80IcNhkwcGTdnJ2RDLF8PXOsc6DVoLyv22IVsXXEyYpzwBxiEqId0Xv1lyKzos4hG-NeU55kFW5ivXF_2GtZjs81THCIfVsfsGWJ6nCyxPgxays05axMLC5BQ6tBOQF7mwzUSUDGC-lSHRiBP8yxHAPH_IrJ-qgZs" />
                      <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm2jgaJS3ykFcZ7AMOsGNlMmJgSGe9zAMYYKnN-VQ8h1t3FXc3Sy9mNrMRuYOShR7f-4t3kD6kZAVvm3Os35KwQff2JQf8veS4xefDGaIy4F_pGtmMU2G_B-wrDki0DDwvKGjVkLiPwaewq69NiI1Pe5qD3TGC5LPAjm2YwvmPXpH-AbgjC0n0CTpSEe8XhH-GrC5NaOwRL9EocCLqunHPsw0yOpOn5HQsVK0Jz5p7FuH0hTJHav_jsW6yb-5eyVtPUdxeLpzRwkE" />
                      <Avatar>+2k</Avatar>
                    </HeroSocialAvatarGroup>
                    <MetricLabel variant="body2">
                      Join 10,000+ focused professionals optimizing their time.
                    </MetricLabel>
                  </Stack>
                </HeroContentStack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <HeroImageWrapper>
                  <HeroImageBackground
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClAYeCzdC7jc8Lo3cEVbGqeOPd_n5JnA_onYKDTh7ikWN9srNqmbwTgvI6ynkvthRW4NEaw_K4ltUMqsCg_MUSVZe9l6NP8-HxWu0l259CyRwk0OTY9ueifhqTCW-TYPbbfmWDquBZ-BsPs1I6tWVG1hXabWrsF2GTEO0-Yat-wC6pZGvCv5vgLjZ387wcC7tm-yDoQPWuwcrv8SUqJz9cXyfojmdvYUMS3p2-Mtg8il7PUilf21LQLXEjEYJ_oRYZVupH2CZjwJo"
                    alt="Productivity Dashboard"
                  />

                  <OverlayCard>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <BadgeIconBox>
                        <StatusIndicatorIcon />
                      </BadgeIconBox>
                      <Box>
                        <StatusLabel variant="caption">Status</StatusLabel>
                        <StatusValue variant="body2">Focus Mode On</StatusValue>
                      </Box>
                    </Stack>
                  </OverlayCard>

                  <EnergyCard>
                    <Stack direction="column" spacing={1} alignItems="center">
                      <EnergyIconBox>
                        <EnergyIcon />
                      </EnergyIconBox>
                      <EnergyLabel variant="caption">High Energy Block</EnergyLabel>
                    </Stack>
                    <ProgressBarWrapper>
                      <ProgressBarFill />
                    </ProgressBarWrapper>
                    <MetricLabel variant="caption">85% Optimal</MetricLabel>
                  </EnergyCard>
                </HeroImageWrapper>
              </Grid>
            </HeroGrid>
          </Container>
        </HeroSection>

        <HowItWorksSection>
          <Container maxWidth="lg">
            <SectionHeader>
              <SectionBadge>
                <SectionBadgeText variant="caption">System Overview</SectionBadgeText>
              </SectionBadge>
              <SectionTitle variant="h2">How Focusly Works</SectionTitle>
              <SectionDescription variant="body1" color="text.secondary">
                A smart productivity platform that combines calendar, tasks, automatic planning, and
                focus sessions, optimizing your time based on your energy and real habits.
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={4}>
                  <HeroPrimaryButton variant="contained" endIcon={<ArrowForwardIcon />}>
                    Start Free Trial
                  </HeroPrimaryButton>
                  <CTASecondaryButton variant="outlined">View Pricing</CTASecondaryButton>
                </Stack>
              </CTAContent>
            </CTAContainer>
          </Container>
        </CTASection>

        <FeaturesStrip>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FeatureCard>
                  <FeatureIconBox>
                    <EnergyIcon />
                  </FeatureIconBox>
                  <FeatureTitle variant="h6">Energy-based Scheduling</FeatureTitle>
                  <FeatureDescription variant="body2">
                    AI analyzes your peak performance hours to schedule complex tasks when you're
                    most alert.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FeatureCard>
                  <FeatureIconBox bgColor="rgba(156, 39, 176, 0.1)">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 32, color: '#9c27b0' }}
                    >
                      sync
                    </span>
                  </FeatureIconBox>
                  <FeatureTitle variant="h6">Smart Calendar Sync</FeatureTitle>
                  <FeatureDescription variant="body2">
                    Seamlessly integrates with Google & Outlook to protect your time and prevent
                    double-booking.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FeatureCard>
                  <FeatureIconBox bgColor="rgba(0, 150, 136, 0.1)">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 32, color: '#009688' }}
                    >
                      psychology
                    </span>
                  </FeatureIconBox>
                  <FeatureTitle variant="h6">Deep Focus Sessions</FeatureTitle>
                  <FeatureDescription variant="body2">
                    Automatically blocks notifications and sets strict boundaries during your
                    critical work blocks.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
            </Grid>
          </Container>
        </FeaturesStrip>
      </MainWrapper>

      <Footer>
        <FooterText variant="body2">© 2024 Focusly. All rights reserved.</FooterText>
      </Footer>
    </PageWrapper>
  );
};

export default LandingPage;
