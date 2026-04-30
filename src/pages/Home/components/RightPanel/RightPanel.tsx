import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  IconButton,
} from '@mui/material';
import { TrendingUp, ChevronRight, ChevronLeft } from '@mui/icons-material';

import { PanelContainer, Card } from './RightPanel.styles';

interface RightPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const RightPanel = ({ isOpen, onToggle }: RightPanelProps) => {
  return (
    <PanelContainer isOpen={isOpen}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'space-between' : 'center',
        }}
      >
        {isOpen && (
          <Typography variant="h6" fontWeight="bold">
            Quick Insightsssssssss
          </Typography>
        )}
        <IconButton
          onClick={onToggle}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          {isOpen ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {isOpen && (
        <>
          <Box>
            <Card mb={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1}
              >
                <Typography
                  variant="caption"
                  fontWeight="700"
                  color="text.secondary"
                  letterSpacing={1}
                >
                  PRODUCTIVITY SCORE
                </Typography>
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              </Stack>
              <Stack direction="row" alignItems="baseline" spacing={1} mb={1}>
                <Typography variant="h3" fontWeight="800">
                  84
                </Typography>
                <Typography
                  variant="body1"
                  color="success.main"
                  fontWeight="bold"
                >
                  +12%
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                You're more productive than usual this morning.
              </Typography>
            </Card>

            <Card sx={{ mt: 2 }}>
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                  }}
                >
                  ⚡
                </Box>
                <Typography fontWeight="700">Habit Tracker</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="caption" color="text.secondary">
                  Focus Time
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2h 45m / 4h
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' },
                }}
              />
            </Card>
          </Box>
        </>
      )}
    </PanelContainer>
  );
};

export default RightPanel;
