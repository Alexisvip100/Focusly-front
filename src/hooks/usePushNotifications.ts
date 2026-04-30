import { useEffect } from 'react';
import {
  requestNotificationPermission,
  listenForegroundMessages,
  registerServiceWorker,
} from '@/context/firebase';
import axios from '@/api/axiosInstance';
import { useAppSelector } from '@/redux/hooks';

export const usePushNotifications = () => {
  const { user, isLogged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogged || !user?.id) return;

    const setupNotifications = async () => {
      try {
        const registration = await registerServiceWorker();
        const token = await requestNotificationPermission(registration);
        if (token) {
          console.log('FCM Token:', token);
          await axios.patch(`/users/${user.id}`, { fcmToken: token });
        }
      } catch (error) {
        console.error('Error in setupNotifications:', error);
      }
    };

    setupNotifications();

    const unsubscribe = listenForegroundMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isLogged, user?.id]);
};
