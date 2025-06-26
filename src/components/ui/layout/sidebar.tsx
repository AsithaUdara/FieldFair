"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  BarChart3, 
  Package, 
  ShoppingCart,
  Users,
  TrendingUp,
  MapPin,
  Leaf,
  Settings,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Search,
  Heart,
  History,
  CreditCard,
  User,
  Home,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
  hasSubmenu?: boolean;
  active?: boolean;
}

interface FieldFairSidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  userType?: 'farmer' | 'customer'; // New prop to determine user type
}

const FieldFairSidebar: React.FC<FieldFairSidebarProps> = ({
  isCollapsed = false,
  setIsCollapsed,
  isMobile = false,
  isOpen = false,
  onClose,
  userType = 'farmer' // Default to farmer for backward compatibility
}) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [mounted, setMounted] = useState(false);
  
  // Farmer menu items
  const farmerMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/farmer/dashboard', active: true },
    { name: 'My Products', icon: Package, path: '/farmer/products', hasSubmenu: true },
    { name: 'Orders', icon: ShoppingCart, path: '/farmer/orders', badge: '3' },
    { name: 'Analytics', icon: BarChart3, path: '/farmer/analytics' },
    { name: 'Customers', icon: Users, path: '/farmer/customers' },
    { name: 'Farm Location', icon: MapPin, path: '/farmer/location' }
  ];

  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { name: 'Browse Products', icon: Search, path: '/marketplace', active: true },
    { name: 'My Orders', icon: ShoppingCart, path: '/customer/orders', badge: '2' },
    { name: 'Shopping Cart', icon: Package, path: '/marketplace/cart' },
    { name: 'Wishlist', icon: Heart, path: '/customer/wishlist' },
    { name: 'Order History', icon: History, path: '/customer/history' },
    { name: 'Find Farms', icon: MapPin, path: '/maps/farms' }
  ];

  // General menu items (same for both)
  const generalItems: MenuItem[] = [
    { name: 'Profile', icon: Settings, path: `/${userType}/profile` },
    { name: 'Settings', icon: Shield, path: `/${userType}/settings` }
  ];

  // Get menu items based on user type
  const getMenuItems = () => {
    return userType === 'farmer' ? farmerMenuItems : customerMenuItems;
  };

  // Get user info based on type
  const getUserInfo = () => {
    if (userType === 'farmer') {
      return {
        name: 'Ravi Mahathaya',
        role: 'Organic Farmer • Kurunegala',
        avatar: 'RM'
      };
    } else {
      return {
        name: 'Priya Fernando',
        role: 'Customer • Colombo',
        avatar: 'PF'
      };
    }
  };

  // Get section title based on user type
  const getSectionTitle = () => {
    return userType === 'farmer' ? 'FARM MANAGEMENT' : 'SHOPPING';
  };

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set active menu based on current path
  useEffect(() => {
    if (mounted) {
      const currentItem = [...getMenuItems(), ...generalItems].find(item => 
        pathname.startsWith(item.path)
      );
      if (currentItem) {
        setActiveMenu(currentItem.name);
      }
    }
  }, [pathname, mounted, userType]);

  // Add smooth scroll effect
  useEffect(() => {
    if (mounted && scrollRef.current) {
      scrollRef.current.classList.add('transition-all', 'duration-500', 'ease-in-out');
      
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.classList.remove('transition-all', 'duration-500', 'ease-in-out');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, isOpen, mounted]);

  const handleMenuClick = (item: MenuItem) => {
    setActiveMenu(item.name);
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

  const userInfo = getUserInfo();
  const menuItems = getMenuItems();

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-in-out" 
          onClick={onClose}
        />
      )}
      
      <aside 
        className={cn(
          "fixed h-screen left-0 top-0 z-50 transition-all duration-300 flex flex-col border-r shadow-lg",
          "bg-[#1a4d3a] text-white", // FieldFair green theme
          isCollapsed ? "w-16" : "w-64",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        {/* Background Pattern */}
        <div className="absolute left-0 bottom-0 z-0 pointer-events-none w-full h-[60%]">
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 right-4 opacity-5">
              <Leaf className="w-32 h-32 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Close button for mobile only */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full z-50 bg-emerald-800 text-emerald-200 lg:hidden hover:bg-emerald-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        
        {/* Logo Section */}
        <div className={cn(
          "border-b border-emerald-800/50 relative z-10",
          isCollapsed ? "p-4" : "px-6 py-6"
        )}>
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : ""
          )}>
            {/* FieldFair Logo */}
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-900" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <span className="text-xl font-bold text-white">FieldFair</span>
                <div className="text-xs text-emerald-300/80">
                  {userType === 'farmer' ? 'Farmer Dashboard' : 'Customer Portal'}
                </div>
              </div>
            )}
          </div>
          
          {/* Toggle button - hidden on mobile */}
          {!isMobile && setIsCollapsed && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "absolute w-7 h-7 hidden lg:flex items-center justify-center rounded-full transition-all bg-emerald-800 text-emerald-200 hover:bg-emerald-700",
                isCollapsed ? "right-0 -mr-3.5 top-[22px]" : "right-0 -mr-3.5 top-[30px]"
              )}
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* Menu Section */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="h-full py-6 overflow-y-auto transition-all duration-500 ease-in-out"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#065f46 transparent'
            }}
          >
            {/* Main Section */}
            <div className={cn(
              "mb-6",
              isCollapsed ? "px-2" : "px-4"
            )}>
              {!isCollapsed && (
                <div className="text-[11px] text-emerald-300/70 mb-4 uppercase tracking-[0.1em] font-medium">
                  {getSectionTitle()}
                </div>
              )}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name} className={isCollapsed ? "flex justify-center" : ""}>
                    <Link 
                      href={item.path}
                      onClick={() => handleMenuClick(item)}
                      className={cn(
                        "flex items-center py-3 rounded-lg transition-all duration-200 group relative",
                        activeMenu === item.name 
                          ? 'bg-emerald-800/40 text-white' 
                          : 'text-emerald-200/80 hover:bg-emerald-800/30 hover:text-white',
                        isCollapsed ? "w-10 h-10 justify-center mx-auto" : "px-3 w-full"
                      )}
                    >
                      {/* Active indicator - bright lime green */}
                      {activeMenu === item.name && !isCollapsed && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-lime-400 rounded-r-full"></span>
                      )}
                      
                      <item.icon className={cn(
                        "w-5 h-5",
                        activeMenu === item.name ? "text-white" : "text-emerald-200/80"
                      )} />
                      
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 flex-1 text-left text-sm font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="bg-orange-500 text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                          {item.hasSubmenu && (
                            <ChevronDown className="w-4 h-4 text-emerald-200/60" />
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 bg-orange-500 text-xs px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
            
            {/* ACCOUNT Section */}
            <div className={cn(
              "mt-8",
              isCollapsed ? "px-2" : "px-4"
            )}>
              {!isCollapsed && (
                <div className="text-[11px] text-emerald-300/70 mb-4 uppercase tracking-[0.1em] font-medium">
                  ACCOUNT
                </div>
              )}
              <nav className="space-y-1">
                {generalItems.map((item) => (
                  <div key={item.name} className={isCollapsed ? "flex justify-center" : ""}>
                    <Link 
                      href={item.path}
                      onClick={() => handleMenuClick(item)}
                      className={cn(
                        "flex items-center py-3 rounded-lg transition-all duration-200 group relative",
                        activeMenu === item.name 
                          ? 'bg-emerald-800/40 text-white' 
                          : 'text-emerald-200/80 hover:bg-emerald-800/30 hover:text-white',
                        isCollapsed ? "w-10 h-10 justify-center mx-auto" : "px-3 w-full"
                      )}
                    >
                      {/* Active indicator */}
                      {activeMenu === item.name && !isCollapsed && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-lime-400 rounded-r-full"></span>
                      )}
                      
                      <item.icon className={cn(
                        "w-5 h-5",
                        activeMenu === item.name ? "text-white" : "text-emerald-200/80"
                      )} />
                      
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium">{item.name}</span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-t border-emerald-800/50 relative z-10">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">{userInfo.avatar}</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">{userInfo.name}</div>
                <div className="text-xs text-emerald-300/80">{userInfo.role}</div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default FieldFairSidebar;