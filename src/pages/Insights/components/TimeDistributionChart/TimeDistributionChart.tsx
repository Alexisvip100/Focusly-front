import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../../Insights.styles';
import type { TimeDistributionChartProps } from './TimeDistributionChart.types';

function formatMinutes(val: number): string {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;
  return `${hours}h ${minutes}m`;
}

export const TimeDistributionChart: React.FC<TimeDistributionChartProps> = ({
  data,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const hasData = data.some((d) => d.value > 0);
  const chartData = hasData
    ? data
    : [
        {
          name: 'Empty',
          value: 1,
          color: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
        },
      ];

  const deepWork = data.find((d) => d.name === 'Deep Work')?.value || 0;
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const focusPercentage = total > 0 ? Math.round((deepWork / total) * 100) : 0;

  const displayCategories = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  return (
    <ChartCard>
      <Typography variant="h6" fontWeight="bold">
        Time Distribution
      </Typography>

      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '220px', width: '100%' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={hasData ? 5 : 0}
              dataKey="value"
              animationDuration={1000}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text: % Focus Activity */}
        <Box
          position="absolute"
          textAlign="center"
          sx={{ pointerEvents: 'none' }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: hasData ? 'text.primary' : 'text.disabled',
              lineHeight: 1,
            }}
          >
            {focusPercentage}%
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontWeight: '800',
              fontSize: '0.65rem',
              display: 'block',
              mt: 0.5,
              letterSpacing: '0.05em',
              lineHeight: 1.2,
            }}
          >
            FOCUS
            <br />
            ACTIVITY
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={1.2}>
        {displayCategories.map((item) => (
          <Box
            key={item.name}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '3px',
                  bgcolor: item.color,
                }}
              />
              <Typography
                variant="caption"
                fontWeight="600"
                color="text.primary"
              >
                {item.name}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              fontWeight="700"
              color="text.primary"
            >
              {formatMinutes(item.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
