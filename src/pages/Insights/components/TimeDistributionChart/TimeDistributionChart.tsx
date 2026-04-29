import React from 'react';
import { Box, Typography, useTheme, Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../../Insights.styles';
import type {
  TimeDistributionChartProps,
  DistributionEntry,
} from './TimeDistributionChart.types';

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
  const [hoveredData, setHoveredData] =
    React.useState<DistributionEntry | null>(null);

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
  const activeSegments = data.filter((d) => d.value > 0).length;
  const chartPadding = activeSegments > 1 ? 4 : 0;

  return (
    <ChartCard>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="h6" fontWeight="bold">
          Time Distribution
        </Typography>
        <Tooltip
          title="Shows which types of activities you spend the most time on, classifying your tasks into categories like Deep Work, Meetings, or Admin."
          arrow
        >
          <InfoIcon
            sx={{ fontSize: 16, color: 'text.disabled', cursor: 'help' }}
          />
        </Tooltip>
      </Box>

      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={-2}
        sx={{ height: '310px', width: '100%' }}
      >
        {/* Detached Info Box (Instead of floating tooltip) */}
        {hoveredData && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
              p: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: '160px',
              zIndex: 10,
              pointerEvents: 'none',
              animation: 'fadeIn 0.2s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(5px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: hoveredData.color,
                }}
              />
              <Typography variant="body2" fontWeight="800">
                {hoveredData.name}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 2.5 }}
            >
              Time:{' '}
              <b style={{ color: 'var(--mui-palette-text-primary)' }}>
                {formatMinutes(hoveredData.value)}
              </b>
            </Typography>
          </Box>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={chartPadding}
              dataKey="value"
              animationDuration={1000}
              stroke="none"
              fillOpacity={1}
              onMouseEnter={(_, index) => setHoveredData(chartData[index])}
              onMouseLeave={() => setHoveredData(null)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
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
            <Typography variant="caption" fontWeight="700" color="text.primary">
              {formatMinutes(item.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
