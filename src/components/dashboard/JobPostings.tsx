import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MoreVertical, 
  Eye, 
  Edit3, 
  Copy, 
  Pause, 
  Play, 
  Trash2, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useCompanyJobs } from '../../hooks/jobs/useCompanyJobs';
import { CompanyJobResponse, JobPosting } from '../../types/type';
import JobViewModal from './JobViewModal';
import JobEditModal from './JobEditModal';

const JobPostings: React.FC = () => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  // const [jobs, setJobs] = useState<JobPosting[]>([
  //   {
  //     id: 1,
  //     title: 'Senior Software Engineer',
  //     department: 'Engineering',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '5,000,000 - 8,000,000 UGX',
  //     status: 'active',
  //     applications: 24,
  //     posted: '2024-01-15'
  //   },
  //   {
  //     id: 2,
  //     title: 'Product Manager',
  //     department: 'Product',
  //     location: 'Remote',
  //     type: 'Full-time',
  //     salary: '4,500,000 - 7,000,000 UGX',
  //     status: 'active',
  //     applications: 18,
  //     posted: '2024-01-12'
  //   },
  //   {
  //     id: 3,
  //     title: 'UX Designer',
  //     department: 'Design',
  //     location: 'Entebbe, Ethiopia',
  //     type: 'Full-time',
  //     salary: '3,500,000 - 5,500,000 UGX',
  //     status: 'closed',
  //     applications: 31,
  //     posted: '2024-01-08'
  //   },
  //   {
  //     id: 4,
  //     title: 'Marketing Specialist',
  //     department: 'Marketing',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Part-time',
  //     salary: '2,000,000 - 3,500,000 UGX',
  //     status: 'draft',
  //     applications: 0,
  //     posted: '2024-01-20'
  //   }
  // ]);

   // Pass filters to your data fetching hook
  
  const { data, isLoading } = useCompanyJobs("1") as { data: CompanyJobResponse, isLoading: boolean };
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
              <div className="h-5 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const jobs = data?.content || [];

  const handleViewApplications = (jobId: number) => {
    navigate(`/dashboard/applications/${jobId}`);
    setOpenMenuId(null);
  };

  const handleRowClick = (job: JobPosting, e: React.MouseEvent) => {
    // Prevent row click when clicking on buttons or dropdown
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.dropdown-menu')) {
      return;
    }
    setViewingJob(job);
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setOpenMenuId(null);
  };

  const handleSaveJob = (updatedJob: JobPosting) => {
    // This would typically call an API to update the job
    console.log('Saving job edit:', updatedJob);
    setEditingJob(null);
    // In a real app, you would refetch the data or update the local state
  };

  const handleDuplicateJob = (job: JobPosting) => {
    // This would typically call an API to duplicate the job
    console.log('Duplicating job:', job.title);
    setOpenMenuId(null);
  };

  const handleToggleStatus = (jobId: number) => {
    // This would typically call an API to update job status
    console.log('Toggling status for job:', jobId);
    setOpenMenuId(null);
  };

  const handleDeleteJob = (jobId: number) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      // This would typically call an API to delete the job
      console.log('Deleting job:', jobId);
    }
    setOpenMenuId(null);
  };

  const getStatusIcon = (status: string) => {
      switch (status.toLocaleLowerCase()) {
        case 'active':
          return <CheckCircle className="w-4 h-4 text-green-600" />;
        case 'expired':
          return <XCircle className="w-4 h-4 text-red-600" />;
        case 'draft':
          return <Clock className="w-4 h-4 text-yellow-600" />;
        case 'closed':
          return <Pause className="w-4 h-4 text-gray-600" />;
        default:
          return null;
      }
    };
  
    const getStatusColor = (status: string) => {
      switch (status.toLocaleLowerCase()) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'expired':
          return 'bg-red-100 text-red-800';
        case 'draft':
          return 'bg-yellow-100 text-yellow-800';
        case 'closed':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Job Postings</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <a href="/dashboard/post-job">Post New Job</a>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr 
                key={job.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleRowClick(job, e)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.category}</div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{job.jobLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(job.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">{job.applicationCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleViewApplications(job.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Applications
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {openMenuId === job.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 dropdown-menu">
                          <div className="py-1">
                            <button
                              onClick={() => handleEditJob(job)}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Edit3 className="w-4 h-4" />
                              <span>Edit Job</span>
                            </button>
                            <button
                              onClick={() => handleViewApplications(job.id)}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Applications</span>
                            </button>
                            <button
                              onClick={() => handleDuplicateJob(job)}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Duplicate Job</span>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(job.id)}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              {job.status === 'active' ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  <span>Close Job</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" />
                                  <span>Reopen Job</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete Job</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Job View Modal */}
      <JobViewModal
        job={viewingJob}
        isOpen={!!viewingJob}
        onClose={() => setViewingJob(null)}
        onEdit={(job) => {
          setViewingJob(null);
          handleEditJob(job);
        }}
      />

      {/* Job Edit Modal */}
      <JobEditModal
        job={editingJob}
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleSaveJob}
      />
    </div>
  );
};

export default JobPostings;