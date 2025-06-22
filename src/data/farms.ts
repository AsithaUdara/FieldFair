import { Farm } from '@/types';

export const mockFarms: Farm[] = [
  {
    id: 'farm_001',
    name: 'Green Valley Organic Farm',
    ownerId: 'farmer_001',
    ownerName: 'Rajesh Perera',
    description: 'Family-owned organic farm specializing in fresh vegetables and herbs. Practicing sustainable farming for over 20 years.',
    location: {
      street: '123 Farm Road',
      city: 'Kandy',
      province: 'Central Province',
      postalCode: '20000',
      coordinates: {
        lat: 7.2906,
        lng: 80.6337
      }
    },
    coordinates: {
      lat: 7.2906,
      lng: 80.6337
    },
    size: 15.5,
    farmingMethods: ['organic', 'permaculture'],
    certifications: ['Organic Certified', 'Fair Trade'],
    establishedYear: 2003,
    images: [
      '/images/farms/green-valley-1.jpg',
      '/images/farms/green-valley-2.jpg'
    ],
    products: ['prod_001', 'prod_002', 'prod_003'],
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    visitingHours: {
      open: '07:00',
      close: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    socialMedia: {
      website: 'https://greenvalleyfarm.lk',
      facebook: 'https://facebook.com/greenvalleyfarm',
      instagram: 'https://instagram.com/greenvalleyfarm'
    }
  },
  {
    id: 'farm_002',
    name: 'Sunrise Hydroponic Gardens',
    ownerId: 'farmer_002',
    ownerName: 'Nimal Silva',
    description: 'Modern hydroponic farm producing premium lettuce, tomatoes, and leafy greens year-round.',
    location: {
      street: '456 Tech Valley',
      city: 'Gampaha',
      province: 'Western Province',
      postalCode: '11000',
      coordinates: {
        lat: 7.0873,
        lng: 80.0514
      }
    },
    coordinates: {
      lat: 7.0873,
      lng: 80.0514
    },
    size: 8.2,
    farmingMethods: ['hydroponic', 'conventional'],
    certifications: ['ISO 22000', 'Good Agricultural Practices'],
    establishedYear: 2018,
    images: [
      '/images/farms/sunrise-hydro-1.jpg',
      '/images/farms/sunrise-hydro-2.jpg'
    ],
    products: ['prod_004', 'prod_005'],
    rating: 4.6,
    reviewCount: 89,
    isVerified: true,
    visitingHours: {
      open: '08:00',
      close: '16:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    socialMedia: {
      website: 'https://sunrisehydro.lk'
    }
  },
  {
    id: 'farm_003',
    name: 'Heritage Rice Fields',
    ownerId: 'farmer_003',
    ownerName: 'Kamala Wijesinghe',
    description: 'Traditional rice cultivation preserving ancient varieties and sustainable farming practices.',
    location: {
      street: 'Rice Valley Road',
      city: 'Anuradhapura',
      province: 'North Central Province',
      postalCode: '50000',
      coordinates: {
        lat: 8.3114,
        lng: 80.4037
      }
    },
    coordinates: {
      lat: 8.3114,
      lng: 80.4037
    },
    size: 25.0,
    farmingMethods: ['organic', 'conventional'],
    certifications: ['Organic Certified', 'Heritage Seed Certified'],
    establishedYear: 1995,
    images: [
      '/images/farms/heritage-rice-1.jpg',
      '/images/farms/heritage-rice-2.jpg'
    ],
    products: ['prod_006', 'prod_007'],
    rating: 4.9,
    reviewCount: 203,
    isVerified: true,
    visitingHours: {
      open: '06:00',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    socialMedia: {
      facebook: 'https://facebook.com/heritagerice'
    }
  },
  {
    id: 'farm_004',
    name: 'Coconut Grove Estate',
    ownerId: 'farmer_004',
    ownerName: 'Sunil Fernando',
    description: 'Multi-generational coconut estate producing fresh coconuts, coconut oil, and value-added products.',
    location: {
      street: 'Coconut Estate Lane',
      city: 'Kurunegala',
      province: 'North Western Province',
      postalCode: '60000',
      coordinates: {
        lat: 7.4818,
        lng: 80.3609
      }
    },
    coordinates: {
      lat: 7.4818,
      lng: 80.3609
    },
    size: 40.0,
    farmingMethods: ['organic', 'conventional'],
    certifications: ['Organic Certified', 'Rain Forest Alliance'],
    establishedYear: 1987,
    images: [
      '/images/farms/coconut-grove-1.jpg',
      '/images/farms/coconut-grove-2.jpg'
    ],
    products: ['prod_008', 'prod_009'],
    rating: 4.7,
    reviewCount: 156,
    isVerified: true,
    visitingHours: {
      open: '07:00',
      close: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    socialMedia: {
      website: 'https://coconutgrove.lk',
      instagram: 'https://instagram.com/coconutgrove'
    }
  },
  {
    id: 'farm_005',
    name: 'Mountain Spice Gardens',
    ownerId: 'farmer_005',
    ownerName: 'Priya Bandara',
    description: 'High-altitude spice cultivation including cinnamon, cardamom, and pepper in the scenic hill country.',
    location: {
      street: 'Spice Hill Road',
      city: 'Matale',
      province: 'Central Province',
      postalCode: '21000',
      coordinates: {
        lat: 7.4675,
        lng: 80.6234
      }
    },
    coordinates: {
      lat: 7.4675,
      lng: 80.6234
    },
    size: 12.3,
    farmingMethods: ['organic', 'permaculture'],
    certifications: ['Organic Certified', 'Spice Board Certified'],
    establishedYear: 2010,
    images: [
      '/images/farms/mountain-spice-1.jpg',
      '/images/farms/mountain-spice-2.jpg'
    ],
    products: ['prod_010', 'prod_011'],
    rating: 4.8,
    reviewCount: 94,
    isVerified: true,
    visitingHours: {
      open: '08:00',
      close: '16:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    socialMedia: {
      website: 'https://mountainspice.lk',
      facebook: 'https://facebook.com/mountainspice'
    }
  },
  {
    id: 'farm_006',
    name: 'Fresh Greens Urban Farm',
    ownerId: 'farmer_006',
    ownerName: 'Rohan De Silva',
    description: 'Urban vertical farm in Colombo producing fresh leafy greens and microgreens using innovative growing techniques.',
    location: {
      street: '789 Urban Plaza',
      city: 'Colombo',
      province: 'Western Province',
      postalCode: '00700',
      coordinates: {
        lat: 6.9271,
        lng: 79.8612
      }
    },
    coordinates: {
      lat: 6.9271,
      lng: 79.8612
    },
    size: 2.5,
    farmingMethods: ['hydroponic', 'vertical'],
    certifications: ['Good Agricultural Practices', 'Urban Agriculture Certified'],
    establishedYear: 2020,
    images: [
      '/images/farms/fresh-greens-1.jpg',
      '/images/farms/fresh-greens-2.jpg'
    ],
    products: ['prod_012', 'prod_013'],
    rating: 4.5,
    reviewCount: 67,
    isVerified: true,
    visitingHours: {
      open: '09:00',
      close: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    socialMedia: {
      website: 'https://freshgreensurban.lk',
      instagram: 'https://instagram.com/freshgreensurban'
    }
  }
];