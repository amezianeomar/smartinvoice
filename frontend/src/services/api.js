import axios from 'axios';

/**
 * Axiose instance for centralized API communication
 * Base URL is configured via environment variables (VITE_API_URL)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches the Bearer token to every request
 */
api.interceptors.request.use(
  (config) => {
    // Priority 1: Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Priority 2: If you use Redux in the future, you can import the store and get it from there:
    // import { store } from '../store';
    // const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Global error handling for common HTTP status codes
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global handling for 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.error('Session expired. Redirecting to login...');
      
      // Clear token from storage
      localStorage.removeItem('token');
      
      // Redirect to login (Full page reload to clear any sensitive state)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // You can add more status code handlers here (e.g., 403, 500)
    
    return Promise.reject(error);
  }
);

export default api;
