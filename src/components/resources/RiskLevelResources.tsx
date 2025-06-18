import React, { useState } from 'react';
import { ResourceCard } from './ResourceCard';
import { CheckCircle, AlertCircle, AlertTriangle, AlertOctagon, ChevronRight, LockIcon } from 'lucide-react';
interface RiskLevelResourcesProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const RiskLevelResources = ({
  searchQuery,
  filters
}: RiskLevelResourcesProps) => {
  // State to track expanded risk level sections
  const [expandedSections, setExpandedSections] = useState<{
    green: boolean;
    yellow: boolean;
    orange: boolean;
    red: boolean;
  }>({
    green: true,
    yellow: true,
    orange: false,
    red: false
  });
  // Sample preview resources for each risk level
  const previewResources = {
    green: {
      id: 'green-1',
      title: 'Digital Minimalism Practices',
      description: 'Learn essential techniques to simplify your digital life while maximizing value from technology.',
      type: 'article' as const,
      thumbnail: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      riskLevel: 'green' as const,
      timeInvestment: 'quick' as const,
      difficultyLevel: 'beginner' as const,
      rating: 4.6,
      reviewCount: 124
    },
    yellow: {
      id: 'yellow-1',
      title: 'Recognizing Digital Overwhelm',
      description: 'Learn to identify early warning signs of digital fatigue before they impact your wellbeing.',
      type: 'article' as const,
      riskLevel: 'yellow' as const,
      timeInvestment: 'quick' as const,
      difficultyLevel: 'beginner' as const,
      rating: 4.5,
      reviewCount: 93
    },
    orange: {
      id: 'orange-1',
      title: '7-Day Digital Detox Challenge',
      description: 'A structured week-long program to reset your relationship with technology.',
      type: 'course' as const,
      thumbnail: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      riskLevel: 'orange' as const,
      timeInvestment: 'comprehensive' as const,
      difficultyLevel: 'intermediate' as const,
      rating: 4.8,
      reviewCount: 142
    },
    red: {
      id: 'red-1',
      title: 'Crisis Intervention Guidelines',
      description: 'Professional guidance for addressing severe digital wellness concerns that require immediate attention.',
      type: 'pdf' as const,
      riskLevel: 'red' as const,
      timeInvestment: 'comprehensive' as const,
      difficultyLevel: 'advanced' as const,
      rating: 4.9,
      reviewCount: 67
    }
  };
  // Show the section if the specific risk level is selected
  const showGreenSection = filters.riskLevel === 'all' || filters.riskLevel === 'green';
  const showYellowSection = filters.riskLevel === 'all' || filters.riskLevel === 'yellow';
  const showOrangeSection = filters.riskLevel === 'all' || filters.riskLevel === 'orange';
  const showRedSection = filters.riskLevel === 'all' || filters.riskLevel === 'red';
  return <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Resources By Risk Level
          </h2>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            <LockIcon size={16} className="mr-1.5" />
            Unlock Premium Content
          </button>
        </div>
        {/* Green Zone Resources - Preview Only */}
        {showGreenSection && <div className="mb-10">
            <button className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm mb-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <CheckCircle size={22} className="text-green-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Maintaining Digital Wellness (Green Zone)
                </h3>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Preview resource card */}
                <ResourceCard {...previewResources.green} />
                {/* Placeholder blurred cards */}
                <div className="col-span-2 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 filter blur-sm">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 filter blur-sm">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg">
                  <div className="text-center p-6">
                    <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                      <LockIcon size={32} className="text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Premium Content
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Unlock all risk level resources with a premium
                      subscription
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {/* Yellow, Orange, Red Zones - Locked */}
        {showYellowSection && <div className="mb-10">
            <button className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm mb-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <AlertCircle size={22} className="text-yellow-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Early Intervention Strategies (Yellow Zone)
                </h3>
              </div>
              <div className="flex items-center">
                <LockIcon size={16} className="text-gray-400 mr-2" />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Preview resource card */}
                <ResourceCard {...previewResources.yellow} />
                {/* Placeholder blurred cards */}
                <div className="col-span-2 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 filter blur-sm">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 filter blur-sm">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg">
                  <div className="text-center p-6">
                    <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                      <LockIcon size={32} className="text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Premium Content
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Unlock all risk level resources with a premium
                      subscription
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {/* Simplified Orange and Red sections */}
        {showOrangeSection && <div className="mb-10">
            <button className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <AlertTriangle size={22} className="text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Active Digital Wellness Strategies (Orange Zone)
                </h3>
              </div>
              <div className="flex items-center">
                <LockIcon size={16} className="text-gray-400 mr-2" />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          </div>}
        {showRedSection && <div>
            <button className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <AlertOctagon size={22} className="text-red-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Comprehensive Support Resources (Red Zone)
                </h3>
              </div>
              <div className="flex items-center">
                <LockIcon size={16} className="text-gray-400 mr-2" />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          </div>}
      </div>
    </section>;
};