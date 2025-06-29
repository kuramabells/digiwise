import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ResourcesHeader } from '../components/resources/ResourcesHeader';
import { ResourceCategories } from '../components/resources/ResourceCategories';
import { EducationalMaterials } from '../components/resources/EducationalMaterials';
export const ResourcesPage = () => {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('deped'); // Changed default to 'deped'
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for additional filters
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    contentType: 'all',
    ageGroup: 'all'
  });
  // Handle category change
  const handleCategoryChange = (category: string) => {
    // Only allow changing to 'deped' category
    if (category === 'deped') {
      setActiveCategory(category);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  // Reset to DepEd category on initial load
  useEffect(() => {
    setActiveCategory('deped');
  }, []);
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <ResourcesHeader searchQuery={searchQuery} onSearch={handleSearch} filters={filters} onFilterChange={handleFilterChange} />
        <ResourceCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        {/* Always show DepEd materials */}
        <EducationalMaterials searchQuery={searchQuery} filters={filters} />
      </main>
      <Footer />
    </div>;
};