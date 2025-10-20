import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';

interface RelatedJobsProps {
  currentJobId: number;
}

const RelatedJobs: React.FC<RelatedJobsProps> = ({ currentJobId }) => {
  // Mock related jobs data
  const relatedJobs = [
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'TechCorp Ethiopia',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '3,500,000 - 5,500,000 UGX',
      logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      posted: '3 days ago',
      level: 'Mid',
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '4,500,000 - 7,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      posted: '1 week ago',
      level: 'Senior',
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'Innovation Hub',
      location: 'Entebbe, Ethiopia',
      type: 'Full-time',
      salary: '4,000,000 - 6,500,000 UGX',
      logo: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      posted: '5 days ago',
      level: 'Mid',
    },
    {
      id: 5,
      title: 'Software Architect',
      company: 'Digital Innovations',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '8,000,000 - 12,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      posted: '2 days ago',
      level: 'Senior',
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'AppCraft Ethiopia',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '3,800,000 - 6,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3182803/pexels-photo-3182803.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      posted: '4 days ago',
      level: 'Mid',
    },
  ].filter(job => job.id !== currentJobId);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'remote':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'senior':
        return 'bg-red-100 text-red-800';
      case 'mid':
        return 'bg-blue-100 text-blue-800';
      case 'junior':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Related Jobs</h3>
      
      <div className="space-y-4">
        {relatedJobs.slice(0, 4).map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <img
                src={job.logo}
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/job/${job.id}`}
                  className="block"
                >
                  <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm mb-1 line-clamp-2">
                    {job.title}
                  </h4>
                </Link>
                
                <p className="text-gray-600 text-xs mb-2">{job.company}</p>
                
                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{job.posted}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <DollarSign className="w-3 h-3" />
                    <span className="text-xs">{job.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(job.level)}`}>
                    {job.level}
                  </span>
                </div>

                <Link
                  to={`/job/${job.id}`}
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          to="/jobs"
          className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
};

export default RelatedJobs;