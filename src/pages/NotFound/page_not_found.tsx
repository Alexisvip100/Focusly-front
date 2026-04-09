import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bolt,
  Help,
  TimerOff,
  QuestionMark,
  Dashboard as DashboardIcon,
  TaskAlt,
  SupportAgent,
} from '@mui/icons-material';
import { Typography, Box, Avatar, Stack, useTheme, useMediaQuery } from '@mui/material';
import {
  PageContainer,
  Header,
  BrandBox,
  MainContent,
  ContentContainer,
  IconWrapper,
  Badge404,
  QuestionMark as QuestionMarkAnimated,
  Title,
  Description,
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
  SupportLink,
} from './NotFoundPage.styles';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer>
      <Header>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <BrandBox>
            <Bolt sx={{ fontSize: 24 }} />
          </BrandBox>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ fontSize: '18px', letterSpacing: '-0.015em' }}
          >
            Intelligent Focus
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {!isMobile && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                color: '#94a3b8',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: '#137fec' },
              }}
            >
              <Help sx={{ fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                Help Center
              </Typography>
            </Stack>
          )}
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN39mFx2bjPzc30MMZNGh5vo_8k3ClZYFPiaeJRpvB7IUGX03xYqZaMxyia5zj1nANDKr2OvU7bZSdAGJuf_UqgNpGc9Y0pxOHx5s9FWaLo5quNkqq-3dg805wcclCtZqBmIeDuvcEKB-15RB0yV1oyRlgnFO9lCE2lzXGoi-SLY4JqmVAnMDETGXncf97PPmgUYFx7p64GyEem-TnBxdH2g3fJyHpnOu2_SrcXaTnfP8uroLgkhFel4m2cVwaGIYOnuEBhSb2ivc"
            alt="User profile avatar"
            sx={{
              width: 36,
              height: 36,
              border: '2px solid #233648',
            }}
          />
        </Stack>
      </Header>

      <MainContent>
        <ContentContainer>
          <IconWrapper>
            <TimerOff
              sx={{
                fontSize: 84,
                color: 'rgba(19, 127, 236, 0.8)',
                fontWeight: 200,
              }}
            />
            <Badge404>404</Badge404>
            <QuestionMarkAnimated>
              <QuestionMark sx={{ fontSize: 24 }} />
            </QuestionMarkAnimated>
          </IconWrapper>

          <Title variant="h1">Out of Focus</Title>

          <Description variant="body1">
            Oops! The page you are looking for has slipped through the cracks of time. It might have
            been moved, deleted, or never existed in your timeline.
          </Description>

          <ButtonContainer>
            <PrimaryButton startIcon={<DashboardIcon />} onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </PrimaryButton>
            <SecondaryButton
              startIcon={<TaskAlt />}
              onClick={() => navigate('/dashboard')} // Assuming View My Tasks also goes to dashboard for now
            >
              View My Tasks
            </SecondaryButton>
          </ButtonContainer>

          <SupportLink href="#">
            <SupportAgent sx={{ fontSize: 16 }} />
            Need help? Contact Support
          </SupportLink>
        </ContentContainer>
      </MainContent>

      {/* Decorative footer background element */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background:
            'linear-gradient(to right, transparent, rgba(19, 127, 236, 0.3), transparent)',
        }}
      />
    </PageContainer>
  );
};

export default NotFoundPage;
