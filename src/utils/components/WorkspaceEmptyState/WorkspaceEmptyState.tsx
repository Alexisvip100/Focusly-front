import { Box, Typography } from '@mui/material';
import {
  WorkspaceContainer,
  MainContent,
  IllustrationContainer,
  RobotIcon,
  LightningBadge,
  ActionButton,
  ButtonContainer,
} from '@/pages/Workspace/Workspace.styles';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BoltIcon from '@mui/icons-material/Bolt';

interface WorkspaceEmptyStateProps {
  onCreate: () => void;
}

export const WorkspaceEmptyState = ({ onCreate }: WorkspaceEmptyStateProps) => {
  return (
    <WorkspaceContainer>
      <MainContent>
        <IllustrationContainer>
          <Box position="relative">
            <RobotIcon>
              <SmartToyIcon sx={{ fontSize: 40, color: 'info.main' }} />
            </RobotIcon>
            <LightningBadge>
              <BoltIcon sx={{ fontSize: 14, color: 'background.default' }} />
            </LightningBadge>
          </Box>
        </IllustrationContainer>

        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, textAlign: 'center', color: 'text.primary' }}
        >
          Start Your First Strategic Plan
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            textAlign: 'center',
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Use headers, code blocks, and lists to document your thoughts. Link this page to a task to
          sync with your schedule.
        </Typography>

        <ButtonContainer>
          <ActionButton onClick={onCreate}>CREATE WORKSPACE</ActionButton>
        </ButtonContainer>
      </MainContent>
    </WorkspaceContainer>
  );
};
