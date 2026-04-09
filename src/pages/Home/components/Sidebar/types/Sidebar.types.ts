export enum TaskBar {
  DailyPlan = 'DailyPlan',
  Tasks = 'Tasks',
  Workspace = 'Workspace',
  Insights = 'Insights',
  Settings = 'Settings',
}
export interface SidebarProps {
  activeTab: TaskBar;
  changeStatusTab: (active: TaskBar) => void;
}
