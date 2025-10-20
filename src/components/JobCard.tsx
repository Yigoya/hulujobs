import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, ExternalLink, Eye, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, AlertCircle, X } from 'lucide-react';
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

    const { data: savedJobs, isLoading: isLoadingSavedJobs } = useUserSavedJobs(user?.id || '') as {data: userSavedJobsResponse, isLoading: boolean};
  
  // Update isSaved state based on savedJobs data
  useEffect(() => {
    if (!isLoadingSavedJobs && savedJobs?.content) {
      const savedJobIds = savedJobs.content.map(savedJob => savedJob.id);
      setIsSaved(savedJobIds.includes(job.id));
    }
  }, [savedJobs, job.id, isLoadingSavedJobs]);

  const truncateDescription = (text: string, maxLines: number = 3) => {
    const words = text.split(' ');
    const wordsPerLine = 15; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) {
      return text;
    }
    
    return words.slice(0, maxWords).join(' ') + '...';
  };

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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 hover:border-blue-200">
      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="relative">
        {/* Company Logo and Save Button - Top Right */}
        <div className="absolute top-0 right-0 flex items-center space-x-2">
          <button
            onClick={handleSaveJob}
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
          <Link to={`/company/${encodeURIComponent(job.companyName)}`}>
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-12 h-12 rounded-lg object-cover hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Job Content */}
        <div className="pr-20">
          {/* Job Title and Company */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
            {job.title}
          </h3>
          <Link 
            to={`/company/${encodeURIComponent(job.companyName)}`}
            className="text-gray-600 font-medium mb-3 block hover:text-blue-600 transition-colors"
          >
            {job.companyName}
          </Link>

          {/* Job Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{job.jobLocation}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm">{formatTimeAgo(job.postedDate)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <span className="text-sm">{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(job.jobType)}`}>
              {job.jobType}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${job.level ? getLevelColor(job.level) : getLevelColor('level')}`}>
              {job.level ? job.level : 'level'}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {formatTimeAgo(job.postedDate)}
            </span>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {showFullDescription ? job.description : truncateDescription(job.description)}
            </p>
            {job.description.split(' ').length > 45 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center space-x-1"
              >
                <span>{showFullDescription ? 'See less' : 'See more'}</span>
                {showFullDescription ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Action Buttons - Bottom Left */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowApplicationModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <Link
              to={`/job/${job.id}`}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium"
            >
              <Eye className="w-4 h-4" />
              <span>View Job</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </div>
  );
};

export default JobCard;