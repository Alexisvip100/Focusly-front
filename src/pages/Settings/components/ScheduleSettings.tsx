import { Box, Switch, alpha, Typography, useTheme, type Theme } from '@mui/material';
import {
  WorkOutline as WorkOutlineIcon,
  Bolt as BoltIcon,
  AccessTime as AccessTimeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  Badge,
} from '../Settings.styles';

export const ScheduleSettings = () => {
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

  const days = [
    { label: 'S', active: false },
    { label: 'M', active: true },
    { label: 'T', active: true },
    { label: 'W', active: true },
    { label: 'T', active: true },
    { label: 'F', active: true },
    { label: 'S', active: false },
  ];

  return (
    <Box>
      {/* Work Hours */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper">
              <WorkOutlineIcon />
            </Box>
            <Typography>Work Hours</Typography>
          </SectionTitle>
          <Badge>RFU-14</Badge>
        </SectionHeader>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
            Work Days
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {days.map((day, index) => (
              <Box
                key={index}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: day.active ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.05),
                  color: day.active ? '#fff' : theme.palette.text.secondary,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: day.active ? alpha(theme.palette.primary.main, 0.8) : alpha(theme.palette.text.primary, 0.1),
                  },
                }}
              >
                {day.label}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: '200px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
              Daily Schedule
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: '10px 16px', 
                    borderRadius: '12px', 
                    bgcolor: alpha(theme.palette.text.primary, 0.03),
                    border: `1px solid ${theme.palette.divider}`
                }}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>09:00 AM</Typography>
                    <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>to</Typography>
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: '10px 16px', 
                    borderRadius: '12px', 
                    bgcolor: alpha(theme.palette.text.primary, 0.03),
                    border: `1px solid ${theme.palette.divider}`
                }}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>05:00 PM</Typography>
                    <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1, minWidth: '200px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  Lunch Protection
                </Typography>
                <Switch defaultChecked size="small" sx={themeSwitchStyles(theme)} />
            </Box>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: '10px 16px', 
                borderRadius: '12px', 
                bgcolor: alpha(theme.palette.text.primary, 0.03),
                border: `1px solid ${theme.palette.divider}`,
                cursor: 'pointer'
            }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>45 Minutes (Smart Flexible)</Typography>
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
            </Box>
          </Box>
        </Box>
      </SectionCard>

      {/* Energy & Golden Hours */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Box className="icon-wrapper" sx={{ color: '#fbbf24' }}>
              <BoltIcon />
            </Box>
            <Typography>Energy & Golden Hours</Typography>
          </SectionTitle>
          <Badge sx={{ bgcolor: alpha('#fbbf24', 0.1), color: '#fbbf24' }}>FR-16</Badge>
        </SectionHeader>

        <Box sx={{ 
            p: 3, 
            borderRadius: '16px', 
            bgcolor: alpha(theme.palette.text.primary, 0.02),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.05)}`,
            mb: 4
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Smart Energy Detection</Typography>
                    <Box sx={{ 
                        fontSize: '9px', 
                        fontWeight: 800, 
                        px: 1, 
                        py: 0.2, 
                        borderRadius: '4px', 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: theme.palette.primary.main 
                    }}>AI BETA</Box>
                </Box>
                <Switch defaultChecked size="small" sx={themeSwitchStyles(theme)} />
            </Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                Automatically identify your peak productivity times based on task completion history.
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: '250px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Current Golden Hours</Typography>
                <Box sx={{ 
                    p: 2.5, 
                    borderRadius: '16px', 
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <TrendingUpIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>09:00 AM - 11:30 AM</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase' }}>High Confidence</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 1.5 }}>
                    We try to schedule your most demanding tasks during this window.
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Protect Golden Hours</Typography>
                    <Switch defaultChecked size="small" sx={themeSwitchStyles(theme)} />
                </Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                    When enabled, the scheduler will aggressively decline meetings and low-priority tasks during peak times.
                </Typography>
            </Box>
        </Box>
      </SectionCard>

      {/* Reusing existing Focus Session Length slider if needed, 
          but as per image it seems to be in a session of its own "Focus Block & Break Duration" */}
    </Box>
  );
};
