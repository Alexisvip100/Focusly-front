import { useState } from 'react';
import { Box } from '@mui/material';
import {
  SettingsContainer,
  SettingsHeader,
  SettingsTitle,
  SettingsDescription,
  TabsContainer,
  TabItem,
} from './Settings.styles';
import {
  PersonOutline as PersonOutlineIcon,
  AccessTime as AccessTimeIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';
import { NotificationSettings } from './components/NotificationSettings';
import { FocusEngineSettings } from './components/FocusEngineSettings';
import { ScheduleSettings } from './components/ScheduleSettings';
import { ProfileSettings } from './components/ProfileSettings';
import { SettingsTab } from './Settings.types';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.Notifications);

  const getHeaderContent = () => {
    switch (activeTab) {
      case SettingsTab.Profile:
        return {
          title: 'General Profile',
          description: 'Manage your personal information, account security, and basic preferences.',
        };
      case SettingsTab.Notifications:
        return {
          title: 'Notification Preferences',
          description: 'Manage how and when you receive alerts for your focus sessions, breaks, and productivity insights.',
        };
      case SettingsTab.Schedule:
        return {
          title: 'Schedule & Energy Settings',
          description: 'Define your availability, work rhythm, and let our AI detect your peak productivity windows to optimize your calendar.',
        };
      case SettingsTab.Focus:
        return {
          title: 'Focus Engine Configuration',
          description: 'Customize how our AI optimizes your deep work sessions, manages your breaks, and shields you from distractions based on your energy levels.',
        };
      default:
        return {
          title: 'Settings',
          description: 'Manage your application preferences and personal information.',
        };
    }
  };

  const header = getHeaderContent();

  const tabs = [
    { id: SettingsTab.Profile, label: 'General Profile', icon: <PersonOutlineIcon fontSize="small" /> },
    { id: SettingsTab.Schedule, label: 'Schedule & Energy', icon: <AccessTimeIcon fontSize="small" /> },
    { id: SettingsTab.Focus, label: 'Focus Engine', icon: <PrecisionManufacturingIcon fontSize="small" /> },
    { id: SettingsTab.Notifications, label: 'Notifications', icon: <NotificationsNoneIcon fontSize="small" /> },
  ];

  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>{header.title}</SettingsTitle>
        <SettingsDescription>
          {header.description}
        </SettingsDescription>

        <TabsContainer>
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </TabItem>
          ))}
        </TabsContainer>
      </SettingsHeader>

      <Box sx={{ mt: 2 }}>
        {activeTab === SettingsTab.Profile && <ProfileSettings />}
        {activeTab === SettingsTab.Notifications && <NotificationSettings />}
        {activeTab === SettingsTab.Focus && <FocusEngineSettings />}
        {activeTab === SettingsTab.Schedule && <ScheduleSettings />}
        {activeTab !== SettingsTab.Profile && 
         activeTab !== SettingsTab.Notifications && 
         activeTab !== SettingsTab.Focus && 
         activeTab !== SettingsTab.Schedule && (
          <Box sx={{ p: 4, textAlign: 'center', opacity: 0.5 }}>
            {activeTab} settings coming soon.
          </Box>
        )}
      </Box>
    </SettingsContainer>
  );
};

export default Settings;
