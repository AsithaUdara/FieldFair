'use client';

import React from 'react';
import { usePopup } from '@/hooks/use-popup';
import SignInPopup from './sign-in-popup';

const PopupContainer: React.FC = () => {
  const { currentPopup, closePopup } = usePopup();

  if (!currentPopup) return null;

  const renderPopup = () => {
    switch (currentPopup) {
      case 'signin':
        return <SignInPopup />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - Click to close */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />
      
      {/* Popup Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {renderPopup()}
      </div>
    </div>
  );
};

export default PopupContainer;