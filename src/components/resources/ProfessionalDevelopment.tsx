import React from 'react';
import { Briefcase, Award, Users, BookOpen } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
interface ProfessionalDevelopmentProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const ProfessionalDevelopment = ({
  searchQuery,
  filters
}: ProfessionalDevelopmentProps) => {
  // Sample professional development resources
  const resources = [{
    id: 'prof-1',
    title: 'Digital Wellness Workshop Facilitator Guide',
    description: 'Comprehensive materials for conducting digital wellness workshops in schools or communities.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'advanced' as const,
    rating: 4.9,
    reviewCount: 87
  }, {
    id: 'prof-2',
    title: 'Digital Wellness Presentation Templates',
    description: 'Ready-to-use slide decks for different audiences and digital wellness topics.',
    type: 'pdf' as const,
    timeInvestment: 'medium' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.7,
    reviewCount: 62
  }, {
    id: 'prof-3',
    title: 'Digital Wellness Assessment Training Course',
    description: 'Learn how to administer, interpret, and use Digital Wellness Assessment results effectively.',
    type: 'course' as const,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'advanced' as const,
    rating: 4.8,
    reviewCount: 45
  }, {
    id: 'prof-4',
    title: 'Digital Wellness Professional Certification',
    description: 'Earn certification as a Digital Wellness Educator through this comprehensive program.',
    type: 'course' as const,
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'advanced' as const,
    rating: 5.0,
    reviewCount: 38
  }];
  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
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
  return <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <Briefcase size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            For Educators & Professionals
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Award size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Certification
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Earn professional credentials in digital wellness education and
              assessment.
            </p>
            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
              View certification paths →
            </a>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Users size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Research Collaboration
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Join our network of researchers studying digital wellness in
              Philippine schools.
            </p>
            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
              Learn about opportunities →
            </a>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BookOpen size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Continuing Education
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional development courses eligible for DepEd continuing
              education credits.
            </p>
            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
              Browse courses →
            </a>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Featured Professional Resources
        </h3>
        {filteredResources.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResources.map(resource => <ResourceCard key={resource.id} {...resource} />)}
          </div> : <div className="text-center py-8">
            <p className="text-gray-500">
              No professional resources match your current filters.
            </p>
          </div>}
      </div>
    </section>;
};