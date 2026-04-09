import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import { 
  CheckCircle as CheckCircleIcon, 
  Bolt as BoltIcon, 
  Sync as SyncIcon, 
  Psychology as PsychologyIcon 
} from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
// --- Animations ---
export const heroPulseAnimation = {
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
};

export const bounceAnimation = {
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
};

// --- Page Layout ---
export const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const MainContent = styled('main')({
  flexGrow: 1,
});

// --- Hero Section ---
export const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

export const HeroGrid = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export const HeroBgDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -100,
  right: -100,
  width: 500,
  height: 500,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.15,
  pointerEvents: 'none',
}));

export const HeroContentStack = styled(Stack)({
  position: 'relative',
  zIndex: 1,
});

export const HeroBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '9999px',
  backgroundColor: 'rgba(19, 127, 236, 0.1)',
  border: '1px solid rgba(19, 127, 236, 0.2)',
  width: 'fit-content',
}));

export const HeroBadgeText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));

export const StatusDotWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  width: 8,
  height: 8,
});

export const StatusDotPulse = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  ...heroPulseAnimation,
}));

export const StatusDotCenter = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  fontWeight: 900,
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '4rem',
  },
}));

export const HeroGradientText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  background: 'linear-gradient(to right, #137fec, #60a5fa)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem',
  maxWidth: 480,
  lineHeight: 1.6,
}));

export const HeroPrimaryButton = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(4),
  height: 52,
  fontWeight: 700,
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s',
  },
}));

export const HeroSecondaryButton = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(4),
  height: 52,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.text.secondary,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

export const HeroSocialAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  '& .MuiAvatar-root': {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.default}`,
    fontSize: '12px',
    fontWeight: 700,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
}));

// --- Hero Image & Cards ---
export const HeroImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '4/3',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const HeroImageBackground = styled('img')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const OverlayCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 32,
  right: 32,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  padding: 16,
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  animation: 'bounce 3s infinite',
  ...bounceAnimation,
}));

export const BadgeIconBox = styled(Box)({
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  padding: 8,
  borderRadius: 6,
  display: 'flex',
});

export const StatusIndicatorIcon = styled(CheckCircleIcon)({
  color: '#4caf50',
  fontSize: 18,
});

export const StatusLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  display: 'block',
  textTransform: 'uppercase',
}));

export const StatusValue = styled(Typography)({
  fontWeight: 700,
});

export const EnergyCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 32,
  left: 32,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  padding: theme.spacing(2),
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  width: '40%',
  minWidth: 180,
}));

export const EnergyIconBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(19, 127, 236, 0.1)',
  padding: theme.spacing(1),
  borderRadius: (theme.shape.borderRadius as number) * 1.2,
  display: 'flex',
  flexDirection: 'column',
}));

export const EnergyIcon = styled(BoltIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 16,
}));

export const EnergyLabel = styled(Typography)({
  fontWeight: 600,
});

export const ProgressBarWrapper = styled(Box)({
  height: 6,
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: 12,
  overflow: 'hidden',
});

export const ProgressBarFill = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '85%',
  backgroundColor: theme.palette.primary.main,
  borderRadius: 12,
}));

export const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'block',
  textAlign: 'right',
  marginTop: theme.spacing(0.5),
  fontSize: '10px',
}));

// --- Features Section ---
export const FeaturesStrip = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : '#f8fafc',
  padding: theme.spacing(10, 0),
}));

export const FeaturesGrid = styled(Grid)({
  flexWrap: 'nowrap',
});

export const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 10px 30px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(19, 127, 236, 0.05)'}`,
    transform: 'translateY(-4px)',
  },
}));

interface FeatureIconBoxProps {
  bgColor?: string;
}

export const FeatureIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<FeatureIconBoxProps>(({ theme, bgColor }) => ({
  width: 48,
  height: 48,
  borderRadius: (theme.shape.borderRadius as number) * 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: bgColor || 'rgba(19, 127, 236, 0.1)',
}));

export const FeatureIconSync = styled(SyncIcon)({
  color: '#9c27b0',
  fontSize: 32,
});

export const FeatureIconPsychology = styled(PsychologyIcon)({
  color: '#009688',
  fontSize: 32,
});

export const FeatureTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: 12,
});

export const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

// --- Footer ---
export const Footer = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(4, 0),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
