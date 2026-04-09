import { styled, Box, Typography, alpha } from '@mui/material';

export const SettingsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  overflowY: 'auto',
  height: '100%',
  color: theme.palette.text.primary,
}));

export const SettingsHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SettingsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const SettingsDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  maxWidth: '700px',
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(6),
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
}));

export const TabItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: '10px 20px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.2) : theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const SectionCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  '& .icon-wrapper': {
    color: '#137fec',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const SettingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
  '&:first-of-type': {
    paddingTop: 0,
  },
}));

export const SettingInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const SettingLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.05rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const SettingSublabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
}));

export const Badge = styled(Box)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 800,
  padding: '4px 8px',
  borderRadius: '6px',
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));

export const AlertGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const AlertCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.02) : alpha('#000', 0.02),
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: `1px solid ${active ? alpha(theme.palette.primary.main, 0.3) : theme.palette.divider}`,
  transition: 'all 0.2s ease',
  display: 'flex',
  gap: theme.spacing(2.5),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.05) : alpha('#000', 0.04),
    borderColor: active ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.text.secondary, 0.3),
  },
}));

export const AlertIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.action.hover,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  flexShrink: 0,
}));

export const SoundSelector = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  '& .MuiTypography-root': {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  '& .material-symbols-outlined': {
    fontSize: '16px',
    color: theme.palette.text.disabled,
  },
}));
