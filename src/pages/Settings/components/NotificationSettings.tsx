import { Box, Switch, alpha, Typography, useTheme, type Theme } from '@mui/material';
import {
  Campaign as CampaignIcon,
  Timer as TimerIcon,
  PlayArrow as PlayArrowIcon,
  Coffee as CoffeeIcon,
  Check as CheckIcon,
  WarningAmber as WarningAmberIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  SettingItem,
  SettingInfo,
  SettingLabel,
  SettingSublabel,
  Badge,
  AlertGrid,
  AlertCard,
  AlertIconBox,
  SoundSelector,
} from '../Settings.styles';

export const NotificationSettings = () => {
  const theme = useTheme();
  const themeSwitchStyles = switchStyles(theme);

  return (
    <Box>
      {/* Delivery Channels */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper">
              <CampaignIcon />
            </Box>
            <Typography>Delivery Channels</Typography>
          </SectionTitle>
          <Badge>RFU-09</Badge>
        </SectionHeader>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>In-App Notifications</SettingLabel>
            <SettingSublabel>Receive alerts directly within the browser while you work.</SettingSublabel>
          </SettingInfo>
          <Switch defaultChecked sx={themeSwitchStyles} />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Email Summaries</SettingLabel>
            <SettingSublabel>Get daily and weekly productivity reports sent to alex.morgan@example.com.</SettingSublabel>
          </SettingInfo>
          <Switch defaultChecked sx={themeSwitchStyles} />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Desktop Push Notifications</SettingLabel>
            <SettingSublabel>Native OS notifications even when the browser is minimized.</SettingSublabel>
          </SettingInfo>
          <Switch sx={themeSwitchStyles} />
        </SettingItem>
      </SectionCard>

      {/* Session & Break Alerts */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper" sx={{ color: theme.palette.primary.main }}>
              <TimerIcon />
            </Box>
            <Typography>Session & Break Alerts</Typography>
          </SectionTitle>
        </SectionHeader>

        <AlertGrid>
          <AlertCard active>
            <AlertIconBox active>
              <PlayArrowIcon />
            </AlertIconBox>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Session Start</Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.5 }}>
                    Get notified 5 minutes before a scheduled deep work session begins.
                  </Typography>
                </Box>
                <Switch defaultChecked size="small" sx={themeSwitchStyles} />
              </Box>
              <SoundSelector>
                <Typography>System Sound 1</Typography>
                <KeyboardArrowDownIcon />
              </SoundSelector>
            </Box>
          </AlertCard>

          <AlertCard active>
            <AlertIconBox active>
              <CoffeeIcon />
            </AlertIconBox>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Break Reminders</Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.5 }}>
                    Reminders to take a break when energy levels drop or session ends.
                  </Typography>
                </Box>
                <Switch defaultChecked size="small" sx={themeSwitchStyles} />
              </Box>
              <SoundSelector>
                <Typography>Gentle Bell</Typography>
                <KeyboardArrowDownIcon />
              </SoundSelector>
            </Box>
          </AlertCard>

          <AlertCard active>
            <AlertIconBox active>
              <CheckIcon />
            </AlertIconBox>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Session End</Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.5 }}>
                    Notification when your focus timer hits zero.
                  </Typography>
                </Box>
                <Switch defaultChecked size="small" sx={themeSwitchStyles} />
              </Box>
              <SoundSelector>
                <Typography>Success Chime</Typography>
                <KeyboardArrowDownIcon />
              </SoundSelector>
            </Box>
          </AlertCard>

          <AlertCard>
            <AlertIconBox>
              <WarningAmberIcon />
            </AlertIconBox>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Overtime Alert</Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.5 }}>
                    Warn when you've been working too long without a break.
                  </Typography>
                </Box>
                <Switch size="small" sx={themeSwitchStyles} />
              </Box>
              <SoundSelector>
                <Typography>Default</Typography>
                <KeyboardArrowDownIcon />
              </SoundSelector>
            </Box>
          </AlertCard>
        </AlertGrid>
      </SectionCard>
    </Box>
  );
};

const switchStyles = (theme: Theme) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
});

