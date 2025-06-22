"use client";

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Leaf,
  Factory,
  Home,
  Search,
  Calendar
} from 'lucide-react';
import { mockOrders, mockSupplyChainData } from '@/data/mock-data';
import { TrackingInfo, Order } from '@/types';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  location: string;
  icon: React.ReactNode;
  details?: string[];
}

export default function SupplyChainPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);

  // Filter orders based on search
  useEffect(() => {
    const filtered = mockOrders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm]);

  // Generate tracking steps for selected order
  useEffect(() => {
    if (!selectedOrder) return;

    const steps: TrackingStep[] = [
      {
        id: 'harvest',
        title: 'Harvested',
        description: 'Product harvested from farm',
        status: 'completed',
        timestamp: '2024-01-15 06:00',
        location: 'Green Valley Farm, Kandy',
        icon: <Leaf className="w-5 h-5" />,
        details: [
          'Organic vegetables harvested at optimal ripeness',
          'Quality inspection completed',
          'Packaged in eco-friendly materials'
        ]
      },
      {
        id: 'processing',
        title: 'Processing & Packaging',
        description: 'Product cleaned and packaged',
        status: 'completed',
        timestamp: '2024-01-15 08:30',
        location: 'Farm Processing Center',
        icon: <Factory className="w-5 h-5" />,
        details: [
          'Thorough cleaning and sorting',
          'Temperature-controlled packaging',
          'QR codes applied for traceability'
        ]
      },
      {
        id: 'collection',
        title: 'Collected for Delivery',
        description: 'Order picked up by delivery service',
        status: selectedOrder.status === 'pending' ? 'pending' : 'completed',
        timestamp: selectedOrder.status === 'pending' ? undefined : '2024-01-15 10:00',
        location: 'Green Valley Farm',
        icon: <Package className="w-5 h-5" />,
        details: [
          'Order collected by certified delivery partner',
          'Cold chain maintained',
          'Real-time tracking activated'
        ]
      },
      {
        id: 'transit',
        title: 'In Transit',
        description: 'Product on the way to destination',
        status: selectedOrder.status === 'out-for-delivery' ? 'current' : 
               selectedOrder.status === 'delivered' ? 'completed' : 'pending',
        timestamp: selectedOrder.status === 'pending' ? undefined : '2024-01-15 11:30',
        location: 'En route to Colombo',
        icon: <Truck className="w-5 h-5" />,
        details: [
          'GPS tracking active',
          'Temperature monitoring in progress',
          'Estimated delivery: 2-4 hours'
        ]
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Product delivered to customer',
        status: selectedOrder.status === 'delivered' ? 'completed' : 'pending',
        timestamp: selectedOrder.status === 'delivered' ? '2024-01-15 14:00' : undefined,
        location: selectedOrder.deliveryAddress.city,
        icon: <Home className="w-5 h-5" />,
        details: selectedOrder.status === 'delivered' ? [
          'Successfully delivered to customer',
          'Customer signature received',
          'Delivery photo captured'
        ] : [
          'Awaiting delivery',
          'Customer will be notified upon arrival'
        ]
      }
    ];

    setTrackingSteps(steps);
  }, [selectedOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'out-for-delivery': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Supply Chain Tracking</h1>
              <p className="mt-1 text-sm text-gray-600">
                Track your orders from farm to table
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Orders List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <span className="text-sm text-gray-500">{filteredOrders.length} orders</span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Orders */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedOrder?.id === order.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500 ring-opacity-20 bg-emerald-50' 
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900">Order #{order.id}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{order.orderDate}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{order.deliveryAddress.city}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        <span>{order.items.length} items - LKR {order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h2>
                      <p className="text-gray-600">Tracking your order in real-time</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                      <dl className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Order Date:</dt>
                          <dd className="font-medium">{selectedOrder.orderDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Items:</dt>
                          <dd className="font-medium">{selectedOrder.items.length} products</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Total:</dt>
                          <dd className="font-medium">LKR {selectedOrder.total}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                      <address className="text-sm text-gray-600 not-italic">
                        {selectedOrder.deliveryAddress.street}<br />
                        {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.province}<br />
                        {selectedOrder.deliveryAddress.postalCode}
                      </address>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
                  
                  <div className="relative">
                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="relative pb-8 last:pb-0">
                        {index < trackingSteps.length - 1 && (
                          <div 
                            className={`absolute left-6 top-12 w-0.5 h-full ${
                              step.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
                            }`}
                          />
                        )}
                        
                        <div className="flex items-start space-x-4">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : step.status === 'current' ? (
                              <AlertCircle className="w-6 h-6" />
                            ) : (
                              step.icon
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                              {step.timestamp && (
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {step.timestamp}
                                </div>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-2">{step.description}</p>
                            
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {step.location}
                            </div>

                            {step.details && step.details.length > 0 && (
                              <div className="bg-gray-50 rounded-lg p-3">
                                <ul className="space-y-1">
                                  {step.details.map((detail, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Sustainability Features</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <Leaf className="w-4 h-4 text-emerald-500 mr-2" />
                          Organic farming practices
                        </li>
                        <li className="flex items-center">
                          <Leaf className="w-4 h-4 text-emerald-500 mr-2" />
                          Eco-friendly packaging
                        </li>
                        <li className="flex items-center">
                          <Leaf className="w-4 h-4 text-emerald-500 mr-2" />
                          Carbon-neutral delivery
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Quality Assurance</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                          Farm inspection completed
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                          Quality standards verified
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                          Cold chain maintained
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order</h3>
                <p className="text-gray-600">Choose an order from the list to view its tracking details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}