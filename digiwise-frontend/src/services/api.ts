import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me')
};

// Assessment API
export const assessmentAPI = {
  getQuestions: () => api.get('/assessment/questions'),
  submitAnswers: (answers: any) => api.post('/assessment/submit', answers),
  submitUserInfo: (userInfo: any) => api.post('/assessment/user-info', userInfo),
};

// Results API
export const resultsAPI = {
  getMyResults: () => api.get('/results/my-results'),
  getResultById: (id: number) => api.get(`/results/${id}`),
  downloadResult: (id: number) => api.get(`/results/${id}/download`, { responseType: 'blob' }),
};

export default api; 