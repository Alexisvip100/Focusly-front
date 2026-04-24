import { Box, CircularProgress } from '@mui/material';
import { PageContainer, ChartsRow } from './Insights.styles';
import { useInsights } from './useInsights.hook';
import { InsightsHeader } from './components/InsightsHeader';
import { StatsCards } from './components/StatsCards';
import { ProductivityTrendsChart } from './components/ProductivityTrendsChart';
import { TimeDistributionChart } from './components/TimeDistributionChart';
import { BottomSection } from './components/BottomSection';

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

      <StatsCards
        totalFocusHours={stats.totalFocusHours}
        taskCompletion={stats.taskCompletion}
        energyScore={stats.energyScore}
        breakHours={stats.breakHours}
        goldenWindow={stats.goldenWindow}
      />

      <ChartsRow>
        <ProductivityTrendsChart data={stats.productivityTrends} />
        <TimeDistributionChart data={stats.timeDistribution} />
      </ChartsRow>

      <BottomSection
        goldenWindowValue={stats.goldenWindow.value}
        heatmap={stats.heatmap}
      />
    </PageContainer>
  );
};
