import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface RegisterAdminData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Configure axios instance with retry logic
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Add retry interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 429 (Too Many Requests) and we haven't retried yet
    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Wait for 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Retry the request
      return axiosInstance(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export const registerAdmin = async (data: RegisterAdminData) => {
  try {
    const response = await axiosInstance.post('/admins/register', data);
    return response;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    throw error;
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/admins/login', { email, password });
    return response;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    throw error;
  }
}; 