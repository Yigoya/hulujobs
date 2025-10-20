import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Eye, 
  Save, 
  Send,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Briefcase,
  Target
} from 'lucide-react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';

interface JobFormData {
  title: string;
  category: string;
  location: string;
  jobType: string;
  careerLevel: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  applicationDeadline: string;
  description: string;
  requirements: string;
}

const PostJobFormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    category: '',
    location: '',
    jobType: '',
    careerLevel: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'UGX',
    applicationDeadline: '',
    description: '',
    requirements: ''
  });

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

  const steps = [
    {
      id: 1,
      title: 'Job Details',
      description: 'Basic job information',
      icon: Briefcase,
      fields: ['title', 'category', 'location', 'jobType', 'careerLevel']
    },
    {
      id: 2,
      title: 'Compensation',
      description: 'Salary and deadline',
      icon: DollarSign,
      fields: ['salaryMin', 'salaryMax', 'currency', 'applicationDeadline']
    },
    {
      id: 3,
      title: 'Description',
      description: 'Job description and requirements',
      icon: FileText,
      fields: ['description', 'requirements']
    },
    {
      id: 4,
      title: 'Preview',
      description: 'Review and submit',
      icon: Eye,
      fields: []
    }
  ];

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    const stepFields = steps[step - 1].fields;
    return stepFields.every(field => {
      if (field === 'salaryMin' || field === 'salaryMax') return true; // Optional
      return formData[field as keyof JobFormData].trim() !== '';
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting job:', formData);
    // Handle job submission here
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    // Handle save draft here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Level *
                </label>
                <select
                  value={formData.careerLevel}
                  onChange={(e) => handleInputChange('careerLevel', e.target.value)}
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Minimum"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Maximum"
                  />
                </div>
                <div>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="KES">KES</option>
                    <option value="TZS">TZS</option>
                    <option value="RWF">RWF</option>
                    <option value="ETB">ETB</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Leave blank if you prefer not to disclose salary information
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description * (Markdown supported)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={8}
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
                rows={6}
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
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Job Preview</h3>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{formData.jobType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{formData.careerLevel}</span>
                      </div>
                      {(formData.salaryMin || formData.salaryMax) && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>
                            {formData.salaryMin && formData.salaryMax 
                              ? `${formData.salaryMin} - ${formData.salaryMax} ${formData.currency}`
                              : formData.salaryMin 
                                ? `From ${formData.salaryMin} ${formData.currency}`
                                : `Up to ${formData.salaryMax} ${formData.currency}`
                            }
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Apply by {new Date(formData.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formData.category}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Job Description</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements & Qualifications</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.requirements}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600">
            Create a compelling job posting to attract the best candidates
          </p>
        </div>

        {/* Navigation */}
        <DashboardNavigation />

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step.id
                        ? 'bg-green-600 text-white'
                        : currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-600">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSaveDraft}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Job</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobFormPage;