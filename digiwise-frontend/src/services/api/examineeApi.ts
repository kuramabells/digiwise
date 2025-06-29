import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Configure axios instance with retry logic
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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

export interface UserFormData {
  first_name: string;
  email: string;
  age_range: string;
  region: string;
  role?: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface AssessmentResult {
  examinationId: number;
  overallScore: number;
  categoryScores: Record<string, number>;
  riskLevel: string;
}

export const examineeApi = {
  // Register a new examinee
  register: async (userData: UserFormData) => {
    try {
      const response = await axiosInstance.post('/examinees/register', userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Login an examinee
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/examinees/login', { email, password });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Save examinee information
  saveInfo: async (data: UserFormData & { examination_id: number }) => {
    try {
      const response = await axiosInstance.post('/examinees/info', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Start a new examination
  startExamination: async (userId: number) => {
    try {
      const response = await axiosInstance.post('/examinations/start', { userId });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Submit answers for an examination
  submitAnswers: async (examinationId: number, answers: Answer[]) => {
    try {
      const response = await axiosInstance.post(`/examinations/${examinationId}/answers`, { answers });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Complete an examination
  completeExamination: async (examinationId: number) => {
    try {
      const response = await axiosInstance.post(`/examinations/${examinationId}/complete`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Get examination results
  getResults: async (examinationId: number) => {
    try {
      const response = await axiosInstance.get(`/examinations/${examinationId}/results`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  },

  // Get user's examination history
  getExaminationHistory: async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/examinees/${userId}/examinations`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
  }
}; 