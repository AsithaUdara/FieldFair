import { Product, Order, TrackingInfo } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Organic Tomatoes',
    category: 'vegetables',
    price: 180,
    unit: 'kg',
    quantity: 25,
    farmerId: 'farmer_001',
    farmerName: 'Rajesh Perera',
    farmLocation: 'Green Valley Farm, Kandy',
    isOrganic: true,
    harvestDate: '2024-01-15',
    expiryDate: '2024-01-25',
    images: ['/images/products/tomatoes-1.jpg'],
    description: 'Fresh, juicy organic tomatoes grown using traditional methods without any chemical pesticides.',
    nutritionInfo: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      vitamins: ['Vitamin C', 'Vitamin K', 'Lycopene']
    },
    rating: 4.8,
    reviewCount: 34,
    availability: 'in-stock',
    tags: ['organic', 'fresh', 'local'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prod_002',
    name: 'Fresh Lettuce',
    category: 'vegetables',
    price: 120,
    unit: 'piece',
    quantity: 40,
    farmerId: 'farmer_002',
    farmerName: 'Nimal Silva',
    farmLocation: 'Sunrise Hydroponic Gardens, Gampaha',
    isOrganic: false,
    harvestDate: '2024-01-16',
    expiryDate: '2024-01-23',
    images: ['/images/products/lettuce-1.jpg'],
    description: 'Crisp, fresh lettuce grown in controlled hydroponic environment ensuring consistent quality.',
    nutritionInfo: {
      calories: 15,
      protein: 1.4,
      carbs: 2.9,
      fat: 0.2,
      fiber: 1.3,
      vitamins: ['Vitamin A', 'Vitamin K', 'Folate']
    },
    rating: 4.6,
    reviewCount: 22,
    availability: 'in-stock',
    tags: ['hydroponic', 'fresh', 'crisp'],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: 'prod_003',
    name: 'Organic Carrots',
    category: 'vegetables',
    price: 150,
    unit: 'kg',
    quantity: 30,
    farmerId: 'farmer_001',
    farmerName: 'Rajesh Perera',
    farmLocation: 'Green Valley Farm, Kandy',
    isOrganic: true,
    harvestDate: '2024-01-14',
    expiryDate: '2024-02-14',
    images: ['/images/products/carrots-1.jpg'],
    description: 'Sweet, crunchy organic carrots rich in beta-carotene and nutrients.',
    nutritionInfo: {
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fat: 0.2,
      fiber: 2.8,
      vitamins: ['Beta-Carotene', 'Vitamin K1', 'Potassium']
    },
    rating: 4.9,
    reviewCount: 18,
    availability: 'in-stock',
    tags: ['organic', 'sweet', 'nutritious'],
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order_001',
    userId: 'user_001',
    farmerId: 'farmer_001',
    items: [
      {
        product: mockProducts[0],
        quantity: 2
      },
      {
        product: mockProducts[2],
        quantity: 1
      }
    ],
    subtotal: 510,
    deliveryFee: 100,
    total: 610,
    status: 'out-for-delivery',
    deliveryAddress: {
      street: '123 Main Street',
      city: 'Colombo',
      province: 'Western Province',
      postalCode: '00100',
      coordinates: {
        lat: 6.9271,
        lng: 79.8612
      }
    },
    deliveryDate: '2024-01-16',
    deliveryTime: '14:00-16:00',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderDate: '2024-01-15',
    qrCode: 'QR_ORDER_001_DATA',
    trackingInfo: [
      {
        status: 'Order Confirmed',
        timestamp: '2024-01-15T10:00:00Z',
        location: 'Green Valley Farm',
        description: 'Your order has been confirmed and is being prepared.'
      },
      {
        status: 'Preparing',
        timestamp: '2024-01-15T11:30:00Z',
        location: 'Green Valley Farm',
        description: 'Products are being harvested and prepared for delivery.'
      },
      {
        status: 'Out for Delivery',
        timestamp: '2024-01-16T09:00:00Z',
        location: 'En route to Colombo',
        description: 'Your order is on the way to your delivery address.'
      }
    ]
  },
  {
    id: 'order_002',
    userId: 'user_002',
    farmerId: 'farmer_002',
    items: [
      {
        product: mockProducts[1],
        quantity: 5
      }
    ],
    subtotal: 600,
    deliveryFee: 80,
    total: 680,
    status: 'delivered',
    deliveryAddress: {
      street: '456 Garden Road',
      city: 'Kandy',
      province: 'Central Province',
      postalCode: '20000',
      coordinates: {
        lat: 7.2906,
        lng: 80.6337
      }
    },
    deliveryDate: '2024-01-14',
    deliveryTime: '10:00-12:00',
    paymentMethod: 'mobile-money',
    paymentStatus: 'paid',
    orderDate: '2024-01-13',
    qrCode: 'QR_ORDER_002_DATA',
    trackingInfo: [
      {
        status: 'Order Confirmed',
        timestamp: '2024-01-13T15:00:00Z',
        location: 'Sunrise Hydroponic Gardens',
        description: 'Your order has been confirmed.'
      },
      {
        status: 'Preparing',
        timestamp: '2024-01-14T08:00:00Z',
        location: 'Sunrise Hydroponic Gardens',
        description: 'Fresh lettuce harvested and packaged.'
      },
      {
        status: 'Out for Delivery',
        timestamp: '2024-01-14T09:30:00Z',
        location: 'En route to Kandy',
        description: 'Order dispatched for delivery.'
      },
      {
        status: 'Delivered',
        timestamp: '2024-01-14T11:00:00Z',
        location: 'Kandy',
        description: 'Order successfully delivered to customer.'
      }
    ]
  },
  {
    id: 'order_003',
    userId: 'user_003',
    farmerId: 'farmer_001',
    items: [
      {
        product: mockProducts[0],
        quantity: 1
      }
    ],
    subtotal: 180,
    deliveryFee: 120,
    total: 300,
    status: 'pending',
    deliveryAddress: {
      street: '789 Hill View',
      city: 'Matale',
      province: 'Central Province',
      postalCode: '21000',
      coordinates: {
        lat: 7.4675,
        lng: 80.6234
      }
    },
    deliveryDate: '2024-01-17',
    deliveryTime: '15:00-17:00',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    orderDate: '2024-01-16',
    qrCode: 'QR_ORDER_003_DATA',
    trackingInfo: [
      {
        status: 'Order Placed',
        timestamp: '2024-01-16T16:00:00Z',
        location: 'Online',
        description: 'Order placed and awaiting confirmation.'
      }
    ]
  },
  {
    id: 'order_004',
    userId: 'user_004',
    farmerId: 'farmer_002',
    items: [
      {
        product: mockProducts[1],
        quantity: 3
      },
      {
        product: mockProducts[2],
        quantity: 2
      }
    ],
    subtotal: 660,
    deliveryFee: 90,
    total: 750,
    status: 'confirmed',
    deliveryAddress: {
      street: '321 Beach Road',
      city: 'Galle',
      province: 'Southern Province',
      postalCode: '80000',
      coordinates: {
        lat: 6.0535,
        lng: 80.2210
      }
    },
    deliveryDate: '2024-01-18',
    deliveryTime: '09:00-11:00',
    paymentMethod: 'bank-transfer',
    paymentStatus: 'paid',
    orderDate: '2024-01-16',
    qrCode: 'QR_ORDER_004_DATA',
    trackingInfo: [
      {
        status: 'Order Confirmed',
        timestamp: '2024-01-16T18:00:00Z',
        location: 'Sunrise Hydroponic Gardens',
        description: 'Order confirmed and scheduled for preparation.'
      }
    ]
  }
];

