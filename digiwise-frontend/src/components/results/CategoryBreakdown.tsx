import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import { ChevronDownIcon } from 'lucide-react';
interface CategoryBreakdownProps {
  categoryScores: Record<string, number>;
}
export const CategoryBreakdown = ({
  categoryScores
}: CategoryBreakdownProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  // Transform the categoryScores object into an array for the chart
  const data = Object.entries(categoryScores).map(([category, score]) => ({
    name: category,
    score: score,
    formattedName: category.length > 15 ? `${category.substring(0, 15)}...` : category
  }));
  // Get color based on score value
  const getBarColor = (score: number) => {
    if (score >= 75) return '#ef4444'; // red-500
    if (score >= 50) return '#f97316'; // orange-500
    if (score >= 25) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
  };
  // Get risk level text based on score
  const getRiskLevel = (score: number) => {
    if (score >= 75) return 'High Risk';
    if (score >= 50) return 'Moderate Risk';
    if (score >= 25) return 'Low Risk';
    return 'Minimal Risk';
  };
  // Get category description (simplified for now)
  const getCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      'Screen Time': 'Measures your daily device usage patterns and ability to disconnect.',
      'Social Media': 'Evaluates your relationship with social platforms and their impact on your well-being.',
      'Sleep Impact': 'Assesses how technology affects your sleep quality and patterns.',
      'Physical Health': 'Examines how digital habits impact your physical activity and health.',
      'Mental Health Effects': "Measures technology's influence on your mental and emotional state.",
      Productivity: 'Evaluates how digital habits impact your work and study effectiveness.',
      'Digital Well-being': 'Overall assessment of your relationship with technology.',
      Relationships: 'How technology affects your interpersonal connections.'
    };
    return descriptions[category] || 'This category measures specific aspects of your digital wellness.';
  };
  // Handle category click to expand/collapse
  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  // Custom tooltip for chart
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            Score:{' '}
            <span className="font-medium" style={{
            color: getBarColor(data.score)
          }}>
              {data.score}%
            </span>
          </p>
          <p className="text-xs mt-1" style={{
          color: getBarColor(data.score)
        }}>
            {getRiskLevel(data.score)}
          </p>
        </div>;
    }
    return null;
  };
  return <motion.div className="bg-white rounded-xl shadow-md border border-gray-100 p-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.1
  }}>
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Category Breakdown
      </h2>
      {data.length > 0 ? <>
          <div className="h-72 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40
          }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="formattedName" angle={-45} textAnchor="end" height={70} interval={0} tick={{
              fontSize: 12,
              fill: '#6b7280'
            }} />
                <YAxis domain={[0, 100]} tick={{
              fontSize: 12,
              fill: '#6b7280'
            }} tickFormatter={value => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" name="Risk Score" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />)}
                  <LabelList dataKey="score" position="top" formatter={(value: number) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {data.map(item => <div key={item.name} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 cursor-pointer" onClick={() => toggleCategory(item.name)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold mr-2" style={{
                  color: getBarColor(item.score)
                }}>
                        {item.score}%
                      </span>
                      <motion.div animate={{
                  rotate: expandedCategory === item.name ? 180 : 0
                }} transition={{
                  duration: 0.2
                }}>
                        <ChevronDownIcon size={18} className="text-gray-500" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div className="h-2 rounded-full" style={{
                  backgroundColor: getBarColor(item.score)
                }} initial={{
                  width: 0
                }} animate={{
                  width: `${item.score}%`
                }} transition={{
                  duration: 0.8,
                  delay: 0.2
                }} />
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedCategory === item.name && <motion.div className="px-4 pb-4" initial={{
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
            }}>
                      <div className="pt-2 border-t border-gray-200 mt-2">
                        <div className="flex items-start mt-2">
                          <div className="w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{
                    backgroundColor: getBarColor(item.score)
                  }} />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {getRiskLevel(item.score)}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {getCategoryDescription(item.name)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>)}
          </div>
        </> : <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No category data available</p>
        </div>}
    </motion.div>;
};