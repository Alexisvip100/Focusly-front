import { styled, Box, Typography, Stack, Grid } from '@mui/material';
import { HeroSecondaryButton } from '@/pages/LandingPage/LandingPage.styles';

// --- How It Works Section ---
export const HowItWorksSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
}));

export const SectionHeader = styled(Box)({
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto 64px',
});

export const SectionBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  marginBottom: theme.spacing(3),
  borderRadius: '9999px',
  backgroundColor: 'rgba(19, 127, 236, 0.1)',
  border: '1px solid rgba(19, 127, 236, 0.2)',
}));

export const SectionBadgeText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

export const SectionDescription = styled(Typography)({
  maxWidth: 600,
  margin: '0 auto',
});

export const StepGrid = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(4),
}));

export const StepCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: 24,
  backgroundColor: '#192633',
  border: '1px solid #233648',
  height: '100%',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    borderColor: 'rgba(19, 127, 236, 0.5)',
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    '& .step-number': {
      color: 'rgba(19, 127, 236, 0.1)',
    },
    '& .step-icon': {
      transform: 'scale(1.1)',
    },
  },
}));

export const StepNumber = styled(Typography)({
  position: 'absolute',
  top: -10,
  right: 10,
  fontSize: '8rem',
  fontWeight: 900,
  color: 'rgba(255, 255, 255, 0.03)',
  lineHeight: 1,
  userSelect: 'none',
  zIndex: 0,
});

export const StepContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
});

export const StepIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  width: 56,
  height: 56,
  borderRadius: 16,
  backgroundColor: color ? `${color}1A` : 'rgba(19, 127, 236, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  border: `1px solid ${color ? `${color}33` : 'rgba(19, 127, 236, 0.2)'}`,
  transition: 'transform 0.3s ease',
  '& .material-symbols-outlined': {
    fontSize: 32,
    color: color || theme.palette.primary.main,
  },
}));

// --- CTA Section ---
export const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#0d141c',
}));

export const CTAContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 32,
  overflow: 'hidden',
  backgroundColor: '#192633',
  border: '1px solid #233648',
  padding: theme.spacing(8, 4),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 8),
  },
}));

export const CTABackground = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.1,
  backgroundImage:
    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyYHd7Egj3A8A-lVcReMf_I1xrbcd4MVKMCHIa6KtM9qIFxHenzLGT8USZe4V_2Mnl710o3VPw1PSXB0GCBAvV8eLtWZurTu-oVfhUHvBx4j5UOpy0LUU5qGxidsKJnQE_og7sOwinpWActpwzQDCedrFHNcQ9_SqT1MJPOrIk53-FlVlEI-wonnKBbbJyDChxdum3aGqc9oES_pJI9B4zyCc7ThP8ws7u__urj_bDypi0ES_PCz61OjSywHL1IlyyOhnpGLmjvB8")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const CTAContent = styled(Stack)({
  spacing: 4,
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
});

export const CTATitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: 'white',
  marginBottom: theme.spacing(2),
}));

export const CTADescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  maxWidth: 600,
});

export const CTASecondaryButton = styled(HeroSecondaryButton)({
  color: 'white',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
});
