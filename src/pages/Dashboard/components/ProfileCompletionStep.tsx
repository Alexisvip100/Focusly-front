import React from 'react';
import { Box, Typography, Stack, alpha, useTheme, CircularProgress } from '@mui/material';
import { 
  CameraAlt as CameraIcon, 
  ArrowForward as ArrowForwardIcon,
  Person as PersonIcon 
} from '@mui/icons-material';
import {
  ProfileAvatarContainer,
  ProfileImage,
  AddIconButton,
  StyledLabel,
  ProfileInput,
  ProfileTextArea,
  PrimaryButton,
} from '../Dashboard.styles';
import { useProfileCompletion } from '../hooks/useProfileCompletion.hook';

interface ProfileCompletionStepProps {
  onNext: () => void;
}

const ProfileCompletionStep: React.FC<ProfileCompletionStepProps> = ({ onNext }) => {
  const theme = useTheme();
  const {
    fullName,
    setFullName,
    jobTitle,
    setJobTitle,
    bio,
    setBio,
    profileImage,
    fileInputRef,
    isLoading,
    handleImageClick,
    handleFileChange,
    handleContinue
  } = useProfileCompletion({ onNext });

  return (
    <Box sx={{ width: '100%', maxWidth: '480px', margin: '0 auto', textAlign: 'center', py: 2 }}>
      <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
        Complete Your Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '320px', margin: '0 auto 32px' }}>
        Define your presence within the Focusly ecosystem.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <ProfileAvatarContainer>
          <ProfileImage src={profileImage} onClick={handleImageClick}>
            {!profileImage && <PersonIcon sx={{ fontSize: 40, color: alpha(theme.palette.text.primary, 0.2) }} />}
          </ProfileImage>
          <AddIconButton onClick={handleImageClick}>
            <CameraIcon sx={{ fontSize: 16 }} />
          </AddIconButton>
          <input 
            type="file" 
            ref={fileInputRef} 
            hidden 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </ProfileAvatarContainer>
        <Typography variant="caption" fontWeight="700" color="primary.main" sx={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
          Profile Photo
        </Typography>
      </Box>

      <Stack spacing={3} sx={{ textAlign: 'left', mb: 4 }}>
        <Box>
          <StyledLabel>Full Name</StyledLabel>
          <ProfileInput 
            placeholder="e.g., Alex Rivera" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Box>

        <Box>
          <StyledLabel>Job Title / Role</StyledLabel>
          <ProfileInput 
            placeholder="e.g., Lead Systems Architect" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <StyledLabel sx={{ mb: 0 }}>Focus Philosophy</StyledLabel>
            <Typography variant="caption" color="text.disabled" fontWeight="600">
              {bio.length} / 160 MAX
            </Typography>
          </Box>
          <ProfileTextArea 
            placeholder="Briefly describe how you approach deep work..." 
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 160))}
          />
        </Box>
      </Stack>

      <Stack spacing={2} alignItems="center">
        <PrimaryButton onClick={handleContinue} sx={{ opacity: isLoading ? 0.7 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Continue to Dashboard'} <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </PrimaryButton>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            cursor: 'pointer', 
            fontWeight: 500,
            '&:hover': { color: 'text.primary' } 
          }}
          onClick={onNext}
        >
          Complete later
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProfileCompletionStep;
