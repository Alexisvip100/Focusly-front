import React from 'react';
import { Box, Typography } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import {
  BottomRow,
  ChartCard,
  ActionButton,
  HeatmapGrid,
  HeatmapCell,
} from '../../Insights.styles';
import type { BottomSectionProps } from './BottomSection.types';

export const BottomSection: React.FC<BottomSectionProps> = ({
  goldenWindowValue,
  heatmap,
}) => {
  return (
    <BottomRow>
      <ChartCard sx={{ height: 'auto', minHeight: '300px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Golden Hours
          </Typography>
          <ActionButton>VIEW DETAILS</ActionButton>
        </Box>
        <Box
          p={2}
          bgcolor="warning.light"
          borderRadius={2}
          display="flex"
          gap={2}
          alignItems="start"
        >
          <WbSunny sx={{ color: 'warning.main', mt: 0.5 }} />
          <Box>
            <Typography variant="body2" color="warning.main">
              You are most productive between{' '}
              <b>{goldenWindowValue}</b>
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={2}>
          PRODUCTIVITY SCORE (LAST 7 DAYS)
        </Typography>
      </ChartCard>

      <ChartCard sx={{ height: 'auto', minHeight: '300px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Activity Heatmap
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Less
            </Typography>
            <Box display="flex" gap={0.5}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 0.5,
                    bgcolor: 'primary.main',
                    opacity: i * 0.25,
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
              More
            </Typography>
          </Box>
        </Box>
        <HeatmapGrid>
          {heatmap && heatmap.length > 0
            ? heatmap.map((intensity: number, i: number) => (
                <HeatmapCell key={i} intensity={intensity} />
              ))
            : Array.from({ length: 70 }).map((_, i) => (
                <HeatmapCell key={i} intensity={0} />
              ))}
        </HeatmapGrid>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            8 AM
          </Typography>
          <Typography variant="caption" color="text.secondary">
            12 PM
          </Typography>
          <Typography variant="caption" color="text.secondary">
            6 PM
          </Typography>
        </Box>
      </ChartCard>
    </BottomRow>
  );
};
