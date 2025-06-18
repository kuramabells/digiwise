import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  ageRange?: string;
  region?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface UserContextType {
  state: UserState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
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
        const response = await api.get<{ user: User }>('/users/me', {
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

  const login = async (email: string, password: string) => {
    try {
      console.log('\n=== Login Attempt ===');
      console.log('Email:', email);
      
      const response = await api.post<{
        status: string;
        message: string;
        token: string;
        user: User;
        success: boolean;
      }>('/users/login', {
        email,
        password
      });

      console.log('Login response:', response.data);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const { user, token, success } = response.data;
      
      if (!success || !user || !token) {
        throw new Error('Missing user data or token in response');
      }

      // Store token in localStorage
      localStorage.setItem('userToken', token);
      console.log('Token stored in localStorage:', token);

      // Verify token was stored
      const storedToken = localStorage.getItem('userToken');
      console.log('Verified stored token:', storedToken);
      console.log('Token match:', storedToken === token);

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      console.log('Login successful for user:', user.email);
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response) {
        throw new Error(error.response.data?.message || `Login failed: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  };

  const logout = () => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('userToken');
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      console.log('Attempting registration with:', { email: userData.email });
      
      const response = await api.post<AuthResponse>('/users/register', userData);
      
      console.log('Registration response:', response.data);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const { user, token } = response.data;
      
      if (!user || !token) {
        throw new Error('Missing user data or token in response');
      }
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      localStorage.setItem('userToken', token);
      console.log('Registration successful for user:', user.email);
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