export const mockSupplyChainData = {
  steps: [
    {
      id: 'harvest',
      name: 'Harvesting',
      description: 'Products harvested from certified farms',
      icon: 'leaf',
      duration: '2-4 hours'
    },
    {
      id: 'processing',
      name: 'Processing & Packaging',
      description: 'Cleaning, sorting, and eco-friendly packaging',
      icon: 'package',
      duration: '1-2 hours'
    },
    {
      id: 'quality',
      name: 'Quality Check',
      description: 'Rigorous quality inspection and certification',
      icon: 'check-circle',
      duration: '30 minutes'
    },
    {
      id: 'dispatch',
      name: 'Dispatch',
      description: 'Order collected by certified delivery partners',
      icon: 'truck',
      duration: '15 minutes'
    },
    {
      id: 'transit',
      name: 'In Transit',
      description: 'Real-time tracking with temperature monitoring',
      icon: 'navigation',
      duration: '2-6 hours'
    },
    {
      id: 'delivery',
      name: 'Delivery',
      description: 'Fresh products delivered to your doorstep',
      icon: 'home',
      duration: '5 minutes'
    }
  ],
  certifications: [
    'Organic Certified',
    'Fair Trade',
    'Good Agricultural Practices',
    'ISO 22000 Food Safety',
    'Carbon Neutral Delivery'
  ],
  sustainabilityMetrics: {
    carbonFootprint: '65% lower than traditional supply chains',
    packageRecyclability: '100% biodegradable materials',
    waterUsage: '40% reduction through efficient farming',
    foodWaste: '25% reduction through direct sales'
  }
};