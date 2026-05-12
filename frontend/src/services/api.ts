import axios from 'axios';

const isProduction = import.meta.env.PROD;
const API_URL = isProduction 
  ? 'https://timtrancaulong-production.up.railway.app' 
  : 'http://localhost:8082';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
