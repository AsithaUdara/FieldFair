"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  Leaf,
  Award,
  Clock,
  Truck,
  Plus,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown
} from 'lucide-react';

const MarketplacePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock products data
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 300,
      unit: 'kg',
      image: '🍅',
      farmer: 'Ravi Mahathaya',
      location: 'Kurunegala',
      distance: 2.5,
      rating: 4.8,
      reviews: 127,
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      category: 'vegetables',
      description: 'Fresh organic tomatoes grown without pesticides',
      harvestDate: '2024-06-20',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      price: 250,
      unit: 'kg',
      image: '🥕',
      farmer: 'Saman Silva',
      location: 'Nuwara Eliya',
      distance: 15.2,
      rating: 4.6,
      reviews: 89,
      isOrganic: false,
      inStock: true,
      stockLevel: 12,
      category: 'vegetables',
      description: 'Sweet and crunchy carrots perfect for cooking',
      harvestDate: '2024-06-18',
      isFavorite: true
    },
    {
      id: 3,
      name: 'Green Cabbage',
      price: 180,
      unit: 'kg',
      image: '🥬',
      farmer: 'Kamala Perera',
      location: 'Kandy',
      distance: 8.7,
      rating: 4.7,
      reviews: 156,
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      category: 'vegetables',
      description: 'Fresh cabbage ideal for salads and cooking',
      harvestDate: '2024-06-19',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Red Onions',
      price: 220,
      unit: 'kg',
      image: '🧄',
      farmer: 'Pradeep Fernando',
      location: 'Matale',
      distance: 12.1,
      rating: 4.5,
      reviews: 203,
      isOrganic: false,
      inStock: true,
      stockLevel: 8,
      category: 'vegetables',
      description: 'Premium quality red onions with strong flavor',
      harvestDate: '2024-06-15',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Green Beans',
      price: 400,
      unit: 'kg',
      image: '🫘',
      farmer: 'Nimal Jayawardena',
      location: 'Badulla',
      distance: 45.3,
      rating: 4.9,
      reviews: 78,
      isOrganic: true,
      inStock: true,
      stockLevel: 22,
      category: 'vegetables',
      description: 'Tender green beans rich in nutrients',
      harvestDate: '2024-06-21',
      isFavorite: true
    },
    {
      id: 6,
      name: 'Sweet Corn',
      price: 150,
      unit: 'kg',
      image: '🌽',
      farmer: 'Ruwan Mendis',
      location: 'Gampaha',
      distance: 5.8,
      rating: 4.4,
      reviews: 94,
      isOrganic: false,
      inStock: false,
      stockLevel: 0,
      category: 'grains',
      description: 'Sweet corn perfect for boiling and grilling',
      harvestDate: '2024-06-10',
      isFavorite: false
    }
  ]);

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

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'vegetables', name: 'Vegetables', count: products.filter(p => p.category === 'vegetables').length },
    { id: 'fruits', name: 'Fruits', count: 0 },
    { id: 'grains', name: 'Grains', count: products.filter(p => p.category === 'grains').length },
    { id: 'herbs', name: 'Herbs', count: 0 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'kurunegala', name: 'Kurunegala' },
    { id: 'kandy', name: 'Kandy' },
    { id: 'colombo', name: 'Colombo' },
    { id: 'gampaha', name: 'Gampaha' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || product.location.toLowerCase().includes(selectedLocation);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const toggleFavorite = (productId: number) => {
    // In real app, this would update the backend
    console.log('Toggle favorite for product:', productId);
  };

  const addToCart = (productId: number) => {
    // In real app, this would add to cart
    console.log('Add to cart:', productId);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <CustomerSidebar
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
                  <h1 className="text-2xl font-bold text-gray-900">Fresh Marketplace</h1>
                  <p className="text-sm text-gray-600 mt-1">Discover fresh, local produce from verified farmers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80">
                <Search className="w-4 h-4 text-gray-500 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search products, farmers, or locations..."
                  className="bg-transparent text-sm outline-none flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* View Toggle */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Location</h3>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rs. {priceRange[0]}</span>
                      <span className="text-sm text-gray-600">Rs. {priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Special Filters */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Special</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                      <span className="ml-2 text-sm text-gray-700">Organic Only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                      <span className="ml-2 text-sm text-gray-700">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                      <span className="ml-2 text-sm text-gray-700">Nearby (5km)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {filteredProducts.length} Products Found
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Fresh produce from local farmers near you
                    </p>
                  </div>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Nearest First</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                      {/* Product Image & Quick Actions */}
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          <span className="text-6xl">{product.image}</span>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={() => toggleFavorite(product.id)}
                            className={`p-2 rounded-full shadow-lg transition-colors ${
                              product.isFavorite 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white text-gray-600 hover:text-red-500'
                            }`}
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => addToCart(product.id)}
                            className="p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          {product.isOrganic && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                              <Leaf className="w-3 h-3 mr-1" />
                              Organic
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl font-bold text-emerald-600">
                            Rs. {product.price}
                            <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                          </div>
                          {product.stockLevel < 15 && product.inStock && (
                            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                              Only {product.stockLevel} left
                            </span>
                          )}
                        </div>

                        {/* Farmer Info */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-emerald-700">
                              {product.farmer.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{product.farmer}</span>
                        </div>

                        {/* Location & Rating */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{product.location}</span>
                            <span>•</span>
                            <span>{product.distance}km away</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                            <span>({product.reviews})</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button 
                          className={`w-full py-2 rounded-lg font-medium transition-colors ${
                            product.inStock
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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

export default MarketplacePage;