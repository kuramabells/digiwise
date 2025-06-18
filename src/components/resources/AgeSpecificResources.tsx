import React, { useState } from 'react';
import { ResourceCard } from './ResourceCard';
import { BookOpen } from 'lucide-react';
interface AgeSpecificResourcesProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const AgeSpecificResources = ({
  searchQuery,
  filters
}: AgeSpecificResourcesProps) => {
  // State to track active age group tab
  const [activeTab, setActiveTab] = useState(filters.ageGroup !== 'all' ? filters.ageGroup : 'elementary');
  // Sample resources data for each age group
  const resources = {
    elementary: [{
      id: 'elem-1',
      title: 'Screen Time Superheroes',
      description: 'Interactive activities teaching balanced technology use for young children.',
      type: 'worksheet' as const,
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ageGroup: 'elementary',
      timeInvestment: 'medium' as const,
      difficultyLevel: 'beginner' as const,
      rating: 4.8,
      reviewCount: 64
    }, {
      id: 'elem-2',
      title: 'Digital Safety Basics',
      description: 'Age-appropriate lessons on internet safety for K-6 students.',
      type: 'pdf' as const,
      ageGroup: 'elementary',
      timeInvestment: 'quick' as const,
      difficultyLevel: 'beginner' as const,
      rating: 4.7,
      reviewCount: 48
    }],
    middle: [{
      id: 'middle-1',
      title: 'Social Media Awareness Guide',
      description: 'Help middle school students understand social media impacts and make healthy choices.',
      type: 'pdf' as const,
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ageGroup: 'middle',
      timeInvestment: 'medium' as const,
      difficultyLevel: 'intermediate' as const,
      rating: 4.9,
      reviewCount: 73
    }, {
      id: 'middle-2',
      title: 'Cyberbullying Prevention Toolkit',
      description: 'Resources for identifying, preventing, and addressing online bullying.',
      type: 'pdf' as const,
      ageGroup: 'middle',
      timeInvestment: 'comprehensive' as const,
      difficultyLevel: 'intermediate' as const,
      rating: 4.8,
      reviewCount: 56
    }],
    high: [{
      id: 'high-1',
      title: 'Digital Footprint Management',
      description: 'Guide for high school students on managing their online presence and reputation.',
      type: 'course' as const,
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ageGroup: 'high',
      timeInvestment: 'medium' as const,
      difficultyLevel: 'intermediate' as const,
      rating: 4.6,
      reviewCount: 82
    }, {
      id: 'high-2',
      title: 'Tech & College Preparation',
      description: 'How to leverage technology effectively for academic success and college applications.',
      type: 'pdf' as const,
      ageGroup: 'high',
      timeInvestment: 'comprehensive' as const,
      difficultyLevel: 'advanced' as const,
      rating: 4.7,
      reviewCount: 64
    }],
    adult: [{
      id: 'adult-1',
      title: 'Digital Parenting Guide',
      description: "Comprehensive resource for parents to guide children's technology use at different ages.",
      type: 'pdf' as const,
      thumbnail: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ageGroup: 'adult',
      timeInvestment: 'comprehensive' as const,
      difficultyLevel: 'intermediate' as const,
      rating: 4.9,
      reviewCount: 127
    }, {
      id: 'adult-2',
      title: 'Family Digital Wellness Plan',
      description: 'Templates and strategies for creating healthy technology boundaries at home.',
      type: 'worksheet' as const,
      ageGroup: 'adult',
      timeInvestment: 'medium' as const,
      difficultyLevel: 'beginner' as const,
      rating: 4.8,
      reviewCount: 95
    }]
  };
  // Filter resources based on search query and content type filter
  const filterResourcesBySearch = (resourceList: any[]) => {
    return resourceList.filter(resource => {
      // Search query filter
      if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Content type filter
      if (filters.contentType !== 'all' && resource.type !== filters.contentType) {
        return false;
      }
      return true;
    });
  };
  const filteredResources = {
    elementary: filterResourcesBySearch(resources.elementary),
    middle: filterResourcesBySearch(resources.middle),
    high: filterResourcesBySearch(resources.high),
    adult: filterResourcesBySearch(resources.adult)
  };
  // Age group tabs configuration
  const ageTabs = [{
    id: 'elementary',
    label: 'Elementary (K-6)'
  }, {
    id: 'middle',
    label: 'Middle School (7-9)'
  }, {
    id: 'high',
    label: 'High School (10-12)'
  }, {
    id: 'adult',
    label: 'Adults & Parents'
  }];
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <BookOpen size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Age-Specific Resources
          </h2>
        </div>
        {/* Age group tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          {ageTabs.map(tab => <button key={tab.id} className={`py-3 px-6 text-sm font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`} onClick={() => setActiveTab(tab.id)} aria-selected={activeTab === tab.id}>
              {tab.label}
            </button>)}
        </div>
        {/* Elementary Resources */}
        {activeTab === 'elementary' && <div className="animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Elementary School Resources (K-6)
              </h3>
              <p className="text-gray-600">
                Age-appropriate resources to help young children develop healthy
                digital habits early.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.elementary.length > 0 ? filteredResources.elementary.map(resource => <ResourceCard key={resource.id} {...resource} />) : <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No elementary resources match your current filters.
                  </p>
                </div>}
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Key Focus Areas for Elementary
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Simple digital citizenship concepts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">Parent-child activities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">Screen-free play ideas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">Basic internet safety</span>
                </li>
              </ul>
            </div>
          </div>}
        {/* Middle School Resources */}
        {activeTab === 'middle' && <div className="animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Middle School Resources (7-9)
              </h3>
              <p className="text-gray-600">
                Resources designed for the unique challenges of early
                adolescence and increasing digital independence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.middle.length > 0 ? filteredResources.middle.map(resource => <ResourceCard key={resource.id} {...resource} />) : <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No middle school resources match your current filters.
                  </p>
                </div>}
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Key Focus Areas for Middle School
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">Social media awareness</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Cyberbullying prevention
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Study habits and technology
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Peer pressure and digital choices
                  </span>
                </li>
              </ul>
            </div>
          </div>}
        {/* High School Resources */}
        {activeTab === 'high' && <div className="animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                High School Resources (10-12)
              </h3>
              <p className="text-gray-600">
                Advanced resources for teenagers preparing for higher education
                and future careers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.high.length > 0 ? filteredResources.high.map(resource => <ResourceCard key={resource.id} {...resource} />) : <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No high school resources match your current filters.
                  </p>
                </div>}
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Key Focus Areas for High School
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Digital footprint management
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    College prep and technology
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Career skills in digital age
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Mental health and social media
                  </span>
                </li>
              </ul>
            </div>
          </div>}
        {/* Adult Resources */}
        {activeTab === 'adult' && <div className="animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Adult & Parent Resources
              </h3>
              <p className="text-gray-600">
                Resources for adults to manage their own digital wellness and
                support children's healthy technology use.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.adult.length > 0 ? filteredResources.adult.map(resource => <ResourceCard key={resource.id} {...resource} />) : <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No adult resources match your current filters.
                  </p>
                </div>}
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Key Focus Areas for Adults & Parents
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Modeling healthy tech use
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Family digital wellness planning
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Workplace digital boundaries
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-700">
                    Supporting teens through digital challenges
                  </span>
                </li>
              </ul>
            </div>
          </div>}
      </div>
    </section>;
};