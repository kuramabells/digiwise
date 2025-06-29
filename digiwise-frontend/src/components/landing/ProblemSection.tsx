import React, { Children, Fragment } from 'react';
import { motion } from 'framer-motion';
import { Clock, Frown, Brain } from 'lucide-react';
export const ProblemSection = () => {
  const statistics = [{
    id: 1,
    stat: 'Average Filipino spends 10+ hours on devices daily',
    description: 'More than 40% of waking hours are spent on screens',
    icon: <Clock className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-50',
    highlight: '10+ hours'
  }, {
    id: 2,
    stat: 'Digital Balance is Essential',
    description: 'Finding harmony between online and offline life is crucial for wellbeing',
    icon: <Frown className="w-8 h-8 text-purple-600" />,
    color: 'bg-purple-50',
    highlight: 'Essential'
  }, {
    id: 3,
    stat: 'Digital wellness affects sleep, relationships, and mental health',
    description: 'Poor digital habits correlate with increased anxiety and depression',
    icon: <Brain className="w-8 h-8 text-red-600" />,
    color: 'bg-red-50',
    highlight: 'mental health'
  }];
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
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
        duration: 0.6
      }
    }
  };
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Is Technology Taking Over Your Life?
          </h2>
          <p className="text-lg text-gray-600">
            Digital technology has transformed our lives, but excessive and
            unhealthy use can lead to significant negative impacts on our
            wellbeing.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="show" viewport={{
        once: true,
        margin: '-100px'
      }}>
          {statistics.map(item => <motion.div key={item.id} variants={itemVariants} className={`${item.color} rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100`}>
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.stat.split(item.highlight).map((part, i, arr) => i === 0 ? <Fragment key={i}>
                      {part}
                      <span className="text-blue-600 font-bold">
                        {i < arr.length - 1 ? item.highlight : ''}
                      </span>
                    </Fragment> : part)}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};