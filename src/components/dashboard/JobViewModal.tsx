import React from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  X, 
  Edit3, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Target,
  Briefcase as BriefcaseIcon,
  CheckCircle,
  XCircle,
  Clock,
  Pause
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

interface JobViewModalProps {
  job: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (job: JobPosting) => void;
}

const JobViewModal: React.FC<JobViewModalProps> = ({ job, isOpen, onClose, onEdit }) => {
  if (!isOpen || !job) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'draft':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'closed':
        return <Pause className="w-5 h-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{job.category}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.jobLocation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BriefcaseIcon className="w-4 h-4" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{job.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                  {getStatusIcon(job.status)}
                  <span className="capitalize">{job.status}</span>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.category}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{job.applicationCount}</div>
                <div className="text-sm text-blue-800">Applications</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{job.views}</div>
                <div className="text-sm text-green-800">Views</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round((job.applicationCount / job.views) * 100) || 0}%</div>
                <div className="text-sm text-purple-800">Conversion Rate</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
              <div className="prose prose-gray max-w-none bg-gray-50 rounded-lg p-6">
                <ReactMarkdown>{job.description}</ReactMarkdown>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements & Qualifications</h3>
              <div className="prose prose-gray max-w-none bg-gray-50 rounded-lg p-6">
                <ReactMarkdown>{job.requirements}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <p className="font-medium">{job.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Posted Date:</span>
                  <p className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Application Deadline:</span>
                  <p className="font-medium">{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Job ID:</span>
                  <p className="font-medium">#{job.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>Close</span>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onClose();
                  onEdit(job);
                }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Job</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Users className="w-4 h-4" />
                <span>View Applications</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobViewModal;