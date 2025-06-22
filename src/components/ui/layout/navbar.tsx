// components/ui/layout/navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onCardHighlight?: (cardType: 'farmer' | 'consumer' | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCardHighlight }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Toggle isScrolled when you leave the top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      // Check which section is currently in view
      const sections = ['hero', 'features', 'about', 'cta'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      // Check if we're at the top for hero section
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // in case you're already scrolled
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll navigation
  const handleNavClick = (sectionId: string, e: React.MouseEvent, cardType?: 'farmer' | 'consumer') => {
    e.preventDefault();
    
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // Highlight specific card if cardType is provided
    if (cardType && onCardHighlight) {
      setTimeout(() => {
        onCardHighlight(cardType);
        // Remove highlight after 3 seconds
        setTimeout(() => onCardHighlight(null), 3000);
      }, 500); // Delay to let scroll complete
    }
    
    setIsMenuOpen(false); // Close mobile menu if open
  };

  // Navigation items with their corresponding section IDs
  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Features', id: 'features' },
    { name: 'About', id: 'about' },
    { name: 'For Farmers', id: 'cta', cardType: 'farmer' as const },
    { name: 'For Consumers', id: 'cta', cardType: 'consumer' as const }
  ];

  // Filter nav items based on active section
  const getVisibleNavItems = () => {
    if (activeSection === 'hero') {
      return navItems; // Show all items including Home when in hero section
    } else {
      return navItems.filter(item => item.name !== 'Home'); // Hide Home in other sections
    }
  };

  // Conditional text colour with active state
  const getLinkClass = (item: any) => {
    const baseClass = isScrolled
      ? 'text-gray-700 hover:text-emerald-600'
      : 'text-white hover:text-gray-200';
    
    let isActive = false;
    if (item.id === 'hero' && activeSection === 'hero') {
      isActive = true;
    } else if (item.id === activeSection && item.id !== 'hero') {
      isActive = true;
    }
    
    const activeClass = isScrolled
      ? 'text-emerald-600'
      : 'text-emerald-300';
    
    return isActive ? `${baseClass.split(' ')[0]} ${activeClass}` : baseClass;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 shadow-lg'
          : 'bg-transparent border-b-0 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1
                className={`text-xl font-bold transition-all duration-300 cursor-pointer ${
                  isScrolled 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600' 
                    : 'text-white'
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                FieldFair
              </h1>
              <p className={isScrolled ? 'text-emerald-600' : 'text-emerald-300'}>
                Farm to Table
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {getVisibleNavItems().map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e, item.cardType)}
                className={`relative ${getLinkClass(item)} transition-all duration-300 font-medium group`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 ${
                  (item.id === 'hero' && activeSection === 'hero') || 
                  (item.id === activeSection && item.id !== 'hero') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <button 
              onClick={(e) => handleNavClick('cta', e)}
              className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Get Started</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-transparent hover:bg-white/20 text-white'
            }`}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden transition-colors duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-2xl border-t border-gray-200/50 shadow-xl'
              : 'bg-transparent backdrop-blur-xl border-t-0 shadow-none'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {getVisibleNavItems().map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e, item.cardType)}
                className={`block ${
                  (item.id === 'hero' && activeSection === 'hero') || 
                  (item.id === activeSection && item.id !== 'hero')
                    ? (isScrolled ? 'text-emerald-600' : 'text-emerald-300')
                    : (isScrolled ? 'text-gray-700' : 'text-white')
                } hover:text-emerald-600 font-medium py-2 transition-colors`}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={(e) => handleNavClick('cta', e)}
              className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Get Started</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;