import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
import {
  Users,
  Building,
  Briefcase,
  TrendingUp,
  UserCheck,
  FileText,
  Calendar,
  MapPin,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Shield,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'consultant') {
      navigate('/dashboard');
      return;
    }

    loadData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [candidatesRes, employersRes, jobsRes, applicationsRes] = await Promise.all([
        axios.get('/api/users/candidates').catch(() => ({ data: [] })),
        axios.get('/api/users/employers').catch(() => ({ data: [] })),
        axios.get('/api/jobs').catch(() => ({ data: [] })),
        axios.get('/api/applications').catch(() => ({ data: [] }))
      ]);

      setCandidates(candidatesRes.data || []);
      setEmployers(employersRes.data || []);
      setJobs(jobsRes.data || []);
      setApplications(applicationsRes.data || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
      // Set empty arrays to prevent crashes
      setCandidates([]);
      setEmployers([]);
      setJobs([]);
      setApplications([]);
    }

    if (isRefresh) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadData(true);
  };

  // Calculate stats reactively
  const stats = React.useMemo(() => {
    const totalUsers = candidates.length + employers.length;
    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const activeJobs = jobs.filter(job => job.status === 'active' || !job.status).length;
    const recentApplications = applications.filter(app =>
      new Date(app.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;

    return {
      totalUsers,
      totalJobs,
      totalApplications,
      activeJobs,
      recentApplications,
      candidatesCount: candidates.length,
      employersCount: employers.length
    };
  }, [candidates, employers, jobs, applications]);

  // Generate chart data
  const userGrowthData = React.useMemo(() => {
    try {
      // Group users by month for the last 6 months
      const months = [];
      const candidateCounts = [];
      const employerCounts = [];

      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const monthCandidates = (candidates || []).filter(user =>
          user && user.date && new Date(user.date) >= monthStart && new Date(user.date) <= monthEnd
        ).length;

        const monthEmployers = (employers || []).filter(user =>
          user && user.date && new Date(user.date) >= monthStart && new Date(user.date) <= monthEnd
        ).length;

        months.push(monthName);
        candidateCounts.push(monthCandidates);
        employerCounts.push(monthEmployers);
      }

      return {
        labels: months,
        datasets: [
          {
            label: 'Candidates',
            data: candidateCounts,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
          {
            label: 'Employers',
            data: employerCounts,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
          },
        ],
      };
    } catch (error) {
      console.error('Error generating user growth data:', error);
      return {
        labels: [],
        datasets: []
      };
    }
  }, [candidates, employers]);

  const jobCategoriesData = React.useMemo(() => {
    try {
      // Count jobs by type
      const typeCounts = (jobs || []).reduce((acc, job) => {
        if (!job) return acc;
        const type = job.type || 'full-time';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const colors = {
        'full-time': '#3B82F6',
        'part-time': '#10B981',
        'contract': '#F59E0B',
        'internship': '#EF4444',
      };

      return {
        labels: Object.keys(typeCounts).map(type =>
          type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
        ),
        datasets: [
          {
            data: Object.values(typeCounts),
            backgroundColor: Object.keys(typeCounts).map(type => colors[type] || '#6B7280'),
            borderColor: Object.keys(typeCounts).map(type => colors[type] || '#6B7280'),
            borderWidth: 1,
          },
        ],
      };
    } catch (error) {
      console.error('Error generating job categories data:', error);
      return {
        labels: [],
        datasets: []
      };
    }
  }, [jobs]);

  const filteredCandidates = candidates.filter(candidate =>
    (candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     candidate.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === 'all' || candidate.status === filterRole)
  );

  const filteredEmployers = employers.filter(employer =>
    (employer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employer.profile?.company?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === 'all' || employer.status === filterRole)
  );

  const filteredJobs = jobs.filter(job =>
    (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.company?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === 'all' || job.status === filterRole)
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please login to access admin panel</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in as a consultant to access this page</p>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (user.role !== 'consultant') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Only consultants can access the admin panel</p>
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots-large mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const handleApproveEmployer = async (employerId) => {
    try {
      await axios.put(`/api/users/approve/${employerId}`);
      // Refresh employers data
      const employersRes = await axios.get('/api/users/employers');
      setEmployers(employersRes.data || []);
      alert('Employer approved successfully!');
    } catch (error) {
      console.error('Error approving employer:', error);
      alert('Failed to approve employer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Comprehensive platform analytics and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-500">Auto-refresh: 30s</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="w-4 h-4 mr-1" />
                  {stats.totalJobs} total posted
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <FileText className="w-4 h-4 mr-1" />
                  {stats.recentApplications} this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalApplications > 0 ? Math.round((stats.totalApplications / stats.totalJobs) * 100) : 0}%
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Award className="w-4 h-4 mr-1" />
                  Applications per job
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'candidates', label: 'Candidates', icon: Users },
              { id: 'employers', label: 'Employers', icon: Building },
              { id: 'jobs', label: 'Jobs', icon: Briefcase }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-premium pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="input-premium"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {activeTab === 'overview' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Overview</h2>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth (Last 6 Months)</h3>
                  <div className="h-64">
                    <Bar
                      data={userGrowthData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Categories Distribution</h3>
                  <div className="h-64 flex items-center justify-center">
                    {jobCategoriesData.labels.length > 0 ? (
                      <Pie
                        data={jobCategoriesData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                padding: 20,
                                usePointStyle: true,
                              },
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  const label = context.label || '';
                                  const value = context.parsed || 0;
                                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                  return `${label}: ${value} (${percentage}%)`;
                                }
                              }
                            }
                          },
                        }}
                      />
                    ) : (
                      <div className="text-center">
                        <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No job data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Most Popular Job Type</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {(() => {
                      try {
                        const data = jobCategoriesData.datasets[0]?.data;
                        if (!data || data.length === 0) return 'N/A';
                        const maxIndex = data.indexOf(Math.max(...data));
                        return jobCategoriesData.labels[maxIndex] || 'N/A';
                      } catch {
                        return 'N/A';
                      }
                    })()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(() => {
                      try {
                        const data = jobCategoriesData.datasets[0]?.data;
                        return data && data.length > 0 ? Math.max(...data) : 0;
                      } catch {
                        return 0;
                      }
                    })()} jobs
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">User Registration Trend</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {(() => {
                      try {
                        const candidateData = userGrowthData.datasets[0]?.data?.slice(-2) || [];
                        const employerData = userGrowthData.datasets[1]?.data?.slice(-2) || [];
                        return candidateData.reduce((a, b) => a + b, 0) + employerData.reduce((a, b) => a + b, 0);
                      } catch {
                        return 0;
                      }
                    })()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    New users in last 2 months
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Application Rate</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalJobs > 0 ? Math.round((stats.totalApplications / stats.totalJobs) * 10) / 10 : 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Applications per job
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New user registration</p>
                      <p className="text-sm text-gray-600">A new candidate joined the platform</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Job posted</p>
                      <p className="text-sm text-gray-600">New software engineer position posted</p>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Application submitted</p>
                      <p className="text-sm text-gray-600">Candidate applied for marketing position</p>
                    </div>
                    <span className="text-sm text-gray-500">6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Candidates Database</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {candidate.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                              <div className="text-sm text-gray-500">Candidate</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{candidate.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {candidate.profile?.location || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {candidate.profile?.skills ? candidate.profile.skills.slice(0, 3).join(', ') : 'N/A'}
                            {candidate.profile?.skills && candidate.profile.skills.length > 3 && '...'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(candidate.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'employers' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Employers Database</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jobs Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployers.map((employer) => (
                      <tr key={employer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {employer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                              <div className="text-sm text-gray-500">Employer</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employer.profile?.company || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {employer.profile?.location || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employer.isApproved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {employer.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {jobs.filter(job => job.employer === employer._id).length}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(employer.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-5 h-5" />
                            </button>
                            {!employer.isApproved && (
                              <button
                                onClick={() => handleApproveEmployer(employer._id)}
                                className="text-green-600 hover:text-green-900"
                                title="Approve Employer"
                              >
                                <UserCheck className="w-5 h-5" />
                              </button>
                            )}
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Jobs Database</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {job.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.type === 'Full-time'
                              ? 'bg-green-100 text-green-800'
                              : job.type === 'Part-time'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.applications?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {job.status || 'active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(job.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;