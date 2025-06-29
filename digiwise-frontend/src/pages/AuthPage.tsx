import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, MapPinIcon, CalendarIcon, KeyIcon, UserPlusIcon, LogInIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    region: '',
    ageRange: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.region) newErrors.region = 'Please select your region';
      if (!formData.ageRange) newErrors.ageRange = 'Please select your age range';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result?.success) {
          navigate('/assessment');
          window.location.reload(); // Force a page refresh to ensure state is properly loaded
        }
      } else {
        const result = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          region: formData.region,
          ageRange: formData.ageRange
        });
        
        // Check if registration was successful and user is authenticated
        if (result?.success) {
          // Use a small timeout to ensure state updates are processed
          setTimeout(() => {
            navigate('/assessment');
            window.location.reload(); // Force a page refresh to ensure state is properly loaded
          }, 100);
        }
      }
    } catch (error: any) {
      setBackendError(error.message || (isLogin ? 'Login failed' : 'Registration failed'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold text-center">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-center text-blue-100">
              {isLogin ? 'Sign in to continue your assessment' : 'Join us to start your digital wellness journey'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon size={16} className="text-gray-400" />
                      </div>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.region ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select your region</option>
                        <option value="NCR">National Capital Region (NCR)</option>
                        <option value="CAR">Cordillera Administrative Region (CAR)</option>
                        <option value="Region I">Region I (Ilocos)</option>
                        <option value="Region II">Region II (Cagayan Valley)</option>
                        <option value="Region III">Region III (Central Luzon)</option>
                        <option value="Region IV-A">Region IV-A (CALABARZON)</option>
                        <option value="Region IV-B">Region IV-B (MIMAROPA)</option>
                        <option value="Region V">Region V (Bicol)</option>
                        <option value="Region VI">Region VI (Western Visayas)</option>
                        <option value="Region VII">Region VII (Central Visayas)</option>
                        <option value="Region VIII">Region VIII (Eastern Visayas)</option>
                        <option value="Region IX">Region IX (Zamboanga Peninsula)</option>
                        <option value="Region X">Region X (Northern Mindanao)</option>
                        <option value="Region XI">Region XI (Davao)</option>
                        <option value="Region XII">Region XII (SOCCSKSARGEN)</option>
                        <option value="Region XIII">Region XIII (Caraga)</option>
                        <option value="BARMM">Bangsamoro (BARMM)</option>
                      </select>
                      {errors.region && (
                        <p className="mt-1 text-xs text-red-500">{errors.region}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age Range
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon size={16} className="text-gray-400" />
                      </div>
                      <select
                        name="ageRange"
                        value={formData.ageRange}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.ageRange ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select your age range</option>
                        <option value="13-17">13-17 (High School)</option>
                        <option value="18-24">18-24 (College/Young Adult)</option>
                        <option value="25-34">25-34 (Young Professional)</option>
                        <option value="35-44">35-44 (Mid-career)</option>
                        <option value="45-54">45-54 (Mature Adult)</option>
                        <option value="55+">55+ (Senior)</option>
                      </select>
                      {errors.ageRange && (
                        <p className="mt-1 text-xs text-red-500">{errors.ageRange}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <LogInIcon size={18} className="mr-2" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <UserPlusIcon size={18} className="mr-2" />
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 text-sm"
                disabled={isLoading}
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
            {backendError && (
              <p className="mt-2 text-sm text-red-500 text-center">{backendError}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};