import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Building, 
  TrendingUp, 
  Award,
  Users,
  Eye,
  BarChart3,
  Shield,
  Headphones,
  Zap,
  Globe,
  Crown
} from 'lucide-react';

const SubscriptionPlansPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Basic Plan',
      icon: Building,
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: 'Perfect for small businesses and startups',
      popular: false,
      features: [
        '1 active job post',
        '30-day job duration',
        'Basic applicant tracking',
        'Email support',
        'Standard job visibility',
        'Basic analytics',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 50 applications per job',
        'No CV database access',
        'No job highlighting'
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      iconColor: 'text-gray-600'
    },
    {
      name: 'Professional Plan',
      icon: TrendingUp,
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Ideal for growing companies',
      popular: true,
      features: [
        '5 active job posts',
        '60-day job duration',
        'CV search access (100 searches/month)',
        'Highlighted job listings',
        'Advanced analytics & reporting',
        'Priority email support',
        'Company branding on job posts',
        'Candidate filtering tools',
        'Interview scheduling integration',
        'Team collaboration features'
      ],
      limitations: [],
      color: 'border-blue-500 ring-2 ring-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Enterprise Plan',
      icon: Award,
      monthlyPrice: 599,
      yearlyPrice: 5990,
      description: 'For large organizations with high-volume hiring',
      popular: false,
      features: [
        'Unlimited job posts',
        '90-day job duration',
        'Full CV database access (unlimited)',
        'Premium job placement',
        'Dedicated account manager',
        'Custom integrations (ATS, HRIS)',
        'Advanced reporting & analytics',
        'White-label options',
        'API access',
        'Custom workflows',
        'Priority phone support',
        'Onboarding assistance',
        'Training sessions'
      ],
      limitations: [],
      color: 'border-purple-500 ring-2 ring-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      iconColor: 'text-purple-600'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Access to Top Talent',
      description: 'Connect with qualified professionals across all industries'
    },
    {
      icon: Eye,
      title: 'Enhanced Visibility',
      description: 'Get your job posts seen by more candidates with premium placement'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance with detailed insights and reporting'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for all your hiring data'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Get help when you need it with our expert support team'
    },
    {
      icon: Zap,
      title: 'Fast Hiring',
      description: 'Streamlined processes to help you hire faster'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing accordingly.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial for the Professional plan. No credit card required to start.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time. Your plan will remain active until the end of your billing period.'
    },
    {
      question: 'Do you offer custom plans?',
      answer: 'Yes, for large enterprises with specific needs, we can create custom plans. Contact our sales team for more information.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export your data anytime during this period.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          to="/post-job" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Post Job</span>
        </Link>
      </div>

      {/* Hero Section */}
  <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find the right subscription plan to meet your hiring needs and connect with top talent
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-blue-200'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-blue-200'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save up to 17%
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 relative ${plan.color} ${
                plan.popular ? 'transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${plan.iconColor === 'text-blue-600' ? 'bg-blue-100' : plan.iconColor === 'text-purple-600' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <plan.icon className={`w-8 h-8 ${plan.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getPrice(plan).toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-green-600 text-sm font-medium">
                    Save ${getSavings(plan).toLocaleString()} per year
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <li key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonColor} text-white`}
              >
                {plan.name === 'Enterprise Plan' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HuluHulu Jobs?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to find and hire the best talent efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
                <div className="bg-blue-100 p-3 rounded-lg inline-flex mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
  <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Hiring?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join hundreds of companies already using HuluHulu Jobs to find top talent. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Start Free Trial
            </button>
            <Link
              to="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;