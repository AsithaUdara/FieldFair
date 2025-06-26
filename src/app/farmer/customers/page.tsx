"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  Phone,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  ShoppingCart,
  MessageCircle,
  Eye,
  UserPlus,
  TrendingUp,
  Heart,
  Package,
  Clock,
  Award,
  Mail
} from 'lucide-react';

const FarmerCustomersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Nimal Perera',
      phone: '077-123-4567',
      email: 'nimal.perera@gmail.com',
      location: 'Colombo 07',
      avatar: 'NP',
      joinDate: '2024-02-15',
      totalOrders: 28,
      totalSpent: 45600,
      averageOrderValue: 1628,
      lastOrderDate: '2024-06-25',
      rating: 4.8,
      loyaltyStatus: 'Gold',
      preferredProducts: ['Organic Tomatoes', 'Fresh Carrots', 'Green Beans'],
      notes: 'Prefers organic products. Regular customer with consistent orders.',
      type: 'individual'
    },
    {
      id: 2,
      name: 'Saman Silva',
      phone: '076-987-6543',
      email: 'saman.silva@yahoo.com',
      location: 'Kurunegala',
      avatar: 'SS',
      joinDate: '2024-03-10',
      totalOrders: 22,
      totalSpent: 32400,
      averageOrderValue: 1472,
      lastOrderDate: '2024-06-24',
      rating: 4.6,
      loyaltyStatus: 'Silver',
      preferredProducts: ['Green Cabbage', 'Red Onions', 'Carrots'],
      notes: 'Family orders. Usually picks up from farm.',
      type: 'individual'
    },
    {
      id: 3,
      name: 'Green Valley Restaurant',
      phone: '011-234-5678',
      email: 'orders@greenvalley.lk',
      location: 'Kandy',
      avatar: 'GV',
      joinDate: '2024-01-20',
      totalOrders: 45,
      totalSpent: 125000,
      averageOrderValue: 2777,
      lastOrderDate: '2024-06-25',
      rating: 4.9,
      loyaltyStatus: 'Platinum',
      preferredProducts: ['Organic Tomatoes', 'Green Beans', 'Cabbage'],
      notes: 'Commercial customer. Requires invoices and bulk orders.',
      type: 'business'
    },
    {
      id: 4,
      name: 'Kamala Jayawardena',
      phone: '071-555-7890',
      email: 'kamala.j@hotmail.com',
      location: 'Gampaha',
      avatar: 'KJ',
      joinDate: '2024-04-05',
      totalOrders: 15,
      totalSpent: 18900,
      averageOrderValue: 1260,
      lastOrderDate: '2024-06-23',
      rating: 4.9,
      loyaltyStatus: 'Bronze',
      preferredProducts: ['Green Beans', 'Organic Tomatoes'],
      notes: 'Health-conscious customer. Only buys organic produce.',
      type: 'individual'
    },
    {
      id: 5,
      name: 'Ruwan Fernando',
      phone: '075-111-2233',
      email: 'ruwan.fernando@gmail.com',
      location: 'Negombo',
      avatar: 'RF',
      joinDate: '2024-01-30',
      totalOrders: 35,
      totalSpent: 67800,
      averageOrderValue: 1937,
      lastOrderDate: '2024-06-22',
      rating: 4.5,
      loyaltyStatus: 'Gold',
      preferredProducts: ['All Vegetables', 'Seasonal Fruits'],
      notes: 'Bulk buyer for local market. Very reliable customer.',
      type: 'business'
    },
    {
      id: 6,
      name: 'Priyantha Gunasekara',
      phone: '078-444-5566',
      email: 'priyantha.g@yahoo.com',
      location: 'Colombo 03',
      avatar: 'PG',
      joinDate: '2024-05-12',
      totalOrders: 8,
      totalSpent: 9600,
      averageOrderValue: 1200,
      lastOrderDate: '2024-06-18',
      rating: 4.3,
      loyaltyStatus: 'Bronze',
      preferredProducts: ['Red Onions', 'Carrots'],
      notes: 'New customer. Still exploring product range.',
      type: 'individual'
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

  const getLoyaltyColor = (status) => {
    switch (status) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesFilter = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const customerStats = {
    total: customers.length,
    individual: customers.filter(c => c.type === 'individual').length,
    business: customers.filter(c => c.type === 'business').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length
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
                  <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage relationships with your customers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search customers..."
                  className="bg-transparent text-sm outline-none w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{customerStats.total}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Individual</p>
                    <p className="text-2xl font-bold text-gray-900">{customerStats.individual}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Business</p>
                    <p className="text-2xl font-bold text-gray-900">{customerStats.business}</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. {customerStats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. {Math.round(customerStats.averageOrderValue).toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                  </div>
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Customers</option>
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600">
                  Showing {filteredCustomers.length} customers
                </div>
              </div>
            </div>

            {/* Customers List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-emerald-700">
                            {customer.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getLoyaltyColor(customer.loyaltyStatus)}`}>
                              {customer.loyaltyStatus}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">{customer.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{customer.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Total Orders</div>
                        <div className="font-semibold text-gray-900">{customer.totalOrders}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Spent</div>
                        <div className="font-semibold text-gray-900">Rs. {customer.totalSpent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Avg Order</div>
                        <div className="font-semibold text-gray-900">Rs. {customer.averageOrderValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Last Order</div>
                        <div className="font-semibold text-gray-900">
                          {new Date(customer.lastOrderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Contact Info</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{customer.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Preferred Products</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.preferredProducts.slice(0, 2).map((product, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                            {product}
                          </span>
                        ))}
                        {customer.preferredProducts.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            +{customer.preferredProducts.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {customer.notes && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-1">Notes</div>
                        <div className="text-sm text-gray-900 italic bg-gray-50 p-2 rounded">{customer.notes}</div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </button>
                      <button className="border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No customers found for the selected filter.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerCustomersPage;