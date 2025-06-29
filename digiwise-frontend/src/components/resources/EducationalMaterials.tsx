import React from 'react';
import { motion } from 'framer-motion';
import { ResourceCard } from './ResourceCard';
import { BookOpen, Award } from 'lucide-react';
interface EducationalMaterialsProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const EducationalMaterials = ({
  searchQuery,
  filters
}: EducationalMaterialsProps) => {
  // Sample educational resources data based on the provided links
  const resources = [
  // Empowerment Technologies Resources
  {
    id: 'ed-1',
    category: 'empowerment',
    title: 'Empowerment Technologies for the Strand',
    description: 'A core subject for SHS students covering responsible use of technology and online behavior. Discusses internet addiction, gaming disorder, and screen time balance.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ageGroup: 'high',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.8,
    reviewCount: 56,
    featured: true,
    link: 'https://www.deped.gov.ph/wp-content/uploads/2019/01/SHS-Applied_Empowerment-Technologies-for-the-Strand.pdf',
    riskLevel: 'yellow'
  },
  // #BeCyberSafe Project Resources
  {
    id: 'cyber-1',
    category: 'cybersafe',
    title: '#BeCyberSafe: Online Gaming Addiction',
    description: 'Educational materials on online gaming addiction for Grade 5 up to Junior High, applicable for SHS. Teaches how excessive gaming affects studies, relationships, and mental health.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ageGroup: 'middle',
    timeInvestment: 'medium' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.7,
    reviewCount: 48,
    featured: true,
    link: 'https://www.deped.gov.ph/alternative-learning-system/resources/downloads/becybersafe/',
    riskLevel: 'orange'
  },
  // Digital Literacy Resources
  {
    id: 'digital-1',
    category: 'digital-literacy',
    title: 'Digital Literacy in ALS (Learning Strand 6)',
    description: 'Though designed for ALS learners, these materials teach ethical digital use and critical thinking about technology use, including risks of online dependency and addiction.',
    type: 'pdf' as const,
    thumbnail: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ageGroup: 'high',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.8,
    reviewCount: 52,
    featured: true,
    link: 'https://www.deped.gov.ph/wp-content/uploads/2019/01/LS-6-Digital-Literacy.pdf',
    riskLevel: 'green'
  },
  // Additional resources for better filtering demonstration
  {
    id: 'ed-2',
    category: 'empowerment',
    title: 'Screen Time Management for Elementary Students',
    description: 'Age-appropriate materials for teaching younger students about healthy screen time habits and digital wellness concepts.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ageGroup: 'elementary',
    timeInvestment: 'quick' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.6,
    reviewCount: 42,
    featured: false,
    link: 'https://www.deped.gov.ph/digital-wellness',
    riskLevel: 'green'
  }, {
    id: 'ed-3',
    category: 'cybersafe',
    title: 'Advanced Digital Wellness Strategies',
    description: 'In-depth guide for educators and parents on addressing serious digital dependency issues and implementing effective interventions.',
    type: 'worksheet' as const,
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ageGroup: 'adult',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'advanced' as const,
    rating: 4.9,
    reviewCount: 36,
    featured: false,
    link: 'https://www.deped.gov.ph/digital-wellness/advanced',
    riskLevel: 'red'
  }];
  // Apply filters to resources
  const filteredResources = resources.filter(resource => {
    // Search query filter - check title and description
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const titleMatch = resource.title.toLowerCase().includes(query);
      const descriptionMatch = resource.description.toLowerCase().includes(query);
      if (!titleMatch && !descriptionMatch) {
        return false;
      }
    }
    // Content type filter
    if (filters.contentType !== 'all' && resource.type !== filters.contentType) {
      return false;
    }
    // Age group filter
    if (filters.ageGroup !== 'all' && resource.ageGroup !== filters.ageGroup) {
      return false;
    }
    // Risk level filter
    if (filters.riskLevel !== 'all' && resource.riskLevel !== filters.riskLevel) {
      return false;
    }
    return true;
  });
  // Featured resources - get featured resources from filtered list
  const featuredResources = filteredResources.filter(resource => resource.featured);
  // Regular resources - get non-featured resources from filtered list
  const regularResources = filteredResources.filter(resource => !resource.featured);
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <BookOpen size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Department of Education Resources
          </h2>
        </div>
        {/* Search results info */}
        {searchQuery || filters.contentType !== 'all' || filters.ageGroup !== 'all' || filters.riskLevel !== 'all' ? <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Showing {filteredResources.length} resources
              {searchQuery ? ` matching "${searchQuery}"` : ''}
              {filters.contentType !== 'all' ? ` of type "${filters.contentType}"` : ''}
              {filters.ageGroup !== 'all' ? ` for "${filters.ageGroup}" age group` : ''}
              {filters.riskLevel !== 'all' ? ` with "${filters.riskLevel}" risk level` : ''}
            </p>
          </div> : null}
        {/* Featured Resources - only show if we have any after filtering */}
        {featuredResources.length > 0 && <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Award className="w-5 h-5 text-amber-500 mr-2" />
                Featured DepEd Materials for Gaming & Digital Wellness
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map(resource => <motion.div key={resource.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
                  <ResourceCard key={resource.id} {...resource} />
                </motion.div>)}
            </div>
          </div>}
        {/* Regular Resources - show if we have any non-featured resources */}
        {regularResources.length > 0 && <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Additional Resources
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regularResources.map(resource => <motion.div key={resource.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
                  <ResourceCard key={resource.id} {...resource} />
                </motion.div>)}
            </div>
          </div>}
        {/* No results message */}
        {filteredResources.length === 0 && <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">
              No resources match your search criteria.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={() => {
          // This would typically reset filters in a real app
          window.location.reload();
        }}>
              Clear filters
            </button>
          </div>}
      </div>
    </section>;
};