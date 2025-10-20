import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Settings, 
  User, 
  Briefcase, 
  MessageSquare,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';

interface Notification {
  id: number;
  type: 'application' | 'message' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const DashboardNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      message: 'Sarah Johnson applied for Senior Software Engineer position',
      time: '2 hours ago',
      read: false,
      actionUrl: '/dashboard/applications'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Michael Chen sent you a message regarding the Product Manager role',
      time: '4 hours ago',
      read: false,
      actionUrl: '/dashboard/messages'
    },
    {
      id: 3,
      type: 'system',
      title: 'Job Post Approved',
      message: 'Your job posting "UX Designer" has been approved and is now live',
      time: '1 day ago',
      read: true,
      actionUrl: '/dashboard/jobs'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Interview Reminder',
      message: 'You have an interview scheduled with Grace Nakamura tomorrow at 2:00 PM',
      time: '1 day ago',
      read: false,
      actionUrl: '/dashboard/calendar'
    },
    {
      id: 5,
      type: 'application',
      title: 'Application Status Update',
      message: 'David Musoke\'s application status was updated to "Shortlisted"',
      time: '2 days ago',
      read: true,
      actionUrl: '/dashboard/applications'
    },
    {
      id: 6,
      type: 'system',
      title: 'Subscription Renewal',
      message: 'Your premium subscription will expire in 7 days. Renew now to continue enjoying all features.',
      time: '3 days ago',
      read: false,
      actionUrl: '/dashboard/billing'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'application' | 'message' | 'system' | 'reminder'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-600" />;
      case 'system':
        return <Info className="w-5 h-5 text-purple-600" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'application':
        return 'bg-blue-100';
      case 'message':
        return 'bg-green-100';
      case 'system':
        return 'bg-purple-100';
      case 'reminder':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                Stay updated with your job postings and applications
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <DashboardNavigation />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'application', label: 'Applications', count: notifications.filter(n => n.type === 'application').length },
              { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
              { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
              { key: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{filterOption.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  filter === filterOption.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {filterOption.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {filter === 'all' ? 'All Notifications' : 
               filter === 'unread' ? 'Unread Notifications' :
               `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notifications`}
              ({filteredNotifications.length})
            </h2>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! Check back later for new updates.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${getNotificationBgColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {notification.actionUrl && (
                    <div className="mt-3 ml-12">
                      <a
                        href={notification.actionUrl}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <span>View Details</span>
                        <AlertCircle className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNotificationsPage;