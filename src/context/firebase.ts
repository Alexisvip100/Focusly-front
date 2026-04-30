import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import 'animate.css';
import { store } from '@/redux/store';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface showNotificationProps {
  title: string;
  body: string;
  icon: string;
  tag: string;
  renotify: boolean;
}
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async (
  registration?: ServiceWorkerRegistration | null,
) => {
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    throw new Error('Notification permission denied');
  }

  console.log('VAPID Key loaded:', !!import.meta.env.VITE_FIREBASE_VAPID_KEY);

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration || undefined,
  });

  return token;
};

export const listenForegroundMessages = () => {
  return onMessage(messaging, (payload) => {
    const state = store.getState();
    const pushEnabled = state.auth.user?.pushEnabled !== false;

    if (!pushEnabled) {
      console.log(
        'Notificación recibida pero ignorada por preferencia del usuario.',
      );
      return;
    }

    console.log('Mensaje recibido en Focusly:', payload);

    // Data-only messages: title/body are in payload.data
    const data = payload.data as Record<string, string>;
    const taskTitle = data?.taskTitle || data?.title || 'Upcoming Task! 🚀';
    const taskId = data?.taskId || 'new-task';
    const deadlineStr = data?.deadline;
    let timeFormatted = '';

    if (deadlineStr) {
      const date = new Date(deadlineStr);
      timeFormatted = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // 1. System notification (shows over other tabs)
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        void registration.showNotification(taskTitle, {
          body: `Empieza a las ${timeFormatted}`,
          icon: '/Focusly.png',
          tag: taskId,
          renotify: true,
        } as showNotificationProps);
      });
    }

    // 2. Premium in-app toast (only when tab is visible)
    if (document.visibilityState === 'visible') {
      void Swal.fire({
        html: `
          <div style="text-align: left; font-family: 'Inter', sans-serif;">
            <div style="font-size: 11px; color: #82aaff; font-weight: 800; letter-spacing: 1.2px; margin-bottom: 8px; text-transform: uppercase;">NEXT TASK</div>
            <div style="font-size: 20px; color: white; font-weight: 700; margin-bottom: 8px; line-height: 1.2;">${taskTitle}</div>
            <div style="display: flex; align-items: center; color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
              <span style="margin-right: 8px; font-size: 16px;">🕒</span> ${timeFormatted}
            </div>
          </div>
        `,
        toast: true,
        position: 'top',
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Check',
        denyButtonText: 'Dismiss',
        confirmButtonColor: '#3b82f6',
        denyButtonColor: '#334155',
        background: '#111827',
        color: '#ffffff',
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster',
        },
        didOpen: (toast) => {
          toast.style.borderRadius = '16px';
          toast.style.padding = '20px';
          toast.style.width = '380px';
          toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';

          const confirmBtn = toast.querySelector(
            '.swal2-confirm',
          ) as HTMLElement;
          const denyBtn = toast.querySelector('.swal2-deny') as HTMLElement;
          if (confirmBtn) {
            confirmBtn.style.borderRadius = '12px';
            confirmBtn.style.fontWeight = '600';
            confirmBtn.style.flex = '1';
          }
          if (denyBtn) {
            denyBtn.style.borderRadius = '12px';
            denyBtn.style.fontWeight = '600';
            denyBtn.style.flex = '0.5';
          }
        },
      });
    }
  });
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const params = new URLSearchParams({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }).toString();

    try {
      await navigator.serviceWorker.register(
        `/firebase-messaging-sw.js?${params}`,
      );
      const registration = await navigator.serviceWorker.ready;
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (err) {
      console.error('Service Worker registration failed:', err);
      return null;
    }
  }
  return null;
};
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
