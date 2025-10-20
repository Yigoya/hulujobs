import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Bell, Bookmark, Settings } from 'lucide-react';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuickActions from '../components/dashboard/QuickActions';
import JobPostings from '../components/dashboard/JobPostings';
import RecentActivity from '../components/dashboard/RecentActivity';
import DashboardNavigation from '../components/dashboard/DashboardNavigation';
import DashboardJobManagementPage from './dashboard/DashboardJobManagementPage';
import JobTable from '../components/dashboard/JobTable';

const DashboardPage: React.FC = () => {
  const dashboardLinks = [
    {
      title: 'Job Postings',
      description: 'Manage your job listings and track performance',
      href: '/dashboard/jobs',
      icon: Briefcase,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Applications',
      description: 'Review and manage candidate applications',
      href: '/dashboard/applications',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with latest activities',
      href: '/dashboard/notifications',
      icon: Bell,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Saved Candidates',
      description: 'Manage your talent pool and saved profiles',
      href: '/dashboard/candidates',
      icon: Bookmark,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Settings',
      description: 'Configure your account and preferences',
      href: '/dashboard/settings',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employer Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your job postings, track applications, and find the best candidates
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Navigation */}
        <DashboardNavigation />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Postings - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <JobPostings />
          </div>

          {/* Recent Activity - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;