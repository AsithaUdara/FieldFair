"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageCircle,
  Lock,
  Key,
  Users,
  Clock,
  RefreshCw
} from 'lucide-react';

const FarmerSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('notifications');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showPhoneNumber: true,
    showEmailAddress: false,
    allowFarmVisits: true,
    shareLocation: true,
    
    // Business Settings
    autoAcceptOrders: false,
    minimumOrderValue: 500,
    deliveryRadius: 25,
    operatingHours: {
      start: '08:00',
      end: '18:00'
    },
    weeklyOffDays: ['sunday'],
    
    // Appearance
    theme: 'light',
    language: 'english',
    currency: 'LKR',
    dateFormat: 'dd/mm/yyyy',
    
    // Security
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
    
    // Data & Storage
    dataRetention: '2years',
    autoBackup: true,
    analyticsTracking: true
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

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [setting]: value }
        : value
    }));
  };

  const handleDirectSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would save to your backend
  };

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'business', label: 'Business', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Storage', icon: Database }
  ];

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
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                  <p className="text-sm text-gray-600 mt-1">Configure your account and farm preferences</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={saveSettings}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <section.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  
                  {/* Notifications Settings */}
                  {activeSection === 'notifications' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Notifications</h3>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">New Order Alerts</div>
                                <div className="text-sm text-gray-500">Get notified when you receive new orders</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.orderNotifications}
                                onChange={(e) => handleDirectSettingChange('orderNotifications', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Email Notifications</div>
                                <div className="text-sm text-gray-500">Receive detailed order information via email</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => handleDirectSettingChange('emailNotifications', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">SMS Notifications</div>
                                <div className="text-sm text-gray-500">Get urgent alerts via SMS</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={(e) => handleDirectSettingChange('smsNotifications', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing & Reports</h3>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Marketing Emails</div>
                                <div className="text-sm text-gray-500">Tips, trends, and promotional content</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.marketingEmails}
                                onChange={(e) => handleDirectSettingChange('marketingEmails', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Weekly Reports</div>
                                <div className="text-sm text-gray-500">Weekly sales and performance summaries</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.weeklyReports}
                                onChange={(e) => handleDirectSettingChange('weeklyReports', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeSection === 'privacy' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value="public"
                                checked={settings.profileVisibility === 'public'}
                                onChange={(e) => handleDirectSettingChange('profileVisibility', e.target.value)}
                                className="mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900">Public Profile</div>
                                <div className="text-sm text-gray-500">Anyone can view your farm profile</div>
                              </div>
                            </label>
                            
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value="private"
                                checked={settings.profileVisibility === 'private'}
                                onChange={(e) => handleDirectSettingChange('profileVisibility', e.target.value)}
                                className="mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900">Private Profile</div>
                                <div className="text-sm text-gray-500">Only approved customers can see details</div>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Show Phone Number</div>
                                <div className="text-sm text-gray-500">Display your phone number on profile</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.showPhoneNumber}
                                onChange={(e) => handleDirectSettingChange('showPhoneNumber', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                            
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Show Email Address</div>
                                <div className="text-sm text-gray-500">Display your email on profile</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.showEmailAddress}
                                onChange={(e) => handleDirectSettingChange('showEmailAddress', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Settings */}
                  {activeSection === 'business' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Management</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value (Rs.)</label>
                              <input
                                type="number"
                                value={settings.minimumOrderValue}
                                onChange={(e) => handleDirectSettingChange('minimumOrderValue', parseInt(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
                              <input
                                type="number"
                                value={settings.deliveryRadius}
                                onChange={(e) => handleDirectSettingChange('deliveryRadius', parseInt(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                          
                          <label className="flex items-center justify-between mt-4">
                            <div>
                              <div className="font-medium text-gray-900">Auto-Accept Orders</div>
                              <div className="text-sm text-gray-500">Automatically accept orders under minimum value</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.autoAcceptOrders}
                              onChange={(e) => handleDirectSettingChange('autoAcceptOrders', e.target.checked)}
                              className="ml-4"
                            />
                          </label>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                              <input
                                type="time"
                                value={settings.operatingHours.start}
                                onChange={(e) => handleSettingChange('operatingHours', 'start', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                              <input
                                type="time"
                                value={settings.operatingHours.end}
                                onChange={(e) => handleSettingChange('operatingHours', 'end', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeSection === 'appearance' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance & Language</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                              <input
                                type="radio"
                                name="theme"
                                value="light"
                                checked={settings.theme === 'light'}
                                onChange={(e) => handleDirectSettingChange('theme', e.target.value)}
                                className="mr-3"
                              />
                              <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                              <span>Light</span>
                            </label>
                            
                            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                              <input
                                type="radio"
                                name="theme"
                                value="dark"
                                checked={settings.theme === 'dark'}
                                onChange={(e) => handleDirectSettingChange('theme', e.target.value)}
                                className="mr-3"
                              />
                              <Moon className="w-5 h-5 mr-2 text-gray-600" />
                              <span>Dark</span>
                            </label>
                            
                            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                              <input
                                type="radio"
                                name="theme"
                                value="auto"
                                checked={settings.theme === 'auto'}
                                onChange={(e) => handleDirectSettingChange('theme', e.target.value)}
                                className="mr-3"
                              />
                              <Settings className="w-5 h-5 mr-2 text-gray-600" />
                              <span>Auto</span>
                            </label>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                              <select
                                value={settings.language}
                                onChange={(e) => handleDirectSettingChange('language', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="english">English</option>
                                <option value="sinhala">සිංහල</option>
                                <option value="tamil">தமிழ்</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                              <select
                                value={settings.currency}
                                onChange={(e) => handleDirectSettingChange('currency', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="LKR">Sri Lankan Rupee (Rs.)</option>
                                <option value="USD">US Dollar ($)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSection === 'security' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                                <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                              </div>
                              <button 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  settings.twoFactorEnabled 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                }`}
                                onClick={() => handleDirectSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
                              >
                                {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Change Password</div>
                                <div className="text-sm text-gray-500">Update your account password</div>
                              </div>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                Change
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Login Settings</h3>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Login Alerts</div>
                                <div className="text-sm text-gray-500">Get notified of new login attempts</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.loginAlerts}
                                onChange={(e) => handleDirectSettingChange('loginAlerts', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                              <select
                                value={settings.sessionTimeout}
                                onChange={(e) => handleDirectSettingChange('sessionTimeout', parseInt(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={60}>1 hour</option>
                                <option value={120}>2 hours</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data & Storage Settings */}
                  {activeSection === 'data' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Data & Storage</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Export Data</div>
                                <div className="text-sm text-gray-500">Download all your farm data</div>
                              </div>
                              <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </button>
                            </div>
                            
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Auto Backup</div>
                                <div className="text-sm text-gray-500">Automatically backup your data weekly</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.autoBackup}
                                onChange={(e) => handleDirectSettingChange('autoBackup', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Controls</h3>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Analytics Tracking</div>
                                <div className="text-sm text-gray-500">Help improve FieldFair with usage analytics</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={settings.analyticsTracking}
                                onChange={(e) => handleDirectSettingChange('analyticsTracking', e.target.checked)}
                                className="ml-4"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4 text-red-600">Danger Zone</h3>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-red-900">Delete Account</div>
                                <div className="text-sm text-red-700">Permanently delete your account and all data</div>
                              </div>
                              <button 
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All your farm data, orders, and customer information will be permanently deleted.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerSettingsPage;