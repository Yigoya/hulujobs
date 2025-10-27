import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Download, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePreloadExternalSite } from '../hooks/usePreloadExternalSite';
import logo from '../assets/logo.png';

const SiteNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Preload external site when on root page
  const isRootPage = location.pathname === '/';
  if (isRootPage) {
    usePreloadExternalSite('http://hulumoya.com');
  }
  
  const handleLogoClick = () => {
    if (isRootPage) {
      window.location.href = 'http://hulumoya.com';
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-[#2b78ac] fixed top-0 w-full z-50 text-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center">
              <img src={logo} alt="HuluMoya Jobs" className="h-10 w-auto object-cover mr-3" />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="px-3 py-2 text-base font-medium">Jobs</Link>
            <Link to="/companies" className="px-3 py-2 text-base font-medium">Companies</Link>
            <Link to="/contact" className="px-3 py-2 text-base font-medium">Contact</Link>
            <Link to="/post-job" className="px-3 py-2 text-base font-medium">Post A Job</Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 text-base font-medium"><Download className="h-4 w-4 mr-1" />Get App</button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate('/profile')} className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[#3385bb]">{user.name?.charAt(0) ?? 'U'}</div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <button onClick={() => { logout(); navigate('/login'); }} className="text-sm text-red-100">Sign out</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="flex items-center px-3 py-2 text-base font-medium"><LogIn className="h-4 w-4 mr-1" />Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-[#3385bb] to-[#2a6c99] text-white px-4 py-2 rounded-full text-base font-medium">Register</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t">
          <div className="px-4 py-3">
            <Link to="/jobs" className="block py-2">Jobs</Link>
            <Link to="/companies" className="block py-2">Companies</Link>
            <Link to="/contact" className="block py-2">Contact</Link>
            <Link to="/post-job" className="block py-2">Post A Job</Link>
            <div className="mt-3 border-t pt-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3385bb]">{user.name?.charAt(0) ?? 'U'}</div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={() => { logout(); navigate('/login'); }} className="mt-3 text-red-600">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2">Login</Link>
                  <Link to="/signup" className="block py-2">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;
