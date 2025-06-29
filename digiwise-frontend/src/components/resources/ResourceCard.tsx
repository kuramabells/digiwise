import React from 'react';
import { Clock, FileText, Video, ExternalLink, Download } from 'lucide-react';
import { ResourceRating } from './ResourceRating';
export interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf' | 'worksheet' | 'tool' | 'course' | 'link';
  thumbnail?: string;
  riskLevel?: 'green' | 'yellow' | 'orange' | 'red' | null;
  ageGroup?: string;
  timeInvestment: 'quick' | 'medium' | 'comprehensive';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewCount: number;
  link?: string;
}
export const ResourceCard = ({
  title,
  description,
  type,
  thumbnail,
  riskLevel,
  timeInvestment,
  difficultyLevel,
  rating,
  reviewCount,
  link
}: ResourceCardProps) => {
  // Helper to get icon based on resource type
  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return <Video size={16} className="mr-1" />;
      case 'pdf':
      case 'worksheet':
        return <FileText size={16} className="mr-1" />;
      case 'link':
        return <ExternalLink size={16} className="mr-1" />;
      case 'tool':
        return <Download size={16} className="mr-1" />;
      default:
        return <FileText size={16} className="mr-1" />;
    }
  };
  // Helper to get time investment text
  const getTimeText = () => {
    switch (timeInvestment) {
      case 'quick':
        return 'Quick read';
      case 'medium':
        return '30-min activity';
      case 'comprehensive':
        return 'Comprehensive';
      default:
        return 'Quick read';
    }
  };
  // Helper to get risk level color
  const getRiskLevelColor = () => {
    switch (riskLevel) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'orange':
        return 'bg-orange-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };
  const cardContent = <>
      {thumbnail && <div className="h-40 overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover object-center" />
        </div>}
      <div className="p-5">
        <div className="flex items-center mb-2">
          {riskLevel && <div className="flex items-center mr-2">
              <span className={`w-3 h-3 ${getRiskLevelColor()} rounded-full mr-1`}></span>
              <span className="text-xs text-gray-500 capitalize">
                {riskLevel} Level
              </span>
            </div>}
          <div className="flex items-center text-xs text-gray-500">
            {getTypeIcon()}
            <span className="capitalize">{type}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock size={14} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{getTimeText()}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-xs text-gray-500 capitalize">
              {difficultyLevel}
            </span>
          </div>
          <ResourceRating rating={rating} reviewCount={reviewCount} />
        </div>
        {link && <div className="mt-4 flex justify-end">
            <span className="text-blue-600 text-sm font-medium flex items-center">
              View Resource <ExternalLink size={14} className="ml-1" />
            </span>
          </div>}
      </div>
    </>;
  return link ? <a href={link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 block">
      {cardContent}
    </a> : <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      {cardContent}
    </div>;
};