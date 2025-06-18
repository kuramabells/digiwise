import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, CalendarIcon } from 'lucide-react';
interface ActionPlanProps {
  riskLevel: string;
}
export const ActionPlan = ({
  riskLevel
}: ActionPlanProps) => {
  // Get actions based on risk level
  const getActions = (level: string) => {
    switch (level) {
      case 'low':
        return [{
          action: 'Maintain current healthy digital boundaries',
          timeframe: 'Ongoing',
          difficulty: 'easy'
        }, {
          action: 'Set goals for continued improvement',
          timeframe: 'This week',
          difficulty: 'medium'
        }, {
          action: 'Share your success strategies with others',
          timeframe: 'This month',
          difficulty: 'easy'
        }, {
          action: 'Track your progress with monthly check-ins',
          timeframe: 'Monthly',
          difficulty: 'easy'
        }];
      case 'moderate':
        return [{
          action: 'Implement screen time limits on social media apps',
          timeframe: 'Today',
          difficulty: 'medium'
        }, {
          action: 'Create designated tech-free zones',
          timeframe: 'This week',
          difficulty: 'medium'
        }, {
          action: 'Practice mindful device usage during meals',
          timeframe: 'Daily',
          difficulty: 'easy'
        }, {
          action: 'Schedule a weekly digital detox day',
          timeframe: 'Weekly',
          difficulty: 'hard'
        }];
      case 'high':
        return [{
          action: 'Schedule regular digital detox periods',
          timeframe: 'Today',
          difficulty: 'hard'
        }, {
          action: 'Use app blocking tools during work hours',
          timeframe: 'This week',
          difficulty: 'medium'
        }, {
          action: 'Seek support from friends or family',
          timeframe: 'This week',
          difficulty: 'medium'
        }, {
          action: 'Replace one hour of screen time with physical activity daily',
          timeframe: 'Daily',
          difficulty: 'hard'
        }];
      case 'severe':
        return [{
          action: 'Set up strict device usage limitations',
          timeframe: 'Today',
          difficulty: 'hard'
        }, {
          action: 'Seek professional support for digital dependency',
          timeframe: 'This week',
          difficulty: 'medium'
        }, {
          action: 'Create a comprehensive plan to reduce screen time',
          timeframe: 'This week',
          difficulty: 'hard'
        }, {
          action: 'Establish accountability with trusted friends or family',
          timeframe: 'This week',
          difficulty: 'medium'
        }];
      default:
        return [];
    }
  };
  const actions = getActions(riskLevel);
  // Get difficulty badge styles
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  return <motion.div className="bg-white rounded-xl shadow-md border border-gray-100 p-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.2
  }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Your Action Plan</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Export Plan
        </button>
      </div>
      <div className="space-y-4">
        {actions.map((action, index) => <motion.div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3,
        delay: 0.1 * index
      }} whileHover={{
        y: -2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1.5 mt-0.5 mr-3 flex-shrink-0">
                <CheckCircleIcon className="text-blue-600 w-4 h-4" />
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-medium text-gray-800">{action.action}</h3>
                  <div className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyStyles(action.difficulty)}`}>
                    {action.difficulty.charAt(0).toUpperCase() + action.difficulty.slice(1)}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon size={14} className="mr-1" />
                  <span>Start: {action.timeframe}</span>
                  <CalendarIcon size={14} className="ml-3 mr-1" />
                  <span>
                    Frequency:{' '}
                    {action.timeframe === 'Today' || action.timeframe === 'This week' || action.timeframe === 'This month' ? 'Once' : action.timeframe}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
    </motion.div>;
};