import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Send,
  User,
  Mail,
  Phone,
  Star,
  Sparkles,
  ArrowRight,
  Building2
} from 'lucide-react';
import useScrollAnimation from '../components/useScrollAnimation';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { user, bookmarkJob, unbookmarkJob, checkBookmarkStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  // Scroll animation hooks for different sections
  // const [headerRef, headerVisible] = useScrollAnimation();
  // const [jobHeaderRef, jobHeaderVisible] = useScrollAnimation();
  // const [descriptionRef, descriptionVisible] = useScrollAnimation();
  // const [requirementsRef, requirementsVisible] = useScrollAnimation();
  // const [companyRef, companyVisible] = useScrollAnimation();
  // const [sidebarRef, sidebarVisible] = useScrollAnimation();

  // Temporary: disable scroll animations to prevent null reference errors
  const headerRef = null;
  const headerVisible = true;
  const jobHeaderRef = null;
  const jobHeaderVisible = true;
  const descriptionRef = null;
  const descriptionVisible = true;
  const requirementsRef = null;
  const requirementsVisible = true;
  const companyRef = null;
  const companyVisible = true;
  const sidebarRef = null;
  const sidebarVisible = true;

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);

      // Load applications if employer or consultant
      if (user && (user.role === 'employer' || user.role === 'consultant')) {
        const appsRes = await axios.get(`/api/applications/job/${id}`);
        setApplications(appsRes.data);
      }

      // Check bookmark status if candidate
      if (user && user.role === 'candidate') {
        try {
          const bookmarkStatus = await checkBookmarkStatus(id);
          setIsSaved(bookmarkStatus.isBookmarked);
        } catch (err) {
          console.error('Error checking bookmark status:', err);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await axios.post('/api/applications', {
        jobId: id,
        coverLetter
      });
      alert('Application submitted successfully!');
      setShowApplyModal(false);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to submit application');
    }
    setApplying(false);
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await axios.put(`/api/applications/${appId}/status`, { status });
      loadJob(); // Reload to get updated data
    } catch (err) {
      alert('Failed to update application status');
    }
  };

  const toggleSave = async () => {
    if (!user || user.role !== 'candidate') {
      alert('Please login as a candidate to bookmark jobs');
      return;
    }

    setBookmarkLoading(true);

    try {
      if (isSaved) {
        await unbookmarkJob(id);
        setIsSaved(false);
      } else {
        await bookmarkJob(id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      alert('Failed to update bookmark. Please try again.');
    }

    setBookmarkLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-4xl text-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Job not found</h3>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
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
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex items-center justify-between animate-on-scroll transition-all duration-700 ${headerVisible ? 'visible' : ''}`}>
            <Link
              to="/jobs"
              className="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Jobs</span>
            </Link>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSave}
                disabled={bookmarkLoading}
                className={`p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSaved
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-blue-500/20'
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-blue-500/20'
                }`}
              >
                {bookmarkLoading ? (
                  <div className="loading-dots-small"></div>
                ) : isSaved ? (
                  <BookmarkCheck className="w-6 h-6" />
                ) : (
                  <Bookmark className="w-6 h-6" />
                )}
              </button>
              <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300 hover:shadow-lg">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div ref={jobHeaderRef} className={`relative group card-premium p-10 hover:scale-[1.01] transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 ${jobHeaderVisible ? 'visible' : ''}`}>
              {/* Premium gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
              </div>

              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight">{job.title}</h1>
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5 text-yellow-600 fill-current" />
                        <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">Premium</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-2xl text-gray-700 dark:text-gray-300 font-bold">{job.company}</span>
                        <p className="text-gray-500 dark:text-gray-400">Leading employer in the industry</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-2xl">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Location</p>
                          <p className="text-gray-900 dark:text-white font-semibold">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/20 px-6 py-4 rounded-2xl">
                        <Clock className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Job Type</p>
                          <p className="text-gray-900 dark:text-white font-semibold">{job.type}</p>
                        </div>
                      </div>
                      {job.salary && (
                        <div className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/20 px-6 py-4 rounded-2xl">
                          <DollarSign className="w-6 h-6 text-purple-600" />
                          <div>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Salary</p>
                            <p className="text-gray-900 dark:text-white font-semibold">{job.salary}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-3 bg-orange-50 dark:bg-orange-900/20 px-6 py-4 rounded-2xl">
                        <Users className="w-6 h-6 text-orange-600" />
                        <div>
                          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Applicants</p>
                          <p className="text-gray-900 dark:text-white font-semibold">{job.applications?.length || 0} applied</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Posted {new Date(job.date).toLocaleDateString()}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button for Candidates */}
                {user && user.role === 'candidate' && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={() => setShowApplyModal(true)}
                      className="group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden flex-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative flex items-center justify-center space-x-3">
                        <Send className="w-6 h-6" />
                        <span>Apply Now</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    <button className="group/btn relative bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative">Save Job</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
            </div>

            {/* Job Description */}
            <div ref={descriptionRef} className={`card-premium p-10 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${descriptionVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Job Description</h2>
              </div>
              <div className="prose prose-xl max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div ref={requirementsRef} className={`card-premium p-10 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${requirementsVisible ? 'visible' : ''}`} style={{animationDelay: '0.4s'}}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Requirements</h2>
                </div>
                <div className="space-y-4">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            <div ref={companyRef} className={`card-premium p-10 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${companyVisible ? 'visible' : ''}`} style={{animationDelay: '0.6s'}}>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">About {job.company}</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-8 rounded-3xl border border-white/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.company}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Leading company in the industry</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  We're looking for talented individuals to join our growing team and help us build amazing products that make a difference in people's lives.
                </p>
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Verified Employer</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">Top Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className={`space-y-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${sidebarVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
            {/* Quick Actions */}
            {user && user.role === 'candidate' && (
              <div className="card-premium p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Apply Now</span>
                    </span>
                  </button>
                  <button className="w-full group/btn relative bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center">
                      <Bookmark className="w-5 h-5 mr-2" />
                      Save Job
                    </span>
                  </button>
                  <button className="w-full group/btn relative bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 text-gray-700 dark:text-gray-300 hover:text-green-600 px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center">
                      <Share2 className="w-5 h-5 mr-2" />
                      Share Job
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Job Summary */}
            <div className="card-premium p-8 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Job Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">{new Date(job.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">{job.applications?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900">Senior Developer</h4>
                  <p className="text-sm text-gray-600">Tech Corp • Remote</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900">Full Stack Engineer</h4>
                  <p className="text-sm text-gray-600">Startup Inc • New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employer/Consultant Applications View */}
        {user && (user.role === 'employer' || user.role === 'consultant') && (
          <div className="mt-8">
            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Applications ({applications.length})
              </h2>

              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications received yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {applications.map((app) => (
                    <div key={app._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{app.candidate.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{app.candidate.email}</span>
                              </div>
                              {app.candidate.profile?.phone && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-4 h-4" />
                                  <span>{app.candidate.profile.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateApplicationStatus(app._id, 'accepted')}
                            className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app._id, 'rejected')}
                            className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>

                      {app.candidate.profile?.skills && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {app.candidate.profile.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {app.coverLetter && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Cover Letter:</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{app.coverLetter}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Applied on {new Date(app.date).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for {job.title}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="input-premium"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="flex-1 btn-primary"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;