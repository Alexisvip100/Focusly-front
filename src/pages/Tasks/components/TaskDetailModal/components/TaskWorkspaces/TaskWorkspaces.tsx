import React from 'react';
import { Box, Typography, Button, alpha, useTheme } from '@mui/material';
import { 
  Description as WorkspaceIcon,
  ChevronRight as ChevronRightIcon 
} from '@mui/icons-material';

interface TaskWorkspacesProps {
  workspaces?: {
    id: string;
    title: string;
    folder?: {
      name: string;
      color?: string;
    } | null;
  }[];
  onNavigate: (id: string) => void;
}

export const TaskWorkspaces: React.FC<TaskWorkspacesProps> = ({ workspaces, onNavigate }) => {
  const theme = useTheme();

  if (!workspaces || workspaces.length === 0) return null;

  return (
    <Box sx={{ px: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <WorkspaceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 1 }}>
          LINKED {workspaces.length > 1 ? 'WORKSPACES' : 'WORKSPACE'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {workspaces.map((ws) => (
          <Button
            key={ws.id}
            onClick={() => onNavigate(ws.id)}
            fullWidth
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderRadius: '12px',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: theme.palette.text.primary,
              textTransform: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                borderColor: 'divider',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  bgcolor: ws.folder?.color ? alpha(ws.folder.color, 0.2) : alpha(theme.palette.primary.main, 0.2),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ws.folder?.color || theme.palette.primary.main,
                }}
              >
                <WorkspaceIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" fontWeight={700}>
                  {ws.title}
                </Typography>
                {ws.folder && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {ws.folder.name}
                  </Typography>
                )}
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: 'text.secondary', opacity: 0.5, fontSize: 18 }} />
          </Button>
        ))}
      </Box>
    </Box>
  );
};
