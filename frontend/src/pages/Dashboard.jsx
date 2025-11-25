import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Target,
  Award,
  User,
  Building,
  RefreshCw,
  Sparkles,
  Star,
  ArrowRight
} from 'lucide-react';
import useScrollAnimation from '../components/useScrollAnimation';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Scroll animation hooks for different sections
  // const [headerRef, headerVisible] = useScrollAnimation();
  // const [statsRef, statsVisible] = useScrollAnimation();
  // const [jobsRef, jobsVisible] = useScrollAnimation();
  // const [applicationsRef, applicationsVisible] = useScrollAnimation();

  // Temporary: disable scroll animations to prevent null reference errors
  const headerRef = null;
  const headerVisible = true;
  const statsRef = null;
  const statsVisible = true;
  const jobsRef = null;
  const jobsVisible = true;
  const applicationsRef = null;
  const applicationsVisible = true;

  useEffect(() => {
    if (user) {
      if (user.role === 'candidate') {
        loadCandidateData();
      } else if (user.role === 'employer') {
        loadEmployerData();
        // Auto-refresh employer data every 30 seconds
        const interval = setInterval(() => {
          loadEmployerData(true);
        }, 30000);
        return () => clearInterval(interval);
      } else if (user.role === 'consultant') {
        loadConsultantData();
      }
    }
  }, [user]);

  const loadCandidateData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        axios.get('/api/jobs').catch(err => {
          console.error('Error loading jobs:', err);
          return { data: [] };
        }),
        axios.get('/api/applications/candidate').catch(err => {
          console.error('Error loading applications:', err);
          return { data: [] };
        })
      ]);
      setJobs((jobsRes.data || []).filter(job => job && job._id).slice(0, 6));
      setApplications(appsRes.data);

      // Calculate stats
      const totalApplications = appsRes.data.length;
      const acceptedApplications = appsRes.data.filter(app => app.status === 'accepted').length;
      const pendingApplications = appsRes.data.filter(app => app.status === 'pending').length;

      setStats({
        totalApplications,
        acceptedApplications,
        pendingApplications,
        successRate: totalApplications > 0 ? Math.round((acceptedApplications / totalApplications) * 100) : 0
      });
    } catch (err) {
      console.error('Error in loadCandidateData:', err);
      // Set default stats to prevent white page
      setStats({
        totalApplications: 0,
        acceptedApplications: 0,
        pendingApplications: 0,
        successRate: 0
      });
      setJobs([]);
      setApplications([]);
    }
    setLoading(false);
  };

  const loadEmployerData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const res = await axios.get(`/api/jobs/employer/${user.id || user._id}`).catch(err => {
        console.error('Error loading employer jobs:', err);
        return { data: [] };
      });
      setJobs((res.data || []).filter(job => job && job._id));

      // Calculate stats
      const totalJobs = res.data.length;
      const totalApplications = res.data.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
      const activeJobs = res.data.filter(job => new Date(job.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

      setStats({
        totalJobs,
        totalApplications,
        activeJobs,
        avgApplications: totalJobs > 0 ? Math.round(totalApplications / totalJobs) : 0
      });
    } catch (err) {
      console.error('Error in loadEmployerData:', err);
      // Set default stats to prevent white page
      setStats({
        totalJobs: 0,
        totalApplications: 0,
        activeJobs: 0,
        avgApplications: 0
      });
      setJobs([]);
    }
    if (isRefresh) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  };

  const loadConsultantData = async () => {
    try {
      const [myJobsRes, usersRes, allJobsRes] = await Promise.all([
        axios.get(`/api/jobs/employer/${user.id || user._id}`).catch(err => {
          console.error('Error loading consultant jobs:', err);
          return { data: [] };
        }),
        axios.get('/api/users').catch(err => {
          console.error('Error loading users:', err);
          return { data: [] };
        }),
        axios.get('/api/jobs').catch(err => {
          console.error('Error loading all jobs:', err);
          return { data: [] };
        })
      ]);

      setJobs((myJobsRes.data || []).filter(job => job && job._id));

      // Get all applications for consultant's jobs
      const applicationsPromises = (myJobsRes.data || []).map(job =>
        axios.get(`/api/applications/job/${job._id}`).catch(err => {
          console.error(`Error loading applications for job ${job._id}:`, err);
          return { data: [] };
        })
      );
      const applicationsResponses = await Promise.all(applicationsPromises);
      const allApplications = applicationsResponses.flatMap(response => response.data || []);

      // Filter out any invalid applications
      const validApplications = allApplications.filter(app =>
        app && app._id && app.candidate && app.job
      );

      setApplications(validApplications);

      // Calculate consultant-specific stats
      const totalJobsPosted = (myJobsRes.data || []).length;
      const totalApplications = validApplications.length;
      const pendingApplications = validApplications.filter(app => app.status === 'pending').length;
      const acceptedApplications = validApplications.filter(app => app.status === 'accepted').length;
      const recentApplications = validApplications.filter(app =>
        new Date(app.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length;

      // Platform stats
      const totalUsers = (usersRes.data || []).length;
      const totalPlatformJobs = (allJobsRes.data || []).length;
      const candidates = (usersRes.data || []).filter(u => u.role === 'candidate').length;
      const employers = (usersRes.data || []).filter(u => u.role === 'employer').length;

      setStats({
        totalJobsPosted,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        recentApplications,
        totalUsers,
        totalPlatformJobs,
        candidates,
        employers,
        successRate: totalApplications > 0 ? Math.round((acceptedApplications / totalApplications) * 100) : 0
      });
    } catch (err) {
      console.error('Error in loadConsultantData:', err);
      // Set default empty stats to prevent white page
      setStats({
        totalJobsPosted: 0,
        totalApplications: 0,
        pendingApplications: 0,
        acceptedApplications: 0,
        recentApplications: 0,
        totalUsers: 0,
        totalPlatformJobs: 0,
        candidates: 0,
        employers: 0,
        successRate: 0
      });
      setJobs([]);
      setApplications([]);
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-4xl text-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Please login to access your dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to view your dashboard</p>
          <Link to="/login" className="btn-primary inline-block">
            Login
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`flex items-center justify-between animate-on-scroll transition-all duration-700 ${headerVisible ? 'visible' : ''}`}>
            <div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                Welcome back,
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user.name}!
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {user.role === 'candidate' && 'Ready to find your next opportunity?'}
                {user.role === 'employer' && (
                  <span className="flex items-center">
                    Manage your job postings and find great talent.
                    <span className="ml-3 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 text-green-800 dark:text-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Live Dashboard
                    </span>
                  </span>
                )}
                {user.role === 'consultant' && 'Manage your job postings and oversee platform applications.'}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div ref={statsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${statsVisible ? 'visible' : ''}`}>
          {user.role === 'candidate' && (
            <>
              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Total Applications</p>
                    <p className="text-4xl font-black text-gray-900 dark:text-white mb-1">{stats.totalApplications || 0}</p>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Active</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Accepted</p>
                    <p className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">{stats.acceptedApplications || 0}</p>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{stats.successRate || 0}% Success Rate</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Pending</p>
                    <p className="text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-1">{stats.pendingApplications || 0}</p>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">In Review</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Success Rate</p>
                    <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{stats.successRate || 0}%</p>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <Target className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Performance</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>
            </>
          )}

          {user.role === 'employer' && (
            <>
              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Active Jobs</p>
                    <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">{stats.activeJobs || 0}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Posted</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Total Applications</p>
                    <p className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">{stats.totalApplications || 0}</p>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Received</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Avg Applications</p>
                    <p className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">{stats.avgApplications || 0}</p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Per Job</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Total Jobs</p>
                    <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{stats.totalJobs || 0}</p>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Posted</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>
            </>
          )}

          {user.role === 'employer' && !user.isApproved && (
            <div className="card-premium p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-yellow-600 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Account Pending Approval</h3>
                  <p className="text-yellow-700 mt-1">
                    Your employer account is currently pending approval from an administrator.
                    Once approved, you'll be able to post jobs and manage your company profile.
                  </p>
                  <p className="text-sm text-yellow-600 mt-2">
                    Please contact support if you haven't received approval within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {user.role === 'consultant' && (
            <>
              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Jobs Posted</p>
                    <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">{stats.totalJobsPosted || 0}</p>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Active postings</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Total Applications</p>
                    <p className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">{stats.totalApplications || 0}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{stats.pendingApplications || 0} pending review</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Success Rate</p>
                    <p className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">{stats.successRate || 0}%</p>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{stats.acceptedApplications || 0} accepted</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>

              <div className="relative group card-premium p-8 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Platform Overview</p>
                    <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{stats.totalUsers || 0}</p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{stats.candidates || 0} candidates, {stats.employers || 0} employers</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Jobs / My Jobs */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.role === 'candidate' ? 'Recent Jobs' : 'My Job Postings'}
              </h2>
              <div className="flex items-center space-x-3">
                {user.role === 'employer' && (
                  <button
                    onClick={() => loadEmployerData(true)}
                    disabled={refreshing}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                  </button>
                )}
                {(user.role === 'employer' || user.role === 'consultant') && (user.role === 'consultant' || (user.role === 'employer' && user.isApproved)) && (
                  <Link to="/jobs/new" className="btn-primary flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Post Job</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {user.role === 'candidate' ? 'No jobs available yet' : 'No job postings yet'}
                  </p>
                  {(user.role === 'employer' || user.role === 'consultant') && (user.role === 'consultant' || (user.role === 'employer' && user.isApproved)) && (
                    <Link to="/jobs/new" className="btn-primary">
                      Post Your First Job
                    </Link>
                  )}
                </div>
              ) : (
                jobs.filter(job => job && job._id && job.title && job.company).map((job, index) => (
                  <div
                    key={job._id}
                    className="relative group card-premium p-6 hover:scale-[1.02] transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                    </div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{job.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{job.company}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{job.location || 'Location not specified'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{job.date ? new Date(job.date).toLocaleDateString() : 'Date not available'}</span>
                          </div>
                          {user.role !== 'candidate' && (
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium">{job.applications?.length || 0} applications</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/jobs/${job._id}`}
                        className="relative group/btn btn-primary flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Eye className="w-5 h-5" />
                        <span>View Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                  </div>
                ))
              )}
            </div>

            {user.role === 'candidate' && jobs.length > 0 && (
              <div className="mt-6 text-center">
                <Link to="/jobs" className="btn-secondary">
                  View All Jobs
                </Link>
              </div>
            )}
          </div>

          {/* Recent Applications - Consultant */}
          {user.role === 'consultant' && (
            <div className="card-premium p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>

              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No applications received yet</p>
                    <p className="text-sm text-gray-500">Applications for your posted jobs will appear here</p>
                  </div>
                ) : (
                  applications.slice(0, 5).map((app, index) => (
                    <div key={app._id || Math.random()} className="relative group card-premium p-6 hover:scale-[1.02] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                      </div>
                      <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {app.candidate?.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{app.candidate?.name || 'Unknown Candidate'}</h3>
                              <p className="text-gray-600 dark:text-gray-400 font-medium">{app.job?.title || 'Unknown Job'} at {app.job?.company || 'Unknown Company'}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium">Applied {app.date ? new Date(app.date).toLocaleDateString() : 'Unknown Date'}</span>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
                              app.status === 'pending' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                              app.status === 'accepted' ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' :
                              'bg-gradient-to-r from-red-400 to-pink-400 text-white'
                            } shadow-lg`}>
                              {app.status || 'unknown'}
                            </div>
                          </div>
                        </div>
                        <Link
                          to={`/jobs/${app.job?._id || ''}`}
                          className="relative group/btn btn-primary flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Eye className="w-5 h-5" />
                          <span>Review</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                    </div>
                  ))
                )}
              </div>

              {applications.length > 5 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Showing 5 of {applications.length} applications
                  </p>
                  <Link to="/admin" className="btn-secondary">
                    View All Applications
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions - Consultant */}
          {user.role === 'consultant' && (
            <div className="card-premium p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  to="/jobs/new"
                  className="relative group card-premium p-6 hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                  </div>
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Post New Job</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">Create a new job posting</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                </Link>

                <Link
                  to="/admin"
                  className="relative group card-premium p-6 hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                  </div>
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Platform Admin</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">Manage users and jobs</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                </Link>

                <Link
                  to="/jobs"
                  className="relative group card-premium p-6 hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                  </div>
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Browse All Jobs</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">View all job postings</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                </Link>

                <div className="relative group card-premium p-6 hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                  </div>
                  <div className="relative flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Analytics</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">View hiring insights</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                </div>
              </div>
            </div>
          )}

          {/* Applications / Profile Completion */}
          {user.role === 'candidate' && (
            <div className="card-premium p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>

              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No applications yet</p>
                    <Link to="/jobs" className="btn-primary">
                      Browse Jobs
                    </Link>
                  </div>
                ) : (
                  applications.slice(0, 5).filter(app => app && app._id && app.job && app.job.title).map((app) => (
                    <div key={app._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{app.job.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{app.job.company}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Profile Completion */}
          <div className="card-premium p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Status</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.profile?.bio ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {user.profile?.bio ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Bio</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tell us about yourself</p>
                  </div>
                </div>
                <Link to="/profile" className="btn-secondary">
                  {user.profile?.bio ? 'Edit' : 'Add'}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.profile?.skills?.length > 0 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {user.profile?.skills?.length > 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Skills</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Showcase your expertise</p>
                  </div>
                </div>
                <Link to="/profile" className="btn-secondary">
                  {user.profile?.skills?.length > 0 ? 'Edit' : 'Add'}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.profile?.experience ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {user.profile?.experience ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Experience</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share your work history</p>
                  </div>
                </div>
                <Link to="/profile" className="btn-secondary">
                  {user.profile?.experience ? 'Edit' : 'Add'}
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Complete your profile</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Increase your chances of getting hired</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;