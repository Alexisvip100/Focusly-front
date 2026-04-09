/**
 * Manual API Toggle Configuration
 * Controlled via environment variables — no code change needed per environment.
 * Set VITE_USE_VERCEL_API=true in Vercel dashboard for production.
 * Set VITE_USE_VERCEL_API=false (or omit) for local development.
 */
export const IS_VERCEL_API = import.meta.env.VITE_USE_VERCEL_API === 'true';

export const VERCEL_API_URL = import.meta.env.VITE_API_URL || '';
export const LOCAL_API_URL = 'http://localhost:3000';
