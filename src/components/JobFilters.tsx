import React from 'react';
import { ChevronDown, ChevronUp, Search, MapPin, Briefcase } from 'lucide-react';

// Add props type
export type JobFiltersProps = {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
};

const JobFilters: React.FC<JobFiltersProps> = ({ filters = {}, onChange }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    jobType: true,
    category: true,
    location: true,
    careerLevel: true,
    postedDate: true,
  });
  const [locationSearch, setLocationSearch] = React.useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Remote',
    'Contract',
    'Internship'
  ];

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

  const careerLevels = [
    'Senior Executive (C Level)',
    'Executive (VP/Director)',
    'Senior (5–8 years)',
    'Mid (3–5 years)',
    'Junior (1–3 years)'
  ];

  const postedDates = [
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days'
  ];

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Controlled handlers
  const handleCategorySelect = (category: string) => {
    onChange({ ...filters, category });
    setShowCategoryDropdown(false);
  };
  const handleLocationSelect = (location: string) => {
    onChange({ ...filters, location });
    setLocationSearch(location);
    setShowLocationDropdown(false);
  };
  const handleJobTypeToggle = (type: string) => {
    // For single jobType selection (radio):
    // onChange({ ...filters, jobType: type });
    // For multi-select (array):
    const current = filters.jobType ? filters.jobType.split(',') : [];
    const next = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    onChange({ ...filters, jobType: next.join(',') });
  };
  const handleCareerLevelToggle = (level: string) => {
    const current = filters.careerLevel ? filters.careerLevel.split(',') : [];
    const next = current.includes(level)
      ? current.filter(l => l !== level)
      : [...current, level];
    onChange({ ...filters, careerLevel: next.join(',') });
  };
  const handlePostedDateSelect = (date: string) => {
    onChange({ ...filters, postedDate: date });
  };
  const handleClearAll = () => {
    onChange({});
    setLocationSearch('');
  };

  const FilterSection: React.FC<{
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-4">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection title="Job Type" sectionKey="jobType">
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.jobType?.split(',').includes(type) || false}
                onChange={() => handleJobTypeToggle(type)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category Dropdown */}
      <FilterSection title="Category" sectionKey="category">
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className={filters.category ? 'text-gray-900' : 'text-gray-500'}>
                {filters.category || 'Select Category'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCategoryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                <button
                  onClick={() => handleCategorySelect('')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      filters.category === category
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </FilterSection>

      {/* Location Dropdown with Search */}
      <FilterSection title="Location" sectionKey="location">
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search locations..."
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value);
                setShowLocationDropdown(true);
              }}
              onFocus={() => setShowLocationDropdown(true)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showLocationDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                <button
                  onClick={() => {
                    handleLocationSelect('');
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  All Locations
                </button>
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      filters.location === location
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {location}
                  </button>
                ))}
                {filteredLocations.length === 0 && locationSearch && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No locations found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </FilterSection>

      {/* Career Level */}
      <FilterSection title="Career Level" sectionKey="careerLevel">
        <div className="space-y-3">
          {careerLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.careerLevel?.split(',').includes(level) || false}
                onChange={() => handleCareerLevelToggle(level)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 text-sm">{level}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Posted Date */}
      <FilterSection title="Posted Date" sectionKey="postedDate">
        <div className="space-y-3">
          {postedDates.map((date) => (
            <label key={date} className="flex items-center">
              <input
                type="radio"
                name="postedDate"
                checked={filters.postedDate === date}
                onChange={() => handlePostedDateSelect(date)}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{date}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Filters Button */}
      {/* Optionally, you can remove this button if filters apply instantly, or keep it and call onChange only on click */}
    </div>
  );
};

export default JobFilters;