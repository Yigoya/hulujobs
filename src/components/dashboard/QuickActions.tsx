import React from 'react';
import { Plus, Search, BarChart3, Settings, FileText, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Post New Job',
      description: 'Create a new job posting',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.location.href = '/dashboard/post-job'
    },
    {
      title: 'View Applications',
      description: 'Review candidate applications',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Navigate to applications')
    },
    {
      title: 'Search Candidates',
      description: 'Find qualified candidates',
      icon: Search,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Navigate to candidate search')
    },
    {
      title: 'Analytics',
      description: 'View detailed reports',
      icon: BarChart3,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Navigate to analytics')
    },
    {
      title: 'Manage Profile',
      description: 'Update company profile',
      icon: Settings,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Navigate to profile settings')
    },
    {
      title: 'Reports',
      description: 'Generate hiring reports',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Navigate to reports')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} text-white p-4 rounded-lg transition-colors text-left group`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;