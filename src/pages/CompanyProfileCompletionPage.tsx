import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Upload, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  Linkedin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CompanyProfileData {
  // Company Information
  companyName: string;
  companyType: string;
  companySize: string;
  yearFounded: string;
  country: string;
  city: string;
  websiteUrl: string;
  companyLogo: File | null;
  companyDescription: string;
  
  // Recruiter/Contact Person
  fullName: string;
  jobTitle: string;
  workEmail: string;
  workPhone: string;
  
  // Verification & Legal
  businessLicense: string;
  companyDocuments: File | null;
  linkedinPage: string;
}

const CompanyProfileCompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyProfileData>({
    companyName: '',
    companyType: '',
    companySize: '',
    yearFounded: '',
    country: '',
    city: '',
    websiteUrl: '',
    companyLogo: null,
    companyDescription: '',
    fullName: '',
    jobTitle: '',
    workEmail: '',
    workPhone: '',
    businessLicense: '',
    companyDocuments: null,
    linkedinPage: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const companyTypes = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
    'Construction', 'Transportation', 'Hospitality', 'Real Estate', 'Media & Entertainment',
    'Non-Profit', 'Government', 'Consulting', 'Energy', 'Agriculture', 'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'companyLogo' | 'companyDocuments') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companyType) newErrors.companyType = 'Company type is required';
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    } else if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
      if (!formData.workEmail.trim()) newErrors.workEmail = 'Work email is required';
      if (formData.workEmail && !/\S+@\S+\.\S+/.test(formData.workEmail)) {
        newErrors.workEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      // TODO: Submit form data to backend
      console.log('Submitting company profile:', formData);
      navigate('/dashboard');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
        <p className="text-gray-600">Tell us about your company</p>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.companyName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Acme Inc."
        />
        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
      </div>

      {/* Company Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Type/Industry <span className="text-red-500">*</span>
        </label>
        <select
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.companyType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select industry</option>
          {companyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
      </div>

      {/* Company Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Size <span className="text-red-500">*</span>
        </label>
        <select
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.companySize ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select company size</option>
          {companySizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
      </div>

      {/* Year Founded */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year Founded
        </label>
        <input
          type="number"
          name="yearFounded"
          value={formData.yearFounded}
          onChange={handleChange}
          min="1800"
          max={new Date().getFullYear()}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="2020"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ethiopia"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Kampala"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Website
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.company.com"
          />
        </div>
      </div>

      {/* Company Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Logo
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="companyLogo" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">Upload a file</span>
              <span className="text-gray-600"> or drag and drop</span>
            </label>
            <input
              id="companyLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'companyLogo')}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          {formData.companyLogo && (
            <p className="text-sm text-green-600 mt-2">✓ {formData.companyLogo.name}</p>
          )}
        </div>
      </div>

      {/* Company Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description
        </label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about your company's mission, values, and what makes you unique..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Contact Person Details</h3>
        <p className="text-gray-600">Primary recruiter or contact information</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Jane Doe"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title/Role <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.jobTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="HR Manager, Talent Acquisition Lead, etc."
          />
        </div>
        {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
      </div>

      {/* Work Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.workEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="jane@company.com"
          />
        </div>
        {errors.workEmail && <p className="text-red-500 text-sm mt-1">{errors.workEmail}</p>}
      </div>

      {/* Work Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+256 700 123 456"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Verification & Legal</h3>
        <p className="text-gray-600">Optional information for verification and trust</p>
      </div>

      {/* Business License */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business License Number / TIN
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="businessLicense"
            value={formData.businessLicense}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter license number or TIN"
          />
        </div>
      </div>

      {/* Company Documents */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Registration Documents
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="companyDocuments" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">Upload documents</span>
              <span className="text-gray-600"> or drag and drop</span>
            </label>
            <input
              id="companyDocuments"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, 'companyDocuments')}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
          {formData.companyDocuments && (
            <p className="text-sm text-green-600 mt-2">✓ {formData.companyDocuments.name}</p>
          )}
        </div>
      </div>

      {/* LinkedIn Company Page */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn Company Page
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Linkedin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            name="linkedinPage"
            value={formData.linkedinPage}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/company/your-company"
          />
        </div>
      </div>
    </div>
  );

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Muya <span className="text-blue-600">Jobs</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Company Profile</h1>
          <p className="text-gray-600">Help us learn more about your company to provide the best experience</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Please fix the following errors:</span>
              </div>
              <ul className="text-red-700 text-sm mt-2 ml-7">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Complete Profile
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip for now (you can complete this later)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCompletionPage;
