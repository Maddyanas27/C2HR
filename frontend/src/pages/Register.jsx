import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { countries, getStatesForCountry } from '../data/countries';
import { getPhoneFormat, formatPhoneNumber } from '../data/phoneFormats';
import {
  User,
  Building,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    mobile: '',
    country: '',
    state: '',
    pincode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: role selection, 2: form
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password, role, mobile, country, state, pincode } = formData;

  // Get available states based on selected country
  const availableStates = country ? getStatesForCountry(country) : [];

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset state when country changes
    if (name === 'country') {
      setFormData(prev => ({ ...prev, [name]: value, state: '' }));
    }
  };

  // Handle mobile number input with formatting
  const handleMobileChange = (e) => {
    const { value } = e.target;
    const cleanValue = value.replace(/\D/g, '');

    if (country) {
      const countryCode = countries.find(c => c.name === country)?.code;
      if (countryCode) {
        const formatted = formatPhoneNumber(cleanValue, countryCode);
        setFormData({ ...formData, mobile: formatted });
        return;
      }
    }

    // Default formatting if no country selected
    setFormData({ ...formData, mobile: cleanValue });
  };

  const selectRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
    setStep(2);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting registration form with data:', formData);
      const user = await register(formData);
      console.log('Registration successful, user:', user);
      if (user.role === 'consultant') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Registration failed in component:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      value: 'candidate',
      title: 'Job Seeker',
      description: 'Find your dream job and advance your career',
      icon: User,
      color: 'blue'
    },
    {
      value: 'employer',
      title: 'Employer',
      description: 'Post jobs and find the perfect candidates',
      icon: Building,
      color: 'green'
    },
    {
      value: 'consultant',
      title: 'Consultant',
      description: 'Manage and oversee the platform',
      icon: Users,
      color: 'purple'
    }
  ];

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Join C2HR Today
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your role to get started on your journey
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid md:grid-cols-3 gap-6">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => selectRole(option.value)}
                  className="card-premium p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-${option.color}-100 rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${option.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                </button>
              );
            })}
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button
            onClick={() => setStep(1)}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium mb-4"
          >
            ← Back to role selection
          </button>
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join as a {roleOptions.find(r => r.value === role)?.title}
          </p>
        </div>

        {/* Registration Form */}
        <div className="card-premium p-8">
          <form className="space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-slide-up">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm">!</span>
                  </div>
                  {error}
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={onChange}
                  className="input-premium pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="input-premium pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="input-premium pl-10 pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  onChange={handleMobileChange}
                  className="input-premium"
                  placeholder={country ? getPhoneFormat(countries.find(c => c.name === country)?.code || 'default').placeholder : "Enter your mobile number"}
                  maxLength={country ? getPhoneFormat(countries.find(c => c.name === country)?.code || 'default').maxLength : 16}
                />
              </div>
              {country && (
                <p className="text-xs text-gray-500 mt-1">
                  Format: {getPhoneFormat(countries.find(c => c.name === country)?.code || 'default').format}
                </p>
              )}
            </div>

            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={country}
                  onChange={onChange}
                  className="input-premium"
                >
                  <option value="">Select your country</option>
                  {countries.map((countryOption) => (
                    <option key={countryOption.code} value={countryOption.name}>
                      {countryOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* State Field */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative">
                <select
                  id="state"
                  name="state"
                  value={state}
                  onChange={onChange}
                  disabled={!country}
                  className="input-premium"
                >
                  <option value="">
                    {country ? 'Select your state' : 'Please select a country first'}
                  </option>
                  {availableStates.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pincode Field */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <div className="relative">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={pincode}
                  onChange={onChange}
                  className="input-premium"
                  placeholder="Enter your pincode"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-premium-cta flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="loading-dots-small"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Sign In Instead</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;