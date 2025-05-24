import React, { ReactNode } from 'react';

interface StyledBoxProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const StyledBox: React.FC<StyledBoxProps> = ({ 
  children, 
  className = '', 
  animate = true 
}) => {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10
        ${animate ? 'hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default StyledBox;
