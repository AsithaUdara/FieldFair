"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Upload, Package, Truck, Check, MapPin, Clock, User } from 'lucide-react';
import QRCode from 'react-qr-code';
import { mockProducts, mockOrders } from '@/data/mock-data';
import { TrackingInfo } from '@/types';

interface QRData {
  type: 'product' | 'order';
  id: string;
  data: any;
}

export default function QRPage() {
  const [activeTab, setActiveTab] = useState<'scan' | 'generate'>('scan');
  const [scanResult, setScanResult] = useState<QRData | null>(null);
  const [generateData, setGenerateData] = useState({
    type: 'product' as 'product' | 'order',
    productId: '',
    orderId: ''
  });
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start camera for scanning
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera
  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Simulate QR scan (in real implementation, use a QR scanning library)
  const simulateScan = (type: 'product' | 'order') => {
    const mockData = type === 'product' 
      ? { type: 'product', id: 'prod_001', data: mockProducts[0] }
      : { type: 'order', id: 'order_001', data: mockOrders[0] };
    
    setScanResult(mockData);
    stopScanning();
  };

  // Generate QR code data
  const generateQRData = () => {
    if (generateData.type === 'product' && generateData.productId) {
      const product = mockProducts.find(p => p.id === generateData.productId);
      return JSON.stringify({
        type: 'product',
        id: generateData.productId,
        url: `https://fieldfair.lk/products/${generateData.productId}`,
        data: product
      });
    } else if (generateData.type === 'order' && generateData.orderId) {
      const order = mockOrders.find(o => o.id === generateData.orderId);
      return JSON.stringify({
        type: 'order',
        id: generateData.orderId,
        url: `https://fieldfair.lk/track/${generateData.orderId}`,
        data: order
      });
    }
    return '';
  };

  // Download QR code as image
  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${generateData.type}-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QR Code Manager</h1>
              <p className="mt-1 text-sm text-gray-600">
                Scan or generate QR codes for products and orders
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('scan')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scan'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Camera className="w-5 h-5 inline mr-2" />
                Scan QR Code
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="w-5 h-5 inline mr-2" />
                Generate QR Code
              </button>
            </nav>
          </div>
        </div>

        {/* Scan Tab */}
        {activeTab === 'scan' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scanner */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">QR Code Scanner</h2>
              
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                {isScanning ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Camera preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                {!isScanning ? (
                  <button
                    onClick={startScanning}
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    <Camera className="w-4 h-4 inline mr-2" />
                    Start Scanning
                  </button>
                ) : (
                  <button
                    onClick={stopScanning}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Stop Scanning
                  </button>
                )}
              </div>

              {/* Demo buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Demo - Simulate scan:</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => simulateScan('product')}
                    className="px-3 py-1 text-sm border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-50"
                  >
                    Product QR
                  </button>
                  <button
                    onClick={() => simulateScan('order')}
                    className="px-3 py-1 text-sm border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-50"
                  >
                    Order QR
                  </button>
                </div>
              </div>
            </div>

            {/* Scan Results */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Results</h2>
              
              {scanResult ? (
                <div>
                  {scanResult.type === 'product' ? (
                    <ProductDetails product={scanResult.data} />
                  ) : (
                    <OrderTracking order={scanResult.data} />
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Scan a QR code to see details here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generator */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate QR Code</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    QR Code Type
                  </label>
                  <select
                    value={generateData.type}
                    onChange={(e) => setGenerateData({
                      ...generateData,
                      type: e.target.value as 'product' | 'order'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="product">Product</option>
                    <option value="order">Order</option>
                  </select>
                </div>

                {generateData.type === 'product' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Product
                    </label>
                    <select
                      value={generateData.productId}
                      onChange={(e) => setGenerateData({
                        ...generateData,
                        productId: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a product</option>
                      {mockProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Order
                    </label>
                    <select
                      value={generateData.orderId}
                      onChange={(e) => setGenerateData({
                        ...generateData,
                        orderId: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select an order</option>
                      {mockOrders.map(order => (
                        <option key={order.id} value={order.id}>
                          Order #{order.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code Display */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated QR Code</h2>
              
              {generateQRData() ? (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                    <QRCode
                      id="qr-code"
                      value={generateQRData()}
                      size={200}
                      level="H"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={downloadQR}
                      className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Download QR
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    QR code for {generateData.type}: {generateData.type === 'product' ? generateData.productId : generateData.orderId}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a {generateData.type} to generate QR code</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Product details component
const ProductDetails: React.FC<{ product: any }> = ({ product }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <Check className="w-5 h-5 text-emerald-500 mr-2" />
      <span className="font-medium text-emerald-700">Product Verified</span>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-gray-500">Farmer:</span>
        <span className="ml-2 font-medium">{product.farmerName}</span>
      </div>
      <div>
        <span className="text-gray-500">Location:</span>
        <span className="ml-2 font-medium">{product.farmLocation}</span>
      </div>
      <div>
        <span className="text-gray-500">Harvest Date:</span>
        <span className="ml-2 font-medium">{product.harvestDate}</span>
      </div>
      <div>
        <span className="text-gray-500">Organic:</span>
        <span className="ml-2 font-medium">{product.isOrganic ? 'Yes' : 'No'}</span>
      </div>
    </div>

    <div className="pt-4 border-t border-gray-200">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
        ✓ Verified Supply Chain
      </span>
    </div>
  </div>
);

// Order tracking component
const OrderTracking: React.FC<{ order: any }> = ({ order }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <Truck className="w-5 h-5 text-blue-500 mr-2" />
      <span className="font-medium text-blue-700">Order #{order.id}</span>
    </div>
    
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Status:</span>
        <span className="font-medium capitalize">{order.status}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Total:</span>
        <span className="font-medium">LKR {order.total}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Order Date:</span>
        <span className="font-medium">{order.orderDate}</span>
      </div>
    </div>

    <div className="pt-4 border-t border-gray-200">
      <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
      <p className="text-sm text-gray-600">
        {order.deliveryAddress.street}<br />
        {order.deliveryAddress.city}, {order.deliveryAddress.province}
      </p>
    </div>
  </div>
);