import React from 'react';
import { Users, Calendar, MessageCircle, Heart } from 'lucide-react';
interface CommunityResourcesProps {
  searchQuery: string;
  filters: {
    riskLevel: string;
    contentType: string;
    ageGroup: string;
  };
}
export const CommunityResources = ({
  searchQuery,
  filters
}: CommunityResourcesProps) => {
  // Sample community events data
  const events = [{
    id: 'event-1',
    title: 'Digital Wellness Workshop',
    date: 'June 15, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual Event',
    description: 'Interactive workshop on creating healthier digital habits and boundaries.'
  }, {
    id: 'event-2',
    title: 'Parent-Teacher Digital Citizenship Forum',
    date: 'June 22, 2025',
    time: '10:00 AM - 12:00 PM',
    location: 'Manila Science High School',
    description: 'Collaborative discussion on supporting students digital wellness.'
  }, {
    id: 'event-3',
    title: 'Teen Digital Leaders Summit',
    date: 'July 5, 2025',
    time: '9:00 AM - 3:00 PM',
    location: 'University of the Philippines',
    description: 'Leadership training for high school students to become digital wellness advocates.'
  }];
  // Sample success stories data
  const stories = [{
    id: 'story-1',
    name: 'Maria Santos',
    role: 'High School Teacher',
    quote: "After implementing DigiWise resources in my classroom, I've seen a remarkable improvement in my students' focus and digital habits.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 'story-2',
    name: 'The Reyes Family',
    role: 'Parents of two teenagers',
    quote: 'The family digital agreement template transformed how we approach technology in our home. We now have healthier boundaries and more quality time together.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }];
  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  // Filter stories based on search query
  const filteredStories = stories.filter(story => {
    if (searchQuery && !story.name.toLowerCase().includes(searchQuery.toLowerCase()) && !story.quote.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <Users size={24} className="text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Connect & Share</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Calendar */}
          <div>
            <div className="flex items-center mb-6">
              <Calendar size={20} className="text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Upcoming Events
              </h3>
            </div>
            {filteredEvents.length > 0 ? <div className="space-y-4">
                {filteredEvents.map(event => <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {event.location}
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                    <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Learn more & register
                    </button>
                  </div>)}
              </div> : <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No upcoming events match your search.
                </p>
              </div>}
            <button className="mt-4 w-full py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium">
              View All Events
            </button>
          </div>
          {/* Success Stories */}
          <div>
            <div className="flex items-center mb-6">
              <MessageCircle size={20} className="text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Success Stories
              </h3>
            </div>
            {filteredStories.length > 0 ? <div className="space-y-6">
                {filteredStories.map(story => <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center mb-4">
                      <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {story.name}
                        </h4>
                        <p className="text-sm text-gray-500">{story.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-600 italic">
                      "{story.quote}"
                    </blockquote>
                  </div>)}
              </div> : <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No success stories match your search.
                </p>
              </div>}
            <div className="mt-10 bg-blue-50 rounded-lg p-6">
              <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <Heart size={20} className="text-blue-600 mr-2" />
                Peer Support
              </h4>
              <p className="text-gray-600 mb-4">
                Connect with others on their digital wellness journey. Share
                experiences, challenges, and successes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Join Support Group
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors font-medium">
                  Share Your Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};