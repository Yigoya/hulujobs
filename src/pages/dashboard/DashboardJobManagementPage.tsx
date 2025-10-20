import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Grid,
  List,
  Archive,
  RefreshCw,
  Plus,
  Download,
  Briefcase as BriefcaseIcon
} from 'lucide-react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import JobTable from '../../components/dashboard/JobTable';
import JobCard from '../../components/dashboard/JobCard';
import JobEditModal from '../../components/dashboard/JobEditModal';
import JobViewModal from '../../components/dashboard/JobViewModal';
import Pagination from '../../components/Pagination';
import { JobPosting, CompanyJobResponse } from '../../types/type';
import { useCompanyJobs } from '../../hooks/jobs/useCompanyJobs';



const DashboardJobManagementPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);

  // Get state from URL parameters
  const statusFilter = (searchParams.get('status') as 'all' | 'active' | 'expired' | 'draft' | 'closed') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Always get filters as an object
  const filters = Object.fromEntries(searchParams.entries());

  // Add page to filters for API call (backend expects 0-based page index)
  const filtersWithPage: Record<string, string> = {
    ...filters,
    page: (currentPage - 1).toString(),
    size: '10', // You can make this configurable if needed
  };

  // Remove status if it's 'all' to avoid sending it to the API
  if (statusFilter === 'all') {
    delete filtersWithPage.status;
  }

  // Sync URL parameters when component mounts
  useEffect(() => {
    // Set default parameters if none exist, but don't set status=all
    const newParams = new URLSearchParams(searchParams);
    let shouldUpdate = false;
    
    if (!searchParams.has('page')) {
      newParams.set('page', '1');
      shouldUpdate = true;
    }
    
    // Remove status=all if it exists in the URL
    if (searchParams.get('status') === 'all') {
      newParams.delete('status');
      shouldUpdate = true;
    }
    
    if (shouldUpdate) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Pass filters to your data fetching hook
  const { data, isLoading } = useCompanyJobs("1", filtersWithPage) as { data: CompanyJobResponse, isLoading: boolean };
  if (isLoading) return null;
  const jobs = data?.content || [];
  console.log("jobs", jobs);

  // const [jobs, setJobs] = useState<JobPosting[]>([
  //   {
  //     id: 1,
  //     title: 'Senior Software Engineer',
  //     // department: 'Engineering',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '5,000,000 - 8,000,000 UGX',
  //     status: 'active',
  //     applications: 24,
  //     views: 156,
  //     posted: '2024-01-15',
  //     expiryDate: '2024-02-15',
  //     description: 'We are looking for a **Senior Software Engineer** to join our dynamic team at TechCorp Ethiopia.\n\n## Key Responsibilities\n- Design and develop scalable web applications\n- Collaborate with cross-functional teams\n- Mentor junior developers\n- Write clean, maintainable code\n\n## What We Offer\n- Competitive salary\n- Health insurance\n- Professional development opportunities',
  //     requirements: '## Required Skills\n- **5+ years** of software development experience\n- Strong proficiency in **JavaScript**, **React**, and **Node.js**\n- Experience with **TypeScript** and modern development tools\n- Knowledge of cloud platforms (**AWS**, **Azure**, or **GCP**)\n\n## Education\n- Bachelor\'s degree in Computer Science or related field\n\n## Nice to Have\n- Experience with microservices architecture\n- Knowledge of DevOps practices',
  //     category: 'Information Technology & Software',
  //     careerLevel: 'Senior (5-8 years)'
  //   },
  //   {
  //     id: 2,
  //     title: 'Product Manager',
  //     // department: 'Product',
  //     location: 'Remote',
  //     type: 'Full-time',
  //     salary: '4,500,000 - 7,000,000 UGX',
  //     status: 'active',
  //     applications: 18,
  //     views: 89,
  //     posted: '2024-01-12',
  //     expiryDate: '2024-02-12',
  //     description: 'Join our **Product Team** to drive innovation and growth.\n\n## What You\'ll Do\n- Define product strategy and roadmap\n- Work closely with engineering and design teams\n- Analyze user feedback and market trends\n- Drive product launches and feature releases',
  //     requirements: '## Experience Required\n- **3-5 years** of product management experience\n- Strong analytical and problem-solving skills\n- Experience with **Agile** methodologies\n- Excellent communication skills\n\n## Technical Skills\n- Familiarity with analytics tools\n- Understanding of software development processes',
  //     category: 'Business & Management',
  //     careerLevel: 'Mid (3-5 years)'
  //   },
  //   {
  //     id: 3,
  //     title: 'UX Designer',
  //     // department: 'Design',
  //     location: 'Entebbe, Ethiopia',
  //     type: 'Full-time',
  //     salary: '3,500,000 - 5,500,000 UGX',
  //     status: 'expired',
  //     applications: 31,
  //     views: 203,
  //     posted: '2023-12-08',
  //     expiryDate: '2024-01-08',
  //     description: 'Create amazing **user experiences** for our products.\n\n## Your Role\n- Design intuitive user interfaces\n- Conduct user research and testing\n- Create wireframes and prototypes\n- Collaborate with product and engineering teams',
  //     requirements: '## Required Experience\n- **2-4 years** of UX/UI design experience\n- Proficiency in **Figma** and design tools\n- Strong portfolio demonstrating design process\n- Understanding of user-centered design principles\n\n## Education\n- Degree in Design, HCI, or related field',
  //     category: 'Creative Arts & Design',
  //     careerLevel: 'Mid (3-5 years)'
  //   },
  //   {
  //     id: 4,
  //     title: 'Marketing Specialist',
  //     // department: 'Marketing',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Part-time',
  //     salary: '2,000,000 - 3,500,000 UGX',
  //     status: 'draft',
  //     applications: 0,
  //     views: 12,
  //     posted: '2024-01-20',
  //     expiryDate: '2024-02-20',
  //     description: 'Drive our **marketing initiatives** and brand awareness.\n\n## Responsibilities\n- Develop and execute marketing campaigns\n- Manage social media presence\n- Create engaging content\n- Analyze campaign performance',
  //     requirements: '## Required Skills\n- **1-3 years** of marketing experience\n- Knowledge of **digital marketing** tools\n- Strong writing and communication skills\n- Experience with **social media** platforms\n\n## Preferred\n- Experience with analytics tools\n- Graphic design skills',
  //     category: 'Marketing, Sales & Retail',
  //     careerLevel: 'Junior (1-3 years)'
  //   },
  //   {
  //     id: 5,
  //     title: 'DevOps Engineer',
  //     // department: 'Engineering',
  //     location: 'Kampala, Ethiopia',
  //     type: 'Full-time',
  //     salary: '4,800,000 - 7,500,000 UGX',
  //     status: 'closed',
  //     applications: 42,
  //     views: 178,
  //     posted: '2024-01-10',
  //     expiryDate: '2024-02-10',
  //     description: 'Manage our **infrastructure** and deployment pipelines.\n\n## Key Responsibilities\n- Design and maintain CI/CD pipelines\n- Manage cloud infrastructure\n- Monitor system performance\n- Implement security best practices',
  //     requirements: '## Technical Requirements\n- **3+ years** of DevOps experience\n- Proficiency with **AWS** or **Azure**\n- Experience with **Docker** and **Kubernetes**\n- Knowledge of **CI/CD** tools\n\n## Skills\n- Strong scripting abilities\n- Problem-solving mindset',
  //     category: 'Information Technology & Software',
  //     careerLevel: 'Mid (3-5 years)'
  //   },
  //   {
  //     id: 6,
  //     title: 'Data Scientist',
  //     // department: 'Analytics',
  //     location: 'Remote',
  //     type: 'Full-time',
  //     salary: '5,500,000 - 8,500,000 UGX',
  //     status: 'active',
  //     applications: 15,
  //     views: 92,
  //     posted: '2024-01-18',
  //     expiryDate: '2024-02-18',
  //     description: 'Analyze data to drive **business insights** and decisions.\n\n## What You\'ll Do\n- Build predictive models\n- Analyze large datasets\n- Create data visualizations\n- Present findings to stakeholders',
  //     requirements: '## Required Qualifications\n- **3+ years** of data science experience\n- Proficiency in **Python** and **R**\n- Experience with **machine learning** algorithms\n- Strong statistical background\n\n## Education\n- Master\'s degree in Data Science, Statistics, or related field',
  //     category: 'Information Technology & Software',
  //     careerLevel: 'Mid (3-5 years)'
  //   }
  // ]);

  // Since filtering is now done on the server side, we use all jobs from the API response
  const filteredJobs = jobs;

  const handleSelectJob = (jobId: number) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  // Reset to page 1 when status filter changes
  const handleStatusFilterChange = (status: 'all' | 'active' | 'expired' | 'draft' | 'closed') => {
    const currentFilters = Object.fromEntries(searchParams.entries());
    const newFilters: Record<string, string> = {
      ...currentFilters,
      status: status,
      page: '1', // Reset to page 1
    };
    
    // Remove status filter if 'all' is selected
    if (status === 'all') {
      delete newFilters.status;
    }
    
    setSearchParams(newFilters, { replace: true });
    setSelectedJobs([]);
  };

  // Reset to page 1 when search term changes
  const handleSearchChange = (term: string) => {
    const currentFilters = Object.fromEntries(searchParams.entries());
    const newFilters: Record<string, string> = {
      ...currentFilters,
      page: '1', // Reset to page 1
    };
    
    if (term.trim()) {
      newFilters.search = term;
    } else {
      delete newFilters.search;
    }
    
    setSearchParams(newFilters, { replace: true });
    setSelectedJobs([]);
  };

  const handleBulkAction = (action: 'archive' | 'repost' | 'delete') => {
    console.log(`Bulk ${action} for jobs:`, selectedJobs);
    if (action === 'delete') {
      if (confirm(`Are you sure you want to delete ${selectedJobs.length} job posting(s)?`)) {
        // TODO: Implement API call for bulk delete
        console.log('Bulk delete API call needed');
        setSelectedJobs([]);
      }
    } else if (action === 'repost') {
      // TODO: Implement API call for bulk repost
      console.log('Bulk repost API call needed');
      setSelectedJobs([]);
    }
  };

  const handleJobAction = (jobId: number, action: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    switch (action) {
      case 'edit':
        setEditingJob(job);
        break;
      case 'view':
        navigate(`/dashboard/applications/${jobId}`);
        break;
      case 'duplicate':
        // TODO: Implement API call for job duplication
        console.log('Duplicate job API call needed for job:', jobId);
        break;
      case 'toggle':
        // TODO: Implement API call for job status toggle
        console.log('Toggle job status API call needed for job:', jobId);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this job posting?')) {
          // TODO: Implement API call for job deletion
          console.log('Delete job API call needed for job:', jobId);
        }
        break;
    }
  };

  // Handler for table row clicks
  const handleRowClick = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setViewingJob(job);
    }
  };

  const handleSaveJob = (updatedJob: JobPosting) => {
    // TODO: Implement API call for job update
    console.log('Update job API call needed for job:', updatedJob);
    setEditingJob(null);
  };

  // Handler for page changes
  const handlePageChange = (page: number) => {
    const currentFilters = Object.fromEntries(searchParams.entries());
    const newFilters: Record<string, string> = {
      ...currentFilters,
      page: page.toString(),
    };
    
    setSearchParams(newFilters, { replace: true });
    setSelectedJobs([]); // Clear selections when changing pages
  };

  const statusCounts = {
    all: data?.totalElements || 0,
    active: jobs.filter(j => j.status === 'active').length,
    expired: jobs.filter(j => j.status === 'expired').length,
    draft: jobs.filter(j => j.status === 'draft').length,
    closed: jobs.filter(j => j.status === 'closed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Job Management
              </h1>
              <p className="text-gray-600">
                Manage all your job postings, track performance, and handle applications
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <a href="/dashboard/post-job" className="flex items-center space-x-2">
                <span>Post New Job</span>
              </a>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <DashboardNavigation />

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, department, or location..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => handleStatusFilterChange(status as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="capitalize">{status}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  statusFilter === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedJobs.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-blue-800 font-medium">
                {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  <span>Archive</span>
                </button>
                <button
                  onClick={() => handleBulkAction('repost')}
                  className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Repost</span>
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Job Postings ({filteredJobs.length})
              </h2>
              {viewMode === 'table' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </div>
              )}
            </div>
          </div>

          {viewMode === 'table' ? (
            <JobTable
              jobs={filteredJobs}
              selectedJobs={selectedJobs}
              onSelectJob={handleSelectJob}
              onSelectAll={handleSelectAll}
              onAction={handleJobAction}
              onRowClick={handleRowClick}
            />
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobs.includes(job.id)}
                    onSelect={handleSelectJob}
                    onAction={handleJobAction}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="p-12 text-center">
              <BriefcaseIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">
                {statusFilter === 'all' 
                  ? "You haven't posted any jobs yet. Create your first job posting to get started."
                  : `No ${statusFilter} jobs found. Try adjusting your filters.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing page {currentPage} of {data.totalPages} ({data.totalElements} total jobs)
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}

        {/* Always show pagination info even on single page */}
        {data && data.totalPages === 1 && data.totalElements > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center text-sm text-gray-600">
              Showing all {data.totalElements} job{data.totalElements !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Modals */}
        <JobEditModal
          job={editingJob!}
          isOpen={!!editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleSaveJob}
        />

        <JobViewModal
          job={viewingJob}
          isOpen={!!viewingJob}
          onClose={() => setViewingJob(null)}
          onEdit={setEditingJob}
        />
      </div>
    </div>
  );
};

export default DashboardJobManagementPage;