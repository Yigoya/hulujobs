import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Target,
  Building,
  FileText
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

interface JobEditModalProps {
  job: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedJob: JobPosting) => void;
}

const JobEditModal: React.FC<JobEditModalProps> = ({ job, isOpen, onClose, onSave }) => {
  const defaultJob: JobPosting = {
    id: 0,
    title: '',
    jobLocation: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: '',
    status: 'draft',
    applicationCount: 0,
    views: 0,
    postedDate: new Date().toISOString().split('T')[0],
    applicationDeadline: '',
    description: '',
    requirements: '',
    category: '',
    level: ''
  };

  const [formData, setFormData] = useState<JobPosting>(job || defaultJob);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    setFormData(job || defaultJob);
  }, [job]);

  const categories = [
    'Information Technology & Software',
    'Engineering & Technical Fields',
    'Accounting, Finance & Banking',
    'Business & Management',
    'Marketing, Sales & Retail',
    'Healthcare & Pharmaceuticals',
    'Education & Training',
    'Human Resources & Recruitment',
    'Logistics, Supply Chain & Procurement',
    'Legal Services',
    'Admin & Clerical',
    'Customer Service & Support',
    'FMCG & Manufacturing',
    'Agriculture & Natural Resources',
    'Architecture & Construction',
    'Automotive & Transportation',
    'Creative Arts & Design',
    'Environment, Water & Sanitation',
    'Consulting & Strategy',
    'Economics & Research',
    'Development & Project Management',
    'Communications, Media & Journalism',
    'Retail, Wholesale & Distribution',
    'Security & Law Enforcement',
    'Event, Travel & Tourism',
    'Natural & Social Sciences',
    'Telecommunications & Networking',
    'Hospitality & Hotel Services',
    'Veterinary & Animal Services',
    'Quality Assurance & Safety'
  ];

  const locations = [
    'Kampala, Ethiopia',
    'Entebbe, Ethiopia',
    'Jinja, Ethiopia',
    'Mbarara, Ethiopia',
    'Gulu, Ethiopia',
    'Mbale, Ethiopia',
    'Fort Portal, Ethiopia',
    'Masaka, Ethiopia',
    'Lira, Ethiopia',
    'Arua, Ethiopia',
    'Soroti, Ethiopia',
    'Kabale, Ethiopia',
    'Hoima, Ethiopia',
    'Kasese, Ethiopia',
    'Mityana, Ethiopia',
    'Remote',
    'Nairobi, Kenya',
    'Dar es Salaam, Tanzania',
    'Kigali, Rwanda',
    'Addis Ababa, Ethiopia'
  ];

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote'
  ];

  const careerLevels = [
    'Junior (1-3 years)',
    'Mid (3-5 years)',
    'Senior (5-8 years)',
    'Executive (VP/Director)',
    'Senior Executive (C Level)'
  ];

  const statusOptions = [
    'active',
    'draft',
    'closed'
  ];

  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'UGX',
    'KES',
    'TZS',
    'RWF',
    'ETB'
  ];

  const handleInputChange = (field: keyof JobPosting, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Briefcase },
    { id: 'details', label: 'Job Details', icon: FileText },
    { id: 'company', label: 'Company Info', icon: Building }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Job Posting</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
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
        
        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    value={formData.jobLocation}
                    onChange={(e) => handleInputChange('jobLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select career level</option>
                    {careerLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 5,000,000 ETB"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 8,000,000 ETB"
                  />
                  <select
                    value={formData.salaryCurrency}
                    onChange={(e) => handleInputChange('salaryCurrency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select currency</option>
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Job Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description * (Markdown supported)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting...

You can use markdown formatting:
- **Bold text**
- *Italic text*
- ## Headings
- - Bullet points
- 1. Numbered lists"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Provide a detailed description of the role, responsibilities, and company culture. Markdown formatting is supported.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements & Qualifications * (Markdown supported)
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List the required skills, experience, education, and qualifications...

Example:
## Required Skills
- 5+ years of experience
- **JavaScript** and **React**
- Bachelor's degree in Computer Science"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include required skills, experience level, education, and any specific qualifications. Markdown formatting is supported.
                </p>
              </div>
            </div>
          )}

          {/* Company Info Tab */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Company Information</h3>
                <p className="text-blue-800 text-sm">
                  Company profile information is managed in your account settings. 
                  This includes company logo, description, and other details that appear on all job postings.
                </p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Go to Company Settings
                </button>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Job-Specific Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posted Date
                    </label>
                    <input
                      type="date"
                      value={formData.postedDate}
                      onChange={(e) => handleInputChange('postedDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Applications Count
                      </label>
                      <input
                        type="number"
                        value={formData.applicationCount}
                        onChange={(e) => handleInputChange('applicationCount', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Views Count
                      </label>
                      <input
                        type="number"
                        value={formData.views}
                        onChange={(e) => handleInputChange('views', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobEditModal;