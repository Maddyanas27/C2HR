import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building,
  Search,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Award
} from 'lucide-react';

const Services = () => {
  const jobSeekerServices = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Smart Job Matching",
      description: "AI-powered algorithms analyze your skills, experience, and preferences to recommend the perfect job opportunities.",
      features: ["Personalized recommendations", "Skills-based matching", "Location preferences", "Salary insights"]
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Resume Optimization",
      description: "Get expert guidance to create compelling resumes that stand out to employers and ATS systems.",
      features: ["ATS-friendly formatting", "Keyword optimization", "Industry-specific templates", "Professional review"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Career Development",
      description: "Access resources and tools to advance your career with personalized development plans and skill recommendations.",
      features: ["Career path planning", "Skill gap analysis", "Learning recommendations", "Progress tracking"]
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "Profile Protection",
      description: "Advanced security measures protect your personal information while giving you control over your data.",
      features: ["Data encryption", "Privacy controls", "Secure communication", "Profile visibility settings"]
    }
  ];

  const employerServices = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Talent Acquisition",
      description: "Access a vast pool of qualified candidates with our advanced search and filtering capabilities.",
      features: ["Advanced candidate search", "Bulk messaging", "Candidate shortlisting", "Interview scheduling"]
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Employer Branding",
      description: "Showcase your company culture and attract top talent with premium profile features and company pages.",
      features: ["Company profile pages", "Culture showcases", "Employee testimonials", "Brand storytelling"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Analytics & Insights",
      description: "Track hiring metrics and optimize your recruitment process with comprehensive analytics dashboards.",
      features: ["Hiring funnel analytics", "Time-to-hire metrics", "Candidate quality scores", "ROI tracking"]
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Automated Workflows",
      description: "Streamline your hiring process with automated workflows, reminders, and follow-up systems.",
      features: ["Automated interviews", "Follow-up reminders", "Application tracking", "Offer management"]
    }
  ];

  const consultingServices = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "HR Strategy Consulting",
      description: "Expert guidance on HR strategy, talent management, and organizational development.",
      features: ["HR strategy planning", "Talent management", "Organizational development", "Change management"]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Global Recruitment",
      description: "Navigate international recruitment with our expertise in global hiring practices and compliance.",
      features: ["International compliance", "Visa guidance", "Cultural adaptation", "Global networking"]
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Executive Search",
      description: "Specialized recruitment services for C-level and senior management positions.",
      features: ["Executive networking", "Confidential searches", "Leadership assessment", "Succession planning"]
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "Training & Development",
      description: "Comprehensive training programs for HR professionals and organizational development.",
      features: ["HR certification programs", "Leadership training", "Diversity & inclusion", "Compliance training"]
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: ["Job search & applications", "Basic profile", "Email notifications", "Community access"],
      buttonText: "Get Started",
      buttonLink: "/register",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For serious job seekers",
      features: ["Everything in Basic", "Resume optimization", "Priority support", "Career counseling", "Skill assessments"],
      buttonText: "Start Free Trial",
      buttonLink: "/register",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations",
      features: ["Everything in Professional", "Company branding", "Advanced analytics", "API access", "Dedicated support"],
      buttonText: "Contact Sales",
      buttonLink: "/contact",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Comprehensive Solutions
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                for Every Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              From job seekers to enterprises, C2HR provides tailored solutions that drive success
              in today's competitive talent market.
            </p>
          </div>
        </div>
      </div>

      {/* Job Seeker Services */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              For Job Seekers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Powerful tools and resources to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {jobSeekerServices.map((service, index) => (
              <div
                key={index}
                className="card-premium p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employer Services */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              For Employers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Advanced recruitment tools to find and hire top talent efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {employerServices.map((service, index) => (
              <div
                key={index}
                className="card-premium p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consulting Services */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Consulting Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Expert guidance and strategic consulting for HR and recruitment challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {consultingServices.map((service, index) => (
              <div
                key={index}
                className="card-premium p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Flexible pricing options to suit your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card-premium p-8 text-center animate-slide-up relative ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                <ul className="text-left mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.buttonLink}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-50 mb-8">
            Join thousands of users who trust C2HR for their recruitment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Start Your Journey</span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;