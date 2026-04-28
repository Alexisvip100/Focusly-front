import { styled, Box, Typography, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const EditorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const MainEditorArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: 'auto',
}));

export const EditorHeader = styled(Box)(({ theme }) => ({
  height: '60px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '35px 24px',
}));

export const EditorContent = styled(Box)({
  padding: '40px 60px',
  flex: 1,
});

export const DraftingBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(34, 211, 238, 0.1)'
      : 'rgba(19, 127, 236, 0.1)',
  color: theme.palette.info.main,
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  marginBottom: '16px',
}));

export const FolderBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor?: string }>(({ theme, bgColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: bgColor ? `${bgColor}15` : theme.palette.action.hover,
  color: bgColor || theme.palette.text.secondary,
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  marginBottom: '16px',
  border: `1px solid ${bgColor ? `${bgColor}33` : theme.palette.divider}`,
}));

interface RightSidebarProps {
  isOpen: boolean;
}

export const RightSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<RightSidebarProps>(({ theme, isOpen }) => ({
  width: isOpen ? '320px' : '60px',
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper, // Slightly distinct bg
  padding: '24px',
  borderLeft: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  position: 'relative',
  whiteSpace: 'nowrap', // Prevent text wrapping during transition
  height: '100%',
}));

export const SidebarHeader = styled(Box)({
  marginBottom: '32px',
});

export const BackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'none',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  padding: 0,
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  },
}));

export const MetadataSection = styled(Box)({
  marginBottom: '32px',
});

export const MetadataRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

export const MetaLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '12px',
  fontWeight: 500,
}));

export const MetaValue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: theme.palette.text.primary,
  fontSize: '13px',
  fontWeight: 500,
}));

export const StatusBadge = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(56, 189, 248, 0.15)'
      : 'rgba(19, 127, 236, 0.1)', // Light blue bg
  color: theme.palette.info.main, // Light blue text
  fontSize: '10px',
  fontWeight: 700,
  padding: '4px 8px',
  borderRadius: '4px',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.5px',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  marginBottom: '16px',
  marginTop: '32px',
}));

export const RelatedDocItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
  cursor: 'pointer',
  padding: '12px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.text.secondary,
  },
}));

export const InsightCard = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)'
      : theme.palette.background.default,
  borderRadius: '12px',
  padding: '20px',
  // marginTop: 'auto', // Removed to rely on flex spacer
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: '24px',
}));

export const InsightHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
});

export const MarkDoneButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(30, 41, 59, 0.5)'
      : theme.palette.action.selected, // Transparent/Dark styling
  color: theme.palette.text.secondary,
  width: '100%',
  fontWeight: 600,
  fontSize: '11px',
  padding: '14px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    borderColor: theme.palette.divider,
    color: theme.palette.text.disabled,
  },
}));

export const StartFocusButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '100%',
  fontWeight: 700,
  fontSize: '11px',
  padding: '14px',
  borderRadius: '8px',
  border: 'none',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  boxShadow: `0 0 20px ${theme.palette.mode === 'dark' ? 'rgba(19, 127, 236, 0.4)' : 'rgba(19, 127, 236, 0.2)'}`, // Glow effect
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: `0 0 30px ${theme.palette.mode === 'dark' ? 'rgba(19, 127, 236, 0.6)' : 'rgba(19, 127, 236, 0.3)'}`,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    boxShadow: 'none',
  },
}));

export const TitleInput = styled('input')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.text.primary,
  fontSize: '32px',
  fontWeight: 700,
  width: '100%',
  marginBottom: '24px',
  outline: 'none',
  fontFamily: '"Inter", sans-serif',
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export const BlockNoteWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  '& .bn-editor': {
    backgroundColor: 'transparent',
    padding: '0 16px', // Align with title
  },
  '& .bn-block-content': {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    lineHeight: 1.8,
  },
  // Customizing the slash menu
  '& .bn-suggestion-menu': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  },
  '& .bn-suggestion-item': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  // Theme-aware Code Styles
  '& code': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.05)',
    color: theme.palette.primary.light,
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '0.9em',
  },
  '& pre': {
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f4f4f4f5',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 0',
    overflow: 'auto',
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
      color: theme.palette.text.primary,
      fontSize: '14px',
      lineHeight: 1.6,
    },
  },
  '& .bn-block-content[data-content-type=codeBlock]': {
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f4f4f4f5',
    padding: 0,
  },
  // Custom Workspace Mention styles
  '& a[href*="workspaceId"]': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(56, 189, 248, 0.15)'
        : 'rgba(19, 127, 236, 0.1)',
    color: theme.palette.info.main,
    padding: '2px 10px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    border: `1px solid ${theme.palette.info.main}33`,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: '14px',
      height: '14px',
      marginRight: '4px',
      backgroundColor: 'currentColor',
      maskImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'%3E%3C/path%3E%3C/svg%3E\")",
      maskRepeat: 'no-repeat',
      maskSize: 'contain',
      verticalAlign: 'middle',
    },
    '&:hover': {
      backgroundColor: theme.palette.info.main,
      color: '#fff',
      boxShadow: `0 0 12px ${theme.palette.info.main}66`,
      transform: 'translateY(-1px)',
    },
  },
}));
// Search Input Styles
export const SearchInputContainer = styled(Box)({
  position: 'relative',
  marginBottom: '24px',
  marginTop: '32px',
});

export const SearchInput = styled('input')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  padding: '10px 12px 10px 36px',
  color: theme.palette.text.primary,
  fontSize: '13px',
  outline: 'none',
  transition: 'all 0.2s',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 1px ${theme.palette.primary.main}33`,
  },
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export const SearchIconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  pointerEvents: 'none',
}));

export const ViewTaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.info.main, // Cyan equivalent
  width: '100%',
  fontWeight: 600,
  fontSize: '11px',
  padding: '12px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.info.main}4D`, // ~30% alpha
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: `${theme.palette.info.main}1A`, // ~10% alpha
    borderColor: theme.palette.info.main,
    boxShadow: `0 0 15px ${theme.palette.info.main}33`, // ~20% alpha
  },
}));
