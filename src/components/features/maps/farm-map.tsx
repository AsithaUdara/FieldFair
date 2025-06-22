"use client";

import React, { useCallback, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Farm } from '@/types';
import { MapPin, Star } from 'lucide-react';

interface FarmMapProps {
  farms: Farm[];
  selectedFarm: Farm | null;
  onFarmSelect: (farm: Farm) => void;
  userLocation: {lat: number, lng: number} | null;
}

// Custom map component
const MapComponent: React.FC<{
  farms: Farm[];
  selectedFarm: Farm | null;
  onFarmSelect: (farm: Farm) => void;
  userLocation: {lat: number, lng: number} | null;
}> = ({ farms, selectedFarm, onFarmSelect, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Default center (Sri Lanka)
    const center = userLocation || { lat: 6.9271, lng: 79.8612 };

    map.current = new google.maps.Map(mapRef.current, {
      zoom: userLocation ? 12 : 8,
      center,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    });

    infoWindow.current = new google.maps.InfoWindow();

    // Add user location marker if available
    if (userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map: map.current,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3B82F6"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24)
        }
      });
    }
  }, [userLocation]);

  // Update markers when farms change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Add farm markers
    farms.forEach((farm) => {
      const marker = new google.maps.Marker({
        position: farm.coordinates,
        map: map.current,
        title: farm.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#10B981"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32)
        }
      });

      // Add click listener
      marker.addListener('click', () => {
        onFarmSelect(farm);
        
        if (infoWindow.current) {
          infoWindow.current.setContent(`
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #111827;">${farm.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #6B7280;">${farm.location.city}, ${farm.location.province}</p>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #F59E0B; margin-right: 4px;">★</span>
                <span style="font-size: 14px; color: #111827;">${farm.rating} (${farm.reviewCount} reviews)</span>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${farm.farmingMethods.slice(0, 2).map(method => 
                  `<span style="background: #D1FAE5; color: #065F46; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${method}</span>`
                ).join('')}
              </div>
            </div>
          `);
          infoWindow.current.open(map.current, marker);
        }
      });

      markers.current.push(marker);
    });

    // Fit bounds to show all farms
    if (farms.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      farms.forEach(farm => bounds.extend(farm.coordinates));
      if (userLocation) bounds.extend(userLocation);
      map.current.fitBounds(bounds);
    }
  }, [farms, onFarmSelect]);

  // Highlight selected farm
  useEffect(() => {
    if (!selectedFarm || !map.current) return;

    // Pan to selected farm
    map.current.panTo(selectedFarm.coordinates);
    map.current.setZoom(14);

    // Find and highlight the marker
    const selectedMarker = markers.current.find(marker => 
      marker.getPosition()?.lat() === selectedFarm.coordinates.lat &&
      marker.getPosition()?.lng() === selectedFarm.coordinates.lng
    );

    if (selectedMarker && infoWindow.current) {
      infoWindow.current.setContent(`
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #111827;">${selectedFarm.name}</h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #6B7280;">${selectedFarm.location.city}, ${selectedFarm.location.province}</p>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="color: #F59E0B; margin-right: 4px;">★</span>
            <span style="font-size: 14px; color: #111827;">${selectedFarm.rating} (${selectedFarm.reviewCount} reviews)</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${selectedFarm.farmingMethods.slice(0, 2).map(method => 
              `<span style="background: #D1FAE5; color: #065F46; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${method}</span>`
            ).join('')}
          </div>
        </div>
      `);
      infoWindow.current.open(map.current, selectedMarker);
    }
  }, [selectedFarm]);

  return <div ref={mapRef} className="w-full h-full" />;
};

// Loading and error components
const MapStatus: React.FC<{ status: Status }> = ({ status }) => {
  if (status === Status.LOADING) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (status === Status.FAILURE) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load map</p>
          <p className="text-sm text-gray-500 mt-2">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  return null;
};

const FarmMap: React.FC<FarmMapProps> = (props) => {
  const render = (status: Status) => {
    if (status === Status.SUCCESS) {
      return <MapComponent {...props} />;
    }
    return <MapStatus status={status} />;
  };

  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      render={render}
      libraries={['geometry', 'drawing']}
    />
  );
};

export default FarmMap;