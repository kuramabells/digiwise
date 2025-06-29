import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  ageRange?: string;
  region?: string;
  role: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface UserContextType {
  state: UserState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean }>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState<UserState>({
    user: null,
    token: localStorage.getItem('userToken'),
    isAuthenticated: false,
    isLoading: true
  });

  // Verify token and load user data on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const response = await axios.get<{ user: User }>('http://localhost:5001/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.user) {
          setState({
            user: response.data.user,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          throw new Error('No user data received');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('userToken');
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      console.log('=== Login Debug ===');
      console.log('Sending login request to:', '/api/users/login');
      console.log('Email:', email);
      
      // Log the exact request being sent
      const requestData = {
        email: email.trim(),
        password: password // Don't log the actual password in production
      };
      
      console.log('Request payload:', JSON.stringify({
        ...requestData,
        password: '***' // Mask password in logs
      }, null, 2));
      
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/users/login',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true,
        validateStatus: (status) => status < 500 // Don't throw for 4xx errors
      });

      console.log('=== Login Response ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Response data:', response.data);
      console.log('Response headers:', response.headers);

      if (response.status === 401) {
        console.error('Authentication failed. Possible reasons:');
        console.error('- Incorrect email or password');
        console.error('- User does not exist');
        console.error('- Account is not activated');
        throw new Error('Invalid email or password');
      }

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const { user, token, status, success } = response.data;
      
      if (status !== 'success' || !success || !user || !token) {
        throw new Error(response.data.message || 'Authentication failed');
      }
      
      // Map the response data to our User interface
      const userData: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role || 'user'
      };

      // Update the state with the user data
      setState({
        user: userData,
        token,
        isAuthenticated: true,
        isLoading: false
      });

      // Store token in localStorage
      localStorage.setItem('userToken', token);
      console.log('Token stored in localStorage');

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      // Optional: Call the backend logout endpoint if you have one
      // await axios.post('http://localhost:5001/api/users/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear frontend state and storage
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      });
      localStorage.removeItem('userToken');
      // Clear any other stored data if needed
      // localStorage.clear(); // Be careful with this as it clears everything
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      console.log('=== Registration Debug ===');
      console.log('Sending registration request to:', '/api/admins/register');
      
      // Prepare the request payload with only the required fields
      const payload = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      console.log('Request payload:', JSON.stringify(payload, null, 2));
      
      const response = await axios.post('http://localhost:5001/api/admins/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: () => true // This will make axios not throw on HTTP error status
      });
      
      console.log('=== Registration Response ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Response data:', response.data);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Handle the backend's response format
      const { data, token, status, message } = response.data;
      
      if (status !== 'success' || !data || !data.admin || !token) {
        throw new Error(message || 'Registration failed: Invalid response format');
      }
      
      // Map the response data to our User interface
      const user: User = {
        id: data.admin.id || 0, // Provide a default value if id is not present
        firstName: data.admin.firstName,
        lastName: data.admin.lastName,
        email: data.admin.email,
        role: 'admin' // This is an admin registration
      };
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      localStorage.setItem('userToken', token);
      console.log('Registration successful for user:', user.email);
      
      return { success: true };
    } catch (error: any) {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response) {
        throw new Error(error.response.data?.message || `Registration failed: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error(error.message || 'Registration failed');
      }
    }
  };

  // Show loading state while verifying token
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        logout,
        register
      }}
    >
      {children}
    </UserContext.Provider>
  );
};