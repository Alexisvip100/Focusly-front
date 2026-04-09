import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Button , alpha} from '@mui/material';
import { 
  Lock as LockIcon, 
  Google as GoogleIcon, 
  Apple as AppleIcon, 
  Email as EmailIcon 
} from '@mui/icons-material';
import {
  PageWrapper,
  TopRightBlob,
  BottomLeftBlob,
  LoginCard,
  LoginHeader,
  IconContainer,
  FormLabel,
  StyledInput,
  SignInButton,
  DividerWrapper,
  DividerLine,
  DividerText,
  SocialButtonsStack,
  FullWidthSocialButton,
} from './Login.styles';
import { useLogin } from './Login.hook';

export const Login: React.FC = () => {
  const {
    loginGoogle,
    isLoading,
    email,
    fullName,
    isRegistering,
    handleEmailChange,
    handleFullNameChange,
    onSignIn,
    linkSent,
    setLinkSent,
    completeMagicLinkSignIn,
  } = useLogin();

  useEffect(() => {
    // Verificar si estamos volviendo de un link de login
    void completeMagicLinkSignIn();
  }, [completeMagicLinkSignIn]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSignIn();
    }
  };

  return (
    <PageWrapper>
      <TopRightBlob />
      <BottomLeftBlob />

      <LoginCard elevation={0}>
        <LoginHeader>
          <IconContainer>
            <LockIcon fontSize="medium" />
          </IconContainer>
          <Typography variant="h5" fontWeight="700" color="text.primary" gutterBottom>
            {isRegistering ? 'Create Account' : 'Welcome back'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isRegistering
              ? 'Join our intelligent workspace'
              : 'Log in to your intelligent workspace'}
          </Typography>
        </LoginHeader>

        {linkSent ? (
          <Box textAlign="center" py={4}>
            <IconContainer style={{ margin: '0 auto 24px', backgroundColor: '#137fec20' }}>
              <EmailIcon style={{ color: '#137fec' }} />
            </IconContainer>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Check your email
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              We've sent a magic link to <strong>{email}</strong>. <br />
              Click the link to sign in instantly.
            </Typography>
            <Button
              variant="text"
              onClick={() => setLinkSent(false)}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Back to sign in
            </Button>
          </Box>
        ) : (
          <Box component="form" onKeyDown={handleKeyDown}>
            {isRegistering && (
              <Box mb={2}>
                <FormLabel>Full Name</FormLabel>
                <StyledInput
                  fullWidth
                  placeholder="John Doe"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </Box>
            )}

            <Box mb={2}>
              <FormLabel>Email</FormLabel>
              <StyledInput
                fullWidth
                placeholder="name@example.com"
                name="email"
                type="email"
                disabled={isLoading}
                autoComplete="username"
                value={email}
                onChange={handleEmailChange}
              />
            </Box>

            <SignInButton
              variant="contained"
              disableElevation
              onClick={onSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isRegistering ? (
                'Send Sign Up Link'
              ) : (
                'Send Magic Link'
              )}
            </SignInButton>
          </Box>
        )}

        <DividerWrapper>
          <DividerLine />
          <DividerText>Or continue with</DividerText>
        </DividerWrapper>

        <SocialButtonsStack>
          <FullWidthSocialButton
            type="button"
            onClick={() => loginGoogle()}
            disabled={isLoading}
            startIcon={<GoogleIcon sx={{ fontSize: '20px' }} />}
          >
            Sign in with Google
          </FullWidthSocialButton>

          <FullWidthSocialButton
            type="button"
            disabled={isLoading}
            startIcon={<AppleIcon sx={{ fontSize: '20px' }} />}
          >
            Sign in with Apple
          </FullWidthSocialButton>
        </SocialButtonsStack>

        <Box
          mt={4}
          textAlign="center"
          borderTop={(theme) => `1px solid ${theme.palette.divider}`}
          pt={2}
          bgcolor={(theme) => theme.palette.mode === 'dark' ? '#10192250' : alpha(theme.palette.primary.main, 0.03)}
          mx={-4}
          mb={-4}
          pb={2}
        >
          <Typography variant="caption" color="text.secondary">
            By signing in, you agree to our{' '}
            <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Privacy Policy
            </a>
            .
          </Typography>
        </Box>
      </LoginCard>

      <Box position="absolute" bottom={24} width="100%" textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © 2024 Intelligent Focus. All rights reserved.
        </Typography>
      </Box>
    </PageWrapper>
  );
};

export default Login;
