import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard } from '../../Insights.styles';
import type { ProductivityTrendsChartProps } from './ProductivityTrendsChart.types';

export const ProductivityTrendsChart: React.FC<ProductivityTrendsChartProps> = ({
  data,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <ChartCard>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Rendimiento de Enfoque
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Meta Estimada vs. Tiempo Realizado
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
              }}
            />
            <Typography variant="caption">Tiempo Realizado</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'text.disabled',
              }}
            />
            <Typography variant="caption">Meta Estimada</Typography>
          </Box>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--mui-palette-background-paper)',
              border: 'none',
              borderRadius: '8px',
            }}
            itemStyle={{ color: 'var(--mui-palette-text-primary)' }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="var(--mui-palette-primary-main)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorActual)"
          />
          <Area
            type="monotone"
            dataKey="planned"
            stroke={theme.palette.text.disabled}
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
