import type { TrendData } from '../../useInsights.hook';

export interface ProductivityTrendsChartProps {
  data: TrendData[];
}

export interface TooltipItem {
  name: string;
  value: number;
  color: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
}
