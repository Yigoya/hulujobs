import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-blue-100 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg shadow-lg">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Hulu <span className="text-blue-600">Jobs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/jobs" 
              className={`font-medium transition-colors text-lg ${
                isActive('/jobs') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`font-medium transition-colors text-lg ${
                isActive('/companies') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Companies
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors text-lg ${
                isActive('/contact') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact us
            </Link>
            <Link 
              to="/post-job" 
              className={`font-medium transition-colors text-lg ${
                isActive('/post-job') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Post A Job
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors text-lg ${
                isActive('/dashboard') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Jobseeker/Recruiter Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              /* User Profile Section */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Jobseekers Section */}
                <div className="bg-blue-600 hover:bg-blue-700 border-2 rounded-lg p-3 text-center min-w-[140px] transition-colors">
                  <div className="text-white font-bold text-base mb-2 underline">Jobseekers:</div>
                  <div className="flex space-x-2 text-sm">
                    <Link 
                      to="/login?type=jobseeker" 
                      className="text-white font-medium underline hover:text-blue-200 transition-colors"
                    >
                      Sign in
                    </Link>
                    <span className="text-gray-500">|</span>
                    <Link 
                      to="/signup?type=jobseeker" 
                      className="text-white font-medium underline hover:text-blue-200 transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>

                {/* Recruiters Section */}
                <div className="bg-gray-500 hover:bg-gray-600 border-2 border-gray-600 rounded-lg p-3 text-center min-w-[140px] shadow-md transition-colors">
                  <div className="text-white font-bold text-base mb-2 underline">Recruiters:</div>
                  <div className="flex space-x-2 text-sm">
                    <Link 
                      to="/login?type=employer" 
                      className="text-white font-medium underline hover:text-gray-200 transition-colors"
                    >
                      Sign in
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link 
                      to="/signup?type=employer" 
                      className="text-white font-medium underline hover:text-gray-200 transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Auth Section for smaller screens */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {user ? (
              <div className="relative">
                <Link to="/profile" className="relative">
                  <button
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </button>
                </Link>
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/jobs" 
                className={`font-medium transition-colors ${
                  isActive('/jobs') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                to="/companies" 
                className={`font-medium transition-colors ${
                  isActive('/companies') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </Link>
              <Link 
                to="/post-job" 
                className={`font-medium transition-colors ${
                  isActive('/post-job') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Post A Job
              </Link>

              {/* Mobile Jobseeker/Recruiter Links */}
              {user ? (
                /* Mobile User Menu */
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 p-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                /* Mobile Jobseeker/Recruiter Links */
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <div className="text-gray-800 font-bold text-base mb-2">Jobseekers:</div>
                    <div className="flex space-x-4">
                      <Link
                        to="/login?type=jobseeker"
                        className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup?type=jobseeker"
                        className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-800 font-bold text-base mb-2">Recruiters:</div>
                    <div className="flex space-x-4">
                      <Link
                        to="/login?type=employer"
                        className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup?type=employer"
                        className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;