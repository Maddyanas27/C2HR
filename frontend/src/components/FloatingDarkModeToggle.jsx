import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Moon, Sun, Palette } from 'lucide-react';

const FloatingDarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Theme indicator */}
      <div className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-600">
        {isDarkMode ? 'Dark' : 'Light'} Mode
      </div>

      {/* Main toggle button */}
      <button
        onClick={toggleDarkMode}
        className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-gray-800 dark:to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white dark:border-gray-600 group"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className="relative">
          {isDarkMode ? (
            <Sun className="w-6 h-6 transition-transform group-hover:rotate-12" />
          ) : (
            <Moon className="w-6 h-6 transition-transform group-hover:-rotate-12" />
          )}
        </div>
      </button>
    </div>
  );
};

export default FloatingDarkModeToggle;