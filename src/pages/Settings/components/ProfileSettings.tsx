import { Box, alpha, Typography, useTheme, Avatar, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/auth/auth.slice';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

import {
  AccountCircle as AccountCircleIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
} from '../Settings.styles';

export const ProfileSettings = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: alpha(theme.palette.text.primary, 0.03),
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        fontWeight: 600,
        fontSize: '0.9rem',
    }
  };

  return (
    <Box>
      {/* Profile Picture */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper">
              <AccountCircleIcon />
            </Box>
            <Typography>Profile Picture</Typography>
          </SectionTitle>
        </SectionHeader>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 2 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }} 
            src={user?.picture || ""}   
          />
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Your Avatar</Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 2 }}>
              This will be displayed on your profile and in team spaces.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="small"
                sx={{ 
                    bgcolor: alpha(theme.palette.text.primary, 0.05), 
                    color: theme.palette.text.primary,
                    boxShadow: 'none',
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 3,
                    '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.1), boxShadow: 'none' }
                }}
              >
                Upload New
              </Button>
              <Button 
                variant="text" 
                size="small"
                sx={{ 
                    color: '#ef4444', 
                    fontWeight: 700,
                    textTransform: 'none',
                    '&:hover': { bgcolor: alpha('#ef4444', 0.05) }
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Box>
      </SectionCard>

      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper">
              <BadgeIcon />
            </Box>
            <Typography>Personal Information</Typography>
          </SectionTitle>
        </SectionHeader>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mt: 2, mb: 3 }}>
           <Box>
             <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>Full Name</Typography>
             <TextField 
                fullWidth 
                variant="outlined" 
                defaultValue={user?.name || ""}
                sx={inputStyles}
             />
           </Box>
           <Box>
             <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>Job Title</Typography>
             <TextField 
                fullWidth 
                variant="outlined" 
                defaultValue="Product Designer"
                sx={inputStyles}
             />
           </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>Email Address</Typography>
            <TextField 
                fullWidth 
                variant="outlined" 
                defaultValue={user?.email || ""}
                disabled
                InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1.5, fontSize: 20, color: theme.palette.text.disabled }} />
                }}
                sx={inputStyles}
            />
        </Box>

        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>Bio</Typography>
            <TextField 
                fullWidth 
                variant="outlined" 
                multiline
                rows={4}
                defaultValue="Focused on building intuitive user interfaces and optimizing productivity workflows."
                sx={inputStyles}
            />
            <Typography variant="caption" sx={{ color: theme.palette.text.disabled, display: 'block', textAlign: 'right', mt: 1 }}>
                0 / 250 characters
            </Typography>
        </Box>
      </SectionCard>


      {/* Logout Session */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
                color: '#ef4444',
                borderColor: alpha('#ef4444', 0.5),
                textTransform: 'none',
                fontWeight: 700,
                px: 4,
                py: 1.2,
                borderRadius: '12px',
                '&:hover': {
                    borderColor: '#ef4444',
                    bgcolor: alpha('#ef4444', 0.05),
                }
            }}
        >
            Log Out of Focusly
        </Button>
      </Box>
    </Box>
  );
};
