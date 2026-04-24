import React from 'react';
import { Spinner } from '../common/Spinner';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...', 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex flex-col items-center justify-center min-h-[200px]';

  return (
    <div className={containerClasses}>
      <Spinner size="lg" color="blue" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
};