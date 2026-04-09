import { styled, Box, Typography, Button, Container } from '@mui/material';

export const PricingSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const BackgroundDecoration = styled(Box)(() => ({
  position: 'absolute',
  top: '-10%',
  left: '-10%',
  width: 600,
  height: 600,
  backgroundColor: 'rgba(19, 127, 236, 0.2)',
  borderRadius: '50%',
  filter: 'blur(120px)',
  pointerEvents: 'none',
  opacity: 0.4,
}));

export const BackgroundDecorationBottom = styled(Box)({
  position: 'absolute',
  bottom: '-10%',
  right: '-10%',
  width: 500,
  height: 500,
  backgroundColor: 'rgba(19, 127, 236, 0.1)',
  borderRadius: '50%',
  filter: 'blur(100px)',
  pointerEvents: 'none',
  opacity: 0.4,
});

export const SectionHeader = styled(Box)({
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto 64px',
  position: 'relative',
  zIndex: 1,
});

export const PricingTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '2.5rem',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
  },
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, #60a5fa)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const PricingCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPopular',
})<{ isPopular?: boolean }>(({ theme, isPopular }) => ({
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: 24,
  backgroundColor: '#192633',
  border: isPopular ? `2px solid ${theme.palette.primary.main}` : '1px solid #233648',
  height: isPopular ? '100%' : 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  boxShadow: isPopular ? '0 25px 50px -12px rgba(19, 127, 236, 0.2)' : 'none',
  transform: isPopular ? 'scale(1.05)' : 'none',
  zIndex: isPopular ? 10 : 1,
  '&:hover': {
    boxShadow: isPopular
      ? '0 25px 50px -12px rgba(19, 127, 236, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    transform: 'none',
    boxShadow: 'none',
  },
}));

export const PopularBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: theme.spacing(4),
  marginTop: -12,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontSize: '10px',
  fontWeight: 700,
  padding: '4px 12px',
  borderRadius: '9999px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  boxShadow: '0 4px 12px rgba(19, 127, 236, 0.3)',
}));

export const PlanTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: 8,
});

export const PriceWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  marginBottom: 8,
});

export const FeatureList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: `${theme.spacing(4)} 0`,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FeatureItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  '& .material-symbols-outlined': {
    fontSize: 20,
    color: theme.palette.primary.main,
    flexShrink: 0,
  },
}));

export const FeatureItemPro = styled(FeatureItem)(() => ({
  color: 'white',
  fontWeight: 500,
}));

export const PricingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: 'outlined' | 'contained' }>(({ theme, variant }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: 12,
  fontWeight: 700,
  textTransform: 'none',
  width: '100%',
  transition: 'all 0.2s ease',
  ...(variant === 'outlined'
    ? {
        border: '1px solid #233648',
        color: 'white',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      }
    : {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        boxShadow: '0 10px 25px rgba(19, 127, 236, 0.25)',
        '&:hover': {
          backgroundColor: '#1171d1',
          boxShadow: '0 15px 30px rgba(19, 127, 236, 0.35)',
        },
      }),
}));

export const StatsSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  paddingTop: theme.spacing(6),
  borderTop: '1px solid #233648',
}));

export const StatItem = styled(Box)(() => ({
  textAlign: 'center',
}));

export const StatValue = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  marginBottom: 4,
});

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));
