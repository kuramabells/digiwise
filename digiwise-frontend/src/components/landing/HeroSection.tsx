import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { state } = useUser();

  const handleTakeAssessment = () => {
    if (!state.isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/assessment');
    }
  };

  return <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div className="md:w-1/2 mb-12 md:mb-0 md:pr-8" initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              Scientifically-backed assessment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Your{' '}
              <span className="text-blue-600">Digital Wellness</span> Score
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Take our scientifically-validated assessment and get personalized
              insights to improve your relationship with technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={handleTakeAssessment}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-8 py-4 text-white font-medium shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.03]"
                whileHover={{ boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center gap-2">
                  Take Free Assessment
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
              <Link to="/about">
                <button className="inline-flex items-center justify-center px-8 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="md:w-1/2" initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Digital wellness balance" className="rounded-xl shadow-sm w-full h-auto" />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">
                      Digital Wellness
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{
                    width: '75%'
                  }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};