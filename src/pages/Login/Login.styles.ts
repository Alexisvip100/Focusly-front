import { Box, Button, InputBase, Paper, Typography, styled } from '@mui/material';

// --- Global Page Wrapper ---
export const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontFamily: "'Inter', sans-serif",
}));

// --- Background Decorations ---
export const TopRightBlob = styled(Box)({
  position: 'absolute',
  top: '-10%',
  right: '-10%',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'rgba(19, 127, 236, 0.2)', // Primary blue low opacity
  filter: 'blur(100px)',
  zIndex: 0,
  pointerEvents: 'none',
  opacity: 0.3,
});

export const BottomLeftBlob = styled(Box)({
  position: 'absolute',
  bottom: '-10%',
  left: '-10%',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'rgba(168, 85, 247, 0.1)', // Purple low opacity
  filter: 'blur(80px)',
  zIndex: 0,
  pointerEvents: 'none',
  opacity: 0.2,
});

// --- Main Login Card ---
export const LoginCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  width: '100%',
  maxWidth: '448px', // max-w-md
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
    : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
}));

// --- Form Elements ---
export const FormLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: '6px',
  display: 'block',
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#f1f5f9',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '0.875rem',
    width: '100%',
    padding: '10px 16px',
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#137fec',
      boxShadow: '0 0 0 4px rgba(19, 127, 236, 0.2)',
    },
    '&::placeholder': {
      color: '#64748b', // slate-500
      opacity: 1,
    },
  },
}));

export const ForgotPasswordLink = styled('a')({
  color: '#137fec',
  fontSize: '0.875rem',
  fontWeight: 500,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#60a5fa', // lighter blue
  },
});

export const SignInButton = styled(Button)({
  marginTop: '24px',
  width: '100%',
  padding: '10px 16px',
  backgroundColor: '#137fec',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.875rem',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.25)',
  '&:hover': {
    backgroundColor: '#2563eb', // blue-600
  },
});

// --- Divider ---
export const DividerWrapper = styled(Box)({
  position: 'relative',
  marginTop: '32px',
  marginBottom: '24px',
  textAlign: 'center',
});

export const DividerLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  width: '100%',
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 0,
}));

export const DividerText = styled('span')(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: '0 12px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

// --- Social Buttons ---
export const SocialButtonsStack = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '24px',
});

export const FullWidthSocialButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '10px 16px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  color: theme.palette.text.primary,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '12px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1f2d3b' : theme.palette.action.hover,
    borderColor: theme.palette.mode === 'dark' ? '#334155' : theme.palette.primary.main,
  },
  '& .MuiButton-startIcon': {
    margin: 0,
  },
}));

// --- Header/Footer in Login ---
export const LoginHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '32px',
});

export const IconContainer = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: 'rgba(19, 127, 236, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#137fec',
  marginBottom: '16px',
});
