import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobsTest = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      console.log('Fetching jobs from API...');
      const response = await axios.get('/api/jobs');
      console.log('Jobs response:', response.data);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={loadJobs}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jobs Test Page</h1>

        <div className="mb-6">
          <button
            onClick={loadJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Jobs
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title || 'Untitled Job'}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Company:</strong> {job.company || 'Unknown Company'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {job.location || 'Location not specified'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Type:</strong> {job.type || 'Type not specified'}
              </p>
              {job.salary && (
                <p className="text-gray-600 mb-2">
                  <strong>Salary:</strong> {job.salary}
                </p>
              )}
              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.description || 'No description available'}
              </p>
              <div className="text-sm text-gray-500">
                Posted: {new Date(job.createdAt || job.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try refreshing the page or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsTest;