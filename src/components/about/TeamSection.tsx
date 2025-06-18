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
            {/* Researcher Side */}
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
                <div className="w-48 h-48 mb-6 rounded-xl overflow-hidden shadow-md">
                  <img src="/494863906_572923622177487_8550518891480491226_n.jpg" alt="Professional headshot" className="w-full h-full object-cover" />
                </div>
                <motion.h3 className="text-2xl font-bold text-gray-800 mb-2 relative inline-block group cursor-default" whileHover={{
                scale: 1.02
              }}>
                  ArnAaron C Rivera
                  <motion.div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400" whileInView={{
                  width: '100%',
                  transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                  }
                }} viewport={{
                  once: true
                }} />
                </motion.h3>
                <p className="text-blue-600 font-medium mb-4">Researcher</p>
                <p className="text-gray-700 text-center">
                  Division of San Jose City Public School Teacher
                </p>
              </div>
            </motion.div>
            {/* Company Side */}
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
                <div className="w-48 h-48 mb-6 flex items-center justify-center bg-white rounded-xl shadow-md p-4">
                  <img src="/TP-LOGO_copy.png" alt="TechPro360 Solutions logo" className="w-full h-full object-contain" />
                </div>
                <motion.h3 className="text-2xl font-bold text-gray-800 mb-4 relative inline-block group cursor-default" whileHover={{
                scale: 1.02
              }}>
                  TechPro360 Solutions
                  <motion.div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400" whileInView={{
                  width: '100%',
                  transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: 0.3
                  }
                }} viewport={{
                  once: true
                }} />
                </motion.h3>
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