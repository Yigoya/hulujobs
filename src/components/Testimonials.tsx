import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Nakamura',
      role: 'Software Developer',
      company: 'TechCorp',
      avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'HuluHulu Jobs helped me land my dream job in just 2 weeks. The platform is user-friendly and the job matches were perfect for my skills.',
    },
    {
      name: 'David Musoke',
      role: 'Marketing Manager',
      company: 'Brand Solutions',
      avatar: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The quality of employers on this platform is exceptional. I found multiple opportunities that aligned with my career goals.',
    },
    {
      name: 'Grace Achieng',
      role: 'Project Manager',
      company: 'BuildCorp',
      avatar: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'Outstanding service! The job alerts feature kept me updated on new opportunities, and the application process was seamless.',
    },
  ];

  const employers = [
    'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2',
    'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2',
    'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2',
    'https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2',
    'https://images.pexels.com/photos/3182803/pexels-photo-3182803.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2',
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied job seekers who found their perfect match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 relative"
            >
              <div className="absolute -top-4 left-6">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="pt-4 mb-4">
                {/* <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div> */}
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employer Logos */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Trusted by Leading Employers
          </h3>
          <div className="flex justify-center items-center space-x-8 overflow-x-auto">
            {employers.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Employer ${index + 1}`}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;