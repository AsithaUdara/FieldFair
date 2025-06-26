import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  padding = "md",
  shadow = "sm"
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-gray-200",
        shadowClasses[shadow],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

// Additional Card sub-components for more flexibility
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={cn("mt-4 pt-4 border-t border-gray-200", className)}>
    {children}
  </div>
);

export default Card;
export { CardHeader, CardTitle, CardContent, CardFooter };