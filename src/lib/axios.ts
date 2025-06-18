import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://digiwise.fun/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    console.log('\n=== Axios Request Interceptor ===');
    console.log('URL:', config.url);
    console.log('Method:', config.method);
    console.log('Token from localStorage:', token);
    console.log('Current headers:', config.headers);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Updated headers:', config.headers);
    } else {
      console.log('❌ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('\n=== Axios Response Interceptor ===');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('\n=== Axios Error Interceptor ===');
    console.error('Error:', error.message);
    console.error('Response:', error.response?.data);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
    console.error('Request config:', error.config);

    // Don't automatically redirect on 401
    return Promise.reject(error);
  }
);

export default api; 