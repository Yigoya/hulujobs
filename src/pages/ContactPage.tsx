import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@hulumuyajobs.com',
      subDetails: 'We typically respond within 24 hours',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+251 11 123 4567',
      subDetails: 'Monday to Friday, 9 AM - 6 PM',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Bole Road, Addis Ababa',
      subDetails: 'Ethiopia, East Africa',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      subDetails: 'Sat: 10:00 AM - 4:00 PM',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const departments = [
    {
      icon: Users,
      title: 'Job Seekers Support',
      email: 'jobseekers@hulumuyajobs.com',
      description: 'Help with job applications, profile setup, and career guidance'
    },
    {
      icon: Building,
      title: 'Employer Services',
      email: 'employers@hulumuyajobs.com',
      description: 'Assistance with job posting, recruitment, and hiring solutions'
    },
    {
      icon: MessageSquare,
      title: 'General Inquiries',
      email: 'info@hulumuyajobs.com',
      description: 'General questions, partnerships, and other inquiries'
    }
  ];

  const faqs = [
    {
      question: 'How long does a job post stay active?',
      answer: 'Job posts stay active for 30-90 days depending on your subscription plan. You can also manually close or extend postings as needed.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing accordingly.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted.'
    },
    {
      question: 'Is applicant tracking included?',
      answer: 'Yes, all plans include our applicant tracking system where you can view, sort, and manage all applications in one dashboard.'
    },
    {
      question: 'Do you offer customer support?',
      answer: 'We provide email support for all plans, with priority support for Professional plans and dedicated account managers for Enterprise customers.'
    },
    {
      question: 'Can I post jobs in multiple locations?',
      answer: 'Yes, you can specify multiple locations for each job post, including remote work options to reach a wider talent pool.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
  <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
  <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 bg-opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 bg-opacity-15 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Get in Touch
            </h1>
          </div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-16 relative z-10">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${info.color} flex items-center justify-center`}>
                <info.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-700 font-medium mb-1">{info.details}</p>
              <p className="text-sm text-gray-500">{info.subDetails}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Inquiry
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="jobseeker">Job Seeker Support</option>
                  <option value="employer">Employer Services</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-600">Visit us at our office in Addis Ababa</p>
              </div>
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6177276513!2d38.76063731479!3d9.005401993528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%20Rd%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HuluHulu Jobs Office Location"
                />
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Department Contacts</h3>
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <dept.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{dept.title}</h4>
                      <p className="text-blue-600 font-medium mb-2">{dept.email}</p>
                      <p className="text-sm text-gray-600">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I create a job seeker account?</h3>
                <p className="text-gray-600 text-sm">Click on "Sign up" in the top navigation, fill out your details, and start building your professional profile.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How can employers post jobs?</h3>
                <p className="text-gray-600 text-sm">Contact our employer services team at employers@hulumuyajobs.com to get started with posting your job openings.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is the service free for job seekers?</h3>
                <p className="text-gray-600 text-sm">Yes, creating an account and applying for jobs is completely free for all job seekers.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I reset my password?</h3>
                <p className="text-gray-600 text-sm">Click on "Forgot password" on the login page and follow the instructions sent to your email.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I edit my job application?</h3>
                <p className="text-gray-600 text-sm">Once submitted, applications cannot be edited. However, you can update your profile for future applications.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How long do job postings stay active?</h3>
                <p className="text-gray-600 text-sm">Job postings typically remain active for 30 days, but employers can extend or close them earlier.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
  <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of job seekers and employers who trust HuluHulu Jobs for their career and hiring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Find Jobs
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;