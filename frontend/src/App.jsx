import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingDarkModeToggle from './components/FloatingDarkModeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Employers from './pages/Employers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobsTest from './pages/JobsTest';
import JobForm from './pages/JobForm';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import CompanyProfile from './pages/CompanyProfile';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', minHeight: '100vh' }}>
          <h1>Something went wrong!</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/employers" element={<Employers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs-test" element={<JobsTest />} />
              <Route path="/jobs/new" element={<JobForm />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/company-profile" element={<CompanyProfile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            {/* Floating Dark Mode Toggle */}
            <FloatingDarkModeToggle />
          </div>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
    </ErrorBoundary>
  );
}

export default App;