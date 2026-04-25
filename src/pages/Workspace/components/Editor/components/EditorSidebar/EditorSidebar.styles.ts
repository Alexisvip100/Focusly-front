import { Box, styled, alpha } from '@mui/material';
import {
  RightSidebar as BaseRightSidebar,
  SidebarHeader as BaseSidebarHeader,
  SectionTitle as BaseSectionTitle,
  MetadataSection as BaseMetadataSection,
  MetaLabel as BaseMetaLabel,
  MetaValue as BaseMetaValue,
  StatusBadge as BaseStatusBadge,
  ViewTaskButton as BaseViewTaskButton,
  StartFocusButton as BaseStartFocusButton,
  MarkDoneButton as BaseMarkDoneButton
} from '../../WorkspaceEditor.styles';

export const RightSidebar = BaseRightSidebar;
export const SidebarHeader = BaseSidebarHeader;
export const SectionTitle = BaseSectionTitle;
export const MetadataSection = BaseMetadataSection;
export const MetaLabel = BaseMetaLabel;
export const MetaValue = BaseMetaValue;
export const StatusBadge = BaseStatusBadge;
export const ViewTaskButton = BaseViewTaskButton;
export const StartFocusButton = BaseStartFocusButton;
export const MarkDoneButton = BaseMarkDoneButton;

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  marginTop: '24px',
  padding: '16px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const DescriptionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: theme.palette.text.secondary,
  opacity: 0.8,
}));
