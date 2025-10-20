import React from 'react';
import { UserPlus, Search, FileText, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up for free and build your professional profile in minutes.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Search,
      title: 'Search Jobs',
      description: 'Browse thousands of job opportunities that match your skills.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: 'Apply Instantly',
      description: 'Submit your application with just one click using your profile.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: CheckCircle,
      title: 'Get Hired',
      description: 'Connect with employers and land your dream job faster.',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your next opportunity has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform -translate-x-1/2 z-0">
                  <div className="w-full h-full bg-gradient-to-r from-blue-200 to-transparent"></div>
                </div>
              )}
              
              <div className="relative z-10">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;