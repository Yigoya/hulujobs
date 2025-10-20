import React, { useState } from 'react';
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
  Clock,
  Target,
  Briefcase as BriefcaseIcon
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

interface JobCardProps {
  job: JobPosting;
  isSelected: boolean;
  onSelect: (jobId: number) => void;
  onAction: (jobId: number, action: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onSelect, onAction }) => {
  const [openMenu, setOpenMenu] = useState(false);

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

  const handleAction = (action: string) => {
    onAction(job.id, action);
    setOpenMenu(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(job.id)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            {getStatusIcon(job.status)}
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => handleAction('view')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleAction('edit')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Job</span>
                </button>
                <button
                  onClick={() => handleAction('duplicate')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Copy className="w-4 h-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => handleAction('toggle')}
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
                  onClick={() => handleAction('delete')}
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

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{job.category}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.jobLocation}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BriefcaseIcon className="w-4 h-4" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{job.level}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{job.applicationCount}</span>
            <span className="text-xs text-gray-500">applications</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">{job.views}</span>
            <span className="text-xs text-gray-500">views</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleAction('view')}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View
        </button>
        <button
          onClick={() => handleAction('edit')}
          className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default JobCard;