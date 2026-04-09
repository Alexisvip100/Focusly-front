import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (development, production, etc.)
  // El tercer parámetro '' carga todas las variables sin importar el prefijo VITE_
  const env = loadEnv(mode, process.cwd(), '');
  
  const BACKEND_TARGET = env.VITE_API_URL || 'http://localhost:3000';
  const IS_SECURE = BACKEND_TARGET.startsWith('https');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      },
      proxy: {
        '/auth': {
          target: BACKEND_TARGET,
          changeOrigin: true,
          secure: IS_SECURE,
        },
        '/users': {
          target: BACKEND_TARGET,
          changeOrigin: true,
          secure: IS_SECURE,
        },
        '/graphql': {
          target: BACKEND_TARGET,
          changeOrigin: true,
          secure: IS_SECURE,
        },
        '/google-calendar': {
          target: BACKEND_TARGET,
          changeOrigin: true,
          secure: IS_SECURE,
        },
      },
    },
  };
});
