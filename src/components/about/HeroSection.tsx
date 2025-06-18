import React from 'react';
import { motion } from 'framer-motion';
export const HeroSection = () => {
  return <section className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            Our Mission & Vision
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">DigiWise</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Empowering Digital Wellness Through Science-Based Assessment
          </p>
          <motion.div className="mt-12 max-w-4xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8
        }}>
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                DigiWise is a pioneering digital wellness platform designed to
                help individuals understand and improve their relationship with
                technology. Through our scientifically-validated assessment and
                personalized recommendations, we empower users to develop
                healthier digital habits and achieve better overall wellbeing.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};