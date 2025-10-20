import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  Star,
  ArrowRight,
  Building,
  Target,
  BarChart3,
  Shield,
  Globe,
  Zap,
  UserPlus,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
  Award,
  Briefcase,
  Eye,
  MessageSquare
} from 'lucide-react';

const PostJobPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Clock,
      title: 'Post Jobs in Minutes',
      description: 'Simple tools to create job listings with maximum reach across all industries.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      title: 'Manage Applicants Easily',
      description: 'View, track, and shortlist applicants from your comprehensive dashboard.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Search,
      title: 'Search & Invite Talent',
      description: 'Access a growing database of active job seekers and invite them directly.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Promote Jobs & Brand',
      description: 'Highlight your employer brand to attract top-tier professionals.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Trusted by Leading Employers',
      description: 'Join hundreds of hiring teams who rely on us for their recruitment needs.'
    },
    {
      icon: Target,
      title: 'Industry-Specific Targeting',
      description: 'Post to over 30 categorized industries with precise targeting.'
    },
    {
      icon: Zap,
      title: 'Built for Efficiency',
      description: 'Streamlined tools for fast hiring decisions and quick turnaround.'
    },
    {
      icon: Globe,
      title: 'Local + Global Reach',
      description: 'Access local talent and remote professionals worldwide.'
    },
    {
      icon: BarChart3,
      title: 'Applicant Management Dashboard',
      description: 'Track all job posts and applications in one centralized place.'
    },
    {
      icon: Award,
      title: 'Quality Candidates',
      description: 'Connect with pre-screened, qualified professionals in your industry.'
    }
  ];

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up and set up your company profile in minutes.'
    },
    {
      number: 2,
      icon: Briefcase,
      title: 'Choose a Plan',
      description: 'Select the subscription plan that fits your hiring needs.'
    },
    {
      number: 3,
      icon: FileText,
      title: 'Post a Job',
      description: 'Create compelling job listings with our easy-to-use tools.'
    },
    {
      number: 4,
      icon: Send,
      title: 'Start Receiving Applications',
      description: 'Review qualified candidates and make hiring decisions faster.'
    }
  ];

  const plans = [
    {
      name: 'Basic Plan',
      icon: Building,
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      features: [
        '1 active job post',
        '30-day job duration',
        'Basic applicant tracking',
        'Email support',
        'Standard job visibility'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional Plan',
      icon: TrendingUp,
      price: '$299',
      period: '/month',
      description: 'Ideal for growing companies',
      features: [
        '5 active job posts',
        '60-day job duration',
        'CV search access',
        'Highlighted job listings',
        'Advanced analytics',
        'Priority support',
        'Company branding'
      ],
      cta: 'Most Popular',
      popular: true,
      color: 'border-blue-500 ring-2 ring-blue-200'
    },
    {
      name: 'Enterprise Plan',
      icon: Award,
      price: '$599',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited job posts',
        '90-day job duration',
        'Full CV database access',
        'Premium job placement',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting',
        'White-label options'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-gray-200'
    }
  ];

  const testimonials = [
    {
      quote: "We filled our senior role in just 2 weeks — simple, effective, and affordable!",
      author: "Sarah Johnson",
      position: "HR Manager",
      company: "TechCorp Ethiopia",
      avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      quote: "The quality of candidates we receive through this platform is exceptional. Highly recommended!",
      author: "Michael Ochieng",
      position: "Recruitment Director",
      company: "Finance Pro Ltd",
      avatar: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      quote: "Best investment we've made for our hiring process. The dashboard makes everything so easy to manage.",
      author: "Grace Nakamura",
      position: "People Operations Lead",
      company: "Innovation Hub",
      avatar: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
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
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
  <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Find Top Talent Faster with{' '}
                <span className="text-blue-200">HuluHulu Jobs</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Reach qualified candidates across all industries with powerful tools tailored for modern hiring teams.
              </p>
              <Link
                to="/subscription-plans"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg group"
              >
                <span>View Subscription Plans</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Professional hiring team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Companies</p>
                    <p className="text-sm text-gray-600">Trust our platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive hiring solutions designed to streamline your recruitment process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100 hover:border-blue-200 group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the competitive advantages that make us the preferred choice for hiring teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <advantage.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with our simple 4-step process and start hiring top talent today
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center relative">
                    <step.icon className="w-8 h-8" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
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
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your hiring needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 relative ${plan.color} ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg inline-flex mb-4">
                    <plan.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from hiring managers who have transformed their recruitment process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 relative border border-gray-100"
              >
                <div className="absolute -top-4 left-6">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="pt-4 mb-4">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our hiring platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
  <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Hire Smarter?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your hiring goals and start connecting with top talent today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="#pricing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              See Plans
            </Link>
            <Link
              to="/signup"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Sign Up as Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostJobPage;