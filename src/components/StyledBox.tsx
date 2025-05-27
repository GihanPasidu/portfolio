import React, { ReactNode } from 'react';

interface StyledBoxProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  responsive?: 'sm' | 'md' | 'lg' | 'none';
}

const StyledBox: React.FC<StyledBoxProps> = ({ 
  children, 
  className = '', 
  animate = true,
  responsive = 'md'
}) => {
  const responsiveClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-4 md:p-6',
    lg: 'p-4 lg:p-6',
    none: 'p-6'
  };
  
  const paddingClass = responsiveClasses[responsive];
  
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10
        ${paddingClass}
        ${animate ? 'hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default StyledBox;
