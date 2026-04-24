import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  padding = 'md',
  hoverable = false,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const hoverStyles = hoverable
    ? 'transition-shadow duration-300 hover:shadow-lg cursor-pointer'
    : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-100 ${paddingStyles[padding]} ${hoverStyles} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4 pb-3 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
};