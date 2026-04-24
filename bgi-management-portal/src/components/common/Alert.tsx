import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  dismissible = false,
  onClose,
  className = ''
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const config = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      Icon: CheckCircle
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      Icon: AlertCircle
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      Icon: AlertTriangle
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      Icon: Info
    }
  };

  const { bgColor, borderColor, textColor, Icon } = config[type];

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-md shadow-sm ${className}`}>
      <div className="flex items-start">
        <div className="shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleClose}
            className={`ml-auto -mx-1.5 -my-1.5 ${bgColor} ${textColor} rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center`}
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};