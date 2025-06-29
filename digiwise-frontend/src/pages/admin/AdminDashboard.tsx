import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../../components/admin/DashboardHeader';
import { MetricsCards } from '../../components/admin/MetricsCards';
import { DataVisualizations } from '../../components/admin/DataVisualizations';
import { ManagementSection } from '../../components/admin/ManagementSection';
import { QuickActions } from '../../components/admin/QuickActions';
import { useAdmin } from '../../context/AdminContext';

interface DashboardStats {
  userMetrics?: {
    totalUsers: number;
    usersWithAssessments: number;
    recentUsers: number;
    assessmentParticipation: number;
  };
  assessmentMetrics?: {
    totalAssessments: number;
    completedAssessments: number;
    completionRate: number;
  };
  riskDistribution?: {
    low: number;
    moderate: number;
    high: number;
    severe: number;
  };
  recentAssessments?: any[];
}

export const AdminDashboardPage = () => {
  // Define variables at the top of the component
  let riskDistribution = {
    low: 0,
    moderate: 0,
    high: 0,
    severe: 0
  };
  
  let recentAssessments: any[] = [];
  
  const {
    state,
    fetchDashboardStats
  } = useAdmin();
  const navigate = useNavigate();

  // Memoize authentication check
  const checkAuth = useCallback(() => {
    if (!state?.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [state?.isAuthenticated, navigate]);

  // Fetch dashboard data only once on mount or when auth state changes
  useEffect(() => {
    checkAuth();
    // Only fetch if authenticated
    if (state?.isAuthenticated && !state?.dashboardStats) {
      fetchDashboardStats().catch(error => {
        console.error('Failed to fetch dashboard stats:', error);
      });
    }
  }, [state?.isAuthenticated, checkAuth, fetchDashboardStats]);

  // Memoize loading state component
  const LoadingState = useMemo(() => (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading dashboard data...</p>
      </div>
    </div>
  ), []);

  // Show loading state if no data
  if (!state?.dashboardStats) {
    return LoadingState;
  }

  // Get the dashboard stats with defaults and ensure proper typing
  const stats = state.dashboardStats as DashboardStats;
  
  // Update variables with data from the API
  if (stats.riskDistribution) {
    riskDistribution = {
      low: stats.riskDistribution.low || 0,
      moderate: stats.riskDistribution.moderate || 0,
      high: stats.riskDistribution.high || 0,
      severe: stats.riskDistribution.severe || 0
    };
  }
  
  if (Array.isArray(stats.recentAssessments)) {
    recentAssessments = stats.recentAssessments;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6" tabIndex={0}>
          Dashboard Overview
        </h1>
        {/* Metrics Cards Section */}
        <MetricsCards 
          stats={{
            userMetrics: {
              totalUsers: stats.userMetrics?.totalUsers || 0,
              usersWithAssessments: stats.userMetrics?.usersWithAssessments || 0,
              recentUsers: stats.userMetrics?.recentUsers || 0,
              assessmentParticipation: stats.userMetrics?.assessmentParticipation || 0
            },
            assessmentMetrics: {
              totalAssessments: stats.assessmentMetrics?.totalAssessments || 0,
              completedAssessments: stats.assessmentMetrics?.completedAssessments || 0,
              completionRate: stats.assessmentMetrics?.completionRate || 0
            },
            riskDistribution: {
              low: stats.riskDistribution?.low || 0,
              moderate: stats.riskDistribution?.moderate || 0,
              high: stats.riskDistribution?.high || 0,
              severe: stats.riskDistribution?.severe || 0
            }
          }} 
        />
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <DataVisualizations 
              riskData={riskDistribution}
              recentAssessments={recentAssessments}
            />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
        {/* Management Section */}
        <ManagementSection />
      </div>
    </div>
  );
};