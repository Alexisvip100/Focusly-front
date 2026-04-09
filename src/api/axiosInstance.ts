import axios from 'axios';
import { API_BASE_URL } from '@/config/env.config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for logging (optional, helps during dev)
axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
