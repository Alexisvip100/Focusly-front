import { styled, Box, Button, Typography, Popover } from '@mui/material';
import MuiAccessTimeIcon from '@mui/icons-material/AccessTime';

export const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper, // Dark background
    color: theme.palette.text.primary,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '16px',
    width: '300px',
  },
}));

export const Section = styled(Box)({
  marginBottom: '16px',
});

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginBottom: '8px',
}));

export const ItemRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
    padding: '6px 8px',
    margin: '0 -8px',
  },
}));

export const ItemLabel = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const CheckboxCircle = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '4px',
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '"✓"',
    fontSize: '12px',
    color: selected ? theme.palette.background.default : 'transparent',
    display: selected ? 'block' : 'none',
  },
}));
export const AccessTimeIcon = styled(MuiAccessTimeIcon)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
    backgroundColor: selected ? theme.palette.primary.main : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: '""',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: selected ? theme.palette.background.default : 'transparent',
      display: selected ? 'block' : 'none',
    },
  })
);
export const RadioCircle = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '""',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: selected ? theme.palette.background.default : 'transparent',
    display: selected ? 'block' : 'none',
  },
}));

export const CategoryRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
});

export const CategoryItem = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 8px',
  cursor: 'pointer',
  borderRadius: '4px',
  backgroundColor: selected ? `${theme.palette.primary.main}25` : 'transparent',
  border: `1px solid ${selected ? `${theme.palette.primary.main}60` : 'transparent'}`,
  '&:hover': {
    backgroundColor: selected
      ? `${theme.palette.primary.main}40`
      : theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.04)',
  },
}));

export const Dot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
  '&::after': {
    content: '""',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    display: 'block',
  },
}));

export const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: '12px',
}));

export const ClearButton = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  textTransform: 'uppercase',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '12px',
  padding: '4px 12px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
