import React from 'react';
import { Clock, CheckSquare, Layers, FileText, Activity, Timer, LockIcon } from 'lucide-react';
interface InteractiveToolsProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const InteractiveTools = ({
  searchQuery,
  filters
}: InteractiveToolsProps) => {
  // Tools data - first tool is unlocked, others are locked
  const tools = [{
    id: 'tool-1',
    title: 'Screen Time Calculator',
    description: 'Estimate your daily and weekly screen time across all devices and get personalized insights.',
    icon: <Clock size={24} className="text-blue-600" />,
    color: 'bg-blue-50',
    link: '#screen-time-calculator',
    locked: false
  }, {
    id: 'tool-2',
    title: 'Digital Habit Tracker',
    description: 'Monitor your technology usage patterns over 30 days to identify trends and areas for improvement.',
    icon: <CheckSquare size={24} className="text-green-600" />,
    color: 'bg-green-50',
    link: '#habit-tracker',
    locked: true
  }, {
    id: 'tool-3',
    title: 'App Audit Checklist',
    description: 'Evaluate the apps installed on your devices to determine which ones add value and which create distractions.',
    icon: <Layers size={24} className="text-purple-600" />,
    color: 'bg-purple-50',
    link: '#app-audit',
    locked: true
  }, {
    id: 'tool-4',
    title: 'Family Digital Agreement Template',
    description: 'Create a customized agreement for healthy technology use that works for your entire family.',
    icon: <FileText size={24} className="text-orange-600" />,
    color: 'bg-orange-50',
    link: '#family-agreement',
    locked: true
  }, {
    id: 'tool-5',
    title: 'Mindfulness Timer',
    description: 'Take regular breaks from screens with guided meditation and mindfulness exercises.',
    icon: <Activity size={24} className="text-red-600" />,
    color: 'bg-red-50',
    link: '#mindfulness-timer',
    locked: true
  }, {
    id: 'tool-6',
    title: 'Focus Session Planner',
    description: 'Structure your work periods for maximum productivity with built-in break reminders.',
    icon: <Timer size={24} className="text-indigo-600" />,
    color: 'bg-indigo-50',
    link: '#focus-planner',
    locked: true
  }];
  // Filter tools based on search query
  const filteredTools = tools.filter(tool => {
    if (searchQuery && !tool.title.toLowerCase().includes(searchQuery.toLowerCase()) && !tool.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Only apply content type filter if it's set to 'tool'
    if (filters.contentType !== 'all' && filters.contentType !== 'tool') {
      return false;
    }
    return true;
  });
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Digital Wellness Tools
          </h2>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            <LockIcon size={16} className="mr-1.5" />
            Unlock Premium Tools
          </button>
        </div>
        {filteredTools.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => <div key={tool.id} className="relative">
                <a href={tool.locked ? '#unlock-premium' : tool.link} className={`block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden ${tool.locked ? 'opacity-75' : ''}`}>
                  <div className={`p-6 ${tool.color} border-b border-gray-100`}>
                    <div className="flex justify-center">{tool.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600">{tool.description}</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      {tool.locked ? 'Unlock access' : 'Try it now'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </a>
                {tool.locked && <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-75 text-white p-1 rounded-md">
                    <LockIcon size={16} />
                  </div>}
              </div>)}
          </div> : <div className="text-center py-8">
            <p className="text-gray-500">No tools match your current search.</p>
          </div>}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 text-center">
          <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
            <LockIcon size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Unlock Premium Tools
          </h3>
          <p className="text-gray-700 mb-5 max-w-2xl mx-auto">
            Get unlimited access to all our interactive digital wellness tools,
            personalized recommendations, and advanced tracking features with a
            premium subscription.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </section>;
};