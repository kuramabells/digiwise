import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
export const SolutionSection = () => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const riskLevels = [{
    id: 1,
    color: '#22C55E',
    hoverColor: 'hover:bg-green-50',
    borderColor: 'border-green-200',
    name: 'Green',
    description: 'Little to No Risk',
    behaviors: 'Balanced tech use, regular digital breaks, healthy boundaries',
    icon: <CheckCircle className="w-6 h-6 text-green-500" />
  }, {
    id: 2,
    color: '#EAB308',
    hoverColor: 'hover:bg-yellow-50',
    borderColor: 'border-yellow-200',
    name: 'Yellow',
    description: 'Low to Moderate Risk',
    behaviors: 'Occasional overuse, minor sleep disruption, slight dependency',
    icon: <AlertCircle className="w-6 h-6 text-yellow-500" />
  }, {
    id: 3,
    color: '#F97316',
    hoverColor: 'hover:bg-orange-50',
    borderColor: 'border-orange-200',
    name: 'Orange',
    description: 'Concerning Risk',
    behaviors: 'Frequent overuse, social replacement, productivity impacts',
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
  }, {
    id: 4,
    color: '#EF4444',
    hoverColor: 'hover:bg-red-50',
    borderColor: 'border-red-200',
    name: 'Red',
    description: 'Serious Risk',
    behaviors: 'Constant device use, withdrawal symptoms, significant life disruption',
    icon: <AlertOctagon className="w-6 h-6 text-red-500" />
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
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <Info size={16} />
            <span>Understand your risk</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Where Do You Stand on the Digital Wellness Spectrum?
          </h2>
          <p className="text-lg text-gray-600">
            Our scientifically-validated assessment helps you identify your risk
            level and provides personalized recommendations
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" variants={containerVariants} initial="hidden" whileInView="show" viewport={{
        once: true,
        margin: '-100px'
      }}>
          {riskLevels.map((level, index) => <motion.div key={level.id} variants={itemVariants} className={`border rounded-xl overflow-hidden transition-all duration-300 ${level.borderColor} ${level.hoverColor} ${hoveredLevel === level.id ? 'shadow-lg scale-[1.02]' : 'shadow-sm'}`} onMouseEnter={() => setHoveredLevel(level.id)} onMouseLeave={() => setHoveredLevel(null)}>
              <div className="h-2" style={{
            backgroundColor: level.color
          }}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {level.icon}
                  <span className="ml-2 text-lg font-semibold">
                    {level.name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {level.description}
                </h3>
                <p className="text-gray-600">{level.behaviors}</p>
              </div>
            </motion.div>)}
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <div className="h-24 bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Low Risk
                </span>
                <span className="text-sm font-medium text-gray-600">
                  High Risk
                </span>
              </div>
              <div className="relative h-4 w-full">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full top-1/2 -translate-y-1/2">
                  <div className="absolute left-0 w-1/4 h-2 bg-green-500 rounded-l-full"></div>
                  <div className="absolute left-1/4 w-1/4 h-2 bg-yellow-500"></div>
                  <div className="absolute left-2/4 w-1/4 h-2 bg-orange-500"></div>
                  <div className="absolute left-3/4 w-1/4 h-2 bg-red-500 rounded-r-full"></div>
                </div>
                {/* Markers */}
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-green-500 border-2 border-white shadow-md transform -translate-x-1/2"></div>
                <div className="absolute left-1/4 top-0 w-6 h-6 rounded-full bg-yellow-500 border-2 border-white shadow-md transform -translate-x-1/2"></div>
                <div className="absolute left-2/4 top-0 w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-md transform -translate-x-1/2"></div>
                <div className="absolute left-3/4 top-0 w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-md transform -translate-x-1/2"></div>
                <div className="absolute left-full top-0 w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-md transform -translate-x-1/2"></div>
                {/* Animated marker */}
                <motion.div className="absolute top-0 w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-lg transform -translate-x-1/2 z-10" initial={{
                left: '10%'
              }} animate={{
                left: ['10%', '30%', '60%', '85%', '40%'],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Your Score
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};