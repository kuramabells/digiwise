import React from 'react';
import { UserIcon, CheckSquareIcon, BookOpenIcon, TrendingUpIcon } from 'lucide-react';
export const ImpactSection = () => {
  const stats = [{
    id: 1,
    value: '25,000+',
    label: 'Assessments Completed',
    icon: <CheckSquareIcon size={24} className="text-blue-600" />
  }, {
    id: 2,
    value: '18,500+',
    label: 'Users Helped',
    icon: <UserIcon size={24} className="text-blue-600" />
  }, {
    id: 3,
    value: '45,000+',
    label: 'Resources Accessed',
    icon: <BookOpenIcon size={24} className="text-blue-600" />
  }, {
    id: 4,
    value: '72%',
    label: 'Improvement Rate',
    icon: <TrendingUpIcon size={24} className="text-blue-600" />
  }];
  const testimonials = [{
    id: 1,
    quote: 'DigiWise helped me understand my social media habits and how they were affecting my sleep. The personalized recommendations made a huge difference.',
    author: 'Maria G., Student, 16'
  }, {
    id: 2,
    quote: "As a teacher, I've seen firsthand how DigiWise has helped my students develop healthier relationships with technology. It's an invaluable resource.",
    author: 'Mr. Santos, High School Teacher'
  }, {
    id: 3,
    quote: "The assessment was eye-opening for our entire family. We've implemented the recommended changes and seen improvements in our children's focus and mood.",
    author: 'The Reyes Family'
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map(stat => <div key={stat.id} className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>)}
        </div>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Success Stories
          </h3>
          <div className="space-y-6">
            {testimonials.map(testimonial => <div key={testimonial.id} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <blockquote className="text-gray-700 italic mb-2">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-right text-gray-600 font-medium">
                  — {testimonial.author}
                </div>
              </div>)}
          </div>
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Research Contributions
            </h3>
            <p className="text-gray-700 mb-4">
              DigiWise contributes to the growing field of digital wellness
              research by:
            </p>
            <ul className="text-gray-700 space-y-2 pl-6 list-disc">
              <li>
                Collecting anonymized data on digital habits across different
                demographics
              </li>
              <li>
                Collaborating with academic institutions on digital wellness
                studies
              </li>
              <li>
                Publishing findings in peer-reviewed journals and conferences
              </li>
              <li>
                Developing new assessment methodologies based on real-world data
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};