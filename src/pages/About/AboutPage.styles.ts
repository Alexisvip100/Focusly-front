import { styled, Box, Typography } from '@mui/material';

// --- Hero Section ---
export const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  overflow: 'hidden',
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(12, 0),
  },
}));

export const HeroBgGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: -80,
  marginTop: -80,
  width: 500,
  height: 500,
  backgroundColor: 'rgba(19, 127, 236, 0.2)',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.5,
  pointerEvents: 'none',
  ...(theme.palette.mode === 'dark' && {
    opacity: 0.3,
  }),
}));

export const MissionBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '9999px',
  backgroundColor: '#eff6ff', // blue-50
  border: '1px solid #dbeafe', // blue-100
  width: 'fit-content',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

export const MissionBadgeText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '2.5rem',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.75rem',
  },
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, #60a5fa)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  maxWidth: '36rem',
  marginBottom: theme.spacing(4),
}));

export const HeroImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '4/3',
  borderRadius: 16,
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
  backgroundColor: '#f8fafc',
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(8),
    minHeight: 400,
  },
}));

export const HeroImageOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.6,
});

export const ProblemCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 48,
  left: 32,
  backgroundColor: '#192633',
  backdropFilter: 'blur(4px)',
  padding: theme.spacing(2),
  borderRadius: 12,
  maxWidth: 220,
  transform: 'rotate(-3deg)',
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'rotate(0deg)',
  },
  zIndex: 2,
}));

export const SolutionCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 48,
  right: 32,
  backgroundColor: '#192633',
  backdropFilter: 'blur(4px)',
  padding: theme.spacing(2.5),
  borderRadius: 12,
  maxWidth: 260,
  transform: 'rotate(2deg)',
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'rotate(0deg)',
  },
  zIndex: 2,
}));

// --- Values Section ---
export const ValuesSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#0d141c' : 'white',
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(10, 0),
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  backgroundColor: '#192633',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#233648' : '#f3f4f6'}`, // surface-border : gray-100
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    borderColor: 'rgba(19, 127, 236, 0.3)',
  },
}));

export const ValueIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ theme, color }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2.5),
  backgroundColor: color, // The color prop will be the bg with opacity already? Or pass raw color and apply opacity here?
  // Design says bg-blue-100 text-primary, bg-purple-100 text-purple-500 etc.
  // We'll pass the exact bg color string for simplicity or handle it in component
}));

export const ValueTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

export const ValueDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

// --- Vision Section ---
export const VisionSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

export const VisionQuote = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  fontWeight: 500,
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    fontSize: '1.875rem',
  },
}));
