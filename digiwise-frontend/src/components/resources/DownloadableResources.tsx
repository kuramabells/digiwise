import React from 'react';
import { ResourceCard } from './ResourceCard';
import { Download, FileText, FileCheck } from 'lucide-react';
interface DownloadableResourcesProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const DownloadableResources = ({
  searchQuery,
  filters
}: DownloadableResourcesProps) => {
  // Sample downloadable resources data
  const resources = [{
    id: 'dl-1',
    title: 'Digital Wellness Handbook',
    description: 'Comprehensive guide covering all aspects of digital wellness for individuals and families.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.8,
    reviewCount: 215
  }, {
    id: 'dl-2',
    title: 'Digital Detox Workbook',
    description: 'Interactive worksheets to guide you through a structured digital detox process.',
    type: 'worksheet' as const,
    timeInvestment: 'medium' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.6,
    reviewCount: 128
  }, {
    id: 'dl-3',
    title: 'Screen Time Management Checklist',
    description: 'Daily and weekly checklist to help maintain healthy digital habits.',
    type: 'pdf' as const,
    timeInvestment: 'quick' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.3,
    reviewCount: 97
  }, {
    id: 'dl-4',
    title: 'Digital Wellness Infographics Bundle',
    description: 'Collection of visual guides covering key digital wellness concepts, perfect for sharing.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    timeInvestment: 'quick' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.7,
    reviewCount: 156
  }, {
    id: 'dl-5',
    title: 'Family Technology Agreement Template',
    description: 'Customizable template to establish healthy technology boundaries for the whole family.',
    type: 'pdf' as const,
    timeInvestment: 'medium' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.9,
    reviewCount: 183
  }, {
    id: 'dl-6',
    title: 'Digital Wellness Journal',
    description: '30-day guided journal for reflecting on your relationship with technology.',
    type: 'worksheet' as const,
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.5,
    reviewCount: 112
  }];
  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
    // Search query filter
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Content type filter - only show pdf and worksheet types for this section
    if (filters.contentType !== 'all' && filters.contentType !== 'pdf' && filters.contentType !== 'worksheet' && resource.type !== filters.contentType) {
      return false;
    }
    return true;
  });
  return <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <Download size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Take It With You</h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
            <FileText size={16} className="mr-2" />
            PDF Guides
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
            <FileCheck size={16} className="mr-2" />
            Worksheets
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
            All Resources
          </button>
        </div>
        {filteredResources.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => <ResourceCard key={resource.id} {...resource} />)}
          </div> : <div className="text-center py-8">
            <p className="text-gray-500">
              No downloadable resources match your current filters.
            </p>
          </div>}
      </div>
    </section>;
};