import { MapLocation, Farm } from '@/types';

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  
  return Math.round(distance * 10) / 10;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Get user's current location
export function getCurrentLocation(): Promise<{lat: number, lng: number}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        // Default to Colombo, Sri Lanka coordinates
        console.warn('Location access denied, using default location');
        resolve({ lat: 6.9271, lng: 79.8612 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Sort farms by distance from user location
export function sortFarmsByDistance(
  farms: Farm[],
  userLocation: {lat: number, lng: number} | null
): Farm[] {
  if (!userLocation) return farms;

  return [...farms].sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.coordinates.lat,
      a.coordinates.lng
    );
    const distanceB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.coordinates.lat,
      b.coordinates.lng
    );
    return distanceA - distanceB;
  });
}

// Generate Google Maps URL for directions
export function generateDirectionsUrl(
  origin: {lat: number, lng: number},
  destination: {lat: number, lng: number}
): string {
  const baseUrl = 'https://www.google.com/maps/dir/';
  return `${baseUrl}${origin.lat},${origin.lng}/${destination.lat},${destination.lng}`;
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance}km`;
}

// Get estimated travel time (simplified calculation)
export function getEstimatedTravelTime(distance: number): string {
  // Assume average speed of 40 km/h for local roads
  const hours = distance / 40;
  
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} min`;
  }
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  }
  
  return `${wholeHours}h ${minutes}m`;
}

// Check if coordinates are within Sri Lanka bounds
export function isWithinSriLanka(lat: number, lng: number): boolean {
  const sriLankaBounds = {
    north: 9.835,
    south: 5.915,
    east: 81.879,
    west: 79.652
  };
  
  return lat >= sriLankaBounds.south && 
         lat <= sriLankaBounds.north && 
         lng >= sriLankaBounds.west && 
         lng <= sriLankaBounds.east;
}

// Generate map markers data for farms
export function generateFarmMarkers(farms: Farm[]): MapLocation[] {
  return farms.map(farm => ({
    lat: farm.coordinates.lat,
    lng: farm.coordinates.lng,
    name: farm.name,
    description: `${farm.location.city}, ${farm.location.province}`,
    type: 'farm' as const
  }));
}

// Get map bounds that include all farms
export function getFarmsBounds(farms: Farm[]): {
  north: number,
  south: number,
  east: number,
  west: number
} | null {
  if (farms.length === 0) return null;
  
  let north = farms[0].coordinates.lat;
  let south = farms[0].coordinates.lat;
  let east = farms[0].coordinates.lng;
  let west = farms[0].coordinates.lng;
  
  farms.forEach(farm => {
    north = Math.max(north, farm.coordinates.lat);
    south = Math.min(south, farm.coordinates.lat);
    east = Math.max(east, farm.coordinates.lng);
    west = Math.min(west, farm.coordinates.lng);
  });
  
  // Add some padding
  const padding = 0.01;
  return {
    north: north + padding,
    south: south - padding,
    east: east + padding,
    west: west - padding
  };
}

// Validate coordinates
export function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180 &&
    !isNaN(lat) && !isNaN(lng)
  );
}

// Convert address to coordinates (mock implementation)
export async function geocodeAddress(address: string): Promise<{lat: number, lng: number} | null> {
  // In a real implementation, this would use Google Geocoding API
  // For prototype, return mock coordinates based on city names
  const cityCoordinates: Record<string, {lat: number, lng: number}> = {
    'colombo': { lat: 6.9271, lng: 79.8612 },
    'kandy': { lat: 7.2906, lng: 80.6337 },
    'galle': { lat: 6.0535, lng: 80.2210 },
    'jaffna': { lat: 9.6615, lng: 80.0255 },
    'anuradhapura': { lat: 8.3114, lng: 80.4037 },
    'batticaloa': { lat: 7.7102, lng: 81.6924 },
    'negombo': { lat: 7.2083, lng: 79.8358 },
    'kurunegala': { lat: 7.4818, lng: 80.3609 },
    'ratnapura': { lat: 6.6828, lng: 80.3992 },
    'matale': { lat: 7.4675, lng: 80.6234 }
  };
  
  const city = address.toLowerCase().split(',')[0].trim();
  return cityCoordinates[city] || null;
}

// Generate route waypoints
export function generateRouteWaypoints(
  farms: Farm[],
  userLocation: {lat: number, lng: number}
): MapLocation[] {
  const sortedFarms = sortFarmsByDistance(farms, userLocation);
  
  return [
    {
      lat: userLocation.lat,
      lng: userLocation.lng,
      name: 'Your Location',
      type: 'user' as const
    },
    ...sortedFarms.slice(0, 5).map(farm => ({
      lat: farm.coordinates.lat,
      lng: farm.coordinates.lng,
      name: farm.name,
      description: farm.location.city,
      type: 'farm' as const
    }))
  ];
}