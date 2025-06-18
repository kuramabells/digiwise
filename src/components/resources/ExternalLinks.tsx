import React from 'react';
import { ExternalLink, Heart, Globe, BookOpen, Building } from 'lucide-react';
interface ExternalLinksProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const ExternalLinks = ({
  searchQuery,
  filters
}: ExternalLinksProps) => {
  // External resources data
  const resources = [{
    id: 'ext-1',
    title: 'Philippine Mental Health Association',
    description: 'Resources and support for digital wellness and mental health concerns.',
    link: 'https://pmha.org.ph',
    category: 'mental-health',
    icon: <Heart size={20} className="text-red-500" />
  }, {
    id: 'ext-2',
    title: 'World Health Organization: Digital Health',
    description: 'Global research and guidelines on technology use and mental wellbeing.',
    link: 'https://www.who.int/health-topics/digital-health',
    category: 'mental-health',
    icon: <Globe size={20} className="text-blue-500" />
  }, {
    id: 'ext-3',
    title: 'Digital Wellness Institute',
    description: 'Research papers and studies on digital wellness across different demographics.',
    link: 'https://digitalwellnessinstitute.com',
    category: 'research',
    icon: <BookOpen size={20} className="text-purple-500" />
  }, {
    id: 'ext-4',
    title: 'Department of Health: Mental Health Resources',
    description: 'Official government resources for mental health support and digital wellness.',
    link: 'https://doh.gov.ph/mental-health-resources',
    category: 'government',
    icon: <Building size={20} className="text-green-500" />
  }, {
    id: 'ext-5',
    title: 'Digital Wellness Collective',
    description: 'International community dedicated to promoting healthier relationships with technology.',
    link: 'https://digitalwellnesscollective.org',
    category: 'international',
    icon: <Globe size={20} className="text-indigo-500" />
  }, {
    id: 'ext-6',
    title: 'DepEd Digital Citizenship Portal',
    description: 'Educational resources and policies for digital citizenship in Philippine schools.',
    link: 'https://deped.gov.ph/digital-citizenship',
    category: 'government',
    icon: <Building size={20} className="text-green-500" />
  }];
  // Filter resources based on search query
  const filteredResources = resources.filter(resource => {
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  // Group resources by category
  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);
  // Category labels
  const categoryLabels = {
    'mental-health': 'Mental Health Organizations',
    research: 'Research Resources',
    government: 'Government Resources',
    international: 'International Organizations'
  };
  return <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <ExternalLink size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Additional Resources
          </h2>
        </div>
        {filteredResources.length > 0 ? Object.entries(groupedResources).map(([category, resources]) => <div key={category} className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(resource => <a key={resource.id} href={resource.link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 p-6 flex flex-col">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-gray-50 rounded-full mr-3">
                        {resource.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {resource.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Visit website
                      <ExternalLink size={14} className="ml-1" />
                    </div>
                  </a>)}
              </div>
            </div>) : <div className="text-center py-8">
            <p className="text-gray-500">
              No external resources match your search.
            </p>
          </div>}
      </div>
    </section>;
};