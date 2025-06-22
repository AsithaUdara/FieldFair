// Core application types
export interface User {
  id: string
  email: string
  name: string
  role: 'farmer' | 'consumer'
  avatar?: string
  location?: string
  phone?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  unit: 'kg' | 'g' | 'piece' | 'bunch'
  quantity: number
  farmerId: string
  farmerName: string
  farmLocation: string
  isOrganic: boolean
  harvestDate: string
  expiryDate: string
  images: string[]
  description: string
  nutritionInfo?: NutritionInfo
  rating: number
  reviewCount: number
  availability: 'in-stock' | 'low-stock' | 'out-of-stock'
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ProductCategory = 
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'herbs'
  | 'dairy'
  | 'meat'
  | 'other'

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  vitamins: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedDate?: string
}

export interface Order {
  id: string
  userId: string
  farmerId: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  deliveryAddress: Address
  deliveryDate: string
  deliveryTime: string
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  orderDate: string
  qrCode?: string
  trackingInfo?: TrackingInfo[]
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled'

export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export type PaymentMethod = 'cash' | 'card' | 'mobile-money' | 'bank-transfer'

export interface TrackingInfo {
  status: string
  timestamp: string
  location: string
  description: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  productId: string
  orderId: string
  rating: number
  comment: string
  images?: string[]
  helpful: number
  createdAt: string
}

export interface Farm {
  id: string
  name: string
  ownerId: string
  ownerName: string
  description: string
  location: Address
  coordinates: {
    lat: number
    lng: number
  }
  size: number // in acres
  farmingMethods: ('organic' | 'conventional' | 'hydroponic' | 'permaculture' | 'vertical')[]
  certifications: string[]
  establishedYear: number
  images: string[]
  products: string[] // product IDs
  rating: number
  reviewCount: number
  isVerified: boolean
  visitingHours?: {
    open: string
    close: string
    days: string[]
  }
  socialMedia?: {
    website?: string
    facebook?: string
    instagram?: string
  }
}

// AI/ML related types
export interface CropForecast {
  cropType: string
  region: string
  predictedYield: number
  confidenceScore: number
  factors: {
    weather: number
    soil: number
    market: number
  }
  recommendations: string[]
  forecastDate: string
}

export interface MarketInsight {
  product: string
  currentPrice: number
  predictedPrice: number
  demandLevel: 'low' | 'medium' | 'high'
  seasonality: 'peak' | 'off-peak' | 'transitional'
  competitorCount: number
  recommendations: string[]
  lastUpdated: string
}

// QR Code related types
export interface QRCodeData {
  type: 'product' | 'order' | 'farm'
  id: string
  url: string
  data: any
  timestamp: string
}

// Supply Chain types
export interface SupplyChainStep {
  id: string
  name: string
  description: string
  status: 'completed' | 'current' | 'pending'
  timestamp?: string
  location: string
  details?: string[]
  icon?: string
  duration?: string
}

export interface SupplyChainData {
  orderId: string
  productId: string
  steps: SupplyChainStep[]
  certifications: string[]
  sustainabilityMetrics: {
    carbonFootprint: string
    packageRecyclability: string
    waterUsage: string
    foodWaste: string
  }
}

// Map related types
export interface MapLocation {
  lat: number
  lng: number
  name?: string
  description?: string
  type?: 'farm' | 'warehouse' | 'delivery' | 'user'
}

export interface MapRoute {
  origin: MapLocation
  destination: MapLocation
  waypoints?: MapLocation[]
  distance: number
  duration: number
  emissions?: number
}

// Farm visit types
export interface FarmVisit {
  id: string
  farmId: string
  userId: string
  visitDate: string
  visitTime: string
  numberOfVisitors: number
  purpose: 'educational' | 'bulk-buying' | 'tourism' | 'other'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  specialRequests?: string
  cost?: number
  createdAt: string
}

// Weather and environmental data
export interface WeatherData {
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  current: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
    uvIndex: number
  }
  forecast: {
    date: string
    maxTemp: number
    minTemp: number
    humidity: number
    rainfall: number
    condition: string
  }[]
  lastUpdated: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form and validation types
export interface FormError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FormError[]
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

// Search and filter types
export interface SearchFilters {
  category?: ProductCategory
  priceRange?: {
    min: number
    max: number
  }
  location?: string
  isOrganic?: boolean
  farmingMethods?: string[]
  availability?: string
  rating?: number
}

export interface SortOptions {
  field: 'price' | 'rating' | 'distance' | 'name' | 'date'
  direction: 'asc' | 'desc'
}

// Integration and system types
export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  services: {
    database: 'online' | 'offline'
    maps: 'online' | 'offline'
    payments: 'online' | 'offline'
    notifications: 'online' | 'offline'
  }
  lastCheck: string
}

export interface IntegrationConfig {
  googleMaps: {
    apiKey: string
    enabledFeatures: string[]
  }
  payments: {
    providers: string[]
    testMode: boolean
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}