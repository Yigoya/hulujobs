import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import ApplicationDetailModal from '../../components/modals/ApplicationDetailModal';
import { useApplications } from '../../hooks/applications/useApplications';
import { Pageable, Sort, Application } from '../../types/type';

export interface CompanySavedApplicationsResponse {
  length: number;
  content: Application[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}

const DashboardApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Mock applications data
  // const applications: Application[] = [
  //   {
  //     id: 1,
  //     candidateName: 'Sarah Johnson',
  //     email: 'sarah.johnson@email.com',
  //     phone: '+256 700 123 456',
  //     jobTitle: 'Senior Software Engineer',
  //     appliedDate: '2024-01-18',
  //     status: 'shortlisted',
  //     experience: '5+ years',
  //     location: 'Kampala, Ethiopia',
  //     avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/sarah-johnson.pdf',
  //     coverLetter: 'I am excited to apply for the Senior Software Engineer position...',
  //     rating: 4
  //   },
  //   {
  //     id: 2,
  //     candidateName: 'Michael Chen',
  //     email: 'michael.chen@email.com',
  //     phone: '+256 701 234 567',
  //     jobTitle: 'Product Manager',
  //     appliedDate: '2024-01-16',
  //     status: 'reviewed',
  //     experience: '3-5 years',
  //     location: 'Entebbe, Ethiopia',
  //     avatar: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/michael-chen.pdf',
  //     coverLetter: 'With my background in product management...',
  //     rating: 5
  //   },
  //   {
  //     id: 3,
  //     candidateName: 'Grace Nakamura',
  //     email: 'grace.nakamura@email.com',
  //     phone: '+256 702 345 678',
  //     jobTitle: 'UX Designer',
  //     appliedDate: '2024-01-14',
  //     status: 'pending',
  //     experience: '2-3 years',
  //     location: 'Kampala, Ethiopia',
  //     avatar: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/grace-nakamura.pdf',
  //     coverLetter: 'I am passionate about creating user-centered designs...'
  //   },
  //   {
  //     id: 4,
  //     candidateName: 'David Musoke',
  //     email: 'david.musoke@email.com',
  //     phone: '+256 703 456 789',
  //     jobTitle: 'Marketing Specialist',
  //     appliedDate: '2024-01-12',
  //     status: 'rejected',
  //     experience: '1-2 years',
  //     location: 'Jinja, Ethiopia',
  //     avatar: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/david-musoke.pdf',
  //     coverLetter: 'I am eager to contribute to your marketing team...'
  //   }
  // ];

  const companyId = '1'; // Replace with actual company ID

  const { data, isLoading } = useApplications(companyId) as { data: CompanySavedApplicationsResponse, isLoading: boolean };
  if (isLoading) return null;  

  if (!data || data.length === 0) return <div>No applications found.</div>;

  const applications = data.content || [];

  console.log("Application - data: ", applications);



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'reviewed':
        return <Eye className="w-4 h-4 text-blue-600" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'hired':
        return <Star className="w-4 h-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateApplicationStatus = (applicationId: number, newStatus: Application['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating application ${applicationId} to status: ${newStatus}`);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Applications
          </h1>
          <p className="text-gray-600">
            Review and manage candidate applications for your job postings
          </p>
        </div>

        {/* Navigation */}
        <DashboardNavigation />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Applications ({filteredApplications.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => {
              return (
                <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={application.avatar}
                        alt={application.candidateName}
                        className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.candidateName}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">{application.jobTitle}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{application.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{application.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{application.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="capitalize">{application.status}</span>
                          </div>
                          <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            <span className="text-gray-600 italic pr-2"> Applied for:</span>
                            {application.jobTitle}
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>

                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Resume</span>
                      </a>

                      <select
                        value={application.status}
                        onChange={(e) => updateApplicationStatus(application.id, e.target.value as Application['status'])}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Detail Modal */}
        <ApplicationDetailModal
          application={selectedApplication}
          isOpen={!!selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      </div>
    </div>
  );
};

export default DashboardApplicationsPage;