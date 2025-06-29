import React from 'react';
import { LockIcon } from 'lucide-react';
interface ResourceCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
export const ResourceCategories = ({
  activeCategory,
  onCategoryChange
}: ResourceCategoriesProps) => {
  const categories = [{
    id: 'all',
    name: 'All Resources',
    locked: true
  }, {
    id: 'deped',
    name: 'DepEd Materials',
    locked: false
  }, {
    id: 'students',
    name: 'For Students',
    locked: true
  }, {
    id: 'parents',
    name: 'For Parents',
    locked: true
  }, {
    id: 'educators',
    name: 'For Educators',
    locked: true
  }, {
    id: 'risk-level',
    name: 'By Risk Level',
    locked: true
  }];
  return <section className="bg-white border-b border-gray-200 sticky top-16 z-10 shadow-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-x-auto py-1">
          <div className="flex whitespace-nowrap min-w-max px-4">
            {categories.map(category => <button key={category.id} className={`px-4 py-3 text-sm font-medium transition-colors flex items-center ${activeCategory === category.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'} ${category.locked && category.id !== activeCategory ? 'opacity-70' : ''}`} onClick={() => !category.locked && onCategoryChange(category.id)} aria-current={activeCategory === category.id ? 'page' : undefined} disabled={category.locked && category.id !== 'deped'}>
                {category.name}
                {category.locked && category.id !== 'deped' && <LockIcon size={14} className="ml-1.5 opacity-70" />}
              </button>)}
          </div>
        </div>
      </div>
    </section>;
};