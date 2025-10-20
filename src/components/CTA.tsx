import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase } from 'lucide-react';

const CTA: React.FC = () => {
  return (
  <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Job Seekers CTA */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for Your Next Opportunity?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join thousands of job seekers who have found their perfect match. Create your profile today and get discovered by top employers.
            </p>
            <Link 
              to="/jobs" >                  
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto group">
              <span>Find Jobs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
                </Link>
          </div>

          {/* Employers CTA */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Top Talent?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connect with qualified candidates and build your dream team. Post your job listings and find the perfect fit for your company.
            </p>
              <Link 
              to="/post-job" >   
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mx-auto group">
              <span>Post a Job</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
                </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Job Seekers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Job Opportunities</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;