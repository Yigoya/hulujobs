import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload, 
  Download, 
  Eye, 
  Bookmark, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Edit3,
  Camera,
  FileText,
  Star,
  Building,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import DashboardNavigation from '../components/dashboard/DashboardNavigation';
import { useUser } from '../hooks/users/useUser';
import { useUserSavedJobs } from '../hooks/users/useUserSavedJobs';
import { useUpdateProfile } from '../hooks/users/useUpdateProfile';
import { Job, Pageable, Sort } from '../types/type';
import JobApplicationModal from '../components/modals/JobApplicationModal';


  //userProfileData
export interface userProfileData  {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  bio: string;
  experience: string;
  education: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  resumeUrl?: string;
};


export interface userSavedJobsResponse {
  content: Job[];
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

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    experience: '',
    education: '',
    skills: [] as string[],
    linkedin: '',
    github: ''
  });

  const { data: userProfile, isLoading } = useUser(user?.id || '') as {data: userProfileData, isLoading: boolean};
  const { 
    updateProfile, 
    isUpdating, 
    updateError, 
    isSuccess,
    uploadResume,
    isUploadingResume,
    uploadResumeError,
    isResumeUploadSuccess
  } = useUpdateProfile();
 
  
  // Initialize profileData with userProfile data when it becomes available
  useEffect(() => {
    if (userProfile && !isEditingProfile) {
      setProfileData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        title: userProfile.title || '',
        bio: userProfile.bio || '',
        experience: userProfile.experience || '',
        education: userProfile.education || '',
        skills: userProfile.skills || [],
        linkedin: userProfile.linkedin || '',
        github: userProfile.github || ''
      });
    }
  }, [userProfile, isEditingProfile]);


  console.log("data from useUser:", userProfile);

  const { data, isLoading: isLoadingSavedJobs } = useUserSavedJobs(user?.id || '') as {data: userSavedJobsResponse, isLoading: boolean};


   if (isLoading) {
    return null;
  }
  if (isLoadingSavedJobs) {
    return null;
  }


  const savedJobs = data.content || [];

  // Mock data for saved jobs
  // const savedJobs = [
  //   {
  //     id: 1,
  //     title: 'Senior Frontend Developer',
  //     company: 'TechCorp Ethiopia',
  //     location: 'Kampala, Ethiopia',
  //     salary: '6,000,000 - 9,000,000 UGX',
  //     type: 'Full-time',
  //     logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  //     savedDate: '2024-01-15',
  //     tags: ['React', 'TypeScript', 'Next.js']
  //   },
  //   {
  //     id: 2,
  //     title: 'Full Stack Developer',
  //     company: 'Innovation Hub',
  //     location: 'Entebbe, Ethiopia',
  //     salary: '4,500,000 - 7,000,000 UGX',
  //     type: 'Full-time',
  //     logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  //     savedDate: '2024-01-12',
  //     tags: ['Node.js', 'React', 'MongoDB']
  //   },
  //   {
  //     id: 3,
  //     title: 'DevOps Engineer',
  //     company: 'CloudTech Solutions',
  //     location: 'Remote',
  //     salary: '5,500,000 - 8,500,000 UGX',
  //     type: 'Remote',
  //     logo: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  //     savedDate: '2024-01-10',
  //     tags: ['AWS', 'Docker', 'Kubernetes']
  //   }
  // ];

  // Mock data for applied jobs
  const appliedJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Ethiopia',
      location: 'Kampala, Ethiopia',
      salary: '5,000,000 - 8,000,000 UGX',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      appliedDate: '2024-01-18',
      status: 'interview',
      statusText: 'Interview Scheduled',
      nextStep: 'Technical interview on Jan 25, 2024',
      tags: ['React', 'Node.js', 'TypeScript']
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Digital Innovations',
      location: 'Kampala, Ethiopia',
      salary: '4,000,000 - 6,500,000 UGX',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      appliedDate: '2024-01-16',
      status: 'under_review',
      statusText: 'Under Review',
      nextStep: 'Application being reviewed by hiring team',
      tags: ['Product Management', 'Strategy', 'Analytics']
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Creative Agency',
      location: 'Kampala, Ethiopia',
      salary: '3,000,000 - 5,000,000 UGX',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      appliedDate: '2024-01-14',
      status: 'rejected',
      statusText: 'Not Selected',
      nextStep: 'Thank you for your interest. We encourage you to apply for future openings.',
      tags: ['UI/UX', 'Figma', 'Design Systems']
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'StartupTech',
      location: 'Remote',
      salary: '4,500,000 - 7,000,000 UGX',
      type: 'Remote',
      logo: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      appliedDate: '2024-01-12',
      status: 'applied',
      statusText: 'Application Submitted',
      nextStep: 'Your application has been received and is in queue for review',
      tags: ['Python', 'Django', 'PostgreSQL']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'under_review':
        return <Eye className="w-5 h-5 text-yellow-600" />;
      case 'interview':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      console.error('User ID is required to update profile');
      return;
    }

    updateProfile({
      userId: user.id,
      profileData: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        title: profileData.title,
        bio: profileData.bio,
        experience: profileData.experience,
        education: profileData.education,
        skills: profileData.skills,
        linkedin: profileData.linkedin,
        github: profileData.github,
        resumeUrl: userProfile?.resumeUrl // Keep existing resume URL
      }
    }, {
      onSuccess: () => {
        setIsEditingProfile(false);
        console.log('Profile updated successfully');
      },
      onError: (error: any) => {
        console.error('Failed to update profile:', error);
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleResumeUpload = () => {
    if (!selectedFile || !user?.id) {
      console.error('File and user ID are required');
      return;
    }

    uploadResume({
      userId: user.id,
      file: selectedFile
    }, {
      onSuccess: (data: any) => {
        setSelectedFile(null);
        console.log('Resume uploaded successfully:', data);
        // The hook will automatically invalidate and refetch user data
      },
      onError: (error: any) => {
        console.error('Failed to upload resume:', error);
      }
    });
  };

  const handleApplyForJob = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'resume', label: 'Resume/CV', icon: FileText },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
    { id: 'applied', label: 'Applied Jobs', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Job Seeker Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {userProfile?.firstName || 'User'}!</p>
                <p className="text-sm text-gray-500">{userProfile?.title || 'No title specified'}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Bookmark className="w-4 h-4" />
                  <span>{savedJobs.length} Saved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{appliedJobs.length} Applied</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <DashboardNavigation />

        {/* Profile Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {updateError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-700 text-sm">
                          Failed to update profile. Please try again.
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {isSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 text-sm">
                          Profile updated successfully!
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={profileData.title}
                        onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isUpdating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{userProfile?.firstName || ''} {userProfile?.lastName || ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{userProfile?.email || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{userProfile?.phone || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{userProfile?.location || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Current Title</p>
                          <p className="font-medium">{userProfile?.title || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="font-medium">{userProfile?.experience || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Bio</p>
                    <p className="text-gray-700 leading-relaxed">{userProfile?.bio || 'No bio provided'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {(userProfile?.skills || []).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {(!userProfile?.skills || userProfile.skills.length === 0) && (
                        <span className="text-gray-500 text-sm">No skills added yet</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resume/CV Tab */}
          {activeTab === 'resume' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume/CV Management</h2>
              
              {/* Resume Upload Error/Success Messages */}
              {uploadResumeError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 text-sm">
                      Failed to upload resume. Please try again.
                    </span>
                  </div>
                </div>
              )}
              
              {isResumeUploadSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 text-sm">
                      Resume uploaded successfully!
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume/CV</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
                  
                  {selectedFile && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">
                        Selected: {selectedFile.name}
                      </p>
                      <p className="text-xs text-blue-600">
                        Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                    >
                      {selectedFile ? 'Choose Different File' : 'Choose File'}
                    </label>
                    
                    {selectedFile && (
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={handleResumeUpload}
                          disabled={isUploadingResume}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {isUploadingResume ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="sr-only">Uploading</span>
                            </>
                          ) : (
                            <span>Upload Resume</span>
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedFile(null)}
                          disabled={isUploadingResume}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                {/* Current Resume */}
                {(userProfile?.resumeUrl || selectedFile) && (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {selectedFile ? selectedFile.name : 
                             userProfile?.resumeUrl ? 
                             userProfile.resumeUrl.split('/').pop() || 'Resume.pdf' : 
                             'No resume'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {selectedFile ? 
                              `Selected • ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` :
                              userProfile?.resumeUrl ? 
                              'Previously uploaded' : 
                              'No file selected'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {userProfile?.resumeUrl && (
                          <>
                            <a
                              href={userProfile.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Preview</span>
                            </a>
                                                        
                            <a
                              href={userProfile.resumeUrl}
                              download
                              className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </a>
                          </>
                        )}
                        {selectedFile && (
                          <button 
                            onClick={() => setSelectedFile(null)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!userProfile?.resumeUrl && !selectedFile && (
                  <div className="border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="font-medium">No resume uploaded yet</p>
                      <p className="text-sm">Upload your resume using the section above</p>
                    </div>
                  </div>
                )}

                {/* Resume Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Resume Tips</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Keep your resume to 1-2 pages maximum</li>
                    <li>• Use a clean, professional format</li>
                    <li>• Include relevant keywords from job descriptions</li>
                    <li>• Quantify your achievements with numbers and metrics</li>
                    <li>• Proofread for spelling and grammar errors</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === 'saved' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {data.totalElements} jobs saved
                </span>
              </div>

              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/job/${job.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {job.title}
                          </Link>
                          <p className="text-gray-600 mb-2">{job.companyName}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.jobLocation}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {job.jobType}
                            </span>
                          </div>
                          {/* <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div> */}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <p className="text-xs text-gray-500">Saved on {new Date(job.postedDate).toLocaleDateString()}</p>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleApplyForJob(job)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Apply Now
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-2">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applied Jobs Tab */}
          {activeTab === 'applied' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Applied Jobs</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {appliedJobs.length} applications
                </span>
              </div>

              <div className="space-y-6">
                {appliedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/job/${job.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {job.title}
                          </Link>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {job.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-2">Applied on {new Date(job.appliedDate).toLocaleDateString()}</p>
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span>{job.statusText}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Application Status</h4>
                      <p className="text-sm text-gray-600">{job.nextStep}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Application Statistics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {appliedJobs.filter(job => job.status === 'applied').length}
                  </div>
                  <div className="text-sm text-blue-800">Submitted</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {appliedJobs.filter(job => job.status === 'under_review').length}
                  </div>
                  <div className="text-sm text-yellow-800">Under Review</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {appliedJobs.filter(job => job.status === 'interview').length}
                  </div>
                  <div className="text-sm text-green-800">Interviews</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {appliedJobs.filter(job => job.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-red-800">Not Selected</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={showApplicationModal}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;