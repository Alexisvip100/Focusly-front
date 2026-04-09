import { Box, Button, Typography, alpha, keyframes, styled } from '@mui/material';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  position: 'relative',
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '16px 24px',
  whiteSpace: 'nowrap',
  '@media (min-width: 768px)': {
    padding: '16px 40px',
  },
}));

export const BrandBox = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

export const MainContent = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 16px',
  '@media (min-width: 768px)': {
    padding: '48px 160px',
  },
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '640px',
  width: '100%',
  alignItems: 'center',
  textAlign: 'center',
  animation: `${fadeInUp} 0.5s ease-out`,
});

export const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '128px',
  height: '128px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: '32px',
  '@media (min-width: 768px)': {
    width: '160px',
    height: '160px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-16px',
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    filter: 'blur(24px)',
    opacity: 0.7,
    pointerEvents: 'none',
  },
}));

export const Badge404 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: '-8px',
  backgroundColor: theme.palette.error.main,
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 8px',
  borderRadius: '9999px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.background.paper}`,
}));

export const QuestionMark = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  left: '-8px',
  color: theme.palette.text.secondary,
  animation: `${bounce} 1s infinite`,
  animationDelay: '100ms',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 800,
  lineHeight: 1.25,
  letterSpacing: '-0.025em',
  color: theme.palette.text.primary,
  marginBottom: '16px',
  '@media (min-width: 768px)': {
    fontSize: '48px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.625,
  color: theme.palette.text.secondary,
  maxWidth: '512px',
  marginBottom: '32px',
  '@media (min-width: 768px)': {
    fontSize: '18px',
  },
}));

export const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  gap: '16px',
  padding: '0 16px',
  maxWidth: '480px',
  '@media (min-width: 640px)': {
    flexDirection: 'row',
    width: 'auto',
  },
});

export const PrimaryButton = styled(Button)(({ theme }) => ({
  height: '48px',
  padding: '0 32px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.2)}`,
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  height: '48px',
  padding: '0 32px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '8px',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
  },
}));

export const SupportLink = styled('a')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '48px',
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
