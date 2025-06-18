import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Award, FileText } from 'lucide-react';
export const DwaMethodologySection = () => {
  const validationPoints = [{
    id: 1,
    text: 'Developed by Digital Detox (global leader in digital wellness)',
    icon: <Award className="w-5 h-5 text-blue-500" />
  }, {
    id: 2,
    text: 'Input from mental health professionals and subject-matter experts',
    icon: <Shield className="w-5 h-5 text-blue-500" />
  }, {
    id: 3,
    text: 'Validated across 80+ countries',
    icon: <FileText className="w-5 h-5 text-blue-500" />
  }, {
    id: 4,
    text: 'Based on Polytomous Rasch Rating Scale Model',
    icon: <CheckCircle className="w-5 h-5 text-blue-500" />
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
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            Scientific Approach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Understanding the Digital Wellness Assessment
          </h2>
          <p className="text-lg text-gray-600">
            Our assessment is built on rigorous scientific research and
            validated methodology
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-10 items-center max-w-5xl mx-auto">
          <motion.div className="md:w-1/2" initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Scientific Methodology
              </h3>
              <ul className="space-y-5">
                {validationPoints.map(point => <motion.li key={point.id} className="flex items-start" initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: point.id * 0.1
              }}>
                    <div className="mt-1 mr-4 p-1.5 bg-blue-50 rounded-full flex-shrink-0">
                      {point.icon}
                    </div>
                    <span className="text-gray-700">{point.text}</span>
                  </motion.li>)}
              </ul>
            </div>
          </motion.div>
          <motion.div className="md:w-1/2" initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Scientific Credibility
                </h3>
                <p className="text-gray-700 mb-5">
                  The Digital Wellness Assessment has been rigorously tested and
                  validated through multiple studies across diverse populations.
                </p>
                <p className="text-gray-700 mb-6">
                  Our methodology has been reviewed by leading experts in
                  digital wellness, psychology, and educational technology.
                </p>
                <div className="flex items-center mt-8">
                  <motion.div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mr-6 shadow-lg" initial={{
                  scale: 0
                }} whileInView={{
                  scale: 1
                }} viewport={{
                  once: true
                }} transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.4
                }}>
                    <span className="text-white text-2xl font-bold">99%</span>
                  </motion.div>
                  <div>
                    <p className="text-gray-800 font-semibold">Accuracy Rate</p>
                    <p className="text-gray-600 text-sm">
                      In identifying digital wellness concerns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};