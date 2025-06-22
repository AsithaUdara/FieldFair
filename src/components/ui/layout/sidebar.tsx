"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home,
  ShoppingCart,
  Users,
  Leaf,
  BarChart3,
  MapPin,
  QrCode,
  Truck,
  Bot,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  subItems?: { name: string; path: string }[];
  roles?: ('farmer' | 'consumer' | 'admin')[];
};

// Navigation items based on user role
const getNavigationItems = (userRole: 'farmer' | 'consumer' | 'admin' = 'consumer'): NavItem[] => {
  const baseItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard",
      roles: ['farmer', 'consumer', 'admin']
    },
    {
      name: "Marketplace",
      icon: <ShoppingCart className="w-5 h-5" />,
      path: "/marketplace",
      roles: ['consumer', 'admin']
    },
    {
      name: "Farm Management",
      icon: <Sprout className="w-5 h-5" />,
      path: "/farmer/dashboard",
      roles: ['farmer', 'admin']
    },
    {
      name: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/analytics",
      roles: ['farmer', 'admin']
    },
    {
      name: "Farm Locations",
      icon: <MapPin className="w-5 h-5" />,
      path: "/maps/farms",
      roles: ['farmer', 'consumer', 'admin']
    },
    {
      name: "QR Manager",
      icon: <QrCode className="w-5 h-5" />,
      path: "/maps/qr",
      roles: ['farmer', 'consumer', 'admin']
    },
    {
      name: "Supply Chain",
      icon: <Truck className="w-5 h-5" />,
      path: "/maps/supply-chain",
      roles: ['farmer', 'consumer', 'admin']
    },
    {
      name: "AI Insights",
      icon: <Bot className="w-5 h-5" />,
      path: "/ai/forecasting",
      roles: ['farmer', 'admin']
    },
    {
      name: "Market Trends",
      icon: <TrendingUp className="w-5 h-5" />,
      path: "/ai/recommendations",
      roles: ['farmer', 'consumer', 'admin']
    }
  ];

  // Filter items based on user role
  return baseItems.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );
};

interface SidebarProps {
  userRole?: 'farmer' | 'consumer' | 'admin';
  isExpanded?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userRole = 'consumer',
  isExpanded = true,
  onToggle,
  isMobile = false,
  isOpen = false,
  onClose
}) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigationItems = getNavigationItems(userRole);

  // Add smooth scroll effect whenever the sidebar is toggled
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.classList.add('transition-all', 'duration-500', 'ease-in-out');
      
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.classList.remove('transition-all', 'duration-500', 'ease-in-out');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isOpen]);

  // Reset scroll position when sidebar is opened
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
          "fixed h-screen left-0 top-0 z-50 transition-all duration-500 ease-in-out border-r shadow-sm bg-white border-gray-200",
          isExpanded ? "w-64" : "w-16",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        {/* Background Pattern */}
        <div className="absolute left-0 bottom-0 z-0 pointer-events-none w-full h-[80%]">
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 right-4 opacity-5">
              <Leaf className="w-32 h-32 text-emerald-500" />
            </div>
          </div>
        </div>
        
        {/* Close button for mobile only */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full z-50 bg-gray-100 text-gray-700 lg:hidden"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        
        {/* Top section with logo */}
        <div 
          className={cn(
            "h-16 flex items-center relative z-10 border-b border-gray-200", 
            !isExpanded ? "justify-center" : "px-5"
          )}
        >
          {isExpanded ? (
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <Sprout className="w-8 h-8 text-emerald-600 mr-3" />
                <span className="text-xl font-bold text-gray-900">FieldFair</span>
              </div>
              <div className="text-[8px] text-right mt-1 text-gray-500">
                v1.0.0
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Sprout className="w-8 h-8 text-emerald-600" />
            </div>
          )}
          
          {/* Toggle button - hidden on mobile */}
          {!isMobile && onToggle && (
            <button 
              onClick={onToggle}
              className={cn(
                "absolute w-7 h-7 hidden lg:flex items-center justify-center rounded-full transition-all text-emerald-600 bg-gray-100 hover:bg-gray-200",
                isExpanded ? "right-0 -mr-3.5 top-[22px]" : "right-0 -mr-3.5 top-[22px]"
              )}
              aria-label="Toggle sidebar"
            >
              {isExpanded ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Menu section with scroll effect */}
        <div className="relative h-[calc(100vh-64px)] overflow-hidden">
          {/* Top fade effect */}
          <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-white to-transparent" />
          
          {/* Scrollable menu */}
          <div 
            ref={scrollRef}
            className="h-full py-4 overflow-y-auto pb-12 transition-all duration-500 ease-in-out"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#e5e7eb transparent'
            }}
          >
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name} className={!isExpanded ? "flex justify-center" : ""}>
                  <Link 
                    href={item.path}
                    onClick={() => {
                      // Close sidebar on mobile when clicking a link
                      if (isMobile && onClose) {
                        onClose();
                      }
                    }}
                    className={cn(
                      "flex items-center py-3 rounded-lg transition-colors duration-300 group relative",
                      pathname === item.path 
                        ? "text-emerald-600 bg-emerald-50" 
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
                      !isExpanded ? "w-full justify-center mx-auto" : "px-5 w-full"
                    )}
                  >
                    {/* Active indicator */}
                    {pathname === item.path && (
                      <span className={cn(
                        "absolute h-full bg-emerald-600 rounded-r-full transition-all duration-300",
                        !isExpanded ? "w-1 left-0" : "w-1 left-0"
                      )}></span>
                    )}
                    
                    {/* Icon */}
                    <span className={cn(
                      "flex h-10 w-10 items-center justify-center transition-all duration-300",
                      pathname === item.path && "text-emerald-600",
                      !isExpanded && "mx-auto"
                    )}>
                      {item.icon}
                    </span>
                    
                    {/* Label */}
                    {isExpanded && (
                      <span className="ml-3 text-sm font-medium transition-opacity duration-300">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Bottom fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-12 z-10 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* User role indicator */}
        {isExpanded && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="flex items-center">
                <div className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  userRole === 'farmer' ? "bg-green-500" :
                  userRole === 'consumer' ? "bg-blue-500" : "bg-purple-500"
                )} />
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;