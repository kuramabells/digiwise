import { useEffect, useState } from 'react';
import { LoginForm } from '../../components/admin/LoginForm';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Shield, CheckCircle } from 'lucide-react';

export const AdminLoginPage = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  useEffect(() => {
    // Check if redirected from successful registration
    if (location.state?.registrationSuccess) {
      setShowSuccess(true);
      setRegisteredEmail(location.state.email || '');
      
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      // Clear the location state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-semibold text-slate-800">DigiWise Admin</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/" 
                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Return to Main Site
                  </Link>
                </li>
                <li>
                  <a 
                    href="#support" 
                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
              Admin Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your credentials to access the admin dashboard
            </p>
            
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>
                    Registration successful! {registeredEmail && `Welcome, ${registeredEmail}`} Please sign in to continue.
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <LoginForm />
          </div>

          <div className="text-center text-sm">
            <Link 
              to="/admin/forgot-password" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </main>


      {/* Footer */}
      <footer className="bg-white py-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} DigiWise. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#privacy" className="text-sm text-slate-500 hover:text-slate-700">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-slate-500 hover:text-slate-700">
                Terms of Service
              </a>
              <a href="#contact" className="text-sm text-slate-500 hover:text-slate-700">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-slate-400">
              Secure access for authorized personnel only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};