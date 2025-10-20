import React from 'react';
import { TrendingUp, Users, Briefcase, Eye } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Job Posts',
      value: '12',
      change: '+2 this month',
      trend: 'up',
      icon: Briefcase,
  gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Total Applications',
      value: '248',
      change: '+18 this week',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Profile Views',
      value: '1,429',
      change: '+12% from last month',
      trend: 'up',
      icon: Eye,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Response Rate',
      value: '68%',
      change: '+5% improvement',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-blue-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className={`bg-gradient-to-r ${stat.gradient} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm opacity-90">{stat.title}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-blue-700 font-medium">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;