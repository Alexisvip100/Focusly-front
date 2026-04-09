import {
  styled,
  AppBar,
  Box,
  Link,
  Typography,
  Stack,
  Toolbar,
  Button,
  IconButton,
} from '@mui/material';
import { AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';

// --- Header & Navbar ---
export const Header = styled(AppBar)({
  backgroundColor: 'rgba(17, 26, 34, 0.8)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
});

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const LogoWrapper = styled(Box)<{ component?: React.ElementType; to?: string }>({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: 12,
});

export const LogoIconWrapper = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: 'rgba(19, 127, 236, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

export const LogoIcon = styled(AutoAwesomeIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 20,
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '-0.02em',
  transition: 'color 0.2s',
  '.active &': {
    color: theme.palette.primary.main,
  },
}));

export const NavStack = styled(Stack)(({ theme }) => ({
  display: 'none',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const NavbarLink = styled(Link)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: theme.palette.primary.main },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

export const GetStartedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '8px 16px',
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 700,
  boxShadow: '0 4px 14px 0 rgba(19, 127, 236, 0.39)',
  '&:hover': {
    backgroundColor: '#1171d1',
    boxShadow: '0 6px 20px rgba(19, 127, 236, 0.23)',
  },
}));

export const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const NavLoginButton = styled(Button)({
  fontWeight: 500,
  color: 'inherit',
});
