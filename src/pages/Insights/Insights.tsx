import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import {
  AccessTime,
  CheckCircleOutline,
  Bolt,
  WbSunny,
  FileDownloadOutlined,
  Add,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PageContainer,
  HeaderContainer,
  StatsGrid,
  StatCard,
  IconWrapper,
  ChartsRow,
  ChartCard,
  BottomRow,
  FilterButton,
  ActionButton,
  HeatmapGrid,
  HeatmapCell,
} from './Insights.styles';
import { useInsights } from './useInsights.hook';

export const Insights = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { insights, loading, filter, setFilter } = useInsights();
  const filters = ['Daily', 'Weekly', 'Monthly']; // 'Custom' removed for simplicity for now

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Fallback to defaults if data is missing (e.g. error or empty)
  const stats = insights || {
    totalFocusHours: { value: '0h 0m', change: '0%', trend: 'neutral' },
    taskCompletion: { value: '0%', change: '0%', trend: 'neutral' },
    energyScore: { value: 'N/A', change: '0 pts', trend: 'neutral' },
    goldenWindow: { value: 'N/A', change: '-', trend: 'neutral' },
    productivityTrends: [],
    timeDistribution: [],
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {filter} Insights
            </Typography>
            {/* Date range could be dynamic here, keeping simple for now */}
            <Typography variant="body1" color="text.secondary" mt={1}>
              Productivity Overview
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <ActionButton>
              <FileDownloadOutlined fontSize="small" />
              Export
            </ActionButton>
            <ActionButton primary>
              <Add fontSize="small" />
              Create Report
            </ActionButton>
          </Box>
        </Box>

        <Box display="flex" gap={1} mt={2}>
          {filters.map((f) => (
            <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </FilterButton>
          ))}
        </Box>
      </HeaderContainer>

      {/* Stats Cards */}
      <StatsGrid>
        <StatCard>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Focus Hours
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {stats.totalFocusHours.value}
              </Typography>
            </Box>
            <IconWrapper color={theme.palette.primary.main}>
              <AccessTime />
            </IconWrapper>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color:
                stats.totalFocusHours.trend === 'up'
                  ? 'success.main'
                  : stats.totalFocusHours.trend === 'down'
                    ? 'error.main'
                    : 'text.secondary',
              bgcolor:
                stats.totalFocusHours.trend === 'up'
                  ? 'success.light'
                  : stats.totalFocusHours.trend === 'down'
                    ? 'error.light'
                    : 'action.hover',
              py: 0.5,
              px: 1,
              borderRadius: 1,
              width: 'fit-content',
            }}
          >
            {stats.totalFocusHours.change}
          </Typography>
        </StatCard>

        <StatCard>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Task Completion
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {stats.taskCompletion.value}
              </Typography>
            </Box>
            <IconWrapper color="#6366f1">
              <CheckCircleOutline />
            </IconWrapper>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: stats.taskCompletion.trend === 'up' ? 'success.main' : 'text.secondary',
              bgcolor: stats.taskCompletion.trend === 'up' ? 'success.light' : 'action.hover',
              py: 0.5,
              px: 1,
              borderRadius: 1,
              width: 'fit-content',
            }}
          >
            {stats.taskCompletion.change}
          </Typography>
        </StatCard>

        <StatCard>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Energy Score
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {stats.energyScore.value}
              </Typography>
            </Box>
            <IconWrapper color="#8b5cf6">
              <Bolt />
            </IconWrapper>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: 'success.main',
              bgcolor: 'success.light',
              py: 0.5,
              px: 1,
              borderRadius: 1,
              width: 'fit-content',
            }}
          >
            {stats.energyScore.change}
          </Typography>
        </StatCard>

        <StatCard>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Golden Window
              </Typography>
              <Typography variant="h5" fontWeight="bold" mt={1}>
                {stats.goldenWindow.value}
              </Typography>
            </Box>
            <IconWrapper color={theme.palette.warning.main}>
              <WbSunny />
            </IconWrapper>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {stats.goldenWindow.change}
          </Typography>
        </StatCard>
      </StatsGrid>

      {/* Middle Row Charts */}
      <ChartsRow>
        <ChartCard>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Productivity Trends
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Planned vs Actual Focus Hours
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                <Typography variant="caption">Actual</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                <Typography variant="caption">Planned</Typography>
              </Box>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.productivityTrends}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'} vertical={false} />
              <XAxis
                dataKey="day"
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

        <ChartCard>
          <Typography variant="h6" fontWeight="bold">
            Time Distribution
          </Typography>
          <Box
            flexGrow={1}
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.timeDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.timeDistribution.map((entry: { color: string }, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text - Could be total hours or main category */}
            <Box position="absolute" textAlign="center">
              <Typography variant="h4" fontWeight="bold">
                {stats.totalFocusHours.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                TOTAL
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            {stats.timeDistribution.map((item: { name: string; color: string; value: number }) => (
              <Box
                key={item.name}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: 1, bgcolor: item.color }} />
                  <Typography variant="caption">{item.name}</Typography>
                </Box>
                <Typography variant="caption" fontWeight="bold">
                  {propsFromValue(item.value)}
                </Typography>
              </Box>
            ))}
          </Box>
        </ChartCard>
      </ChartsRow>

      {/* Bottom Row */}
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
                You are most productive between <b>{stats.goldenWindow.value}</b>
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" mt={2}>
            PRODUCTIVITY SCORE (LAST 7 DAYS)
          </Typography>
          {/* Mock bar chart visual could go here, omitting for brevity */}
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
            {stats.heatmap && stats.heatmap.length > 0
              ? stats.heatmap.map((intensity: number, i: number) => (
                  <HeatmapCell key={i} intensity={intensity} />
                ))
              : /* Fallback if no data */
                Array.from({ length: 70 }).map((_, i) => <HeatmapCell key={i} intensity={0} />)}
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
    </PageContainer>
  );
};

// Helper for mock values - update to handle minutes/string formatting
function propsFromValue(val: number) {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;
  return `${hours}h ${minutes}m`;
}
