import React from 'react';
import { Container, Stack } from '@mui/material';
import { 
  Menu as MenuIcon, 
  AutoAwesome as AutoAwesomeIcon 
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import {
  Header,
  LogoWrapper,
  LogoIconWrapper,
  LogoText,
  NavbarLink,
  GetStartedButton,
  MobileMenuButton,
} from './Navbar.styles';

const Navbar: React.FC = () => {
  return (
    <Header position="sticky">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 64 }}
        >
          <LogoWrapper component={NavLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <LogoIconWrapper>
              <AutoAwesomeIcon sx={{ fontSize: 20 }} />
            </LogoIconWrapper>
            <LogoText variant="h6">Focusly</LogoText>
          </LogoWrapper>

          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            <NavbarLink component={NavLink} to="/how-it-works">
              How it works
            </NavbarLink>
            <NavbarLink component={NavLink} to="/pricing">
              Pricing
            </NavbarLink>
            <NavbarLink component={NavLink} to="/about">
              About
            </NavbarLink>
            <NavbarLink
              component={NavLink}
              to="login"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                ml: 2,
              }}
            >
              Log In
            </NavbarLink>
            <GetStartedButton variant="contained">Get Started</GetStartedButton>
          </Stack>

          <MobileMenuButton>
            <MenuIcon />
          </MobileMenuButton>
        </Stack>
      </Container>
    </Header>
  );
};

export default Navbar;
