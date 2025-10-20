import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  Users, 
  Globe, 
  MapPin, 
  Calendar, 
  Star,
  Mail,
  Phone,
  Briefcase,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { useCompany } from '../hooks/companies/useCompany';

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
  coverImage?: string;
  website?: string;
  email?: string;
  phone?: string;
  totalHires?: number;
  benefits?: string[];
  culture?: string[];
  recruitingHistory?: {
    year: string;
    totalHires: number;
    departments: { name: string; hires: number }[];
    highlights: string[];
  }[];
  currentOpenings?: {
    id: number;
    title: string;
    department: string;
    type: string;
    posted: string;
    applicants: number;
  }[];
};

const CompanyDetailPage: React.FC = () => {
  const { id } = useParams();
  console.log("Company ID: ", id);

  const { data: company, isLoading } = useCompany(id) as { data: Company, isLoading: boolean };
  if (isLoading) return null;  
  console.log("Company details: ", company);

  // Mock company data - in real app, this would come from API
//   const company = {
//     name: companyName || 'TechCorp Ethiopia',
//     logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
//     coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=2',
//     industry: 'Information Technology & Software',
//     size: '50-200 employees',
//     founded: '2018',
//     location: 'Kampala, Ethiopia',
//     website: 'https://techcorp.ug',
//     email: 'careers@techcorp.ug',
//     phone: '+256 700 123 456',
//     rating: 4.5,
//     totalReviews: 127,
//     openJobs: 8,
//     totalHires: 45,
//     description: `TechCorp Ethiopia is a leading technology company specializing in innovative software solutions for businesses across East Africa. Founded in 2018, we have grown from a small startup to a dynamic team of over 100 professionals dedicated to driving digital transformation in Ethiopia and beyond.

// Our mission is to empower businesses through cutting-edge technology solutions that streamline operations, enhance productivity, and drive growth. We specialize in custom software development, mobile applications, web platforms, and cloud solutions that are tailored to meet the unique needs of African businesses.

// At TechCorp Ethiopia, we believe in fostering a culture of innovation, collaboration, and continuous learning. Our team comprises talented developers, designers, project managers, and business analysts who are passionate about creating meaningful impact through technology. We pride ourselves on delivering high-quality solutions that not only meet but exceed our clients' expectations.

// We are committed to contributing to Ethiopia's growing tech ecosystem by creating employment opportunities, mentoring young talent, and partnering with educational institutions to bridge the skills gap in the technology sector. Our company values include integrity, excellence, innovation, and social responsibility.

// As we continue to expand our operations, we remain focused on maintaining our core values while embracing new technologies and methodologies that enable us to serve our clients better. We are always looking for talented individuals who share our vision and are eager to contribute to our mission of transforming businesses through technology.`,
    
//     benefits: [
//       'Competitive salary packages',
//       'Health insurance coverage',
//       'Professional development opportunities',
//       'Flexible working hours',
//       'Remote work options',
//       'Annual performance bonuses',
//       'Team building activities',
//       'Modern office facilities',
//       'Learning and development budget',
//       'Career advancement opportunities'
//     ],
    
//     culture: [
//       'Innovation-driven',
//       'Collaborative',
//       'Growth-oriented',
//       'Inclusive',
//       'Results-focused',
//       'Learning culture'
//     ],
    
//     recruitingHistory: [
//       {
//         year: '2024',
//         totalHires: 15,
//         departments: [
//           { name: 'Software Development', hires: 8 },
//           { name: 'Product Management', hires: 3 },
//           { name: 'Sales & Marketing', hires: 2 },
//           { name: 'Operations', hires: 2 }
//         ],
//         highlights: [
//           'Expanded development team by 60%',
//           'Launched graduate trainee program',
//           'Opened new office in Entebbe'
//         ]
//       },
//       {
//         year: '2023',
//         totalHires: 12,
//         departments: [
//           { name: 'Software Development', hires: 6 },
//           { name: 'Design & UX', hires: 3 },
//           { name: 'Business Development', hires: 2 },
//           { name: 'HR & Admin', hires: 1 }
//         ],
//         highlights: [
//           'First international hire from Kenya',
//           'Established remote work policy',
//           'Achieved 95% employee retention rate'
//         ]
//       },
//       {
//         year: '2022',
//         totalHires: 18,
//         departments: [
//           { name: 'Software Development', hires: 10 },
//           { name: 'Quality Assurance', hires: 4 },
//           { name: 'Project Management', hires: 2 },
//           { name: 'Finance & Accounting', hires: 2 }
//         ],
//         highlights: [
//           'Doubled engineering team size',
//           'Launched internship program',
//           'Achieved ISO 9001 certification'
//         ]
//       }
//     ],
    
//     currentOpenings: [
//       {
//         id: 1,
//         title: 'Senior Software Engineer',
//         department: 'Engineering',
//         type: 'Full-time',
//         posted: '2 days ago',
//         applicants: 24
//       },
//       {
//         id: 2,
//         title: 'Product Manager',
//         department: 'Product',
//         type: 'Full-time',
//         posted: '1 week ago',
//         applicants: 18
//       },
//       {
//         id: 3,
//         title: 'UX Designer',
//         department: 'Design',
//         type: 'Full-time',
//         posted: '3 days ago',
//         applicants: 31
//       },
//       {
//         id: 4,
//         title: 'DevOps Engineer',
//         department: 'Engineering',
//         type: 'Full-time',
//         posted: '5 days ago',
//         applicants: 15
//       }
//     ]
//   };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          to="/jobs" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Company Header */}
      <div className="relative">
        <div 
          className="h-64 bg-gradient-to-r from-blue-600 to-blue-700 bg-cover bg-center"
          style={{ backgroundImage: `url(${company.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32 pb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                      <p className="text-lg text-gray-600 mb-4">{company.industry}</p>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(company.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600">
                          {company.rating} ({company.totalReviews} reviews)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span>{company.size}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-5 h-5" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-5 h-5" />
                          <span>Founded {company.founded}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Globe className="w-5 h-5" />
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{company.openJobs}</div>
                        <div className="text-sm text-blue-800">Open Positions</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{company.totalHires}</div>
                        <div className="text-sm text-green-800">Total Hires</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About {company.name}</h2>
              <div className="prose prose-gray max-w-none">
                {company.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Company Culture */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Culture</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {company.culture && company.culture.length > 0 ? (
                  company.culture.map((trait, index) => (
                    <div key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center border border-blue-200">
                      {trait}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 col-span-2 md:col-span-3">No culture information available.</div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.benefits && company.benefits.length > 0 ? company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                )) : (
                  <div className="text-gray-500 col-span-2 md:col-span-3">No benefits information available.</div>
                )}
              </div>
            </div>

            {/* Recruiting History */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <span>Recruiting History</span>
              </h2>
              
              <div className="space-y-8">
                {company.recruitingHistory && company.recruitingHistory.length > 0 ? company.recruitingHistory.map((year, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{year.year}</h3>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {year.totalHires} Total Hires
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Department Breakdown</h4>
                        <div className="space-y-2">
                          {year.departments.map((dept, deptIndex) => (
                            <div key={deptIndex} className="flex justify-between items-center">
                              <span className="text-gray-700">{dept.name}</span>
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                {dept.hires} hires
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                        <ul className="space-y-2">
                          {year.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="flex items-start space-x-2">
                              <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-gray-500 col-span-2 md:col-span-3">No recruiting history available.</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a 
                    href={`mailto:${company.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {company.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{company.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{company.location}</span>
                </div>
              </div>
            </div>

            {/* Current Openings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Current Openings</span>
              </h3>
              
              <div className="space-y-4">
                {company.currentOpenings && company.currentOpenings.length > 0 ? company.currentOpenings.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{job.department}</span>
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Posted {job.posted}</span>
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-gray-500 col-span-2 md:col-span-3">No current openings available.</div>
                )}
              </div>
              
              <Link
                to="/jobs"
                className="block mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                View All Jobs
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Employee Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{company.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{company.totalReviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Open Positions</span>
                  <span className="font-semibold text-blue-600">{company.openJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Hires (2024)</span>
                  <span className="font-semibold text-green-600">{company.recruitingHistory && company.recruitingHistory.length > 0 ? company.recruitingHistory[0].totalHires : 0 }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;