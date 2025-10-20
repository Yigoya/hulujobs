import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Building, FileText, Bell, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ServiceCards: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUploadCV = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleJobAlerts = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const services = [
    {
      icon: Search,
      title: 'Explore Jobs',
      description: 'Browse hundreds of job listings from top employers.',
      color: 'bg-blue-100 text-blue-600',
      action: () => navigate('/jobs'),
    },
    {
      icon: Building,
      title: 'Featured Employers',
      description: 'Discover opportunities with leading companies.',
      color: 'bg-green-100 text-green-600',
      action: () => navigate('/companies'),
    },
    {
      icon: FileText,
      title: 'Upload Your CV',
      description: 'Let employers find you with your professional profile.',
      color: 'bg-purple-100 text-purple-600',
      action: handleUploadCV,
    },
    {
      icon: Bell,
      title: 'Job Alerts',
      description: 'Get notified about new opportunities that match your skills.',
      color: 'bg-orange-100 text-orange-600',
      action: handleJobAlerts,
    },
    {
      icon: BookOpen,
      title: 'Career Resources',
      description: 'Access guides, tips, and tools for career development.',
      color: 'bg-teal-100 text-teal-600',
      action: () => console.log('Career Resources - Coming Soon'),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100 hover:border-blue-200 cursor-pointer group"
              onClick={service.action}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;