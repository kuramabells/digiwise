import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, CalendarIcon, RefreshCwIcon, BellIcon } from 'lucide-react';
export const ProgressTracking = () => {
  // Mock data for the progress chart
  const progressData = [{
    month: 'Jan',
    score: 72
  }, {
    month: 'Feb',
    score: 68
  }, {
    month: 'Mar',
    score: 61
  }, {
    month: 'Apr',
    score: 54
  }, {
    month: 'May',
    score: 48
  }, {
    month: 'Jun',
    score: 42
  }];
  return <motion.div className="bg-white rounded-xl shadow-md border border-gray-100 p-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.3
  }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Track Your Progress</h2>
        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">Risk Score Trend</h3>
          <span className="text-sm text-green-600 font-medium">-30 points</span>
        </div>
        <div className="relative h-24 mb-1">
          {/* Simple progress visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
            {progressData.map((data, index) => <div key={index} className="flex flex-col items-center flex-1">
                <motion.div className="w-1.5 rounded-t-full bg-blue-500" style={{
              height: `${data.score * 0.3}%`
            }} initial={{
              height: 0
            }} animate={{
              height: `${data.score * 0.3}%`
            }} transition={{
              duration: 0.5,
              delay: 0.1 * index
            }}></motion.div>
                <div className="text-xs text-gray-500 mt-1">{data.month}</div>
              </div>)}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Lower Risk</span>
          <span>Higher Risk</span>
        </div>
      </div>
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarIcon size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Next Assessment
            </span>
          </div>
          <span className="text-sm text-gray-600">Jul 15, 2025</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <RefreshCwIcon size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Assessment Frequency
            </span>
          </div>
          <span className="text-sm text-gray-600">Monthly</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BellIcon size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">Reminders</span>
          </div>
          <span className="text-sm text-gray-600">On</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <motion.button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <TrendingUpIcon size={18} className="mr-2" />
          Schedule Next Check-in
        </motion.button>
        <motion.button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          Adjust Reminder Settings
        </motion.button>
      </div>
    </motion.div>;
};