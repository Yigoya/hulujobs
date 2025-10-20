import React from 'react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import JobPostings from '../../components/dashboard/JobPostings';

const DashboardJobsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Postings
          </h1>
          <p className="text-gray-600">
            Manage your job postings, track performance, and edit listings
          </p>
        </div>

        {/* Navigation */}
        {/* This page doesn't use the main dashboard navigation */}

        {/* Job Postings Component */}
        <JobPostings />
      </div>
    </div>
  );
};

export default DashboardJobsPage;