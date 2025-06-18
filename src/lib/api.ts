import axios from 'axios';

// Automatically use whatever origin you’re serving from + /api
const API_BASE_URL = `${window.location.origin}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach whichever token is stored
api.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear both tokens and redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
