import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_INSIGHTS } from './insights.graphql';
import { useAppSelector } from '@/redux/hooks';

export interface StatValue {
  value: string;
  change: string;
  trend: string;
}

export interface TrendData {
  label: string;
  actual: number;
  planned: number;
}

export interface DistributionEntry {
  name: string;
  value: number;
  color: string;
}

export interface InsightsData {
  totalFocusHours: StatValue;
  taskCompletion: StatValue;
  energyScore: StatValue;
  goldenWindow: StatValue;
  breakHours: StatValue;
  productivityTrends: TrendData[];
  timeDistribution: DistributionEntry[];
  heatmap: number[];
  heatmapLabels: string[];
}

const FILTERS = ['Daily', 'Weekly', 'Monthly'] as const;

const DEFAULT_TRENDS: TrendData[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
].map((label) => ({
  label,
  actual: 0,
  planned: 0,
}));

const DEFAULT_DISTRIBUTION: DistributionEntry[] = [
  { name: 'Deep Work', value: 0, color: '#3b82f6' },
  { name: 'Meetings', value: 0, color: '#6366f1' },
  { name: 'Admin/Misc', value: 0, color: '#8b5cf6' },
  { name: 'Rest/Breaks', value: 0, color: '#1e293b' },
];

const DEFAULT_STATS: InsightsData = {
  totalFocusHours: { value: '0h 0m', change: 'No data', trend: 'neutral' },
  taskCompletion: { value: '0%', change: '0%', trend: 'neutral' },
  energyScore: { value: 'N/A', change: '0 pts', trend: 'neutral' },
  goldenWindow: { value: 'N/A', change: '-', trend: 'neutral' },
  breakHours: { value: '0h 0m', change: '0%', trend: 'neutral' },
  productivityTrends: DEFAULT_TRENDS,
  timeDistribution: DEFAULT_DISTRIBUTION,
  heatmap: [],
  heatmapLabels: [],
};

export const useInsights = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState('Weekly');

  const { data, loading, error, refetch } = useQuery(GET_INSIGHTS, {
    variables: {
      userId: user?.id || '',
      filter,
    },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  });

  const stats: InsightsData = useMemo(() => {
    if (!data?.insights) return DEFAULT_STATS;
    return data.insights as InsightsData;
  }, [data]);

  return {
    stats,
    loading,
    error,
    filter,
    filters: FILTERS,
    setFilter,
    refetch,
  };
};
