import type { StatValue } from '../../useInsights.hook';

export interface StatsCardsProps {
  totalFocusHours: StatValue;
  taskCompletion: StatValue;
  energyScore: StatValue;
  breakHours: StatValue;
  goldenWindow: StatValue;
}
