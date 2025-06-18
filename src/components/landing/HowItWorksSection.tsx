import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, BarChart2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export const HowItWorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const steps = [{
    id: 1,
    title: 'Take 5-Minute Assessment',
    description: 'Answer questions about your digital habits and usage patterns',
    icon: <ClipboardList size={28} className="text-blue-600" />,
    color: 'bg-blue-50',
    borderColor: 'border-blue-100'
  }, {
    id: 2,
    title: 'Get Your Risk Score',
    description: 'Receive your personalized digital wellness risk level and detailed analysis',
    icon: <BarChart2 size={28} className="text-indigo-600" />,
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-100'
  }, {
    id: 3,
    title: 'Follow Personalized Plan',
    description: 'Implement tailored recommendations to improve your digital wellness',
    icon: <TrendingUp size={28} className="text-emerald-600" />,
    color: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  }];
  return <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-64 h-64 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-64 h-64 bg-indigo-50 rounded-full opacity-70 blur-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Our simple three-step process helps you understand and improve your
            digital wellness
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          {/* Connecting line - Fixed positioning */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-0.5 bg-gray-200 z-0"></div>
          {steps.map((step, index) => <motion.div key={step.id} className="flex flex-col items-center text-center md:w-1/3 mb-12 md:mb-0 relative z-10" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.2
        }} onMouseEnter={() => setHoveredStep(step.id)} onMouseLeave={() => setHoveredStep(null)}>
              <div className="relative">
                {/* Step number - Correctly positioned */}
                <motion.div className={`absolute -top-3 -right-3 ${hoveredStep === step.id ? 'bg-blue-600' : 'bg-gray-700'} text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 z-20`} animate={{
              scale: hoveredStep === step.id ? 1.1 : 1
            }} transition={{
              duration: 0.2
            }}>
                  {step.id}
                </motion.div>
                <motion.div className={`${step.color} w-16 h-16 rounded-full shadow-md flex items-center justify-center mb-6 border ${step.borderColor}`} animate={{
              scale: hoveredStep === step.id ? 1.1 : 1,
              boxShadow: hoveredStep === step.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }} transition={{
              duration: 0.3
            }}>
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </motion.div>)}
        </div>
        <motion.div className="mt-16 text-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.6
      }}>
          <Link to="/assessment">
            <motion.button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center mx-auto" whileHover={{
            scale: 1.03
          }} whileTap={{
            scale: 0.98
          }}>
              Start Your Assessment
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>;
};