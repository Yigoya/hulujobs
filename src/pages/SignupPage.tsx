// SignupPage.tsx - routes to employer/jobseeker flows or shows selector
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';
import EmployerSignup from './EmployerSignupPage';
import JobseekerSignup from './JobseekerSignupPage';
import logo from '../assets/logo.png';

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
      <div className="min-h-screen bg-gradient-to-br from-[#e6f2f8] via-white to-[#e6f2f8] flex items-center justify-center">
        <div className="max-w-4xl w-full px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#2b78ac] rounded-xl p-2 shadow-sm mb-6">
              <img src={logo} alt="Hulumoya Jobs" className="h-12 w-auto" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Hulumoya</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose how you want to use our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Seeker Signup Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
              <div className="bg-gradient-to-r from-[#2b78ac] to-[#2b78ac] p-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-[#2b78ac]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sign up as a Job Seeker</h2>
                <p className="mt-2 text-[#e6f2f8]">Find your dream job and advance your career</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Browse thousands of job opportunities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Apply to jobs with one click</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Track your applications in one place</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Get job alerts matching your profile</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Build your professional profile</p>
                  </li>
                </ul>
                <Link
                  to="/signup?type=jobseeker"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#2b78ac] to-[#2b78ac] hover:from-[#276d9d] hover:to-[#276d9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b78ac]"
                >
                  Continue as Job Seeker
                  <Briefcase className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Employer Signup Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
              <div className="bg-gradient-to-r from-[#2b78ac] to-[#2b78ac] p-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-[#2b78ac]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sign up as an Employer</h2>
                <p className="mt-2 text-[#e6f2f8]">Find the perfect candidates for your company</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Post unlimited job listings</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Access to qualified candidates</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Manage applications efficiently</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Build your company profile</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#2b78ac]">✓</div>
                    <p className="ml-3 text-gray-700">Advanced candidate filtering</p>
                  </li>
                </ul>
                <Link
                  to="/signup?type=employer"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#2b78ac] to-[#2b78ac] hover:from-[#276d9d] hover:to-[#276d9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b78ac]"
                >
                  Continue as Employer
                  <Briefcase className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#2b78ac] hover:text-[#276d9d] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
