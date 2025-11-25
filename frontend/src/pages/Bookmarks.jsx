import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
  Calendar,
  ExternalLink,
  Trash2
} from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, getBookmarks, unbookmarkJob } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role === 'candidate') {
      loadBookmarks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
    setLoading(false);
  };

  const handleUnbookmark = async (jobId) => {
    try {
      await unbookmarkJob(jobId);
      setBookmarks(prev => prev.filter(bookmark => bookmark.job._id !== jobId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Please login to view your bookmarks</h3>
          <p className="text-gray-600">You need to be logged in as a candidate to access your saved jobs</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'candidate') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">Only candidates can access the bookmarks page</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-4xl text-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
              <p className="text-gray-600">
                {bookmarks.length} saved {bookmarks.length === 1 ? 'job' : 'jobs'}
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
            <p className="text-gray-600 mb-6">Start exploring jobs and save the ones you're interested in</p>
            <Link to="/jobs" className="btn-primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookmarks.map((bookmark) => {
              const job = bookmark.job;
              if (!job) return null;

              return (
                <div key={bookmark._id} className="card-premium p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            <Link
                              to={`/jobs/${job._id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {job.title}
                            </Link>
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.requirements && job.requirements.slice(0, 3).map((req, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {job.salary && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Saved {new Date(bookmark.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{job.applications?.length || 0} applicants</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/jobs/${job._id}`}
                            className="btn-secondary flex items-center space-x-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Details</span>
                          </Link>
                          <button
                            onClick={() => handleUnbookmark(job._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;