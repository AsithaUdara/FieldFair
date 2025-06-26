'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, User, Mail, Lock, MapPin, Eye, EyeOff, 
  Phone, Home, CheckCircle, Heart, ShoppingCart
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CustomerRegistrationPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Address Info
    address: '',
    city: '',
    district: '',
    postalCode: '',
    // Preferences
    preferences: [],
    dietary: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer registration:', formData);
    router.push('/marketplace');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Personal Details', description: 'Your basic information' },
    { number: 2, title: 'Delivery Address', description: 'Where should we deliver?' },
    { number: 3, title: 'Preferences', description: 'Customize your experience' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%233b82f6&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 relative transform hover:scale-105 transition-transform duration-300">
              <span className="text-4xl">🛒</span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">{currentStep}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join as a Customer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Start buying fresh, local produce directly from farmers
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                    currentStep >= step.number
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/80 border-gray-300 text-gray-500 backdrop-blur-sm'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-7 h-7" />
                    ) : (
                      <span className="font-bold text-lg">{step.number}</span>
                    )}
                    {currentStep >= step.number && (
                      <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1.5 mx-3 rounded-full transition-all duration-500 ${
                      currentStep > step.number 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <h3 className="font-bold text-lg text-gray-900">{steps[currentStep - 1].title}</h3>
              <p className="text-gray-600 mt-1">{steps[currentStep - 1].description}</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="relative">
            {/* Elegant Card with Enhanced Styling */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 shadow-2xl transform rotate-1 rounded-3xl opacity-20"></div>
            <div className="relative bg-white/90 backdrop-blur-xl py-12 px-10 shadow-2xl rounded-3xl border border-white/30 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full opacity-50 transform -translate-x-12 translate-y-12"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Full Name */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                            placeholder="Create a strong password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Information */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Address */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                        Street Address
                      </label>
                      <div className="relative">
                        <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* City */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors">
                          City
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                      </div>

                      {/* District */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          District
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                          required
                        >
                          <option value="">Select District</option>
                          <option value="colombo">Colombo</option>
                          <option value="kandy">Kandy</option>
                          <option value="galle">Galle</option>
                          <option value="jaffna">Jaffna</option>
                          <option value="kurunegala">Kurunegala</option>
                          <option value="anuradhapura">Anuradhapura</option>
                          <option value="ratnapura">Ratnapura</option>
                          <option value="badulla">Badulla</option>
                          <option value="matale">Matale</option>
                          <option value="nuwara-eliya">Nuwara Eliya</option>
                        </select>
                      </div>

                      {/* Postal Code */}
                      <div className="group md:col-span-1">
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                          placeholder="Enter postal code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Product Preferences */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-4">
                        What are you interested in buying? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Honey'].map((product) => (
                          <label key={product} className="group flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white/70 hover:bg-white/90 hover:border-blue-300 transition-all duration-300 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, preferences: [...formData.preferences, product] });
                                } else {
                                  setFormData({ ...formData, preferences: formData.preferences.filter(p => p !== product) });
                                }
                              }}
                            />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">{product}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Preferences */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-4">
                        Dietary Preferences
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {['No Preference', 'Organic Only', 'Vegetarian', 'Vegan'].map((diet) => (
                          <button
                            key={diet}
                            type="button"
                            onClick={() => setFormData({ ...formData, dietary: diet.toLowerCase() })}
                            className={`group p-6 rounded-xl border-2 transition-all duration-300 text-center transform hover:scale-105 ${
                              formData.dietary === diet.toLowerCase()
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg shadow-blue-500/20'
                                : 'border-gray-200 bg-white/70 text-gray-700 hover:border-blue-300 hover:bg-white/90'
                            }`}
                          >
                            <Heart className={`w-8 h-8 mx-auto mb-3 ${
                              formData.dietary === diet.toLowerCase() ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <div className="font-bold text-sm">{diet}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Marketing Preferences */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-100">
                      <h3 className="font-bold text-blue-900 mb-6 flex items-center text-lg">
                        <ShoppingCart className="w-6 h-6 mr-3" />
                        Stay Updated
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-4 group cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors">Receive notifications about new products from nearby farms</span>
                        </label>
                        <label className="flex items-center space-x-4 group cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors">Get weekly deals and seasonal offers</span>
                        </label>
                        <label className="flex items-center space-x-4 group cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors">Receive farming tips and recipes</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Previous</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Continue</span>
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Create Account</span>
                        <CheckCircle className="w-5 h-5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  )}
                </div>
              </form>

              {/* Sign In Link */}
              <div className="mt-8 text-center relative z-10">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CustomerRegistrationPage;