import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';
import JobApplicationModal from './modals/JobApplicationModal';

const FeaturedJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = React.useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = React.useState(false);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const jobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Ethiopia',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '5,000,000 - 8,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['React', 'Node.js', 'TypeScript'],
      posted: '2 days ago',
    },
    {
      title: 'Marketing Manager',
      company: 'Brand Solutions',
      location: 'Entebbe, Ethiopia',
      type: 'Full-time',
      salary: '3,500,000 - 5,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['Digital Marketing', 'Analytics', 'Strategy'],
      posted: '1 week ago',
    },
    {
      title: 'Financial Analyst',
      company: 'Finance Pro Ltd',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '2,800,000 - 4,200,000 UGX',
      logo: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['Excel', 'Financial Modeling', 'Analysis'],
      posted: '3 days ago',
    },
    {
      title: 'Registered Nurse',
      company: 'Kampala Hospital',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '2,000,000 - 3,500,000 UGX',
      logo: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['Patient Care', 'Medical', 'Emergency'],
      posted: '5 days ago',
    },
    {
      title: 'Project Manager',
      company: 'BuildCorp Ethiopia',
      location: 'Jinja, Ethiopia',
      type: 'Full-time',
      salary: '4,000,000 - 6,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3182803/pexels-photo-3182803.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['Project Management', 'Agile', 'Leadership'],
      posted: '1 day ago',
    },
    {
      title: 'Graphic Designer',
      company: 'Creative Agency',
      location: 'Kampala, Ethiopia',
      type: 'Full-time',
      salary: '1,800,000 - 3,000,000 UGX',
      logo: 'https://images.pexels.com/photos/3182792/pexels-photo-3182792.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tags: ['Photoshop', 'Illustrator', 'Branding'],
      posted: '4 days ago',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Jobs
          </h2>
          <p className="text-lg text-gray-600">
            Hand-picked opportunities from top employers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Link to={`/company/${encodeURIComponent(job.company)}`}>
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <Link 
                      to={`/company/${encodeURIComponent(job.company)}`}
                      className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
                    >
                      {job.company}
                    </Link>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {job.posted}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{job.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{job.salary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => handleApplyClick(job)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Jobs
          </Link>
        </div>
      </div>
      
      {/* Application Modal */}
      <JobApplicationModal
        job={selectedJob}
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setSelectedJob(null);
        }}
      />
    </section>
  );
};

export default FeaturedJobs;