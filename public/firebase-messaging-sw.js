importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Extract config from URL parameters
const urlParams = new URLSearchParams(self.location.search);

firebase.initializeApp({
  apiKey: urlParams.get('apiKey'),
  authDomain: urlParams.get('authDomain'),
  projectId: urlParams.get('projectId'),
  storageBucket: urlParams.get('storageBucket'),
  messagingSenderId: urlParams.get('messagingSenderId'),
  appId: urlParams.get('appId')
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const data = payload.data || {};
  const notificationTitle = data.taskTitle || payload.notification?.title || 'Upcoming Task! 🚀';
  
  let body = payload.notification?.body || '';
  if (data.deadline) {
    const date = new Date(data.deadline);
    body = `Starts at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  const notificationOptions = {
    body: body,
    icon: '/Focusly.png',
    data: {
      taskId: data.taskId
    },
    tag: 'task-notification',
    renotify: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
