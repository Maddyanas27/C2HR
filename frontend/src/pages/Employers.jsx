import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  Users,
  TrendingUp,
  Target,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  BarChart3,
  UserCheck,
  Briefcase
} from 'lucide-react';

const Employers = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Access to Quality Talent",
      description: "Connect with pre-screened, qualified candidates who match your requirements perfectly.",
      stats: "50K+ Active Candidates"
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Faster Hiring Process",
      description: "Reduce time-to-hire by up to 60% with our AI-powered matching and automated workflows.",
      stats: "60% Faster Hiring"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Better Quality Hires",
      description: "Improve hire quality with data-driven insights and comprehensive candidate assessments.",
      stats: "95% Success Rate"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Advanced Analytics",
      description: "Track hiring metrics, ROI, and optimize your recruitment strategy with detailed insights.",
      stats: "Real-time Analytics"
    }
  ];

  const successStories = [
    {
      company: "TechCorp Solutions",
      logo: "TC",
      industry: "Technology",
      challenge: "Struggled to find qualified developers for remote positions",
      solution: "Used C2HR's AI matching to identify top talent globally",
      results: ["45% reduction in time-to-hire", "30% improvement in hire quality", "Expanded to 15 new markets"],
      testimonial: "C2HR transformed our hiring process. We now find exceptional talent faster than ever before."
    },
    {
      company: "Global Finance Inc",
      logo: "GF",
      industry: "Financial Services",
      challenge: "High turnover in analyst positions",
      solution: "Implemented comprehensive candidate assessment and cultural fit analysis",
      results: ["60% reduction in turnover", "25% increase in productivity", "Improved team satisfaction"],
      testimonial: "The quality of hires has dramatically improved. Our teams are more engaged and productive."
    },
    {
      company: "Healthcare Plus",
      logo: "HP",
      industry: "Healthcare",
      challenge: "Difficulty attracting specialized medical professionals",
      solution: "Leveraged C2HR's network and targeted recruitment campaigns",
      results: ["200+ specialized hires", "Expanded service offerings", "Improved patient care quality"],
      testimonial: "C2HR helped us build a world-class medical team that delivers exceptional patient care."
    }
  ];

  const hiringGuides = [
    {
      title: "Building an Effective Job Description",
      description: "Learn how to write compelling job descriptions that attract the right candidates.",
      readTime: "5 min read",
      category: "Job Posting"
    },
    {
      title: "Conducting Effective Interviews",
      description: "Best practices for interviewing candidates and assessing cultural fit.",
      readTime: "8 min read",
      category: "Interviewing"
    },
    {
      title: "Making Competitive Job Offers",
      description: "Strategies for creating attractive compensation packages that candidates can't refuse.",
      readTime: "6 min read",
      category: "Compensation"
    },
    {
      title: "Onboarding Best Practices",
      description: "Ensure new hires succeed with comprehensive onboarding strategies.",
      readTime: "7 min read",
      category: "Onboarding"
    }
  ];

  const features = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Candidate Screening",
      description: "Automated screening based on skills, experience, and cultural fit"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Job Posting Management",
      description: "Create, manage, and track multiple job postings with ease"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Hiring Analytics",
      description: "Comprehensive dashboards with hiring metrics and insights"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Compliance Tools",
      description: "Built-in compliance features for fair and legal hiring practices"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Interview Scheduling",
      description: "Automated scheduling system with calendar integration"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Employer Branding",
      description: "Showcase your company culture and attract top talent"
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
              Find Exceptional Talent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Build Amazing Teams
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Access thousands of qualified candidates and streamline your hiring process
              with C2HR's comprehensive employer solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <Building className="w-5 h-5" />
                <span>Post a Job</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-lg px-8 py-4"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose C2HR for Hiring?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of companies that trust C2HR to find and hire exceptional talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card-premium p-6 text-center animate-slide-up group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-blue-600">{benefit.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Hiring Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to attract, evaluate, and hire top talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how leading companies transformed their hiring with C2HR
            </p>
          </div>

          <div className="space-y-12">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="card-premium p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                  <div className="lg:w-1/3 mb-6 lg:mb-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{story.logo}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{story.company}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{story.industry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{story.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Results</h4>
                        <ul className="space-y-1">
                          {story.results.map((result, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">
                      "{story.testimonial}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Guides */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hiring Guides & Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Expert insights and best practices to improve your hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {hiringGuides.map((guide, index) => (
              <div
                key={index}
                className="card-premium p-6 animate-slide-up hover:shadow-lg transition-shadow cursor-pointer group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{guide.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    {guide.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{guide.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-50 mb-8">
            Join leading companies that trust C2HR to build exceptional teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Building className="w-5 h-5" />
              <span>Start Hiring Today</span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employers;