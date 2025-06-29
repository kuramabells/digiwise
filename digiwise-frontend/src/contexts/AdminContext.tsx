import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Admin {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AdminContextType {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5001/api/admins/login', {
        email,
        password
      });

      const { data } = response.data;
      setAdmin(data.admin);
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}; 