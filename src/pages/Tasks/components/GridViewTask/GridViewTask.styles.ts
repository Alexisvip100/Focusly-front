import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const GridTaskCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: theme.palette.primary.main,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 24px -10px rgba(0, 0, 0, 0.5)'
        : '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
  },
}));

export const GridCardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '4px',
});

export const GridCardFooter = styled(Box)({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const ProgressBarContainer = styled(Box)({
  width: '100%',
  marginTop: '8px',
});

export const ProgressLabel = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '4px',
});

export const Tag = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tagColor' && prop !== 'textColor',
})<{ tagColor?: string; textColor?: string }>(({ theme, tagColor, textColor }) => ({
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
  backgroundColor:
    tagColor || (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : theme.palette.grey[200]),
  color: textColor || theme.palette.text.primary,
}));
