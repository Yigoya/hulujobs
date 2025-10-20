import React from 'react';
import { Building, Users, Globe, MapPin, Calendar, Star } from 'lucide-react';

interface CompanyProfileProps {
  company: string;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company }) => {
  // Mock company data - in real app, this would come from API
  const companyData = {
    name: company,
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2',
    description: 'TechCorp Ethiopia is a leading technology company specializing in innovative software solutions for businesses across East Africa. We are committed to driving digital transformation and creating meaningful impact through technology.',
    industry: 'Information Technology',
    size: '50-200 employees',
    founded: '2018',
    location: 'Kampala, Ethiopia',
    website: 'https://techcorp.ug',
    rating: 4.5,
    totalReviews: 127,
    openJobs: 8,
    benefits: [
      'Health Insurance',
      'Flexible Hours',
      'Remote Work',
      'Professional Development',
      'Performance Bonuses'
    ],
    culture: [
      'Innovation-driven',
      'Collaborative',
      'Growth-oriented',
      'Inclusive'
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="text-center mb-6">
        <img
          src={companyData.logo}
          alt={companyData.name}
          className="w-20 h-20 rounded-xl object-cover mx-auto mb-4"
        />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{companyData.name}</h3>
        
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(companyData.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {companyData.rating} ({companyData.totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3 text-gray-600">
          <Building className="w-4 h-4" />
          <span className="text-sm">{companyData.industry}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">{companyData.size}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{companyData.location}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Founded {companyData.founded}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <Globe className="w-4 h-4" />
          <a 
            href={companyData.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Visit Website
          </a>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">About Company</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {companyData.description}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Company Culture</h4>
        <div className="flex flex-wrap gap-2">
          {companyData.culture.map((trait, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
        <div className="space-y-2">
          {companyData.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{benefit}</span>
            </div>
          ))}
          {companyData.benefits.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">
              +{companyData.benefits.length - 3} more benefits
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-900">Open Positions</span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {companyData.openJobs} jobs
          </span>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          View All Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;