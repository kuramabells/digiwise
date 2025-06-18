import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../../components/admin/DashboardHeader';
import { MetricsCards } from '../../components/admin/MetricsCards';
import { DataVisualizations } from '../../components/admin/DataVisualizations';
import { ManagementSection } from '../../components/admin/ManagementSection';
import { QuickActions } from '../../components/admin/QuickActions';
import { useAdmin } from '../../context/AdminContext';

export const AdminDashboardPage = () => {
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

  const { totalAssessments, completedAssessments, riskDistribution, recentAssessments } = state.dashboardStats;

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
            totalAssessments,
            completedAssessments,
            completionRate: totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0
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