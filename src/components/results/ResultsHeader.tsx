import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, DownloadIcon, ShareIcon, InfoIcon } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
interface ResultsHeaderProps {
  score: number;
  riskLevel: string;
  completionDate: Date;
  firstName?: string;
}
export const ResultsHeader = ({
  score,
  riskLevel,
  completionDate,
  firstName
}: ResultsHeaderProps) => {
  const {
    state
  } = useAssessment();
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return {
          bg: 'bg-green-500',
          text: 'text-green-800',
          light: 'bg-green-50',
          border: 'border-green-200',
          gradient: 'from-green-500 to-green-600'
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-500',
          text: 'text-yellow-800',
          light: 'bg-yellow-50',
          border: 'border-yellow-200',
          gradient: 'from-yellow-500 to-yellow-600'
        };
      case 'high':
        return {
          bg: 'bg-orange-500',
          text: 'text-orange-800',
          light: 'bg-orange-50',
          border: 'border-orange-200',
          gradient: 'from-orange-500 to-orange-600'
        };
      case 'severe':
        return {
          bg: 'bg-red-500',
          text: 'text-red-800',
          light: 'bg-red-50',
          border: 'border-red-200',
          gradient: 'from-red-500 to-red-600'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-800',
          light: 'bg-gray-50',
          border: 'border-gray-200',
          gradient: 'from-gray-500 to-gray-600'
        };
    }
  };
  const colors = getRiskColor(riskLevel);
  const riskLevelTitle = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
  return <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100" role="region" aria-label="Results Summary">
      <div className="md:flex">
        <div className={`w-full md:w-1/3 bg-gradient-to-br ${colors.gradient} text-white p-6 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center mb-2">
              <InfoIcon size={16} className="mr-1.5 opacity-80" />
              <span className="text-sm font-medium opacity-90">
                Your Risk Level
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{riskLevelTitle} Risk</h2>
            <p className="text-sm opacity-90">
              Based on your responses to the Digital Wellness Assessment
            </p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium opacity-90">Low Risk</span>
              <span className="text-xs font-medium opacity-90">High Risk</span>
            </div>
            <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white" initial={{
              width: 0
            }} animate={{
              width: `${score}%`
            }} transition={{
              duration: 1,
              delay: 0.5
            }} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {firstName ? `${firstName}'s Assessment Results` : 'Your Assessment Results'}
              </h1>
              <div className="flex items-center text-gray-500 mb-4">
                <CalendarIcon size={16} className="mr-1" aria-hidden="true" />
                <span>
                  {completionDate.toLocaleDateString()} • Overall Score:{' '}
                </span>
                <motion.span className={`ml-1 font-bold ${colors.text}`} initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.6,
                delay: 0.7
              }}>
                  {score}%
                </motion.span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
              <motion.div className={`${colors.light} ${colors.border} text-sm font-medium px-3 py-1 rounded-full border flex items-center`} initial={{
              scale: 0.9,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3,
              delay: 0.2
            }}>
                <span className={`w-2 h-2 ${colors.bg} rounded-full mr-1.5`}></span>
                {riskLevelTitle} Risk Level
              </motion.div>
              <motion.div className="bg-blue-50 border-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border" initial={{
              scale: 0.9,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3,
              delay: 0.3
            }}>
                {Object.keys(state.answers || {}).length} Questions Answered
              </motion.div>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">
              What Your Results Mean
            </h3>
            <p className="text-gray-600 text-sm">
              Your Digital Wellness Assessment score indicates your current
              relationship with technology. Higher scores suggest greater risk,
              while lower scores indicate healthier digital habits. Review your
              detailed breakdown below for personalized insights and
              recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>;
};