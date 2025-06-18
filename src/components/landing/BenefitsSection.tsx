import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export const BenefitsSection = () => {
  const benefits = [{
    id: 1,
    title: 'Scientifically Validated',
    description: 'Our assessment methodology is backed by extensive research and expert validation',
    icon: <Award className="w-12 h-12 p-2.5 text-blue-600" />,
    delay: 0
  }, {
    id: 2,
    title: 'Personalized Insights',
    description: 'Receive tailored recommendations based on your unique digital habits and needs',
    icon: <CheckCircle className="w-12 h-12 p-2.5 text-blue-600" />,
    delay: 0.1
  }, {
    id: 3,
    title: 'Educational Resources',
    description: 'Access DepEd-aligned content designed to improve digital literacy and wellness',
    icon: <BookOpen className="w-12 h-12 p-2.5 text-blue-600" />,
    delay: 0.2
  }, {
    id: 4,
    title: 'Progress Tracking',
    description: 'Monitor improvements in your digital wellness score over time with regular check-ins',
    icon: <TrendingUp className="w-12 h-12 p-2.5 text-blue-600" />,
    delay: 0.3
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
  return <section className="py-20 bg-gradient-to-b from-white to-blue-50">
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
            Why Choose DigiWise?
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive approach helps you develop healthier digital
            habits
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" variants={containerVariants} initial="hidden" whileInView="show" viewport={{
        once: true,
        margin: '-100px'
      }}>
          {benefits.map(benefit => <motion.div key={benefit.id} variants={itemVariants} className="flex items-start p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300" whileHover={{
          y: -5
        }}>
              <div className="mr-5 bg-blue-50 rounded-lg p-1">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </motion.div>)}
        </motion.div>
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
        delay: 0.4
      }}>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to improve your digital wellness?
            </h3>
            <p className="text-gray-600 mb-6">
              Take the first step toward a healthier relationship with
              technology. Our assessment takes only 5 minutes to complete.
            </p>
            <Link to="/assessment">
              <motion.button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow transition-all duration-300 flex items-center mx-auto" whileHover={{
              scale: 1.03
            }} whileTap={{
              scale: 0.98
            }}>
                Take Free Assessment
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>;
};