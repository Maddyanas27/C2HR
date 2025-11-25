import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Building, Building2, TrendingUp, Star, ArrowRight, CheckCircle, Sparkles, Zap, Globe, Award, UserCheck, Shield, MapPin } from 'lucide-react';
import useScrollAnimation from '../components/useScrollAnimation';

const Home = () => {
  const [animatedStats, setAnimatedStats] = useState([
    { number: 0, label: "Years Of Experience", target: 10 },
    { number: 0, label: "Clients", target: 200 },
    { number: 0, label: "Jobs", target: 1200 },
    { number: 0, label: "Countries", target: 10 }
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Scroll animation hooks for each section
  const [statsSectionRef, statsVisible] = useScrollAnimation();
  const [servicesSectionRef, servicesVisible] = useScrollAnimation();
  const [employerSectionRef, employerVisible] = useScrollAnimation();
  const [ctaSectionRef, ctaVisible] = useScrollAnimation();

  useEffect(() => {
    const duration = 4000; // 4 seconds - slower animation
    const steps = 60; // 60 fps
    const increment = duration / steps;

    const animateCounters = () => {
      animatedStats.forEach((stat, index) => {
        const target = stat.target;
        const step = target / steps;
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
          stepCount++;
          current += step;

          if (stepCount >= steps) {
            current = target;
            clearInterval(timer);
          }

          setAnimatedStats(prevStats =>
            prevStats.map((s, i) =>
              i === index
                ? {
                    ...s,
                    number: Math.floor(current)
                  }
                : s
            )
          );
        }, increment);
      });
    };

    // Start animation after a short delay
    const startTimer = setTimeout(animateCounters, 500);

    return () => clearTimeout(startTimer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Smart Job Matching",
      description: "AI-powered recommendations that match your skills and preferences perfectly.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Verified Candidates",
      description: "Access to pre-screened, qualified professionals ready to join your team.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Company Branding",
      description: "Showcase your company culture and attract top talent with premium profiles.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Analytics Dashboard",
      description: "Track hiring metrics and optimize your recruitment process with data insights.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 overflow-x-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-32 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-700/80 to-indigo-800/90 backdrop-blur-sm"></div>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/5 rounded-full blur-lg animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-md animate-float-reverse"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-indigo-300/15 to-pink-300/15 rounded-full blur-lg animate-pulse-slow"></div>
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 mb-12 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-6 h-6 bg-yellow-300/30 rounded-full blur-md animate-ping"></div>
            </div>
            <span className="text-white font-semibold text-lg tracking-wide">Recruitment Solutions</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading with Enhanced Animation */}
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl">
              We Focus on
            </span>
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent animate-gradient-x delay-1000 drop-shadow-2xl">
              Your HR
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl mb-16 text-blue-100 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-lg">
            C2HR is proud to be a preferred overseas recruitment agency for firms located in
            <span className="font-bold text-white bg-gradient-to-r from-white/80 to-blue-200/80 bg-clip-text text-transparent"> GCC countries and South East Asia</span>.
            Our highly reputed manpower consultancy firm is based out of Qatar, UAE, India and Malaysia.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center space-x-4">
                <span>Get Premium Consultancy</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link
              to="/about"
              className="group border-2 border-white/40 hover:border-white/80 text-white hover:bg-white/10 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-xl hover:shadow-xl hover:shadow-white/10"
            >
              <div className="flex items-center space-x-4">
                <Award className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>Discover Excellence</span>
              </div>
            </Link>
          </div>

          {/* Premium Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-10 text-white/90">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
              <span className="font-semibold">10+ Years Excellence</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Globe className="w-6 h-6 text-blue-400 animate-spin-slow" />
              <span className="font-semibold">10+ Global Countries</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Users className="w-6 h-6 text-purple-400 animate-bounce-slow" />
              <span className="font-semibold">200+ Clients</span>
            </div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 border-3 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5 shadow-lg">
            <div className="w-1.5 h-4 bg-white/70 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsSectionRef} className="bg-white dark:bg-gray-800 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {animatedStats.map((stat, index) => (
              <div
                key={index}
                className={`text-center animate-on-scroll transition-all duration-700 group ${statsVisible ? 'visible' : ''}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number.toLocaleString()}{stat.suffix || ''}
                  </div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesSectionRef} className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 animate-on-scroll transition-all duration-700 ${servicesVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Our Expertise</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              C2HR
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                C2HR has been passionately dedicated in the field of manpower recruitment for more than
                <span className="font-bold text-blue-600 dark:text-blue-400"> 10 Years</span>.
                Excellence in work structure and a dedicated team of professionals ensure that we are at par with the changing trends of the industry.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Having been pioneers in personnel placement consultancy services, our organizational activities are carried out by a specialized team of experts that live up to the client's expectations and more.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We intend to help employers in catching on the right and most suitable candidate for their organization, a candidate who can essentially prove to be an asset for the success of their firm. Apart from this, we also help myriad of job-seekers to get overseas jobs with remarkable profiles as per their qualification and experience.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative group animate-on-scroll transition-all duration-700 ${servicesVisible ? 'visible' : ''}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="card-premium p-8 text-center h-full hover:scale-105 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {feature.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employer & Job Seeker Section */}
      <div ref={employerSectionRef} className="py-32 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 animate-on-scroll transition-all duration-700 ${employerVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-full px-6 py-3 mb-8">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-800 dark:text-green-200">Join Our Network</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Whether you're an employer seeking top talent or a job seeker looking for your next career move,
              C2HR connects you with the right opportunities in the GCC and South East Asia regions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Employers */}
            <div className={`relative group animate-on-scroll transition-all duration-700 ${employerVisible ? 'visible' : ''}`}>
              <div className="card-premium p-12 text-center h-full hover:scale-105 transition-all duration-300">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  For Employers
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Are you a recruiter or employer looking to hire exceptional talent for your organization?
                  Our specialized team ensures you get the perfect candidates that drive your business success.
                </p>

                <Link
                  to="/employers"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Hire Talent</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
              </div>
            </div>

            {/* Job Seekers */}
            <div className={`relative group animate-on-scroll transition-all duration-700 ${employerVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
              <div className="card-premium p-12 text-center h-full hover:scale-105 transition-all duration-300">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <UserCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Job Seekers
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Ready to take your career to the next level? Join thousands of professionals who have found
                  their dream jobs in the GCC and South East Asia through C2HR's expert placement services.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Find Jobs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaSectionRef} className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        <div className={`relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-on-scroll transition-all duration-700 ${ctaVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Award className="w-6 h-6 text-white" />
            <span className="text-sm font-semibold text-white">Trusted by Industry Leaders</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Transform
            <span className="block">
              Your Recruitment Journey?
            </span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <p className="text-xl text-blue-100 leading-relaxed">
              We believe in the value that our functions add to a business. We feel that this specialist part of HR is often unrecognised for its contribution to the profitability and success of a business.
            </p>
            <p className="text-lg text-blue-200 leading-relaxed">
              Join the thousands of employers and job seekers who have transformed their careers and businesses with C2HR's expert recruitment services across the GCC and South East Asia regions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center space-x-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105"
            >
              <span className="text-lg">Get Expert Consultancy</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center space-x-3 bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-lg">Learn More About Us</span>
              <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-2 text-blue-100">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">10+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <Users className="w-5 h-5" />
              <span className="font-semibold">1000+ Successful Placements</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">GCC & SEA Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;