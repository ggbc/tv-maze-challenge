import axios from 'axios';

/**
 * Axios instance configured to point to the backend.
 * All calls use /api as a prefix, which Vite proxies to the backend in development.
 */
const api = axios.create({
  baseURL: '/api',
});

export default api;