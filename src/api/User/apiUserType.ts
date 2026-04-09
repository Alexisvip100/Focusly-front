export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface UserSettings {
  breakDurationPref: number;
  workHoursConfig: Record<string, unknown>;
  notificationsEnabled: boolean;
  blockedAppsList: string[];
  focusDurationPref: number;
}

export interface UserResponse {
  id: string;
  email: string;
  passwordHash?: string;
  authProvider: string;
  subscriptionStatus: 'active' | 'inactive';
  settings: UserSettings;
  createdAt: Timestamp;
  lastSyncAt: Timestamp;
}
