import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
export const RiskLevelsSection = () => {
  const [expandedLevel, setExpandedLevel] = useState<string | null>('green');
  const riskLevels = [{
    id: 'green',
    name: 'Green (Little to No Risk)',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Healthy digital habits with minimal negative impact',
    characteristics: ['Balanced screen time', 'Good sleep hygiene', 'Positive relationships', 'Mindful technology use']
  }, {
    id: 'yellow',
    name: 'Yellow (Low to Moderate Risk)',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    description: 'Some concerning patterns emerging',
    characteristics: ['Occasional digital overwhelm', 'Minor sleep disruption', 'Some difficulty disconnecting', 'Mild anxiety when separated from devices']
  }, {
    id: 'orange',
    name: 'Orange (Concerning Risk)',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Clear negative impacts on daily life',
    characteristics: ['Difficulty concentrating', 'Relationship strain', 'Mood changes', 'Productivity impacts']
  }, {
    id: 'red',
    name: 'Red (Serious Risk)',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    description: 'Significant digital wellness concerns requiring attention',
    characteristics: ['Severe impact on mental health', 'Work/school performance issues', 'Relationship conflicts', 'Physical symptoms (headaches, eye strain, etc.)']
  }];
  const toggleLevel = (id: string) => {
    if (expandedLevel === id) {
      setExpandedLevel(null);
    } else {
      setExpandedLevel(id);
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Risk Levels Deep Dive
          </h2>
          <p className="text-lg text-gray-600">
            Understanding the spectrum of digital wellness and potential
            concerns
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-10">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="absolute left-0 w-1/4 h-2 bg-green-500 rounded-l-full"></div>
              <div className="absolute left-1/4 w-1/4 h-2 bg-yellow-500"></div>
              <div className="absolute left-2/4 w-1/4 h-2 bg-orange-500"></div>
              <div className="absolute left-3/4 w-1/4 h-2 bg-red-500 rounded-r-full"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
              <span>Little to No Risk</span>
              <span>Low Risk</span>
              <span>Moderate Risk</span>
              <span>High Risk</span>
            </div>
          </div>
          <div className="space-y-4">
            {riskLevels.map(level => <motion.div key={level.id} className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${level.borderColor} ${expandedLevel === level.id ? 'shadow-md' : ''}`} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4
          }}>
                <motion.div className={`p-5 ${level.bgColor} cursor-pointer`} onClick={() => toggleLevel(level.id)} whileHover={{
              backgroundColor: expandedLevel === level.id ? '' : '#f9fafb'
            }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full ${level.color} mr-3`} aria-hidden="true"></div>
                      <h3 className={`text-lg font-semibold ${level.textColor}`}>
                        {level.name}
                      </h3>
                    </div>
                    <motion.div animate={{
                  rotate: expandedLevel === level.id ? 180 : 0
                }} transition={{
                  duration: 0.3
                }}>
                      <ChevronDownIcon className="text-gray-500" size={20} />
                    </motion.div>
                  </div>
                </motion.div>
                <AnimatePresence>
                  {expandedLevel === level.id && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.3
              }} className="overflow-hidden">
                      <div className="p-6 border-t border-gray-100">
                        <p className="text-gray-700 font-medium mb-5">
                          {level.description}
                        </p>
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                            Characteristics
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {level.characteristics.map((item, i) => <li key={i} className="flex items-center">
                                <div className={`w-2 h-2 ${level.color} rounded-full mr-2`}></div>
                                <span className="text-gray-700">{item}</span>
                              </li>)}
                          </ul>
                        </div>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </motion.div>)}
          </div>
          <motion.div className="mt-10 text-center" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Click on each risk level to learn more
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};