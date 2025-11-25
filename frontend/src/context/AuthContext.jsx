import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 second timeout

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/user');
      setUser(res.data);
    } catch (err) {
      console.error('Error loading user:', err);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    try {
      console.log('Registering user with data:', userData);
      const res = await axios.post('/api/auth/register', userData);
      console.log('Registration response:', res.data);
      const { token, user: newUser } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setUser(newUser);
      console.log('User registered successfully:', newUser);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const res = await axios.put('/api/users/profile', profileData);
    setUser(res.data);
    return res.data;
  };

  const bookmarkJob = async (jobId) => {
    const res = await axios.post('/api/bookmarks', { jobId });
    return res.data;
  };

  const unbookmarkJob = async (jobId) => {
    const res = await axios.delete(`/api/bookmarks/${jobId}`);
    return res.data;
  };

  const getBookmarks = async () => {
    const res = await axios.get('/api/bookmarks');
    return res.data;
  };

  const checkBookmarkStatus = async (jobId) => {
    const res = await axios.get(`/api/bookmarks/check/${jobId}`);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        bookmarkJob,
        unbookmarkJob,
        getBookmarks,
        checkBookmarkStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};