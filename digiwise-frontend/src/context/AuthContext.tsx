import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('userToken');
      
      // If no token, just set loading to false
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          // If token is invalid, clear it
          localStorage.removeItem('userToken');
          setUser(null);
        }
      } catch (error) {
        console.log('Token verification failed:', error);
        // Don't treat this as an error, just clear the token
        localStorage.removeItem('userToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('userToken', token);
        setUser(user);
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 