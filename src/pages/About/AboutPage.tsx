import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Stack,
  Box,
  Avatar,
  AvatarGroup,
  Button,
} from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import {
  Footer,
  FooterText,
  PageWrapper,
  MainContent,
} from '@/pages/LandingPage/LandingPage.styles';
import {
  HeroSection,
  HeroBgGradient,
  MissionBadge,
  MissionBadgeText,
  HeroTitle,
  GradientText,
  HeroDescription,
  HeroImageContainer,
  HeroImageOverlay,
  ProblemCard,
  SolutionCard,
  ValuesSection,
  ValueCard,
  ValueIconBox,
  ValueTitle,
  ValueDescription,
  VisionSection,
  VisionQuote,
} from './AboutPage.styles';

const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Clarity',
      description:
        'A clear view of what matters now. Noise and future worries are filtered out so you can execute.',
      icon: 'visibility',
      color: '#dbeafe', // blue-100
      textColor: '#137fec', // primary
    },
    {
      title: 'Control',
      description:
        'The algorithm suggests, but you decide. Regain agency over your time with smart automation.',
      icon: 'tune',
      color: '#f3e8ff', // purple-100
      textColor: '#a855f7', // purple-500
    },
    {
      title: 'Organization',
      description:
        'Tasks, habits, and meetings in one unified ecosystem. Nothing slips through the cracks.',
      icon: 'grid_view',
      color: '#e0e7ff', // indigo-100
      textColor: '#6366f1', // indigo-500
    },
    {
      title: 'Flow',
      description:
        'Deep work blocks are protected automatically, allowing you to enter a state of uninterrupted creation.',
      icon: 'water',
      color: '#ccfbf1', // teal-100
      textColor: '#14b8a6', // teal-500
    },
    {
      title: 'Less Stress',
      description:
        'When life happens, our AI reschedules for you. No more anxiety about rearranging 15 calendar events.',
      icon: 'spa',
      color: '#ffe4e6', // rose-100
      textColor: '#f43f5e', // rose-500
    },
    {
      title: 'More Focus',
      description:
        'We act as a shield for your attention, blocking distractions during your high-performance windows.',
      icon: 'center_focus_strong',
      color: '#fef3c7', // amber-100
      textColor: '#f59e0b', // amber-500
    },
  ];

  return (
    <PageWrapper>
      <Navbar />

      <MainContent>
        <HeroSection>
          <HeroBgGradient />
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, lg: 6 }} sx={{ zIndex: 10 }}>
                <MissionBadge>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16, color: '#137fec' }}
                  >
                    lightbulb
                  </span>
                  <MissionBadgeText>Our Mission</MissionBadgeText>
                </MissionBadge>

                <HeroTitle variant="h1">
                  Helping you find <GradientText>flow in the chaos.</GradientText>
                </HeroTitle>

                <HeroDescription>
                  We believe that productivity isn't about squeezing more hours into your day—it's
                  about matching your work to your energy.
                  <br />
                  <br />
                  Focusly was built to solve the disconnect between rigid calendars and human
                  biology. By combining tasks, scheduling, and habit tracking, we provide a system
                  that adapts to you, not the other way around.
                </HeroDescription>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.25)',
                    }}
                  >
                    Join Our Journey
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    endIcon={
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                        arrow_forward
                      </span>
                    }
                    sx={{ fontWeight: 500, color: 'text.primary', px: 4 }}
                  >
                    Read Our Manifesto
                  </Button>
                </Stack>

                <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 2 }}
                  >
                    Trusted by teams at
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={4}
                    sx={{
                      opacity: 0.6,
                      filter: 'grayscale(100%)',
                      transition: 'all 0.3s',
                      '&:hover': { filter: 'grayscale(0)', opacity: 1 },
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span className="material-symbols-outlined">diamond</span>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Gemini
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span className="material-symbols-outlined">change_history</span>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Vertex
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span className="material-symbols-outlined">all_inclusive</span>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Flow
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span className="material-symbols-outlined">bolt</span>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Bolt
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <HeroImageContainer>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClAYeCzdC7jc8Lo3cEVbGqeOPd_n5JnA_onYKDTh7ikWN9srNqmbwTgvI6ynkvthRW4NEaw_K4ltUMqsCg_MUSVZe9l6NP8-HxWu0l259CyRwk0OTY9ueifhqTCW-TYPbbfmWDquBZ-BsPs1I6tWVG1hXabWrsF2GTEO0-Yat-wC6pZGvCv5vgLjZ387wcC7tm-yDoQPWuwcrv8SUqJz9cXyfojmdvYUMS3p2-Mtg8il7PUilf21LQLXEjEYJ_oRYZVupH2CZjwJo"
                    alt="Abstract visualization of a digital calendar interface"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.1)',
                    }}
                  />
                  <HeroImageOverlay />

                  <ProblemCard>
                    <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          p: 0.5,
                          bgcolor: '#fee2e2',
                          borderRadius: 1,
                          color: 'error.main',
                          display: 'flex',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                          warning
                        </span>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, alignSelf: 'center' }}>
                        The Problem
                      </Typography>
                    </Stack>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ lineHeight: 1.4, display: 'block' }}
                    >
                      Overwhelmed schedules, scattered tasks, and constant context switching
                      draining mental energy.
                    </Typography>
                  </ProblemCard>

                  <SolutionCard>
                    <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: 'rgba(19, 127, 236, 0.1)',
                          borderRadius: 1,
                          color: '#137fec',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          auto_awesome
                        </span>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#137fec',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            display: 'block',
                          }}
                        >
                          The Solution
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Adaptive Planning
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 16, color: 'success.main' }}
                        >
                          check
                        </span>
                        <Typography variant="caption" color="text.secondary">
                          Optimized for energy
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 16, color: 'success.main' }}
                        >
                          check
                        </span>
                        <Typography variant="caption" color="text.secondary">
                          Habit-aware scheduling
                        </Typography>
                      </Stack>
                    </Stack>
                  </SolutionCard>
                </HeroImageContainer>
              </Grid>
            </Grid>
          </Container>
        </HeroSection>

        <ValuesSection>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 8 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Designed to change how you feel about work.
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                We don't just organize your calendar. We engineer a state of mind. Every feature in
                Focusly is crafted to generate a specific feeling.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {values.map((value) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={value.title}>
                  <ValueCard>
                    <ValueIconBox color={value.color}>
                      <span
                        className="material-symbols-outlined"
                        style={{ color: value.textColor }}
                      >
                        {value.icon}
                      </span>
                    </ValueIconBox>
                    <ValueTitle>{value.title}</ValueTitle>
                    <ValueDescription>{value.description}</ValueDescription>
                  </ValueCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ValuesSection>

        <VisionSection>
          <Container maxWidth="md">
            <Stack alignItems="center" textAlign="center">
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: '0.1em', mb: 2 }}
              >
                The Vision
              </Typography>
              <VisionQuote>
                "We envision a world where technology doesn't just demand your attention, but
                protects it. Where your calendar acts as a compassionate assistant, understanding
                that you are human, not a machine."
              </VisionQuote>

              <Stack direction="row" alignItems="center" spacing={4} sx={{ mt: 4 }}>
                <AvatarGroup max={4}>
                  <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuASvp08irYPQnxkzbjjLwJyRG7en12csWr8DYSXylHoWBTrL8UykeXCAA-iGmI4sAtu4PAqvnR9IXgY8-d3JJkRPiP6sBMpjUgBp7IqW-eElWCam725z38w9k7BP4DDcyfynSyeJqIXJd8n4yxtAZApsZtbZg6Ztm-RVNPWh0B_wdzlL_VXARvbB744jKYMqC4g5eXrdTpP_V4k5vtADFibcesvGXVhf5188drmS1llcWWuEcbfI1jpx2vBBRa23f7DvAU4_f2wbCk" />
                  <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuA55VmqkCP_oPHKHMJMC6gFyEjJVlAyOqObWU0VwCQEYQbzemo62ZA50tW59qDr0qom-ggc-0PIO_6vD0I512AQjo5XrD5aDCyCmbNatiiSi80IcNhkwcGTdnJ2RDLF8PXOsc6DVoLyv22IVsXXEyYpzwBxiEqId0Xv1lyKzos4hG-NeU55kFW5ivXF_2GtZjs81THCIfVsfsGWJ6nCyxPgxays05axMLC5BQ6tBOQF7mwzUSUDGC-lSHRiBP8yxHAPH_IrJ-qgZs" />
                  <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm2jgaJS3ykFcZ7AMOsGNlMmJgSGe9zAMYYKnN-VQ8h1t3FXc3Sy9mNrMRuYOShR7f-4t3kD6kZAVvm3Os35KwQff2JQf8veS4xefDGaIy4F_pGtmMU2G_B-wrDki0DDwvKGjVkLiPwaewq69NiI1Pe5qD3TGC5LPAjm2YwvmPXpH-AbgjC0n0CTpSEe8XhH-GrC5NaOwRL9EocCLqunHPsw0yOpOn5HQsVK0Jz5p7FuH0hTJHav_jsW6yb-5eyVtPUdxeLpzRwkE" />
                </AvatarGroup>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Join the movement
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    10,000+ early adopters
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Container>
        </VisionSection>
      </MainContent>

      <Footer>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <span className="material-symbols-outlined" style={{ color: '#137fec' }}>
            auto_awesome
          </span>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Focusly
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 4 }}>
          {['Twitter', 'LinkedIn', 'Contact'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
        <FooterText variant="body2">© 2024 Focusly. All rights reserved.</FooterText>
      </Footer>
    </PageWrapper>
  );
};

export default AboutPage;
