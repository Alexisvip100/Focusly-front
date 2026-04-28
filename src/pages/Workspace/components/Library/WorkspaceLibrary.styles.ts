import { styled, Box, Typography, Card } from '@mui/material';

export const LibraryContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

export const LibraryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1),
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 800,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  letterSpacing: '-0.5px',
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

export const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.04)',
  borderRadius: '28px',
  padding: '8px 16px',
  width: '380px',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#fff',
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}11`,
  },
  '& input': {
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    outline: 'none',
    fontSize: '15px',
    fontWeight: 500,
    width: '100%',
    marginLeft: theme.spacing(1.5),
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.6,
    },
  },
}));

export const ActionCapsule = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.04)',
  borderRadius: '32px',
  padding: '4px',
  gap: '4px',
  border: `1px solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)',
  },
}));

export const CapsuleIconButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? '#137fec' : 'transparent',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? '#fff' : theme.palette.text.secondary,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: active ? '0 4px 12px rgba(19, 127, 236, 0.4)' : 'none',
  '&:hover': {
    backgroundColor: active ? '#1565c0' : 'rgba(255, 255, 255, 0.08)',
    color: active ? '#fff' : theme.palette.text.primary,
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

export const FilterTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const FolderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(1),
}));

export const FolderSectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: '11px',
    fontWeight: 900,
    color: theme.palette.primary.main,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
}));

export const FolderList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'nowrap',
  alignItems: 'center',
  paddingBottom: theme.spacing(1.5),
  overflowX: 'auto',
  // Simple, subtle native scrollbar styling
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

export const FolderCapsule = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'color',
})<{ active?: boolean; color?: string }>(({ theme, active, color }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px 10px 10px',
  borderRadius: '40px',
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(19, 127, 236, 0.1)'
    : theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(0, 0, 0, 0.02)',
  border: `1px solid ${active ? color || (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : theme.palette.primary.main) : 'transparent'}`,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  minWidth: '180px',
  flexShrink: 0,
  position: 'relative',
  '&:hover .folder-options-btn': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '&:hover': {
    backgroundColor: active
      ? theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(19, 127, 236, 0.15)'
      : theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.07)'
        : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 8px 20px rgba(0,0,0,0.4)'
        : '0 8px 20px rgba(0,0,0,0.1)',
  },
}));

export const FolderIconCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ color }) => ({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color ? `${color}1A` : 'rgba(24, 118, 209, 0.15)',
  color: color || '#1976d2',
  marginRight: '12px',
  boxShadow: `0 4px 12px ${color ? color + '22' : 'rgba(0,0,0,0.1)'}`,
}));

export const AddFolderCapsule = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 24px',
  borderRadius: '40px',
  border: `2px dashed ${theme.palette.mode === 'dark' ? '#ffffffb8' : 'rgba(0, 0, 0, 0.3)'}`,
  cursor: 'pointer',
  transition: 'all 0.2s',
  opacity: 0.7,
  gap: theme.spacing(1),
  flexShrink: 0,
  '&:hover': {
    opacity: 1,
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  '& .MuiTypography-root': {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.5px',
    color: theme.palette.text.secondary,
  },
}));

export const MoreFoldersCapsule = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 16px 16px 16px',
  borderRadius: '40px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.04)',
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${theme.palette.primary.main}44`,
    '& .MuiTypography-root': {
      color: '#fff',
    },
    '& .more-count-circle': {
      backgroundColor: '#fff',
      color: theme.palette.primary.main,
    },
  },
}));

export const MoreFoldersCircle = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontSize: '11px',
  fontWeight: 800,
  marginRight: theme.spacing(1.5),
  transition: 'all 0.3s',
}));

export const FolderOptionsIconButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
  color: theme.palette.text.secondary,
  opacity: 0,
  transform: 'scale(0.8)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 2,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    boxShadow: `0 4px 8px ${theme.palette.primary.main}44`,
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

export const FilterButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: '8px 20px',
  borderRadius: '40px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: active
    ? 'rgba(24, 243, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.03)',
  color: active ? '#18f3ff' : theme.palette.text.secondary,
  border: `1px solid ${active ? '#18f3ff44' : 'transparent'}`,
  '&:hover': {
    backgroundColor: active
      ? 'rgba(24, 243, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.07)',
  },
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
  overflowY: 'auto',
  paddingBottom: '24px',
  paddingTop: '20px',
  // Custom scrollbar
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

export const WorkspaceCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  height: '220px',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
        : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

export const TaskPill = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '24px', // More pill-like
  padding: '6px 16px', // Adjusted padding
  marginTop: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'row', // Horizontal
  alignItems: 'center', // Center vertically
  gap: '0px', // Managed by internal margins
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
    // When TaskPill is hovered, show the arrow button
    '& .arrow-button': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
}));

export const TaskPillLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '9px',
  fontWeight: 800,
  textTransform: 'uppercase',
  marginBottom: '2px', // Small gap between label and title
  letterSpacing: '0.5px',
  lineHeight: 1,
}));

export const TaskPillTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '11px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '140px', // Prevent overflow
}));

export const HoverArrowButton = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  marginLeft: 'auto', // Push to right
  opacity: 0, // Hidden by default
  transform: 'translateX(-10px)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  className: 'arrow-button', // Class for targeting
}));

export const CreateCard = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px dashed ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '220px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));
