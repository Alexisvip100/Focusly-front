import { useState, useEffect } from 'react';
import { Dialog, Box, Typography, Button, styled } from '@mui/material';
import {
  AutoAwesome as SparklesIcon,
  Bolt as LightningIcon,
  Sync as SyncIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useAppSelector } from '@/redux/hooks';

import packageJson from '../../../package.json';

export const CURRENT_RELEASE_VERSION = packageJson.version;

const releaseData = {
  title: "What's New in FocusCal",
  description:
    "System performance improvements and critical bug fixes for better reliability. We've optimized the kinetic engine for even smoother deep work transitions.",
  features: [
    {
      icon: <LightningIcon sx={{ color: '#4ade80', fontSize: 16 }} />,
      text: '30% faster dashboard load times',
    },
    {
      icon: <SyncIcon sx={{ color: '#60a5fa', fontSize: 16 }} />,
      text: 'Calendar sync integrity patch',
    },
  ],
};

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#0f1115' : '#ffffff',
  borderRadius: '24px',
  padding: theme.spacing(4, 3, 3, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: '0 auto',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#0f172a',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 25px 50px -12px rgba(0,0,0,0.5)'
      : '0px 25px 50px -12px rgba(0,0,0,0.1)',
  border:
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.05)'
      : '1px solid rgba(0,0,0,0.05)',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(59, 130, 246, 0.15)'
      : 'rgba(59, 130, 246, 0.1)',
  borderRadius: '16px',
  width: 56,
  height: 56,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '24px',
  color: theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
}));

const Title = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  marginBottom: '16px',
  textAlign: 'center',
  letterSpacing: '-0.02em',
});

const DividerLine = styled(Box)({
  width: '32px',
  height: '3px',
  backgroundColor: '#3b82f6',
  borderRadius: '2px',
  marginBottom: '20px',
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
  textAlign: 'center',
  lineHeight: 1.5,
  marginBottom: '24px',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.03)'
      : 'rgba(0,0,0,0.02)',
  border:
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.05)'
      : '1px solid rgba(0,0,0,0.05)',
  borderRadius: '12px',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  marginBottom: '12px',
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 600,
  color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155',
}));

const AcceptButton = styled(Button)({
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  borderRadius: '12px',
  padding: '12px',
  width: '100%',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

export const ReleaseModal = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  useEffect(() => {
    // Only show if user is logged in
    if (!user) return;

    const lastSeenVersion = localStorage.getItem('focusly_last_seen_version');

    if (lastSeenVersion !== CURRENT_RELEASE_VERSION) {
      setTimeout(() => handleOpen(), 30);
    }
  }, [user]);

  const handleAccept = () => {
    localStorage.setItem('focusly_last_seen_version', CURRENT_RELEASE_VERSION);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={handleAccept}
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backgroundImage: 'none',
          overflow: 'visible',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <ModalContainer>
        <IconWrapper>
          <SparklesIcon sx={{ fontSize: 28 }} />
        </IconWrapper>

        <Title>{releaseData.title}</Title>
        <DividerLine />

        <Description>{releaseData.description}</Description>

        {releaseData.features.map((feature, idx) => (
          <FeatureCard key={idx}>
            {feature.icon}
            <FeatureText>{feature.text}</FeatureText>
          </FeatureCard>
        ))}

        <Box
          sx={{
            width: '100%',
            mt: 1,
            p: '4px',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '16px',
          }}
        >
          <AcceptButton onClick={handleAccept} disableElevation>
            Accept <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </AcceptButton>
        </Box>
      </ModalContainer>
    </Dialog>
  );
};
