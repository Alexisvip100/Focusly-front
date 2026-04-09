import { Box, Paper, alpha, styled, Slider, Typography } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column' as const,
  position: 'relative' as const,
  overflowX: 'hidden' as const,
}));

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '40px 16px',
  '@media (min-width: 768px)': {
    padding: '40px 80px',
  },
  '@media (min-width: 1024px)': {
    padding: '40px 160px',
  },
  justifyContent: 'center',
  alignItems: 'center',
});

export const MainCard = styled(Box)({
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const ProgressBarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '16px',
  padding: '16px',
});

export const ProgressBarTrack = styled(Box)(({ theme }) => ({
  height: '8px',
  width: '100%',
  backgroundColor: theme.palette.divider,
  borderRadius: '9999px',
  overflow: 'hidden',
}));

export const ProgressBarFill = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  transition: 'width 0.5s ease-out',
}));

export const OptionCard = styled(Paper)<{ selected?: boolean }>(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px',
  borderRadius: '12px',
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: selected
    ? alpha(theme.palette.primary.main, 0.1)
    : theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
}));

export const IconBox = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: selected
    ? theme.palette.primary.main
    : theme.palette.mode === 'dark'
      ? '#2a3b4d'
      : theme.palette.grey[200],
  color: selected ? '#ffffff' : theme.palette.text.secondary,
  transition: 'background-color 0.2s ease, color 0.2s ease',
}));

export const GlowEffect = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  overflow: 'hidden',
  display: theme.palette.mode === 'light' ? 'none' : 'block', // Only show glow in dark mode
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    filter: 'blur(120px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    filter: 'blur(100px)',
  },
}));

export const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '2/1',
  overflow: 'hidden',
  borderRadius: '16px',
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
}));

export const HeroDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.1,
  backgroundImage: `radial-gradient(${theme.palette.primary.main} 1px, transparent 1px)`,
  backgroundSize: '20px 20px',
}));

export const HeroIconCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  padding: '24px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  border: `1px solid ${theme.palette.divider}`,
}));

export const IntegrationCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.5),
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? '#233648' : theme.palette.grey[200],
}));

export const ConnectButton = styled(Box)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  height: '36px',
  minWidth: '84px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontSize: '14px',
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.7 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: disabled
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.primary.main, 0.2),
  },
}));

export const StepWrapper = styled(Box)({
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

export const DayButton = styled('button')<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: selected ? 'none' : `1px solid ${theme.palette.divider}`,
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? '#ffffff' : theme.palette.text.secondary,
  fontSize: '14px',
  fontWeight: selected ? 700 : 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.action.hover,
    boxShadow: selected ? `0 4px 6px -1px ${alpha(theme.palette.primary.main, 0.25)}` : 'none',
  },
}));

export const TimeInputContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const TimeInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '10px 12px 10px 40px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontSize: '14px',
  fontWeight: 500,
  outline: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
  },
  '&::-webkit-calendar-picker-indicator': {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
    cursor: 'pointer',
  },
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: theme.palette.divider,
  },
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
}));

export const LoadingCircleContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px',
});

export const StepItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
});

export const StepIndicator = styled(Box)<{ state: 'completed' | 'active' | 'pending' }>(
  ({ theme, state }) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(state === 'completed' && {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      color: theme.palette.success.main,
    }),
    ...(state === 'active' && {
      backgroundColor: theme.palette.primary.main,
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
    }),
    ...(state === 'pending' && {
      border: `2px solid ${theme.palette.divider}`,
      backgroundColor: 'transparent',
    }),
  })
);

export const StepText = styled(Typography)<{ state: 'completed' | 'active' | 'pending' }>(
  ({ theme, state }) => ({
    fontSize: '0.875rem',
    ...(state === 'completed' && {
      color: theme.palette.text.secondary,
      textDecoration: 'line-through',
    }),
    ...(state === 'active' && {
      color: theme.palette.text.primary,
      fontWeight: 600,
    }),
    ...(state === 'pending' && {
      color: theme.palette.text.secondary,
    }),
  })
);

// Profile Step Styles
export const ProfileAvatarContainer = styled(Box)({
  position: 'relative',
  width: '100px',
  height: '100px',
  margin: '0 auto 12px',
});

export const ProfileImage = styled(Box)<{ src?: string }>(({ theme, src }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  backgroundImage: src ? `url(${src})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: `2px border ${alpha(theme.palette.text.primary, 0.1)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

export const AddIconButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

export const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '8px',
  display: 'block',
}));

export const ProfileInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.2s',
  '&::placeholder': {
    color: alpha(theme.palette.text.secondary, 0.5),
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : theme.palette.background.paper,
    boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
  },
}));

export const ProfileTextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: '15px',
  outline: 'none',
  resize: 'none',
  minHeight: '120px',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  '&::placeholder': {
    color: alpha(theme.palette.text.secondary, 0.5),
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : theme.palette.background.paper,
    boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
  },
}));

export const PrimaryButton = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  boxShadow: theme.palette.mode === 'dark' 
    ? `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`
    : `0 4px 14px ${alpha(theme.palette.primary.main, 0.2)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.5)}`,
    filter: 'brightness(1.1)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));
