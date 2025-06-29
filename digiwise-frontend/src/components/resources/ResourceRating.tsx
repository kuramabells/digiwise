import React from 'react';
import { Star } from 'lucide-react';
interface ResourceRatingProps {
  rating: number;
  reviewCount: number;
  size?: 'small' | 'medium';
}
export const ResourceRating = ({
  rating,
  reviewCount,
  size = 'small'
}: ResourceRatingProps) => {
  // Generate array of stars
  const stars = Array(5).fill(0).map((_, i) => {
    // Full star
    if (i < Math.floor(rating)) {
      return 'full';
    }
    // Half star
    if (i < Math.ceil(rating) && !Number.isInteger(rating)) {
      return 'half';
    }
    // Empty star
    return 'empty';
  });
  const starSize = size === 'small' ? 14 : 18;
  const textSize = size === 'small' ? 'text-xs' : 'text-sm';
  return <div className="flex items-center">
      <div className="flex mr-1">
        {stars.map((type, index) => <Star key={index} size={starSize} className={`${type === 'full' ? 'text-yellow-400 fill-current' : type === 'half' ? 'text-yellow-400' : 'text-gray-300'}`} />)}
      </div>
      <span className={`${textSize} text-gray-500`}>({reviewCount})</span>
    </div>;
};