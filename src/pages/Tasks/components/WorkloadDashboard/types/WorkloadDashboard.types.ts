export type TWorkloadDashboard = {
  daysWeek: Date[];
  getDaysWeek: () => void;
  estimationWeek: number;
  limitWeek: number;
  availableSlots: number;
  dailyWorkload: number[];
  GetEstimationForWeek: () => void;
  GetLimitForWeek: () => void;
  GetAvailableSlots: () => void;
};
