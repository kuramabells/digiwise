import React, { useState } from 'react';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';
interface ResourcesHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}
export const ResourcesHeader = ({
  searchQuery,
  onSearch,
  filters,
  onFilterChange
}: ResourcesHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
          Digital Wellness Resources
        </h1>
        <p className="text-xl text-gray-600 mb-6 text-center max-w-3xl mx-auto">
          Evidence-based tools and materials to support your digital wellness
          journey
        </p>
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input type="text" placeholder="Find resources by topic or keyword" className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => onSearch(e.target.value)} aria-label="Search resources" />
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button onClick={toggleFilters} className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors md:w-auto" aria-expanded={isFilterOpen} aria-controls="filter-panel">
              <FilterIcon size={20} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
          {/* Filter Panel */}
          {isFilterOpen && <div id="filter-panel" className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 animate-fadeIn">
              {/* Risk Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.riskLevel} onChange={e => onFilterChange('riskLevel', e.target.value)} aria-label="Filter by risk level">
                  <option value="all">All Risk Levels</option>
                  <option value="green">Green (Little to No Risk)</option>
                  <option value="yellow">Yellow (Low to Moderate Risk)</option>
                  <option value="orange">Orange (Concerning Risk)</option>
                  <option value="red">Red (Serious Risk)</option>
                </select>
              </div>
              {/* Content Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.contentType} onChange={e => onFilterChange('contentType', e.target.value)} aria-label="Filter by content type">
                  <option value="all">All Content Types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="pdf">PDF Guides</option>
                  <option value="worksheet">Worksheets</option>
                  <option value="tool">Interactive Tools</option>
                  <option value="course">Courses</option>
                </select>
              </div>
              {/* Age Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.ageGroup} onChange={e => onFilterChange('ageGroup', e.target.value)} aria-label="Filter by age group">
                  <option value="all">All Age Groups</option>
                  <option value="elementary">Elementary (K-6)</option>
                  <option value="middle">Middle School (7-9)</option>
                  <option value="high">High School (10-12)</option>
                  <option value="adult">Adults & Parents</option>
                </select>
              </div>
            </div>}
        </div>
      </div>
    </section>;
};