// SignupPage.tsx - routes to employer/jobseeker flows or shows selector
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';
import EmployerSignup from './EmployerSignupPage';
import JobseekerSignup from './JobseekerSignupPage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SignupPage() {
  const query = useQuery();
  const type = query.get('type');

  console.log('Signup type:', type);

  if (type === 'employer') {
    return <EmployerSignup />;
  } else if (type === 'jobseeker') {
    return <JobseekerSignup />;
  } else {
    // Selector UI
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Choose the option that best describes you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/signup?type=jobseeker"
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-transparent hover:border-blue-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">I’m a Job Seeker</h3>
                  <p className="text-gray-600 text-sm">Find jobs, apply, and track your applications</p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Create a professional profile</li>
                <li>Save and apply to jobs</li>
                <li>Get insights and recommendations</li>
              </ul>
              <div className="mt-4 text-blue-600 font-medium">Continue as Job Seeker →</div>
            </Link>

            <Link
              to="/signup?type=employer"
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-transparent hover:border-blue-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-green-600 p-3 rounded-lg text-white">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">I’m an Employer</h3>
                  <p className="text-gray-600 text-sm">Post jobs and manage candidates</p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Post and manage job listings</li>
                <li>Browse and shortlist candidates</li>
                <li>Hire faster with tools</li>
              </ul>
              <div className="mt-4 text-green-600 font-medium">Continue as Employer →</div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
