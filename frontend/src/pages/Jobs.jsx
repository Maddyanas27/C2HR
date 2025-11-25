import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Bookmark, Clock, DollarSign, Building2, ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import useScrollAnimation from '../components/useScrollAnimation';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Scroll animation hooks for different sections
  // const [headerRef, headerVisible] = useScrollAnimation();
  // const [searchRef, searchVisible] = useScrollAnimation();
  // const [jobsRef, jobsVisible] = useScrollAnimation();

  // Temporary: disable scroll animations to prevent white page
  const headerRef = null;
  const headerVisible = true;
  const searchRef = null;
  const searchVisible = true;
  const jobsRef = null;
  const jobsVisible = true;

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, locationFilter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <div className="loading-dots text-3xl text-white"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Finding Amazing Jobs</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load the latest opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center relative z-10 max-w-md mx-4">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <div className="text-4xl">⚠️</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-red-600 dark:text-red-400 mb-6 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">{error}</p>
          <button
            onClick={loadJobs}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <div className="loading-dots-small"></div>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/3 to-cyan-400/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-white/20 dark:border-gray-700/20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-slide-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mr-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                  Find Your
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Premium Opportunities Await</span>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Discover amazing opportunities from top companies worldwide. Your next career breakthrough starts here with our curated selection of premium positions.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Jobs</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Top Companies</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="card-premium p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Search & Filter Jobs</h2>
            <p className="text-gray-600 dark:text-gray-400">Find the perfect opportunity that matches your skills and preferences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-premium pl-20 pr-6 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Location (e.g., New York, Remote)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="input-premium pl-20 pr-6 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{filteredJobs.length} jobs found</span>
            </div>
            {(searchTerm || locationFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Latest Opportunities</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            {filteredJobs.length === 0 ? 'No Jobs Found' : `${filteredJobs.length} Amazing ${filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'}`}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {filteredJobs.length === 0
              ? 'Try adjusting your search criteria or check back later for new opportunities.'
              : 'Explore these premium positions from leading companies worldwide.'
            }
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <div
                key={job._id}
                className="relative group card-premium p-8 hover:scale-105 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 1}s` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>

                <div className="relative">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {job.title || 'Untitled Job'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company || 'Unknown Company'}</p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{job.location || 'Location not specified'}</span>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{job.type || 'Type not specified'}</span>
                        </div>

                        {job.salary && (
                          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                              <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{job.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {job.description || 'No description available'}
                    </p>
                  </div>

                  {/* Job Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Posted {new Date(job.createdAt || job.date).toLocaleDateString()}</span>
                    </div>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="relative group/btn btn-primary flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Jobs Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              We couldn't find any jobs matching your criteria. Try adjusting your search terms or location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                }}
                className="btn-secondary"
              >
                Clear All Filters
              </button>
              <Link to="/" className="btn-primary">
                Browse Home Page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
