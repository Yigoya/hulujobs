import React, { useState } from 'react';
import { X, User, Upload, FileText, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../hooks/users/useUser';
import { userProfileData } from '../../pages/ProfilePage';

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
}


interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const { user } = useAuth();
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: userProfile, isLoading } = useUser(user?.id || '') as {data: userProfileData, isLoading: boolean};
  if (isLoading) {
    return null;
  }
  
  // Check if user has complete profile based on resumeUrl and phone
  const hasResumeUrl = userProfile?.resumeUrl && userProfile.resumeUrl.trim() !== '';
  const hasPhoneNumber = userProfile?.phone && userProfile.phone.trim() !== '';
  const hasCompleteProfile = user && user.role === 'jobseeker' && hasResumeUrl && hasPhoneNumber;
  const profileCompletion = hasCompleteProfile ? 100 : user ? 60 : 0;

  if (!isOpen || !job) return null;

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto close after success
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const renderModalContent = () => {
    // Success State
    if (isSubmitted) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Your application for <strong>{job.title}</strong> at <strong>{job.companyName}</strong> has been successfully submitted.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly and we'll notify you of any updates.
          </p>
        </div>
      );
    }

    // 1. New User (Not Signed In)
    if (!user) {
      return (
        <div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Apply</h3>
            <p className="text-gray-600">
              Create an account or sign in to apply for this position
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Applying for:</h4>
            <div className="flex items-center space-x-3">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{job.title}</p>
                <p className="text-gray-600">{job.companyName}</p>
                <p className="text-sm text-gray-500">{job.jobLocation} • {job.jobType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/signup?type=jobseeker"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block"
              onClick={onClose}
            >
              Create Account & Apply
            </Link>
            <Link
              to="/login?type=jobseeker"
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center block"
              onClick={onClose}
            >
              Sign In to Apply
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      );
    }

    // 2. Signed-In User with Incomplete Profile
    if (!hasCompleteProfile) {
      return (
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user.name}!
            </h3>
            <p className="text-gray-600">
              Complete your profile to apply for this position
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Applying for:</h4>
            <div className="flex items-center space-x-3">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{job.title}</p>
                <p className="text-gray-600">{job.companyName}</p>
                <p className="text-sm text-gray-500">{job.jobLocation} • {job.jobType}</p>
              </div>
            </div>
          </div>

          {/* Profile Completion Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm text-gray-500">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>

          {/* Missing Information */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-orange-900 mb-3">Complete these to apply:</h4>
            <ul className="space-y-2 text-sm">
              {!hasResumeUrl && (
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-800">Upload your CV/Resume</span>
                </li>
              )}
              {!hasPhoneNumber && (
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-800">Add your phone number</span>
                </li>
              )}
              {hasResumeUrl && hasPhoneNumber && (
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">Profile is complete!</span>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <Link
              to="/profile"
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-center block flex items-center justify-center space-x-2"
              onClick={onClose}
            >
              <span>Complete Profile to Apply</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Maybe Later
            </button>
          </div>
        </div>
      );
    }

    // 3. Full Profile User - Application Form
    return (
      <div>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for Position</h3>
          <p className="text-gray-600">
            Submit your application for this role
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
              <p className="text-gray-600 font-medium">{job.companyName}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{job.jobLocation}</span>
                <span>•</span>
                <span>{job.jobType}</span>
                <span>•</span>
                <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="space-y-6">
          {/* CV Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Your CV/Resume</h4>
                <p className="text-blue-700 text-sm">
                  {userProfile?.resumeUrl ? 
                    userProfile.resumeUrl.split('/').pop() || 'Resume.pdf' : 
                    'No resume uploaded'
                  }
                </p>
              </div>
              <Link
                to="/profile"
                className="ml-auto text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Update
              </Link>
            </div>
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message to Employer (Optional)
            </label>
            <textarea
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell the employer why you're interested in this role and what makes you a great fit..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {applicationMessage.length}/500 characters
            </p>
          </div>

          {/* Application Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Application Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Applicant:</span>
                <span className="font-medium">
                  {userProfile?.firstName && userProfile?.lastName ? 
                    `${userProfile.firstName} ${userProfile.lastName}` : 
                    user.name
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{userProfile?.email || user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{userProfile?.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CV Attached:</span>
                <span className={`font-medium ${hasResumeUrl ? 'text-green-600' : 'text-red-600'}`}>
                  {hasResumeUrl ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSubmitApplication}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By submitting this application, you agree to share your profile information with {job.companyName}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.companyName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;