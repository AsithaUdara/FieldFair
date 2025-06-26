import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;