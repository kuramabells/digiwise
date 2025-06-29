import React from 'react';
import { ResourceCard } from './ResourceCard';
import { PlayCircle, User, BookOpen, Users, Briefcase } from 'lucide-react';
interface VideoLibraryProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const VideoLibrary = ({
  searchQuery,
  filters
}: VideoLibraryProps) => {
  // Sample video resources data
  const videos = [{
    id: 'vid-1',
    title: 'Digital Wellness: Expert Insights',
    description: 'Leading psychologists discuss the impact of technology on mental health and strategies for balance.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'expert',
    timeInvestment: 'medium' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.8,
    reviewCount: 156
  }, {
    id: 'vid-2',
    title: 'My Journey to Digital Balance',
    description: 'A high school student shares their experience overcoming social media addiction and finding healthier tech habits.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'student',
    timeInvestment: 'quick' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.7,
    reviewCount: 98
  }, {
    id: 'vid-3',
    title: 'Setting Up Digital Boundaries: Step-by-Step',
    description: 'Practical tutorial on configuring device settings and apps to support healthier digital habits.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'howto',
    timeInvestment: 'medium' as const,
    difficultyLevel: 'beginner' as const,
    rating: 4.9,
    reviewCount: 187
  }, {
    id: 'vid-4',
    title: 'Family Tech Talk: Starting the Conversation',
    description: 'Guide for parents on how to discuss digital wellness with children of different ages.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'family',
    timeInvestment: 'medium' as const,
    difficultyLevel: 'intermediate' as const,
    rating: 4.6,
    reviewCount: 124
  }, {
    id: 'vid-5',
    title: 'Digital Wellness in the Classroom',
    description: 'Professional development video for educators on integrating digital wellness concepts into teaching.',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'teacher',
    timeInvestment: 'comprehensive' as const,
    difficultyLevel: 'advanced' as const,
    rating: 4.8,
    reviewCount: 76
  }];
  // Filter videos based on search query and filters
  const filteredVideos = videos.filter(video => {
    // Search query filter
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()) && !video.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Content type filter
    if (filters.contentType !== 'all' && filters.contentType !== 'video') {
      return false;
    }
    // Age group filter (approximation based on categories)
    if (filters.ageGroup !== 'all') {
      if (filters.ageGroup === 'elementary' && video.category !== 'family') return false;
      if (filters.ageGroup === 'middle' && video.category !== 'student' && video.category !== 'family') return false;
      if (filters.ageGroup === 'high' && video.category !== 'student') return false;
      if (filters.ageGroup === 'adult' && video.category !== 'expert' && video.category !== 'family' && video.category !== 'teacher') return false;
    }
    return true;
  });
  // Video categories with icons
  const categories = [{
    id: 'expert',
    name: 'Expert Talks',
    icon: <User size={18} />
  }, {
    id: 'student',
    name: 'Student Stories',
    icon: <BookOpen size={18} />
  }, {
    id: 'family',
    name: 'Family Discussions',
    icon: <Users size={18} />
  }, {
    id: 'teacher',
    name: 'Teacher Training',
    icon: <Briefcase size={18} />
  }, {
    id: 'howto',
    name: 'How-To Guides',
    icon: <PlayCircle size={18} />
  }];
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <PlayCircle size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Video Library</h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => <button key={category.id} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>)}
        </div>
        {filteredVideos.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => <ResourceCard key={video.id} {...video} />)}
          </div> : <div className="text-center py-8">
            <p className="text-gray-500">
              No videos match your current filters.
            </p>
          </div>}
      </div>
    </section>;
};