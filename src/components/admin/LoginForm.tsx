import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [error, setError] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }
    setIsLoading(true);
    try {
      // Attempt login using admin context
      const success = await adminLogin(credentials.username, credentials.password);
      if (success) {
        navigate('/admin');
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        // Show CAPTCHA after 2 failed attempts
        if (newAttempts >= 2) {
          setShowCaptcha(true);
        }
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8" role="form" aria-labelledby="login-heading">
      <h2 id="login-heading" className="text-xl font-semibold text-slate-800 mb-6">
        Administrator Login
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
            Username / Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon size={18} className="text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Enter your username"
              required
              aria-required="true"
              autoComplete="username"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon size={18} className="text-slate-400" aria-hidden="true" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Enter your password"
              required
              aria-required="true"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={credentials.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700">
            Remember me
          </label>
        </div>
        {showCaptcha && (
          <div className="mb-6 p-4 border border-slate-200 rounded-md bg-slate-50" aria-live="polite">
            <p className="text-sm text-slate-600 mb-2">Please verify you're human:</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg tracking-widest bg-slate-200 px-3 py-1 rounded">
                CAPTCHA
              </span>
              <input
                type="text"
                className="ml-3 rounded-md border border-slate-300 py-1 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Enter code"
                aria-label="Enter CAPTCHA code"
                required={showCaptcha}
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 relative"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Login</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <div className="mt-4 text-center space-y-2">
        <Link to="/admin/register" className="text-sm text-slate-600 hover:text-slate-800 focus:outline-none focus:underline">
          Create an admin account
        </Link>
        <div>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-800 focus:outline-none focus:underline" aria-label="Forgot password">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};