import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div 
        className={`
          absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap
          ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-1/2 -translate-x-1/2 mt-2'}
        `}
      >
        {content}
        {/* Arrow */}
        <div 
          className={`
            absolute left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent
            ${position === 'top' ? 'border-t-gray-900 top-full' : 'border-b-gray-900 bottom-full'}
          `}
        ></div>
      </div>
    </div>
  );
};
