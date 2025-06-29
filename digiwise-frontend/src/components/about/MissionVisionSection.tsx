import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, GlobeIcon, ShieldCheckIcon, BookOpenIcon } from 'lucide-react';
export const MissionVisionSection = () => {
  const values = [{
    id: 1,
    name: 'Scientific Rigor',
    description: 'Research-backed methodologies',
    icon: <BeakerIcon size={32} className="text-blue-600" />,
    color: 'bg-blue-50',
    borderColor: 'border-blue-100'
  }, {
    id: 2,
    name: 'Accessibility',
    description: 'Free tools for all Filipinos',
    icon: <GlobeIcon size={32} className="text-indigo-600" />,
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-100'
  }, {
    id: 3,
    name: 'Privacy',
    description: 'Secure, confidential assessments',
    icon: <ShieldCheckIcon size={32} className="text-emerald-600" />,
    color: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  }, {
    id: 4,
    name: 'Education',
    description: 'Continuous learning and improvement',
    icon: <BookOpenIcon size={32} className="text-amber-600" />,
    color: 'bg-amber-50',
    borderColor: 'border-amber-100'
  }];
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mb-20">
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm border border-blue-100 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <span className="text-blue-600 text-lg font-bold">M</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 italic leading-relaxed">
                "To promote digital wellness and healthy technology habits among
                Filipinos through evidence-based assessment and education."
              </p>
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
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-sm border border-indigo-100 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
                <span className="text-indigo-600 text-lg font-bold">V</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-700 italic leading-relaxed">
                "A digitally literate society where technology enhances rather
                than hinders mental health and well-being."
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div className="text-center mb-16" initial={{
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The core principles that guide everything we do at DigiWise
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="show" viewport={{
        once: true
      }}>
          {values.map(value => <motion.div key={value.id} variants={itemVariants} whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} className={`${value.color} rounded-xl border ${value.borderColor} p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center`}>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {value.name}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};