import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Bell, 
  Bookmark, 
  Settings, 
  BarChart3,
  Home
} from 'lucide-react';

const DashboardNavigation: React.FC = () => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Job Management',
      href: '/dashboard/job-management',
      icon: Briefcase,
      current: location.pathname === '/dashboard/job-management'
    },
    {
      name: 'Applications',
      href: '/dashboard/applications',
      icon: Users,
      current: location.pathname === '/dashboard/applications'
    },
    {
      name: 'Notifications',
      href: '/dashboard/notifications',
      icon: Bell,
      current: location.pathname === '/dashboard/notifications'
    },
    {
      name: 'Saved Candidates',
      href: '/dashboard/candidates',
      icon: Bookmark,
      current: location.pathname === '/dashboard/candidates'
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: location.pathname === '/dashboard/settings'
    }
  ];

  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              item.current
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNavigation;