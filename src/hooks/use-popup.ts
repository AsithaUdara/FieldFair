import { useContext } from 'react';
import { PopupContext } from '@/providers/popup-provider';

export const usePopup = () => {
  const context = useContext(PopupContext);
  
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  
  return context;
};