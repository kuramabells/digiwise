import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { ProblemSection } from './components/landing/ProblemSection';
import { SolutionSection } from './components/landing/SolutionSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { AssessmentPage } from './pages/AssessmentPage';
import { ResultsPage } from './pages/ResultsPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AuthPage } from './pages/AuthPage';
import RegisterPage from './pages/admin/RegisterPage';
import LoginForm from './pages/admin/LoginForm';
import { AdminDashboardPage } from './pages/admin/AdminDashboard';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { useUser } from './context/UserContext';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();
  if (!state.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <AssessmentProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/assessment" element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/admin/login" element={<LoginForm />} />
              <Route path="/admin/register" element={<RegisterPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/" element={
                <div className="flex flex-col min-h-screen bg-white">
                  <Header />
                  <main className="flex-grow">
                    <HeroSection />
                    <ProblemSection />
                    <SolutionSection />
                    <HowItWorksSection />
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </Router>
        </AssessmentProvider>
      </UserProvider>
    </AdminProvider>
  );
}