import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Star,
  Download,
  User,
  Briefcase
} from 'lucide-react';
import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import { useCompanySavedApplications } from '../../hooks/jobs/useCompanySavedApplications';
import ApplicationDetailModal from '../../components/modals/ApplicationDetailModal';
import { Pageable, Sort, Application } from '../../types/type';


interface CompanySavedApplicationsResponse {
  content: Application[];
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


const DashboardCandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Mock saved candidates data
  // const [candidates, setCandidates] = useState<Candidate[]>([
  //   {
  //     id: 1,
  //     name: 'Sarah Johnson',
  //     email: 'sarah.johnson@email.com',
  //     phone: '+256 700 123 456',
  //     title: 'Senior Software Engineer',
  //     experience: '5+ years',
  //     location: 'Kampala, Ethiopia',
  //     skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
  //     avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/sarah-johnson.pdf',
  //     savedDate: '2024-01-18',
  //     rating: 5,
  //     lastActive: '2 days ago',
  //     availability: 'looking'
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Chen',
  //     email: 'michael.chen@email.com',
  //     phone: '+256 701 234 567',
  //     title: 'Product Manager',
  //     experience: '4 years',
  //     location: 'Entebbe, Ethiopia',
  //     skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research'],
  //     avatar: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/michael-chen.pdf',
  //     savedDate: '2024-01-16',
  //     rating: 4,
  //     lastActive: '1 week ago',
  //     availability: 'available'
  //   },
  //   {
  //     id: 3,
  //     name: 'Grace Nakamura',
  //     email: 'grace.nakamura@email.com',
  //     phone: '+256 702 345 678',
  //     title: 'UX Designer',
  //     experience: '3 years',
  //     location: 'Kampala, Ethiopia',
  //     skills: ['UI/UX', 'Figma', 'Design Systems', 'User Research'],
  //     avatar: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/grace-nakamura.pdf',
  //     savedDate: '2024-01-14',
  //     rating: 5,
  //     lastActive: '3 days ago',
  //     availability: 'employed'
  //   },
  //   {
  //     id: 4,
  //     name: 'David Musoke',
  //     email: 'david.musoke@email.com',
  //     phone: '+256 703 456 789',
  //     title: 'Marketing Specialist',
  //     experience: '2 years',
  //     location: 'Jinja, Ethiopia',
  //     skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Analytics'],
  //     avatar: 'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  //     resumeUrl: '/resumes/david-musoke.pdf',
  //     savedDate: '2024-01-12',
  //     rating: 3,
  //     lastActive: '5 days ago',
  //     availability: 'looking'
  //   }
  // ]);

  const companyId = '1'; // Replace with actual company ID

  const { data, isLoading } = useCompanySavedApplications(companyId) as { data: CompanySavedApplicationsResponse, isLoading: boolean };
  if (isLoading) {
    return null;
  }
  const candidates = data.content || [];
  console.log('Saved Applications:', candidates);
  console.log('data Applications:', data);


  const removeCandidateFromSaved = (candidateId: number) => {
    // setCandidates(candidates.filter(candidate => candidate.id !== candidateId));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'employed':
        return 'bg-gray-100 text-gray-800';
      case 'looking':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    // const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                      candidate.title.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesSkill = !skillFilter || candidate.skills.some(skill => 
    //   skill.toLowerCase().includes(skillFilter.toLowerCase())
    // );
    // const matchesLocation = !locationFilter || candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
    // const matchesAvailability = availabilityFilter === 'all' || candidate.availability === availabilityFilter;
    
    // return matchesSearch && matchesSkill && matchesLocation && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Saved Candidates
          </h1>
          <p className="text-gray-600">
            Manage your saved candidates and reach out to potential hires
          </p>
        </div>

        {/* Navigation */}
        <DashboardNavigation />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
                    
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                        
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Saved Candidates ({candidates.length})
            </h2>
          </div>

          {candidates.length === 0 ? (
            <div className="p-12 text-center">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved candidates</h3>
              <p className="text-gray-600">Start saving candidates from job applications to build your talent pool.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={candidate.avatar}
                        alt={candidate.candidateName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {candidate.candidateName}
                          </h3>
                          {/* {candidate.rating && (
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < candidate.rating!
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          )} */}
                        </div>
                        
                        <p className="text-blue-600 font-medium mb-3">{candidate.jobTitle}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{candidate.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{candidate.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{candidate.location}</span>
                          </div>
                          
                        </div>

                        <div className="flex items-center space-x-3 mb-4">
                         
                          <span className="text-sm text-gray-500">
                            Saved on {candidate.savedDate ? new Date(candidate.savedDate).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>

                        {/* <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{candidate.skills.length - 4} more
                            </span>
                          )}
                        </div> */}

                        {/* <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{candidate.phone}</span>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedApplication(candidate)}
                        className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                      
                      <a
                        href={candidate.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Resume</span>
                      </a>

                      <a
                        href={`mailto:${candidate.email}`}
                        className="flex items-center space-x-1 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Contact</span>
                      </a>

                      <button
                        onClick={() => removeCandidateFromSaved(candidate.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <BookmarkCheck className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        <ApplicationDetailModal
          application={selectedApplication}
          isOpen={!!selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      </div>
    </div>
  );
};

export default DashboardCandidatesPage;