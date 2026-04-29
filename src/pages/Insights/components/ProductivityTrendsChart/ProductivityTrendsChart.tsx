import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Tooltip as MuiTooltip,
} from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard } from '../../Insights.styles';
import type {
  CustomTooltipProps,
  ProductivityTrendsChartProps,
} from './ProductivityTrendsChart.types';

const formatValue = (value: number) => {
  if (value === 0) return '0h';
  // Value is in hours from backend (e.g. 1.5 = 1h 30m)
  const totalMinutes = Math.round(value * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  return `${minutes}m`;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          {label}
        </Typography>
        {payload.map((item) => (
          <Box
            key={item.name}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: item.color,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', flex: 1 }}
            >
              {item.name === 'actual' ? 'Actual Time' : 'Estimated Goal'}:
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {formatValue(item.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export const ProductivityTrendsChart: React.FC<
  ProductivityTrendsChartProps
> = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <ChartCard>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="h6" fontWeight="bold">
              Focus Performance
            </Typography>
            <MuiTooltip
              title="We compare your Estimated Goal (the sum of time you planned for tasks due today) against your Actual Time (the total minutes recorded by the timer for those same tasks)."
              arrow
            >
              <InfoIcon
                sx={{ fontSize: 16, color: 'text.disabled', cursor: 'help' }}
              />
            </MuiTooltip>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Estimated Goal vs. Actual Time
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
            <Typography variant="caption">Actual Time</Typography>
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
            <Typography variant="caption">Estimated Goal</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(val) => `${val}h`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorActual)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="planned"
              stroke={theme.palette.text.disabled}
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
