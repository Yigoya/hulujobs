import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  ArrowLeft, 
  Building, 
  Users, 
  Globe,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import RelatedJobs from '../components/RelatedJobs';
import CompanyProfile from '../components/CompanyProfile';
import JobApplicationModal from '../components/modals/JobApplicationModal';
import { useJob } from '../hooks/jobs/useJob';
import { formatTimeAgo } from '../utils/formatTimeAgo';

type Job = {
  id: number;
  title: string;
  companyName: string;
  companyLocation: string;
  jobLocation: string;
  jobType: string;
  postedDate: string;
  companyLogo: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  level: string | null;
  applicationDeadline: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
};

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const [showApplicationModal, setShowApplicationModal] = React.useState(false);

  const { data: job, isLoading } = useJob(id) as { data: Job, isLoading: boolean };
  if (isLoading) return null;  
  console.log("data", job);

  // Mock job data - in real app, this would come from API
//   const job = {
//     id: parseInt(id || '1'),
//     title: 'Senior Software Engineer',
//     company: 'TechCorp Ethiopia',
//     location: 'Kampala, Ethiopia',
//     type: 'Full-time',
//     salary: '5,000,000 - 8,000,000 UGX',
//     logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
//     tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
//     posted: '2 days ago',
//     level: 'Senior',
//     description: `We are looking for a Senior Software Engineer to join our dynamic team at TechCorp Ethiopia. You will be responsible for developing scalable web applications using modern technologies like React, Node.js, and TypeScript. 

// The ideal candidate should have strong problem-solving skills and experience with cloud platforms. You will work closely with our product team to deliver high-quality software solutions that impact thousands of users across East Africa.

// This is an excellent opportunity to work with cutting-edge technologies while contributing to meaningful projects that drive digital transformation in Ethiopia.`,
    
//     responsibilities: [
//       'Design and develop scalable web applications using React and Node.js',
//       'Collaborate with cross-functional teams to define and implement new features',
//       'Write clean, maintainable, and well-documented code',
//       'Participate in code reviews and mentor junior developers',
//       'Optimize applications for maximum speed and scalability',
//       'Stay up-to-date with emerging technologies and industry trends'
//     ],
    
//     qualifications: [
//       'Bachelor\'s degree in Computer Science or related field',
//       '5+ years of experience in software development',
//       'Strong proficiency in JavaScript, React, and Node.js',
//       'Experience with TypeScript and modern development tools',
//       'Knowledge of cloud platforms (AWS, Azure, or GCP)',
//       'Experience with database design and optimization',
//       'Strong problem-solving and communication skills',
//       'Experience with Agile development methodologies'
//     ],
    
//     benefits: [
//       'Competitive salary and performance bonuses',
//       'Health insurance coverage',
//       'Professional development opportunities',
//       'Flexible working hours',
//       'Remote work options',
//       'Annual leave and sick leave',
//       'Team building activities and events'
//     ],
    
//     applicationDeadline: '2024-02-15',
//     contactEmail: 'careers@techcorp.ug',
//     contactPhone: '+256 700 123 456',
//     applicationUrl: 'https://techcorp.ug/careers/apply'
//   };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full_time':
        return 'bg-green-100 text-green-800';
      case 'full-time':
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/jobs" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Job Search</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <h2 className="text-xl text-blue-600 font-semibold mb-4">{job.companyName}</h2>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{job.jobLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>Posted {formatTimeAgo(job.postedDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-5 h-5" />
                      <span>{job.salaryMin} - {job.salaryMax} {job.salaryCurrency}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.jobType)}`}>
                      {job.jobType}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(job.level || '')}`}>
                      {job.level || 'N/A'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                      {formatTimeAgo(job.postedDate)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Tags are not directly available in the Job type, so this will be empty */}
                    {/* {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))} */}
                  </div>
                </div>
              </div>

              {/* Top Apply Button */}
              <div className="flex justify-center md:justify-end mt-6">
                <button 
                  onClick={() => setShowApplicationModal(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h3>
              <div className="prose prose-gray max-w-none">
                {job.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Qualifications */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Required Qualifications</h3>
              <ul className="space-y-3">
                {job.qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{qualification}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Application Deadline</p>
                    <p className="text-gray-600">{job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600 text-sm">{job.contactEmail || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600 text-sm">{job.contactPhone || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowApplicationModal(true)}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Apply Now</span>
                  </button>
                  
                  <a 
                    href={`mailto:${job.contactEmail || ''}?subject=Application for ${job.title}`}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Application</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Profile Preview */}
            <CompanyProfile company={job.companyName} />
            
            {/* Related Jobs */}
            <RelatedJobs currentJobId={job.id} />
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

export default JobDetailPage;