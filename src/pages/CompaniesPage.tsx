import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Building, Users, Briefcase, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Pagination from '../components/Pagination';
import { useCompanies } from '../hooks/companies/useCompanies';

type Company = {
  id: number;
  name: string;
  logo: string;
  industry: string | null;
  location: string;
  size: string;
  rating: number;
  totalReviews: number;
  openJobs: number;
  description: string;
  founded: string | null;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type CompaniesResponse = {
  content: Company[];
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

const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'Somali',
  'Southern Nations, Nationalities, and Peoples',
  'Tigray',
];

const CompaniesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');

  // Controlled filters from URL
  const filters = Object.fromEntries(searchParams.entries());

  // Pass filters to useCompanies
  const { data, isLoading } = useCompanies(filters) as { data: CompaniesResponse, isLoading: boolean };
  if (isLoading) return null;
  const companies = data?.content || [];

  // Filter UI handlers
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setSearchParams(newFilters, { replace: true });
  };

  // Inline filter UI
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Explore Amazing Companies
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4 -mb-12 relative z-10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{companies.length}+</div>
                <div className="text-gray-700 text-sm">Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{[...new Set(companies.map(company => company.industry).filter(Boolean))].length}+</div>
                <div className="text-gray-700 text-sm">Industries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-gray-700 text-sm">Open Positions</div>
              </div>
            </div>
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
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 -mt-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Company Name Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={filters.name || ''}
                onChange={e => handleFilterChange({ ...filters, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Industry Filter */}
              <select
                value={filters.industry || ''}
                onChange={e => handleFilterChange({ ...filters, industry: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Industries</option>
                {[...new Set(companies.map(company => company.industry).filter(Boolean))].map((industry) => (
                  <option key={industry as string} value={industry as string}>{industry}</option>
                ))}
              </select>

              {/* Location Filter (Ethiopian Regions) */}
              <select
                value={filters.location || ''}
                onChange={e => handleFilterChange({ ...filters, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {ETHIOPIAN_REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="jobs">Sort by Open Jobs</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Companies</h2>
            <p className="text-gray-600">
              Showing {companies.length} companies
            </p>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/company/${encodeURIComponent(company.id.toString())}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 hover:border-blue-200 group"
            >
              {/* Company Header */}
              <div className="flex items-start space-x-4 mb-4">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-16 h-16 rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform duration-200"
                  style={{ display: company.logo ? 'none' : 'flex' }}
                >
                  {company.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                  {/* <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(company.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {company.rating} ({company.totalReviews})
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{company.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{company.size}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Founded {company.founded}</span>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {company.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    {company.openJobs} open jobs
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  View Company
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={1} // Total pages will be calculated based on total companies and companiesPerPage
            onPageChange={setCurrentPage}
          />
        </div>

        {/* CTA Section */}
  <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't see your company?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join hundreds of companies already using HuluHulu Jobs to find top talent. 
            Post your jobs and connect with qualified candidates today.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;