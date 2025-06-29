import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircleIcon, CheckCircleIcon, AlertTriangleIcon, AlertOctagonIcon } from 'lucide-react';
interface RiskLevelCardProps {
  riskLevel: string;
  score: number;
}
export const RiskLevelCard = ({
  riskLevel,
  score
}: RiskLevelCardProps) => {
  const getRiskDetails = (level: string) => {
    switch (level) {
      case 'low':
        return {
          color: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
          badgeColor: 'bg-green-100 text-green-700 border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          icon: <CheckCircleIcon className="text-green-500" size={22} />,
          title: 'Healthy Digital Habits',
          description: 'Your digital usage patterns show a healthy balance. Keep up the good work!',
          recommendations: ['Continue maintaining your current digital boundaries', 'Share your strategies with friends and family', 'Set new goals to further improve your digital wellness', 'Consider becoming a digital wellness advocate in your community']
        };
      case 'moderate':
        return {
          color: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          badgeColor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          icon: <AlertCircleIcon className="text-yellow-500" size={22} />,
          title: 'Room for Improvement',
          description: 'Your digital habits show some concerning patterns that could benefit from attention.',
          recommendations: ['Set specific screen time limits on social media apps', 'Create designated tech-free zones in your home', 'Practice mindful device usage during meals', 'Try a digital detox for one day each week']
        };
      case 'high':
        return {
          color: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800',
          badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          icon: <AlertTriangleIcon className="text-orange-500" size={22} />,
          title: 'Concerning Digital Habits',
          description: 'Your assessment indicates significant concerns with your digital usage patterns that require attention.',
          recommendations: ['Schedule regular digital detox periods each week', 'Use app blocking tools during work/study hours', 'Seek support from friends or family members', 'Consider professional guidance if symptoms persist']
        };
      case 'severe':
        return {
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-700 border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          icon: <AlertOctagonIcon className="text-red-500" size={22} />,
          title: 'Serious Digital Wellness Concerns',
          description: 'Your assessment reveals patterns that indicate a problematic relationship with technology requiring immediate attention.',
          recommendations: ['Implement strict device usage limitations', 'Seek professional support for digital dependency', 'Replace screen time with alternative activities', 'Consider a comprehensive digital detox program']
        };
      default:
        return {
          color: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          icon: <AlertCircleIcon className="text-gray-500" size={22} />,
          title: 'Assessment Complete',
          description: 'Review your results below.',
          recommendations: []
        };
    }
  };
  const details = getRiskDetails(riskLevel);
  return <motion.div className={`rounded-xl border p-6 ${details.color}`} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`${details.iconBg} p-2 rounded-full mr-3`}>
            {details.icon}
          </div>
          <h2 className={`text-xl font-bold ${details.textColor}`}>
            {details.title}
          </h2>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${details.badgeColor}`}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </div>
      </div>
      <p className="text-gray-700 mb-5 leading-relaxed">
        {details.description}
      </p>
      {details.recommendations.length > 0 && <div>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full ${details.iconColor} mr-2`}></span>
            Immediate Recommendations:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {details.recommendations.map((rec, index) => <motion.div key={index} className="flex items-start bg-white bg-opacity-60 p-3 rounded-lg" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3,
          delay: 0.1 * index
        }}>
                <div className={`${details.iconBg} p-1 rounded-full mr-2.5 mt-0.5`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${details.iconColor}`}></div>
                </div>
                <span className="text-gray-700">{rec}</span>
              </motion.div>)}
          </div>
        </div>}
    </motion.div>;
};