import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[280px] md:min-h-[347px] flex items-center pb-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80)',
        }}
        aria-hidden
      />
      {/* Solid dark-blue overlay for readability */}
      <div className="absolute inset-0 bg-gray-900/75" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-12 mb-6">
            Welcome to{' '}
            <span className="text-[#2b78ac]">HuluMoya Jobs</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4">
            The Right Talent, <span className="text-[#2b78ac]">Right Now.</span>
          </h2>
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
            Connect with opportunities that match your skills.
          </p>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Job Title Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Job Title / Keywords"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg"
                />
              </div>

              {/* Location Dropdown */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                  <option value="">Select Location</option>
                  <option value="addis-ababa">Addis Ababa</option>
                  <option value="oromia">Oromia</option>
                  <option value="amhara">Amhara</option>
                  <option value="tigray">Tigray</option>
                  <option value="somali">Somali</option>
                  <option value="afar">Afar</option>
                  <option value="benishangul-gumuz">Benishangul-Gumuz</option>
                  <option value="gambela">Gambela</option>
                  <option value="harari">Harari</option>
                  <option value="sidama">Sidama</option>
                  <option value="snnpr">SNNPR</option>
                  <option value="dire-dawa">Dire Dawa</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold shadow-lg">
                <Search className="w-5 h-5" />
                <span>Search Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;