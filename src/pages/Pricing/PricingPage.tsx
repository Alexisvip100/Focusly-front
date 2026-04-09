import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import {
  Footer,
  FooterText,
  PageWrapper,
  MainContent,
} from '@/pages/LandingPage/LandingPage.styles';
import {
  PricingSection,
  BackgroundDecoration,
  BackgroundDecorationBottom,
  SectionHeader,
  PricingTitle,
  GradientText,
  PricingCard,
  PopularBadge,
  PlanTitle,
  PriceWrapper,
  FeatureList,
  FeatureItem,
  FeatureItemPro,
  PricingButton,
  StatsSection,
  StatItem,
  StatValue,
  StatLabel,
} from './PricingPage.styles';

const PricingPage: React.FC = () => {
  return (
    <PageWrapper>
      <Navbar />

      <MainContent>
        <PricingSection>
          <BackgroundDecoration />
          <BackgroundDecorationBottom />

          <Container maxWidth="lg">
            <SectionHeader>
              <PricingTitle variant="h1">
                Simple, transparent <GradientText>pricing</GradientText>
              </PricingTitle>
              <Typography variant="body1" color="text.secondary">
                Unlock your full potential with Focusly. Choose the plan that fits your workflow.
              </Typography>
            </SectionHeader>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
              sx={{ maxWidth: 1000, mx: 'auto' }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <PricingCard>
                  <Box>
                    <PlanTitle variant="h6">Basic</PlanTitle>
                    <PriceWrapper>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        $0
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        /month
                      </Typography>
                    </PriceWrapper>
                    <Typography variant="body2" color="text.secondary">
                      For individuals getting started with focus habits.
                    </Typography>
                  </Box>

                  <FeatureList>
                    <FeatureItem>
                      <span className="material-symbols-outlined">check</span>
                      <span>Smart Calendar & Task List</span>
                    </FeatureItem>
                    <FeatureItem>
                      <span className="material-symbols-outlined">check</span>
                      <span>3 Focus Sessions per day</span>
                    </FeatureItem>
                    <FeatureItem>
                      <span className="material-symbols-outlined">check</span>
                      <span>Basic Habit Tracking</span>
                    </FeatureItem>
                    <FeatureItem>
                      <span className="material-symbols-outlined">check</span>
                      <span>7-Day History</span>
                    </FeatureItem>
                  </FeatureList>

                  <PricingButton variant="outlined">Get Started</PricingButton>
                </PricingCard>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <PricingCard isPopular>
                  <PopularBadge>Most Popular</PopularBadge>
                  <Box>
                    <PlanTitle variant="h6">Pro</PlanTitle>
                    <PriceWrapper>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        $12
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        /month
                      </Typography>
                    </PriceWrapper>
                    <Typography variant="body2" color="text.secondary">
                      For power users who need full AI optimization.
                    </Typography>
                  </Box>

                  <FeatureList>
                    <FeatureItemPro>
                      <span className="material-symbols-outlined">check_circle</span>
                      <span>Unlimited Focus Sessions</span>
                    </FeatureItemPro>
                    <FeatureItemPro>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      <span>AI Automatic Planning</span>
                    </FeatureItemPro>
                    <FeatureItemPro>
                      <span className="material-symbols-outlined">check_circle</span>
                      <span>Energy-based Auto-scheduling</span>
                    </FeatureItemPro>
                    <FeatureItemPro>
                      <span className="material-symbols-outlined">sync</span>
                      <span>Google & Outlook Sync</span>
                    </FeatureItemPro>
                    <FeatureItemPro>
                      <span className="material-symbols-outlined">bar_chart</span>
                      <span>Advanced Analytics</span>
                    </FeatureItemPro>
                  </FeatureList>

                  <PricingButton variant="contained">Upgrade to Pro</PricingButton>
                </PricingCard>
              </Grid>
            </Grid>

            <StatsSection maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                <Grid size={{ xs: 6, md: 3 }}>
                  <StatItem>
                    <StatValue>14 Days</StatValue>
                    <StatLabel>Free Trial</StatLabel>
                  </StatItem>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <StatItem>
                    <StatValue>Cancel</StatValue>
                    <StatLabel>Anytime</StatLabel>
                  </StatItem>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <StatItem>
                    <StatValue>Secure</StatValue>
                    <StatLabel>Payment</StatLabel>
                  </StatItem>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <StatItem>
                    <StatValue>24/7</StatValue>
                    <StatLabel>Support</StatLabel>
                  </StatItem>
                </Grid>
              </Grid>
            </StatsSection>
          </Container>
        </PricingSection>
      </MainContent>

      <Footer>
        <FooterText variant="body2">© 2024 Focusly. All rights reserved.</FooterText>
      </Footer>
    </PageWrapper>
  );
};

export default PricingPage;
