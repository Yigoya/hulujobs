

export type Job = {
  id: number;
  title: string;
  description: string;
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
  tags?: string[];
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export interface JobPosting {
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

export interface CompanyJobResponse {
  content: JobPosting[];
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

export interface Application {
  id: number;
  candidateName: string;
  email: string;
  phone: string;
  jobTitle: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  experience: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  coverLetter: string;
  jobSeekerId?: string;
  jobApplicationId?: string;
  savedDate?: string;
}