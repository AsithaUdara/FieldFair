"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Camera,
  Edit,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Leaf,
  Star,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Users,
  Package,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const FarmerProfilePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'Ravi',
    lastName: 'Mahathaya',
    email: 'ravi.farm@gmail.com',
    phone: '077-296-7477',
    alternatePhone: '071-123-4567',
    address: 'No. 245, Kandy Road, Kurunegala 60000',
    dateOfBirth: '1985-08-15',
    nationalId: '198523456789V',
    
    // Farm Information
    farmName: "Ravi's Organic Farm",
    farmType: 'Mixed Vegetable Farming',
    farmSize: '2.5',
    farmEstablished: '2018',
    certifications: ['Organic Certified', 'Fair Trade'],
    farmDescription: 'We are a family-owned organic farm specializing in fresh vegetables. Our commitment to sustainable farming practices ensures the highest quality produce while protecting the environment.',
    
    // Business Information
    businessRegistration: 'REG-2018-001234',
    taxId: 'TAX-567890123',
    bankAccount: '1234567890',
    bankName: 'Commercial Bank',
    
    // Social Media
    website: 'www.raviorganicfarm.lk',
    facebook: 'RaviOrganicFarm',
    instagram: '@raviorganicfarm',
    
    // Profile Settings
    profileVisibility: 'public',
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false
  });

  const [stats] = useState({
    totalCustomers: 156,
    totalOrders: 421,
    totalRevenue: 621800,
    averageRating: 4.8,
    joinDate: '2018-03-15',
    productsListed: 24,
    completionRate: 98
  });

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-emerald-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', profileData);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-16' : 'ml-64')
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
                >
                  <LayoutGrid className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage your personal and farm information</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-700">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </span>
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-2 hover:bg-emerald-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-lg text-gray-600 mb-3">{profileData.farmName}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{stats.averageRating} Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{stats.totalCustomers} Customers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Organic Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. {stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Products Listed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.productsListed}</p>
                  </div>
                  <Leaf className="w-8 h-8 text-emerald-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: User },
                    { id: 'farm', label: 'Farm Details', icon: Leaf },
                    { id: 'business', label: 'Business Info', icon: Package },
                    { id: 'settings', label: 'Settings', icon: CheckCircle }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.lastName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.alternatePhone}
                          onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.alternatePhone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {new Date(profileData.dateOfBirth).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 min-h-[80px]">
                          {profileData.address}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Farm Details Tab */}
                {activeTab === 'farm' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.farmName}
                          onChange={(e) => handleInputChange('farmName', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.farmName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
                      {isEditing ? (
                        <select
                          value={profileData.farmType}
                          onChange={(e) => handleInputChange('farmType', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option>Mixed Vegetable Farming</option>
                          <option>Organic Vegetables</option>
                          <option>Fruit Farming</option>
                          <option>Grain Farming</option>
                          <option>Herb Farming</option>
                        </select>
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.farmType}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={profileData.farmSize}
                          onChange={(e) => handleInputChange('farmSize', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.farmSize} acres
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.farmEstablished}
                          onChange={(e) => handleInputChange('farmEstablished', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.farmEstablished}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Description</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.farmDescription}
                          onChange={(e) => handleInputChange('farmDescription', e.target.value)}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 min-h-[100px]">
                          {profileData.farmDescription}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.certifications.map((cert, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800">
                            <Award className="w-4 h-4 mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Info Tab */}
                {activeTab === 'business' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration</label>
                      <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                        {profileData.businessRegistration}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                      <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                        {profileData.taxId}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.bankName}
                          onChange={(e) => handleInputChange('bankName', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.bankName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.bankAccount}
                          onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          ****{profileData.bankAccount.slice(-4)}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.website}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.facebook}
                          onChange={(e) => handleInputChange('facebook', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                          {profileData.facebook}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={profileData.profileVisibility === 'public'}
                            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <div className="font-medium">Public Profile</div>
                            <div className="text-sm text-gray-500">Your profile is visible to all customers</div>
                          </div>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={profileData.profileVisibility === 'private'}
                            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <div className="font-medium">Private Profile</div>
                            <div className="text-sm text-gray-500">Only approved customers can see your profile</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-gray-500">Receive order updates via email</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.emailNotifications}
                            onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                            className="ml-3"
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-gray-500">Receive urgent updates via SMS</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.smsNotifications}
                            onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                            className="ml-3"
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Marketing Emails</div>
                            <div className="text-sm text-gray-500">Receive tips and promotional content</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.marketingEmails}
                            onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                            className="ml-3"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                          <Edit className="w-4 h-4" />
                          <span>Change Password</span>
                        </button>
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Enable Two-Factor Authentication</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerProfilePage;