import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import { Briefcase, User, LogOut, Settings, Bell, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                C2HR
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/about" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link to="/services" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Services
            </Link>
            <Link to="/employers" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Employers
            </Link>
            <Link to="/contact" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
            <Link to="/jobs" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Jobs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle - Always visible */}
            <button
              onClick={toggleDarkMode}
              className="p-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                      {user.name}
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        <Link to="/dashboard" className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">
                          Dashboard
                        </Link>
                        {user.role === 'candidate' && (
                          <Link to="/bookmarks" className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">
                            My Bookmarks
                          </Link>
                        )}
                        {user.role === 'employer' && (
                          <Link to="/company-profile" className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">
                            Company Profile
                          </Link>
                        )}
                        <Link to="/profile" className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">
                          Profile
                        </Link>
                        {user.role === 'consultant' && (
                          <Link to="/admin" className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-2 border-gray-200 dark:border-gray-600" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Sign In
                </Link>
                <Link to="/register" className="btn-premium-cta text-base px-4 py-2">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;