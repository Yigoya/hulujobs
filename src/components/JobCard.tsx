import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Bookmark, BookmarkCheck, AlertCircle, X } from 'lucide-react';
import JobApplicationModal from './modals/JobApplicationModal';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { useSaveJob } from '../hooks/useSaveJob';
import { useAuth } from '../contexts/AuthContext';
import { useUserSavedJobs } from '../hooks/users/useUserSavedJobs';
import { userSavedJobsResponse } from '../pages/ProfilePage';


interface Job {
  id: number;
  title: string;
  companyName: string;
  jobLocation: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  companyLogo: string;
  description: string;
  tags: string[];
  postedDate: string;
  level: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { saveJob, unsaveJob, isLoading } = useSaveJob();

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSaveJob = () => {
    if (!user) {
      setError('Please sign in to save jobs');
      return;
    }

    setError(null);
    
    if (isSaved) {
      unsaveJob(
        { userId: user.id, jobId: job.id },
        {
          onSuccess: () => {
            setIsSaved(false);
          },
          onError: (error: any) => {
            setError('Failed to remove job from saved list');
            console.error('Unsave job error:', error);
          },
        }
      );
    } else {
      saveJob(
        { userId: user.id, jobId: job.id },
        {
          onSuccess: () => {
            setIsSaved(true);
          },
          onError: (error: any) => {
            setError('Failed to save job');
            console.error('Save job error:', error);
          },
        }
      );
    }
  };

  // Only fetch saved jobs if user is logged in
  const { data: savedJobs, isLoading: isLoadingSavedJobs } = useUserSavedJobs(user?.id || '', { enabled: !!user }) as {data: userSavedJobsResponse, isLoading: boolean};
  
  // Update isSaved state based on savedJobs data
  useEffect(() => {
    if (user && !isLoadingSavedJobs && savedJobs?.content) {
      const savedJobIds = savedJobs.content.map(savedJob => savedJob.id);
      setIsSaved(savedJobIds.includes(job.id));
    }
  }, [savedJobs, job.id, isLoadingSavedJobs, user]);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full_time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'remote':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'senior':
        return 'bg-red-100 text-red-800';
      case 'mid':
        return 'bg-blue-100 text-blue-800';
      case 'junior':
        return 'bg-green-100 text-green-800';
      case 'level':
        return 'bg-red-100 text-red-800';  
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 border border-gray-100 hover:border-blue-200 cursor-pointer">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setError(null);
              }}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="flex gap-4">
          {/* Company Logo - Left Side */}
          <div className="flex-shrink-0">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%239ca3af"%3E' + job.companyName.charAt(0).toUpperCase() + '%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">{job.companyName.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Job Content */}
          <div className="flex-1 min-w-0">
            {/* Job Title and Company */}
            <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium mb-2 truncate">
              {job.companyName}
            </p>

            {/* Job Meta Information - Single Line */}
            <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="truncate">{job.jobLocation}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <DollarSign className="w-3 h-3 text-orange-600 flex-shrink-0" />
                <span className="whitespace-nowrap">{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeColor(job.jobType)}`}>
                {job.jobType}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.level ? getLevelColor(job.level) : getLevelColor('level')}`}>
                {job.level ? job.level : 'level'}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(job.postedDate)}
              </span>
            </div>

            {/* Job Description - 2 Lines */}
            <div className="mb-3">
              <p className={`text-gray-700 text-sm ${!showFullDescription ? 'line-clamp-2' : ''}`}>
                {job.description}
              </p>
              {job.description.split(' ').length > 30 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFullDescription(!showFullDescription);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          </div>

          {/* Save Button - Right Side */}
          <div className="flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSaveJob();
              }}
              disabled={isLoading}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isSaved 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={
                isLoading 
                  ? 'Processing...' 
                  : isSaved 
                    ? 'Remove from saved jobs' 
                    : 'Save this job'
              }
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isSaved ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </Link>
  );
};

export default JobCard;