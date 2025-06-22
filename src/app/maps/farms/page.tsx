"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Navigation, Phone, Star } from 'lucide-react';
import FarmMap from '@/components/features/maps/farm-map';
import { mockFarms } from '@/data/farms';
import { Farm } from '@/types';

export default function FarmLocationsPage() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [filteredFarms, setFilteredFarms] = useState<Farm[]>(mockFarms);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
          // Default to Colombo coordinates
          setUserLocation({ lat: 6.9271, lng: 79.8612 });
        }
      );
    }
  }, []);

  // Filter farms based on search and type
  useEffect(() => {
    let filtered = mockFarms;

    if (searchTerm) {
      filtered = filtered.filter(farm =>
        farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(farm =>
        farm.farmingMethods.includes(filterType as any)
      );
    }

    setFilteredFarms(filtered);
  }, [searchTerm, filterType]);

  const calculateDistance = (farmLat: number, farmLng: number): number => {
    if (!userLocation) return 0;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (farmLat - userLocation.lat) * Math.PI / 180;
    const dLng = (farmLng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(farmLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Farm Locations</h1>
              <p className="mt-1 text-sm text-gray-600">
                Discover local farms near you
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredFarms.length} farms found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Filters and Farm List */}
          <div className="lg:col-span-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search farms or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Farming Method Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farming Method
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Methods</option>
                    <option value="organic">Organic</option>
                    <option value="conventional">Conventional</option>
                    <option value="hydroponic">Hydroponic</option>
                    <option value="permaculture">Permaculture</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Farm List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredFarms.map((farm) => (
                <div
                  key={farm.id}
                  onClick={() => setSelectedFarm(farm)}
                  className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedFarm?.id === farm.id 
                      ? 'border-emerald-500 ring-2 ring-emerald-500 ring-opacity-20' 
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{farm.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{farm.location.city}, {farm.location.province}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {farm.farmingMethods.slice(0, 2).map((method) => (
                        <span
                          key={method}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                    {userLocation && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span>{calculateDistance(farm.coordinates.lat, farm.coordinates.lng)} km</span>
                      </div>
                    )}
                  </div>

                  {farm.isVerified && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ✓ Verified Farm
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-96 lg:h-[600px]">
                <FarmMap
                  farms={filteredFarms}
                  selectedFarm={selectedFarm}
                  onFarmSelect={setSelectedFarm}
                  userLocation={userLocation}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Farm Details */}
        {selectedFarm && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedFarm.name}</h2>
                <p className="text-gray-600 mb-4">{selectedFarm.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">
                      {selectedFarm.location.street}, {selectedFarm.location.city}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Contact for details</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Farming Methods</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarm.farmingMethods.map((method) => (
                      <span
                        key={method}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedFarm.certifications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFarm.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Farm Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Established</dt>
                      <dd className="text-sm font-medium text-gray-900">{selectedFarm.establishedYear}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Farm Size</dt>
                      <dd className="text-sm font-medium text-gray-900">{selectedFarm.size} acres</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Rating</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {selectedFarm.rating} ({selectedFarm.reviewCount} reviews)
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                    Visit Farm
                  </button>
                  <button className="w-full border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                    View Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}