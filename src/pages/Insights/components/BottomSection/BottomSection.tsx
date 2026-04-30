import { Box, Typography, Tooltip } from '@mui/material';
import { WbSunny, InfoOutlined as InfoIcon } from '@mui/icons-material';
import {
  BottomRow,
  ChartCard,
  ActionButton,
  HeatmapGrid,
  HeatmapCell,
} from '../../Insights.styles';
export interface ActivitySectionProps {
  goldenWindowValue: string;
  heatmap: number[];
  heatmapLabels?: string[];
}

export const BottomSection = ({
  goldenWindowValue,
  heatmap,
  heatmapLabels,
}: ActivitySectionProps) => {
  return (
    <BottomRow>
      <ChartCard sx={{ height: 'auto', minHeight: '300px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="h6" fontWeight="bold">
              Golden Hours
            </Typography>
            <Tooltip
              title="We identify your peak concentration moments by analyzing what time of day you usually accumulate the most real focus minutes."
              arrow
            >
              <InfoIcon
                sx={{ fontSize: 16, color: 'text.disabled', cursor: 'help' }}
              />
            </Tooltip>
          </Box>
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
              You are most productive between <b>{goldenWindowValue}</b>
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={2}>
          PRODUCTIVITY SCORE (LAST 7 DAYS)
        </Typography>
      </ChartCard>

      <ChartCard sx={{ height: 'auto', minHeight: '300px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="h6" fontWeight="bold">
              Activity Map
            </Typography>
            <Tooltip
              title="This map shows your intensity level per day. Darker squares indicate days where you had more focus sessions or dedicated more real time to your tasks."
              arrow
            >
              <InfoIcon
                sx={{ fontSize: 16, color: 'text.disabled', cursor: 'help' }}
              />
            </Tooltip>
          </Box>
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
        <HeatmapGrid
          sx={{
            gridTemplateColumns: `repeat(${heatmap.length > 24 ? 14 : heatmap.length || 7}, 1fr)`,
          }}
        >
          {heatmap && heatmap.length > 0
            ? heatmap.map((intensity: number, i: number) => (
                <HeatmapCell key={i} intensity={intensity} />
              ))
            : Array.from({ length: 24 }).map((_, i) => (
                <HeatmapCell key={i} intensity={0} />
              ))}
        </HeatmapGrid>
        <Box display="flex" justifyContent="space-between" mt={1}>
          {heatmapLabels?.map((label) => (
            <Typography key={label} variant="caption" color="text.secondary">
              {label}
            </Typography>
          ))}
        </Box>
      </ChartCard>
    </BottomRow>
  );
};
