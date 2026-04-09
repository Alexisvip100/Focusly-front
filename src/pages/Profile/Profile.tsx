import React from 'react';
import {
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
  InputAdornment,
  SvgIcon,
  type SvgIconProps,
} from '@mui/material';
import {
  ProfilePageContainer,
  TopBar,
  ContentContainer,
  Sidebar,
  MainContent,
  UserCard,
  MenuButton,
  SectionCard,
  DarkInput,
} from './Profile.styles';
import {
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Extension as ExtensionIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Email as EmailIcon,
  WorkOutline as JobIcon,
} from '@mui/icons-material';
import { useProfile } from './hooks/useProfile.hook';

const Profile: React.FC = () => {
  const {
    user,
    fullName,
    setFullName,
    jobTitle,
    setJobTitle,
    email,
    setEmail,
    bio,
    setBio,
    handleLogout,
    getInitials,
    cancelEdit,
  } = useProfile();

  return (
    <ProfilePageContainer>
      {/* Top Bar */}
      <TopBar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BoltIcon sx={{ color: 'primary.contrastText' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Intelligent Focus
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}
            onClick={cancelEdit}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Save Changes
          </Button>
          <Avatar
            src={user?.picture}
            alt={user?.name}
            sx={{ width: 32, height: 32, border: '2px solid', borderColor: 'divider' }}
          >
            {getInitials(user?.name)}
          </Avatar>
        </Box>
      </TopBar>

      <ContentContainer>
        {/* Sidebar */}
        <Sidebar>
          <UserCard>
            <Avatar
              src={user?.picture}
              sx={{ width: 40, height: 40, bgcolor: 'warning.main', color: 'warning.contrastText' }}
            >
              {getInitials(user?.name)}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" fontWeight="bold" noWrap>
                {user?.name || 'Alex Morgan'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Free Plan
              </Typography>
            </Box>
          </UserCard>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
            <MenuButton active startIcon={<PersonIcon />}>
              General Profile
            </MenuButton>
            <MenuButton startIcon={<ScheduleIcon />}>Schedule & Energy</MenuButton>
            <MenuButton startIcon={<BoltIcon />}>Focus Engine</MenuButton>
            <MenuButton startIcon={<ExtensionIcon />}>Integrations</MenuButton>
            <MenuButton startIcon={<NotificationsIcon />}>Notifications</MenuButton>
          </Box>

          <Button
            startIcon={<LogoutIcon />}
            sx={{
              color: 'text.secondary',
              justifyContent: 'flex-start',
              textTransform: 'none',
              mt: 2,
              '&:hover': { color: 'error.main', bgcolor: 'action.hover' },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Box mb={4}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              General Profile
            </Typography>
            <Typography color="text.secondary">
              Manage your personal information, account security, and basic preferences.
            </Typography>
          </Box>

          {/* Profile Picture Section */}
          <SectionCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <PersonIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Profile Picture
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={user?.picture}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#a7f3d0',
                  color: '#065f46',
                  fontSize: '2rem',
                }}
              >
                <img
                  alt="avatar"
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Your Avatar
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  This will be displayed on your profile and in team spaces.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'text.secondary',
                      borderColor: 'divider',
                      textTransform: 'none',
                      bgcolor: 'action.hover',
                      '&:hover': { borderColor: 'text.primary', bgcolor: 'action.selected' },
                    }}
                  >
                    Upload New
                  </Button>
                  <Button sx={{ color: 'error.main', textTransform: 'none' }}>Remove</Button>
                </Stack>
              </Box>
            </Box>
          </SectionCard>

          {/* Personal Information Section */}
          <SectionCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <PersonIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Personal Information
              </Typography>
            </Box>

            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary" mb={1} display="block">
                    Full Name
                  </Typography>
                  <DarkInput
                    fullWidth
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary" mb={1} display="block">
                    Job Title
                  </Typography>
                  <DarkInput
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <JobIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" color="text.secondary" mb={1} display="block">
                  Email Address
                </Typography>
                <DarkInput
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" mb={1} display="block">
                  Bio
                </Typography>
                <DarkInput
                  fullWidth
                  multiline
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  helperText={
                    <Typography variant="caption" sx={{ color: 'text.secondary', float: 'right' }}>
                      {bio.length} / 250 characters
                    </Typography>
                  }
                />
              </Box>
            </Stack>
          </SectionCard>

        </MainContent>
      </ContentContainer>
    </ProfilePageContainer>
  );
};

const BoltIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, ...props.sx }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </SvgIcon>
);

export default Profile;
