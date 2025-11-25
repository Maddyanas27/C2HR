import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Target,
  Award,
  Heart,
  Globe,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Trust & Transparency",
      description: "We believe in building trust through transparent processes and honest communication."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "People First",
      description: "Our focus is always on people - connecting the right talent with the right opportunities."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Innovation",
      description: "We leverage cutting-edge technology to revolutionize the recruitment industry."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Global Reach",
      description: "Connecting talent and opportunities across borders and cultures worldwide."
    }
  ];

  const milestones = [
    { year: "2014", title: "Founded", description: "C2HR was established as a manpower recruitment consultancy" },
    { year: "2016", title: "GCC Expansion", description: "Expanded operations to serve GCC countries and South East Asia" },
    { year: "2018", title: "Regional Offices", description: "Opened offices in Qatar, UAE, Malaysia, and India" },
    { year: "2020", title: "Digital Transformation", description: "Launched online platforms for overseas recruitment" },
    { year: "2022", title: "200+ Clients", description: "Successfully served over 200 clients across multiple countries" },
    { year: "2024", title: "10 Years Excellence", description: "Celebrated 10 years of excellence in manpower recruitment" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image: "RK",
      bio: "Former HR Director at Fortune 500 companies with 15+ years of recruitment experience."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "PS",
      bio: "Tech innovator with expertise in AI and machine learning for HR solutions."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "MC",
      bio: "Operations expert ensuring seamless user experience and platform reliability."
    },
    {
      name: "Sarah Johnson",
      role: "VP of Talent",
      image: "SJ",
      bio: "Talent acquisition specialist focused on building strong employer-employee relationships."
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
              About C2HR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Preferred Overseas Recruitment Agency
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              C2HR is proud to be a preferred overseas recruitment agency for firms located in GCC countries and South East Asia. Our highly reputed manpower consultancy firm is based out of Qatar, UAE, India and Malaysia. We act as a bridge between recruitment solutions in Asia and Middle East.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="animate-slide-up">
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-blue-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Our major role is to analyze manpower requirements of our clients and offer them services on that basis, in the form of efficient workforce from their choice of country. We specialize in connecting employers with qualified professionals across GCC countries and South East Asia.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Through our extensive network and expertise in international recruitment, we ensure that our clients receive the best talent available in the market, helping them achieve their business objectives and growth targets.
              </p>
            </div>

            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-6">
                <Award className="w-12 h-12 text-green-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                To be the world's most trusted and innovative recruitment platform, setting new standards
                for how talent and opportunities connect globally. We envision a future where every individual
                can find work that fulfills their potential and every organization can access the talent they need.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                By leveraging technology and human insight, we're creating a recruitment ecosystem that's
                efficient, fair, and accessible to everyone, regardless of location or background.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a simple idea to a global platform, here's how C2HR came to be
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-premium p-8 mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                C2HR was born from the frustration of traditional recruitment processes. Our founders, experienced
                HR professionals, witnessed firsthand how outdated methods were failing both employers and job seekers.
                The recruitment industry was plagued by inefficiencies, bias, and poor user experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                In 2020, we set out to change this landscape. Combining deep industry knowledge with cutting-edge
                technology, we built a platform that puts people first. Our AI-powered matching algorithms ensure
                that candidates find roles that truly fit their skills and aspirations, while employers access
                qualified talent quickly and efficiently.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, C2HR serves thousands of users across the globe, from startups to Fortune 500 companies.
                We're proud of the careers we've helped launch and the businesses we've helped grow. But our
                journey is just beginning – we're constantly innovating to make recruitment better for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-premium p-6 text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Key milestones in our growth and innovation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-premium p-6 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 absolute left-1/2 transform -translate-x-1/2"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The passionate professionals driving C2HR's mission forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card-premium p-6 text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{member.image}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-50 mb-8">
            Be part of the future of recruitment. Whether you're seeking talent or opportunity, C2HR is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Join C2HR Today</span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;