"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  MapPin,
  Navigation,
  Edit,
  Share2,
  Camera,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Leaf,
  Truck,
  Clock,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const FarmLocationPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  const farmData = {
    name: "Ravi's Organic Farm",
    location: "Kurunegala, North Western Province",
    address: "No. 245, Kandy Road, Kurunegala 60000",
    coordinates: "7.4818° N, 80.3609° E",
    size: "2.5 acres",
    established: "2018",
    certification: "100% Organic Certified",
    farmType: "Mixed Vegetable Farming",
    soilType: "Red Earth Soil",
    waterSource: "Well Water + Rainwater Harvesting",
    distanceFromTown: "15 km from Kurunegala town",
    accessibility: "Accessible by car and motorcycle"
  };

  const weatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: 12,
    windSpeed: 8,
    condition: "Partly Cloudy",
    uvIndex: 6
  };

  const farmSections = [
    { 
      name: "Section A - Tomatoes", 
      area: "0.8 acres", 
      status: "Growing", 
      plantedDate: "2024-05-15",
      expectedHarvest: "2024-07-10",
      variety: "Cherry Tomatoes"
    },
    { 
      name: "Section B - Root Vegetables", 
      area: "0.7 acres", 
      status: "Harvesting", 
      plantedDate: "2024-04-20",
      expectedHarvest: "2024-06-30",
      variety: "Carrots & Radish"
    },
    { 
      name: "Section C - Leafy Greens", 
      area: "0.6 acres", 
      status: "Ready", 
      plantedDate: "2024-05-01",
      expectedHarvest: "2024-06-25",
      variety: "Cabbage & Lettuce"
    },
    { 
      name: "Section D - Preparation", 
      area: "0.4 acres", 
      status: "Preparing", 
      plantedDate: "2024-07-01",
      expectedHarvest: "2024-09-15",
      variety: "Next Season Crops"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'Growing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Harvesting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Preparing': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
                  <h1 className="text-2xl font-bold text-gray-900">Farm Location</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage your farm location and details</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Location
              </button>
              
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Farm Header Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-8 rounded-xl mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-8 h-8" />
                    <div>
                      <h2 className="text-3xl font-bold">{farmData.name}</h2>
                      <p className="text-emerald-100 text-lg">{farmData.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Leaf className="w-5 h-5" />
                        <span className="font-medium">Farm Size</span>
                      </div>
                      <div className="text-2xl font-bold">{farmData.size}</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-5 h-5" />
                        <span className="font-medium">Certification</span>
                      </div>
                      <div className="text-lg font-semibold">Organic</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">Established</span>
                      </div>
                      <div className="text-2xl font-bold">{farmData.established}</div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Camera className="w-16 h-16 text-white/70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'weather', label: 'Weather', icon: Sun },
                    { id: 'sections', label: 'Farm Sections', icon: Leaf },
                    { id: 'contact', label: 'Contact Info', icon: Phone }
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
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Full Address</span>
                          <span className="font-medium text-gray-900">{farmData.address}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Coordinates</span>
                          <span className="font-medium text-gray-900">{farmData.coordinates}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Farm Type</span>
                          <span className="font-medium text-gray-900">{farmData.farmType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Soil Type</span>
                          <span className="font-medium text-gray-900">{farmData.soilType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Water Source</span>
                          <span className="font-medium text-gray-900">{farmData.waterSource}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Distance from Town</span>
                          <span className="font-medium text-gray-900">{farmData.distanceFromTown}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Map View</h3>
                      <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Interactive Map</p>
                          <p className="text-sm text-gray-400 mt-2">Google Maps integration would go here</p>
                          <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                            <Navigation className="w-4 h-4 mr-2 inline" />
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weather Tab */}
                {activeTab === 'weather' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Weather Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Thermometer className="w-6 h-6 text-blue-600" />
                          <span className="font-medium text-blue-900">Temperature</span>
                        </div>
                        <div className="text-3xl font-bold text-blue-900">{weatherData.temperature}°C</div>
                        <div className="text-sm text-blue-700">{weatherData.condition}</div>
                      </div>

                      <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Droplets className="w-6 h-6 text-cyan-600" />
                          <span className="font-medium text-cyan-900">Humidity</span>
                        </div>
                        <div className="text-3xl font-bold text-cyan-900">{weatherData.humidity}%</div>
                        <div className="text-sm text-cyan-700">Moderate</div>
                      </div>

                      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Droplets className="w-6 h-6 text-indigo-600" />
                          <span className="font-medium text-indigo-900">Rainfall</span>
                        </div>
                        <div className="text-3xl font-bold text-indigo-900">{weatherData.rainfall}mm</div>
                        <div className="text-sm text-indigo-700">Today</div>
                      </div>

                      <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Wind className="w-6 h-6 text-green-600" />
                          <span className="font-medium text-green-900">Wind Speed</span>
                        </div>
                        <div className="text-3xl font-bold text-green-900">{weatherData.windSpeed} km/h</div>
                        <div className="text-sm text-green-700">Light breeze</div>
                      </div>
                    </div>

                    <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Sun className="w-6 h-6 text-yellow-600" />
                        <h4 className="font-semibold text-yellow-900">Farming Recommendations</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="font-medium text-gray-900 mb-2">Today's Tasks</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Morning watering recommended</li>
                            <li>• Good day for harvesting</li>
                            <li>• UV index: {weatherData.uvIndex} - wear protection</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <div className="font-medium text-gray-900 mb-2">Weekly Forecast</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Rain expected Thursday</li>
                            <li>• Ideal harvesting weather</li>
                            <li>• No extreme conditions forecast</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Farm Sections Tab */}
                {activeTab === 'sections' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Farm Cultivation Sections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {farmSections.map((section, index) => (
                        <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{section.name}</h4>
                              <p className="text-sm text-gray-500">{section.area}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(section.status)}`}>
                              {section.status}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Variety</span>
                              <span className="text-sm font-medium text-gray-900">{section.variety}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Planted</span>
                              <span className="text-sm font-medium text-gray-900">
                                {new Date(section.plantedDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Expected Harvest</span>
                              <span className="text-sm font-medium text-gray-900">
                                {new Date(section.expectedHarvest).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              {section.status === 'Ready' && <CheckCircle className="w-4 h-4 text-green-500" />}
                              {section.status === 'Growing' && <Clock className="w-4 h-4 text-blue-500" />}
                              {section.status === 'Harvesting' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                              {section.status === 'Preparing' && <Info className="w-4 h-4 text-gray-500" />}
                              
                              <span className="text-sm text-gray-600">
                                {section.status === 'Ready' && 'Ready for harvest'}
                                {section.status === 'Growing' && 'Currently growing'}
                                {section.status === 'Harvesting' && 'Harvesting in progress'}
                                {section.status === 'Preparing' && 'Preparing for next season'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Farm Contact Information</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Primary Contact</h4>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">077-296-7477</div>
                              <div className="text-sm text-gray-500">Primary phone</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">ravi.farm@gmail.com</div>
                              <div className="text-sm text-gray-500">Email address</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">www.raviorganicfarm.lk</div>
                              <div className="text-sm text-gray-500">Farm website</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Delivery & Pickup</h4>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Truck className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">Farm Pickup Available</div>
                              <div className="text-sm text-gray-500">Mon-Sat: 7:00 AM - 6:00 PM</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">Delivery Radius</div>
                              <div className="text-sm text-gray-500">25km from farm location</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">Farm Visits</div>
                              <div className="text-sm text-gray-500">Educational tours by appointment</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                      <h4 className="font-medium text-emerald-900 mb-3">Farm Visit Guidelines</h4>
                      <ul className="text-sm text-emerald-800 space-y-2">
                        <li>• Advance booking required for farm visits</li>
                        <li>• Best visiting hours: 8:00 AM - 10:00 AM and 4:00 PM - 6:00 PM</li>
                        <li>• Wear comfortable shoes and bring sun protection</li>
                        <li>• Educational tours available for schools and groups</li>
                        <li>• Fresh produce sampling included in visits</li>
                      </ul>
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

export default FarmLocationPage;