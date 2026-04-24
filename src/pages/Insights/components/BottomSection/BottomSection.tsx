import { Box, Typography } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
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
          <Typography variant="h6" fontWeight="bold">
            Horas de Oro
          </Typography>
          <ActionButton>VER DETALLES</ActionButton>
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
              Eres más productivo entre las{' '}
              <b>{goldenWindowValue}</b>
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={2}>
          PUNTAJE DE PRODUCTIVIDAD (ÚLTIMOS 7 DÍAS)
        </Typography>
      </ChartCard>

      <ChartCard sx={{ height: 'auto', minHeight: '300px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Mapa de Actividad
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Menos
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
              Más
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
