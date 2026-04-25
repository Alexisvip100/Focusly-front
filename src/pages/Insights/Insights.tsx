import { Box, CircularProgress } from '@mui/material';
import { PageContainer, ChartsRow } from './Insights.styles';
import { useInsights } from './useInsights.hook';
import { InsightsHeader } from './components/InsightsHeader';
import { StatsCards } from './components/StatsCards';
import { ProductivityTrendsChart } from './components/ProductivityTrendsChart';
import { TimeDistributionChart } from './components/TimeDistributionChart';
import { BottomSection } from './components/BottomSection/BottomSection';

export const Insights = () => {
  const { stats, loading, filter, filters, setFilter } = useInsights();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer>
      <InsightsHeader
        filter={filter}
        filters={[...filters]}
        onFilterChange={setFilter}
      />

      <Box id="joyride-insights-stats">
        <StatsCards
          totalFocusHours={stats.totalFocusHours}
          taskCompletion={stats.taskCompletion}
          energyScore={stats.energyScore}
          breakHours={stats.breakHours}
          goldenWindow={stats.goldenWindow}
        />
      </Box>

      <ChartsRow>
        <Box id="joyride-insights-trends" sx={{ flex: 1 }}>
          <ProductivityTrendsChart data={stats.productivityTrends} />
        </Box>
        <Box id="joyride-insights-distribution" sx={{ flex: 1 }}>
          <TimeDistributionChart data={stats.timeDistribution} />
        </Box>
      </ChartsRow>

      <Box id="joyride-insights-heatmap">
        <BottomSection
          goldenWindowValue={stats.goldenWindow.value}
          heatmap={stats.heatmap}
          heatmapLabels={stats.heatmapLabels}
        />
      </Box>
    </PageContainer>
  );
};
