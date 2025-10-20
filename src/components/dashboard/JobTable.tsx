import React, { useState } from 'react';
import { 
  MoreVertical, 
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
  Clock,
  Edit
} from 'lucide-react';

interface JobPosting {
    id: number;
  title: string;
  jobLocation: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  status: 'active' | 'expired' | 'draft' | 'closed';
  applicationCount: number;
  views: number;
  postedDate: string;
  applicationDeadline: string;
  description: string;
  requirements: string;
  category: string;
  level: string;
}

interface JobTableProps {
  jobs: JobPosting[];
  selectedJobs: number[];
  onSelectJob: (jobId: number) => void;
  onSelectAll: () => void;
  onAction: (jobId: number, action: string) => void;
  onRowClick?: (jobId: number) => void;
}

const JobTable: React.FC<JobTableProps> = ({ 
  jobs, 
  selectedJobs, 
  onSelectJob, 
  onSelectAll, 
  onAction,
  onRowClick 
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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

  const handleAction = (jobId: number, action: string) => {
    onAction(jobId, action);
    setOpenMenuId(null);
  };

  const handleRowClick = (jobId: number, event: React.MouseEvent) => {
    // Prevent row click when clicking on interactive elements
    const target = event.target as HTMLElement;
    const isInteractiveElement = target.closest('input, button, [role="button"]');
    
    if (!isInteractiveElement && onRowClick) {
      onRowClick(jobId);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Details
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
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={(e) => handleRowClick(job.id, e)}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => onSelectJob(job.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.category}</div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{job.jobLocation}</span>
                    </div>
                    <span>{job.jobType}</span>
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
                {job.status && job.status.toLocaleLowerCase() === 'expired' && (
                  <div className="text-xs text-red-600 mt-1">
                    Expired {new Date(job.applicationDeadline).toLocaleDateString()}
                  </div>
                )}
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
                    onClick={() => handleAction(job.id, 'view')}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
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
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction(job.id, 'edit')}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleAction(job.id, 'duplicate')}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Duplicate</span>
                          </button>
                          <button
                            onClick={() => handleAction(job.id, 'toggle')}
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
                            onClick={() => handleAction(job.id, 'delete')}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
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
  );
};

export default JobTable;