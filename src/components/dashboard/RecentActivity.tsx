import React from 'react';
import { Clock, User, Briefcase, Eye, MessageSquare } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'application',
      message: 'New application for Senior Developer position',
      user: 'Sarah Johnson',
      time: '2 hours ago',
      icon: User,
  color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'view',
      message: 'Job post "Marketing Manager" was viewed 15 times',
      time: '4 hours ago',
      icon: Eye,
  color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'job',
      message: 'Job post "Data Analyst" was published',
      time: '1 day ago',
      icon: Briefcase,
  color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from candidate John Doe',
      time: '2 days ago',
      icon: MessageSquare,
  color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 5,
      type: 'application',
      message: 'Application status updated for Project Manager',
      user: 'Michael Chen',
      time: '3 days ago',
      icon: User,
  color: 'text-blue-600 bg-blue-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`p-2 rounded-full ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium">{activity.message}</p>
              {activity.user && (
                <p className="text-gray-600 text-sm">by {activity.user}</p>
              )}
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;