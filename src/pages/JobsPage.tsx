import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import { useJobs } from '../hooks/jobs/useJobs';
import { Job, Sort, Pageable } from '../types/type';
import { useAuth } from '../contexts/AuthContext';

type JobsResponse = {
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
};

const JobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') || '');
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');

  // Always get filters as an object
  const filters = Object.fromEntries(searchParams.entries());

  // Add page to filters for API call (backend expects 0-based page index)
  const filtersWithPage = {
    ...filters,
    page: (currentPage - 1).toString(),
  };

  // Sync search inputs with URL parameters
  useEffect(() => {
    setSearchKeyword(searchParams.get('keyword') || '');
    setSearchLocation(searchParams.get('location') || '');
    // setCurrentPage(parseInt(searchParams.get('page') || '1', 10));
  }, [searchParams]);

  // Pass filters to your data fetching hook
  const { data, isLoading } = useJobs(filtersWithPage) as { data: JobsResponse, isLoading: boolean };
  if (isLoading) return null;
  const jobs = data?.content || []
  console.log("jobs", jobs);

  // Get category from URL params
  const categoryFromUrl = searchParams.get('category');

  // Helper function to determine job category based on job data
  const getJobCategory = (job: any) => {
    // Map job titles to categories - this is simplified
    const categoryMap: { [key: string]: string } = {
      'software engineer': 'Information Technology & Software',
      'developer': 'Information Technology & Software',
      'marketing': 'Marketing, Sales & Retail',
      'financial analyst': 'Accounting, Finance & Banking',
      'nurse': 'Healthcare & Pharmaceuticals',
      'project manager': 'Business & Management',
      'designer': 'Creative Arts & Design',
      'data scientist': 'Information Technology & Software',
      'hr coordinator': 'Human Resources & Recruitment'
    };
    
    const title = job.title.toLowerCase();
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (title.includes(keyword)) {
        return category;
      }
    }
    return 'Other';
  };

  // Mock job data
  // const jobs = [
  //   {
  //     id: 1,
  //     title: 'Senior Software Engineer',
  //     company: 'TechCorp Ethiopia',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '5,000,000 - 8,000,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing scalable web applications using modern technologies like React, Node.js, and TypeScript. The ideal candidate should have strong problem-solving skills and experience with cloud platforms.',
  //     tags: ['React', 'Node.js', 'TypeScript'],
  //     posted: '2 days ago',
  //     level: 'Senior',
  //   },
  //   {
  //     id: 2,
  //     title: 'Marketing Manager',
  //     company: 'Brand Solutions',
  //     location: 'Entebbe, Ethiopia',
  //     type: 'Full-time',
  //     salary: '3,500,000 - 5,000,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Join our marketing team as a Marketing Manager where you will lead digital marketing campaigns, analyze market trends, and develop strategic marketing plans. Experience with social media marketing, content creation, and analytics tools is required.',
  //     tags: ['Digital Marketing', 'Analytics', 'Strategy'],
  //     posted: '1 week ago',
  //     level: 'Mid',
  //   },
  //   {
  //     id: 3,
  //     title: 'Financial Analyst',
  //     company: 'Finance Pro Ltd',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '2,800,000 - 4,200,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'We are seeking a detail-oriented Financial Analyst to join our finance team. You will be responsible for financial modeling, budget analysis, and preparing financial reports. Strong Excel skills and experience with financial software are essential.',
  //     tags: ['Excel', 'Financial Modeling', 'Analysis'],
  //     posted: '3 days ago',
  //     level: 'Mid',
  //   },
  //   {
  //     id: 4,
  //     title: 'Registered Nurse',
  //     company: 'Kampala Hospital',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '2,000,000 - 3,500,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Kampala Hospital is looking for a compassionate Registered Nurse to provide excellent patient care. You will work in a fast-paced environment, administering medications, monitoring patient conditions, and collaborating with medical teams.',
  //     tags: ['Patient Care', 'Medical', 'Emergency'],
  //     posted: '5 days ago',
  //     level: 'Mid',
  //   },
  //   {
  //     id: 5,
  //     title: 'Project Manager',
  //     company: 'BuildCorp Ethiopia',
  //     location: 'Jinja, Ethiopia',
  //     type: 'Full-time',
  //     salary: '4,000,000 - 6,000,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182803/pexels-photo-3182803.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Lead construction projects from inception to completion as our Project Manager. You will coordinate with various stakeholders, manage project timelines, and ensure quality delivery. PMP certification and construction experience preferred.',
  //     tags: ['Project Management', 'Agile', 'Leadership'],
  //     posted: '1 day ago',
  //     level: 'Senior',
  //   },
  //   {
  //     id: 6,
  //     title: 'Graphic Designer',
  //     company: 'Creative Agency',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '1,800,000 - 3,000,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182792/pexels-photo-3182792.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Creative Agency is seeking a talented Graphic Designer to create visually appealing designs for various media. You will work on branding projects, marketing materials, and digital content. Proficiency in Adobe Creative Suite is required.',
  //     tags: ['Photoshop', 'Illustrator', 'Branding'],
  //     posted: '4 days ago',
  //     level: 'Junior',
  //   },
  //   {
  //     id: 7,
  //     title: 'Data Scientist',
  //     company: 'Analytics Hub',
  //     location: 'Remote',
  //     type: 'Remote',
  //     salary: '6,000,000 - 9,000,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Join our data science team to analyze complex datasets and build predictive models. You will work with machine learning algorithms, statistical analysis, and data visualization tools to drive business insights.',
  //     tags: ['Python', 'Machine Learning', 'SQL'],
  //     posted: '6 days ago',
  //     level: 'Senior',
  //   },
  //   {
  //     id: 8,
  //     title: 'HR Coordinator',
  //     company: 'People First Ltd',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Part-time',
  //     salary: '1,500,000 - 2,500,000 UGX',
  //     logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     description: 'Support our HR department as an HR Coordinator. You will assist with recruitment processes, employee onboarding, and maintaining HR records. Strong communication skills and attention to detail are essential.',
  //     tags: ['Recruitment', 'HR', 'Communication'],
  //     posted: '1 week ago',
  //     level: 'Junior',
  //   },
  // //   {
  // //     "id": 9,
  // //     "title": "Senior Backend Engineer",
  // //     "companyName": "Tech Solutions Inc",
  // //     "companyLocation": "San Francisco, CA",
  // //     "jobLocation": "Addis Ababa, Ethiopia",
  // //     "jobType": "FULL_TIME",
  // //     "postedDate": "2025-07-17T09:06:17.205716Z",
  // //     "companyLogo": "https://example.com/logo.png",
  // //     "category": "Construction Industry",
  // //     "salaryMin": 80000.00,
  // //     "salaryMax": 120000.00,
  // //     "salaryCurrency": "ETB"
  // // }
  // ];

  // const totalJobs = jobs.length;
  const jobsPerPage = 6;
  // const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  

  // Filter jobs by category if specified in URL
  let filteredJobs = categoryFromUrl 
    ? jobs.filter(job => {
        // This is a simple filter - in a real app, you'd have proper category mapping
        const jobCategory = getJobCategory(job);
        return jobCategory.toLowerCase().includes(categoryFromUrl.toLowerCase());
      })
    : jobs;

  // Sort jobs based on sortBy
  let sortedJobs = [...filteredJobs];
  if (sortBy === 'newest') {
    sortedJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  } else if (sortBy === 'oldest') {
    sortedJobs.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
  } else if (sortBy === 'salary-high') {
    sortedJobs.sort((a, b) => {
      const avgA = (a.salaryMin + a.salaryMax) / 2;
      const avgB = (b.salaryMin + b.salaryMax) / 2;
      return avgB - avgA;
    });
  } else if (sortBy === 'salary-low') {
    sortedJobs.sort((a, b) => {
      const avgA = (a.salaryMin + a.salaryMax) / 2;
      const avgB = (b.salaryMin + b.salaryMax) / 2;
      return avgA - avgB;
    });
  }

  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  // Handler for filter changes
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setSearchParams(newFilters, { replace: true });
  };

  // Handler for search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentFilters = Object.fromEntries(searchParams.entries());
    const newFilters: Record<string, string> = {
      ...currentFilters,
    };
    
    if (searchKeyword) {
      newFilters.keyword = searchKeyword;
    }
    if (searchLocation) {
      newFilters.location = searchLocation;
    }
    
    // Remove empty filters
    Object.keys(newFilters).forEach(key => {
      if (!newFilters[key]) {
        delete newFilters[key];
      }
    });
    
    // Remove page parameter when searching (start from page 1)
    delete newFilters.page;
    
    setSearchParams(newFilters, { replace: true });
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handler for page changes
  const handlePageChange = (page: number) => {
    const currentFilters = Object.fromEntries(searchParams.entries());
    const newFilters: Record<string, string> = {
      ...currentFilters,
      page: page.toString(),
    };
    
    setSearchParams(newFilters, { replace: true });
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
  <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-xl"></div>
  <div className="absolute top-20 right-20 w-24 h-24 bg-blue-300 bg-opacity-20 rounded-full blur-2xl"></div>
  <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-blue-300 bg-opacity-15 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
              Discover thousands of job opportunities from top employers across Ethiopia and beyond
            </p>
          </div>

          {/* Search Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4 -mb-12 relative z-10">
            <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Search Jobs
              </button>
            </form>
          </div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full bg-white rounded-lg p-4 mb-4 flex items-center justify-between shadow-sm border"
            >
              <span className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </span>
              {showMobileFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {/* Filters Component */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
              <JobFilters filters={filters} onChange={handleFilterChange} />
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Search Results</h2>
                  {categoryFromUrl && (
                    <p className="text-blue-600 font-medium mb-2">
                      Filtered by: {categoryFromUrl}
                    </p>
                  )}
                  <p className="text-gray-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + jobsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="salary-high">Salary: High to Low</option>
                    <option value="salary-low">Salary: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {currentJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={{
                    ...job,
                    tags: job.tags || [], // Ensure tags is always an array
                    level: job.level || 'Not specified' // Ensure level is always a string
                  }} 
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={data?.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;