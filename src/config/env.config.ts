import { IS_VERCEL_API, VERCEL_API_URL, LOCAL_API_URL } from './vercel.config';

/**
 * Global environment configuration
 * Uses the manual toggle in vercel.config.ts to determine the API endpoint.
 * Toggle IS_VERCEL_API to true for production, false for local dev via proxy.
 */
export const IS_PRODUCTION = import.meta.env.PROD;

export const API_BASE_URL = IS_VERCEL_API 
  ? VERCEL_API_URL 
  : LOCAL_API_URL; 

