import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, ExternalLinkIcon, FileTextIcon, PlayIcon } from 'lucide-react';
export const ResourceSection = () => {
  const resources = [{
    id: 1,
    title: 'Digital Wellness Guide',
    description: 'Essential strategies for maintaining digital balance',
    icon: <FileTextIcon size={16} />,
    type: 'PDF',
    isNew: true
  }, {
    id: 2,
    title: 'Screen Time Management',
    description: 'Practical tips for reducing excessive screen time',
    icon: <PlayIcon size={16} />,
    type: 'Video',
    isNew: false
  }, {
    id: 3,
    title: 'Mental Health Resources',
    description: 'Professional support and self-help materials',
    icon: <ExternalLinkIcon size={16} />,
    type: 'Link',
    isNew: false
  }];
  return <motion.div className="bg-white rounded-xl shadow-md border border-gray-100 p-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.4
  }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Recommended Resources
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {resources.map((resource, index) => <motion.div key={resource.id} className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-100 transition-colors cursor-pointer relative" initial={{
        opacity: 0,
        x: -10
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.3,
        delay: 0.1 * index
      }} whileHover={{
        x: 3
      }}>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3 flex-shrink-0">
                {resource.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">
                    {resource.title}
                  </h3>
                  {resource.isNew && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                      New
                    </span>}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {resource.description}
                </p>
              </div>
              <div className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200 ml-2">
                {resource.type}
              </div>
            </div>
          </motion.div>)}
      </div>
      <div className="mt-6 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <div className="bg-blue-500 text-white p-1.5 rounded-lg mr-3 flex-shrink-0">
            <BookOpenIcon size={16} />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-1">
              Personalized Digital Wellness Plan
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Get a comprehensive wellness plan based on your assessment
              results.
            </p>
            <motion.button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              Create My Plan
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>;
};