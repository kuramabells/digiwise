import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Admin {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface DashboardStats {
  totalAssessments: number;
  completedAssessments: number;
  riskDistribution: {
    low: number;
    moderate: number;
    high: number;
    severe: number;
  };
  recentAssessments: Array<{
    User: {
      firstName: string;
      lastName: string;
      email: string;
    };
    Result: {
      overall_score: number;
      risk_level: string;
    };
  }>;
}

interface AdminState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  dashboardStats: DashboardStats | null;
}

interface AdminContextType {
  state: AdminState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchDashboardStats: () => Promise<void>;
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
  const [state, setState] = useState<AdminState>({
    admin: null,
    token: localStorage.getItem('adminToken'),
    isAuthenticated: !!localStorage.getItem('adminToken'),
    dashboardStats: null
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5001/api/admins/login', {
        email,
        password
      });

      const { data } = response.data;
      setState(prev => ({
        ...prev,
        admin: data.admin,
        token: data.token,
        isAuthenticated: true,
        dashboardStats: null
      }));
      localStorage.setItem('adminToken', data.token);
      return data; // Return the data for the component to handle navigation
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setState({
      admin: null,
      token: null,
      isAuthenticated: false,
      dashboardStats: null
    });
    localStorage.removeItem('adminToken');
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admins/dashboard', {
        headers: { Authorization: `Bearer ${state.token}` }
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch dashboard stats');
      }

      setState(prev => ({
        ...prev,
        dashboardStats: response.data.data
      }));
    } catch (error: any) {
      console.error('Dashboard stats error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        state,
        login,
        logout,
        fetchDashboardStats
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};