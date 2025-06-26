'use client';

import React, { createContext, useState, ReactNode } from 'react';

export type PopupType = 'signin' | null;
export type UserType = 'farmer' | 'customer';
export type SignInContext = 'general' | 'farmer' | 'customer';

interface PopupContextType {
  currentPopup: PopupType;
  userType: UserType;
  signInContext: SignInContext;
  openPopup: (popup: PopupType, context?: SignInContext) => void;
  closePopup: () => void;
  setUserType: (type: UserType) => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [currentPopup, setCurrentPopup] = useState<PopupType>(null);
  const [userType, setUserType] = useState<UserType>('customer');
  const [signInContext, setSignInContext] = useState<SignInContext>('general');

  const openPopup = (popup: PopupType, context: SignInContext = 'general') => {
    console.log('🔥 openPopup called with:', { popup, context });
    setSignInContext(context);
    setCurrentPopup(popup);
    console.log('🔥 Context set to:', context);
  };

  const closePopup = () => {
    setCurrentPopup(null);
    setSignInContext('general');
  };

  const handleSetUserType = (type: UserType) => {
    setUserType(type);
  };

  return (
    <PopupContext.Provider
      value={{
        currentPopup,
        userType,
        signInContext,
        openPopup,
        closePopup,
        setUserType: handleSetUserType,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};