import { Box, Switch, alpha, Typography, useTheme, Slider, type Theme } from '@mui/material';
import {
  PrecisionManufacturing as PrecisionManufacturingIcon,
  Block as BlockIcon,
  OpenInNew as OpenInNewIcon,
  CalendarMonth as CalendarMonthIcon
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
} from '../Settings.styles';

export const FocusEngineSettings = () => {
  const theme = useTheme();
  
  const themeSwitchStyles = (theme: Theme) => ({
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

  const sliderStyles = {
    color: theme.palette.primary.main,
    height: 6,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 20,
      width: 20,
      backgroundColor: '#fff',
      border: `2px solid ${theme.palette.primary.main}`,
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: theme.palette.primary.main,
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    '& .MuiSlider-rail': {
      opacity: 0.1,
      backgroundColor: theme.palette.text.primary,
    },
  };

  return (
    <Box>
      {/* Session Duration */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper">
              <PrecisionManufacturingIcon />
            </Box>
            <Typography>Session Duration</Typography>
          </SectionTitle>
          <Badge>RFU-15</Badge>
        </SectionHeader>

        <Box sx={{ mt: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Focus Block Length
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>
              50 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.text.secondary }}>min</span>
            </Typography>
          </Box>
          <Slider
            defaultValue={50}
            min={25}
            max={90}
            sx={sliderStyles}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>25m</Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>90m</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Short Break Duration
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>
              5 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.text.secondary }}>min</span>
            </Typography>
          </Box>
          <Slider
            defaultValue={5}
            min={3}
            max={15}
            sx={sliderStyles}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>3m</Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>15m</Typography>
          </Box>
        </Box>
      </SectionCard>

      {/* Distraction Blocking */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper" sx={{ color: '#ef4444' }}>
              <BlockIcon />
            </Box>
            <Typography>Distraction Blocking</Typography>
          </SectionTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
             <Typography variant="caption" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>Active</Typography>
          </Box>
        </SectionHeader>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Block Social Media</SettingLabel>
            <SettingSublabel>Prevents access to Twitter, Facebook, Instagram during focus sessions.</SettingSublabel>
          </SettingInfo>
          <Switch defaultChecked sx={themeSwitchStyles(theme)} />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Block News & Entertainment</SettingLabel>
            <SettingSublabel>Restricts access to major news outlets and streaming services. </SettingSublabel>
          </SettingInfo>
          <Switch defaultChecked sx={themeSwitchStyles(theme)} />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Strict Mode</SettingLabel>
            <SettingSublabel>Cannot cancel a focus session once started. Use with caution.</SettingSublabel>
          </SettingInfo>
          <Switch sx={themeSwitchStyles(theme)} />
        </SettingItem>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.primary.main, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700 }}>Manage Blocklist</Typography>
          <OpenInNewIcon sx={{ fontSize: 16 }} />
        </Box>
      </SectionCard>

      {/* Calendar Sync */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper" sx={{ color: '#3b82f6' }}>
              <CalendarMonthIcon />
            </Box>
            <Typography>Calendar Sync</Typography>
          </SectionTitle>
        </SectionHeader>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          We write your focus blocks to these calendars to prevent interruptions.
        </Typography>
        {/* Additional calendar sync settings could go here */}
      </SectionCard>
    </Box>
  );
};
