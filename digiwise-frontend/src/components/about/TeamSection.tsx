import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
export const TeamSection = () => {
  return <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Behind DigiWise
          </h2>
          <p className="text-lg text-gray-600">
            Bringing together expertise in digital wellness research and
            technology
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-16">
            {/* Researcher Side - Added fixed height and flex-1 for equal dimensions */}
            <motion.div className="w-full md:w-1/2" initial={{
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
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl overflow-hidden shadow-lg border border-indigo-100 p-8 flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <span className="text-blue-600 text-4xl font-bold">AR</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  ArnAaron C Rivera
                </h3>
                <p className="text-blue-600 font-medium mb-4">Researcher</p>
                <p className="text-gray-700 text-center">
                  Division of San Jose City Public School Teacher
                </p>
              </div>
            </motion.div>
            {/* Company Side - Added fixed height and flex-1 for equal dimensions */}
            <motion.div className="w-full md:w-1/2" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-blue-100 p-8 flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <span className="text-blue-600 text-4xl font-bold">TP</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  TechPro360 Solutions
                </h3>
                <p className="text-gray-700 text-center">
                  Transforming visions into reality through customized web-based
                  IT solutions that empower businesses to thrive in the digital
                  landscape. We turn complex challenges into streamlined
                  solutions.
                </p>
                <div className="mt-6 pt-6 border-t border-blue-100 w-full text-center">
                  <a href="https://www.techpro360solutions.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium flex items-center justify-center gap-2 hover:underline">
                    <Globe size={16} />
                    www.techpro360solutions.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};