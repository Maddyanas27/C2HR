import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { countries, getStatesForCountry } from '../data/countries';
import { getPhoneFormat, formatPhoneNumber } from '../data/phoneFormats';
import {
  User,
  Mail,
  MapPin,
  FileText,
  Award,
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  Save,
  Edit,
  Camera
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
    resume: '',
    mobile: '',
    country: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Get available states based on selected country
  const availableStates = formData.country ? getStatesForCountry(formData.country) : [];

  useEffect(() => {
    if (user && user.profile) {
      setFormData({
        company: user.profile.company || '',
        location: user.profile.location || '',
        bio: user.profile.bio || '',
        skills: user.profile.skills ? user.profile.skills.join(', ') : '',
        experience: user.profile.experience || '',
        resume: user.profile.resume || '',
        mobile: user.profile.mobile || '',
        country: user.profile.country || '',
        state: user.profile.state || '',
        pincode: user.profile.pincode || ''
      });
    }
  }, [user]);

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

    if (formData.country) {
      const countryCode = countries.find(c => c.name === formData.country)?.code;
      if (countryCode) {
        const formatted = formatPhoneNumber(cleanValue, countryCode);
        setFormData({ ...formData, mobile: formatted });
        return;
      }
    }

    // Default formatting if no country selected
    setFormData({ ...formData, mobile: cleanValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };
      await updateProfile(profileData);
      setIsEditing(false);
      // Show success message
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
    setLoading(false);
  };

  const calculateProfileCompletion = () => {
    if (!user) return 0;

    let completed = 2; // name and email are always completed
    let total = 2;

    if (user.role === 'employer') {
      total += 3; // company, location, bio
      if (formData.company) completed++;
      if (formData.location) completed++;
      if (formData.bio) completed++;
    } else {
      total += 5; // location, bio, skills, experience, resume
      if (formData.location) completed++;
      if (formData.bio) completed++;
      if (formData.skills) completed++;
      if (formData.experience) completed++;
      if (formData.resume) completed++;
    }

    return Math.round((completed / total) * 100);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please login to view your profile</h3>
          <p className="text-gray-600 dark:text-gray-400">You need to be logged in to access your profile</p>
        </div>
      </div>
    );
  }

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completionPercentage}%</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 capitalize">{user.role}</p>
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    completionPercentage === 100
                      ? 'bg-green-100 text-green-800'
                      : completionPercentage >= 50
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {completionPercentage === 100 ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                {formData.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{formData.location}</span>
                  </div>
                )}
                {user.role === 'employer' && formData.company && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{formData.company}</span>
                  </div>
                )}
              </div>

              {user.role === 'candidate' && formData.resume && (
                <div className="mt-6">
                  <a
                    href={formData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>View Resume</span>
                  </a>
                </div>
              )}
            </div>

            {/* Profile Completion Checklist */}
            <div className="card-premium p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Basic Information</span>
                </div>

                <div className="flex items-center space-x-3">
                  {formData.location ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Location</span>
                </div>

                <div className="flex items-center space-x-3">
                  {formData.bio ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Bio/About</span>
                </div>

                {user.role === 'employer' && (
                  <div className="flex items-center space-x-3">
                    {formData.company ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-700">Company</span>
                  </div>
                )}

                {user.role === 'candidate' && (
                  <>
                    <div className="flex items-center space-x-3">
                      {formData.skills ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">Skills</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {formData.experience ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">Experience</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {formData.resume ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">Resume</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card-premium p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Basic Info - Always Read Only */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="input-premium pl-10 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="input-premium pl-10 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                {user.role === 'employer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="input-premium pl-10"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={onChange}
                      disabled={!isEditing}
                      className="input-premium pl-10"
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    disabled={!isEditing}
                    className="input-premium"
                    placeholder={formData.country ? getPhoneFormat(countries.find(c => c.name === formData.country)?.code || 'default').placeholder : "Enter your mobile number"}
                    maxLength={formData.country ? getPhoneFormat(countries.find(c => c.name === formData.country)?.code || 'default').maxLength : 16}
                  />
                  {formData.country && isEditing && (
                    <p className="text-xs text-gray-500 mt-1">
                      Format: {getPhoneFormat(countries.find(c => c.name === formData.country)?.code || 'default').format}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={onChange}
                    disabled={!isEditing}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={onChange}
                    disabled={!isEditing || !formData.country}
                    className="input-premium"
                  >
                    <option value="">
                      {formData.country ? 'Select your state' : 'Please select a country first'}
                    </option>
                    {availableStates.map((stateOption) => (
                      <option key={stateOption} value={stateOption}>
                        {stateOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="input-premium"
                    placeholder="Enter your pincode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio / About
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={onChange}
                    disabled={!isEditing}
                    rows={4}
                    className="input-premium"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {user.role === 'candidate' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills (comma-separated)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Award className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={onChange}
                          disabled={!isEditing}
                          className="input-premium pl-10"
                          placeholder="JavaScript, React, Node.js, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Experience
                      </label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={onChange}
                        disabled={!isEditing}
                        rows={3}
                        className="input-premium"
                        placeholder="Describe your work experience..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resume URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="resume"
                          value={formData.resume}
                          onChange={onChange}
                          disabled={!isEditing}
                          className="input-premium pl-10"
                          placeholder="https://example.com/resume.pdf"
                        />
                      </div>
                    </div>
                  </>
                )}

                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="loading-dots-small"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;