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
import { useAdmin } from './context/AdminContext';

// Protected Route component for regular users
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();
  if (!state.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

// Protected Route component for admin users
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAdmin();
  if (!state.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// Main App component
function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <AssessmentProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={
                    <>
                      <HeroSection />
                      <ProblemSection />
                      <SolutionSection />
                      <HowItWorksSection />
                    </>
                  } />
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
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/admin/register" element={<RegisterPage />} />
                  <Route path="/admin/login" element={<LoginForm />} />
                  <Route path="/admin/dashboard" element={
                    <AdminProtectedRoute>
                      <AdminDashboardPage />
                    </AdminProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AssessmentProvider>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;