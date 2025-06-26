"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Trash2,
  Plus,
  Minus,
  MapPin,
  Star,
  Truck,
  Clock,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Leaf,
  Shield,
  CheckCircle,
  Package,
  Home,
  Edit
} from 'lucide-react';

const ShoppingCartPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [selectedAddress, setSelectedAddress] = useState(0);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 300,
      quantity: 3,
      unit: 'kg',
      image: '🍅',
      farmer: {
        name: 'Ravi Mahathaya',
        location: 'Kurunegala',
        rating: 4.8,
        distance: 2.5
      },
      organic: true,
      available: true,
      deliveryTime: 'Today 4-6 PM'
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      price: 250,
      quantity: 2,
      unit: 'kg',
      image: '🥕',
      farmer: {
        name: 'Saman Silva',
        location: 'Matale',
        rating: 4.6,
        distance: 8.2
      },
      organic: false,
      available: true,
      deliveryTime: 'Tomorrow 10-12 AM'
    },
    {
      id: 3,
      name: 'Green Beans',
      price: 400,
      quantity: 1,
      unit: 'kg',
      image: '🫘',
      farmer: {
        name: 'Nimal Jayawardena',
        location: 'Badulla',
        rating: 4.9,
        distance: 12.1
      },
      organic: true,
      available: true,
      deliveryTime: 'Today 6-8 PM'
    }
  ]);

  const savedAddresses = [
    {
      id: 0,
      type: 'Home',
      address: 'No. 123, Galle Road, Colombo 03',
      recipient: 'Priya Fernando',
      phone: '077-123-4567',
      isDefault: true
    },
    {
      id: 1,
      type: 'Office',
      address: 'Level 5, World Trade Center, Colombo 01',
      recipient: 'Priya Fernando',
      phone: '077-123-4567',
      isDefault: false
    }
  ];

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

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 150 : 0;
  const serviceFee = Math.round(subtotal * 0.02); // 2% service fee
  const total = subtotal + deliveryFee + serviceFee;

  const groupedByFarmer = cartItems.reduce((groups, item) => {
    const farmerKey = item.farmer.name;
    if (!groups[farmerKey]) {
      groups[farmerKey] = [];
    }
    groups[farmerKey].push(item);
    return groups;
  }, {} as Record<string, typeof cartItems>);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
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
                  <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                  <p className="text-sm text-gray-600 mt-1">{cartItems.length} items in your cart</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">Rs. {total.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total amount</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {cartItems.length === 0 ? (
              // Empty Cart
              <div className="text-center py-16">
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Browse our fresh products and add items to your cart</p>
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Delivery Method Selection */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        deliveryMethod === 'delivery' 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          value="delivery"
                          checked={deliveryMethod === 'delivery'}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <Truck className="w-6 h-6 text-emerald-600" />
                          <div>
                            <div className="font-medium text-gray-900">Home Delivery</div>
                            <div className="text-sm text-gray-500">Rs. 150 delivery fee</div>
                          </div>
                        </div>
                      </label>

                      <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        deliveryMethod === 'pickup' 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={deliveryMethod === 'pickup'}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <Package className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Farm Pickup</div>
                            <div className="text-sm text-gray-500">Free pickup</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Delivery Address (if delivery method) */}
                  {deliveryMethod === 'delivery' && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
                        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                          <Plus className="w-4 h-4 mr-1" />
                          Add New
                        </button>
                      </div>
                      <div className="space-y-3">
                        {savedAddresses.map((address) => (
                          <label key={address.id} className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedAddress === address.id 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="address"
                              value={address.id}
                              checked={selectedAddress === address.id}
                              onChange={() => setSelectedAddress(address.id)}
                              className="sr-only"
                            />
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <Home className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{address.type}</span>
                                    {address.isDefault && (
                                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-gray-600 text-sm mt-1">{address.address}</div>
                                  <div className="text-gray-500 text-sm">{address.recipient} • {address.phone}</div>
                                </div>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cart Items by Farmer */}
                  {Object.entries(groupedByFarmer).map(([farmerName, items]) => (
                    <div key={farmerName} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      {/* Farmer Header */}
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-emerald-700">
                                {farmerName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{farmerName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {items[0].farmer.location}
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                  {items[0].farmer.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Delivery</div>
                            <div className="font-medium text-gray-900">{items[0].deliveryTime}</div>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-gray-200">
                        {items.map((item) => (
                          <div key={item.id} className="p-6">
                            <div className="flex items-center space-x-4">
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">{item.image}</span>
                              </div>

                              {/* Product Info */}
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-emerald-600 font-medium">Rs. {item.price}/{item.unit}</span>
                                  {item.organic && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                      <Leaf className="w-3 h-3 mr-1" />
                                      Organic
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Item Total */}
                                <div className="text-right min-w-[80px]">
                                  <div className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                                </div>

                                {/* Remove Button */}
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee</span>
                        <span className="font-medium">Rs. {serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">
                          {deliveryFee > 0 ? `Rs. ${deliveryFee.toLocaleString()}` : 'Free'}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-lg font-bold text-emerald-600">Rs. {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Estimated Delivery */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-900">Estimated Delivery</span>
                      </div>
                      <p className="text-sm text-emerald-800">
                        {deliveryMethod === 'delivery' ? 'Today 4-8 PM' : 'Ready for pickup tomorrow'}
                      </p>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure checkout powered by FieldFair</span>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 group">
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By proceeding, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCartPage;