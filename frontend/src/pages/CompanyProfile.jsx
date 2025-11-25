import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Building,
  Globe,
  MapPin,
  Users,
  Calendar,
  Camera,
  Save,
  Edit,
  Upload,
  Link as LinkIcon,
  Target,
  Heart,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CompanyProfile = () => {
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    industry: '',
    size: '1-10',
    location: '',
    founded: '',
    logo: '',
    coverImage: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    benefits: '',
    culture: '',
    mission: '',
    values: ''
  });

  useEffect(() => {
    if (user && user.role === 'employer') {
      loadCompanyProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCompanyProfile = async () => {
    try {
      const res = await axios.get(`/api/companies/employer/${user.id}`);
      setCompany(res.data);
      setFormData({
        name: res.data.name || '',
        description: res.data.description || '',
        website: res.data.website || '',
        industry: res.data.industry || '',
        size: res.data.size || '1-10',
        location: res.data.location || '',
        founded: res.data.founded || '',
        logo: res.data.logo || '',
        coverImage: res.data.coverImage || '',
        socialLinks: res.data.socialLinks || {
          linkedin: '',
          twitter: '',
          facebook: '',
          instagram: ''
        },
        benefits: res.data.benefits ? res.data.benefits.join(', ') : '',
        culture: res.data.culture || '',
        mission: res.data.mission || '',
        values: res.data.values ? res.data.values.join(', ') : ''
      });
    } catch (err) {
      console.error('Error loading company profile:', err);
      // If company doesn't exist, that's okay - user can create one
    }
    setLoading(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axios.post('/api/companies', formData);
      setCompany(res.data);
      setIsEditing(false);
      alert('Company profile updated successfully!');
    } catch (err) {
      console.error('Error saving company profile:', err);
      alert('Failed to update company profile. Please try again.');
    }

    setSaving(false);
  };

  const calculateProfileCompletion = () => {
    if (!company && !isEditing) return 0;

    const data = isEditing ? formData : company;
    if (!data) return 0;

    let completed = 0;
    let total = 8; // name, description, industry, size, location, website, mission, culture

    if (data.name) completed++;
    if (data.description) completed++;
    if (data.industry) completed++;
    if (data.size) completed++;
    if (data.location) completed++;
    if (data.website) completed++;
    if (data.mission) completed++;
    if (data.culture) completed++;

    return Math.round((completed / total) * 100);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Please login to access company profile</h3>
          <p className="text-gray-600">You need to be logged in as an employer to manage your company profile</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'employer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">Only employers can access company profile management</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-4xl text-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading company profile...</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Profile</h1>
              <p className="text-gray-600">Manage your company's information and branding</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Profile Completion</p>
                <p className="text-2xl font-bold text-gray-900">{completionPercentage}%</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image */}
        {(company?.coverImage || isEditing) && (
          <div className="card-premium p-6 mb-8">
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
              {company?.coverImage ? (
                <img
                  src={company.coverImage}
                  alt="Company cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-70" />
                    <p className="text-sm opacity-90">Add a cover image to showcase your company</p>
                  </div>
                </div>
              )}
              {isEditing && (
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Cover
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Company Overview */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {company?.logo ? (
                    <img
                      src={company.logo}
                      alt="Company logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Building className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{company?.name || 'Your Company'}</h2>
                <p className="text-gray-600">{company?.industry || 'Industry'}</p>
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
                {company?.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {company?.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{company.location}</span>
                  </div>
                )}
                {company?.size && (
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{company.size} employees</span>
                  </div>
                )}
                {company?.founded && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Founded {company.founded}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {company?.socialLinks && Object.values(company.socialLinks).some(link => link) && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Connect with us</h3>
                  <div className="flex space-x-3">
                    {company.socialLinks.linkedin && (
                      <a
                        href={company.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    )}
                    {company.socialLinks.twitter && (
                      <a
                        href={company.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                      >
                        <span className="text-xs font-bold">𝕏</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Completion Checklist */}
            <div className="card-premium p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {(company?.name || formData.name) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Company Name</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.description || formData.description) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Description</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.industry || formData.industry) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Industry</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.location || formData.location) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Location</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.website || formData.website) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Website</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.mission || formData.mission) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Mission</span>
                </div>

                <div className="flex items-center space-x-3">
                  {(company?.culture || formData.culture) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Culture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Form */}
          <div className="lg:col-span-2">
            <div className="card-premium p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="input-premium pl-10"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={onChange}
                      disabled={!isEditing}
                      className="input-premium"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    disabled={!isEditing}
                    rows={4}
                    className="input-premium"
                    placeholder="Describe your company, what you do, and what makes you unique..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="input-premium pl-10"
                        placeholder="https://yourcompany.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={onChange}
                      disabled={!isEditing}
                      className="input-premium"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      Founded Year
                    </label>
                    <input
                      type="number"
                      name="founded"
                      value={formData.founded}
                      onChange={onChange}
                      disabled={!isEditing}
                      className="input-premium"
                      placeholder="2020"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                {/* Mission & Culture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Company Mission
                  </label>
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={onChange}
                    disabled={!isEditing}
                    rows={3}
                    className="input-premium"
                    placeholder="What is your company's mission? What problem are you solving?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Heart className="w-4 h-4 inline mr-1" />
                    Company Culture
                  </label>
                  <textarea
                    name="culture"
                    value={formData.culture}
                    onChange={onChange}
                    disabled={!isEditing}
                    rows={3}
                    className="input-premium"
                    placeholder="Describe your company culture, work environment, and values..."
                  />
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    Employee Benefits (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="benefits"
                    value={formData.benefits}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="input-premium"
                    placeholder="Health insurance, Flexible hours, Remote work, etc."
                  />
                </div>

                {/* Company Values */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Core Values (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="values"
                    value={formData.values}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="input-premium"
                    placeholder="Innovation, Integrity, Teamwork, etc."
                  />
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Social Media Links
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        name="socialLinks.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="input-premium"
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Twitter</label>
                      <input
                        type="url"
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="input-premium"
                        placeholder="https://twitter.com/yourcompany"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
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

export default CompanyProfile;