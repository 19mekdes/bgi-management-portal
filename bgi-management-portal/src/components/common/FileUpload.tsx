import React, { useRef, useState } from 'react';
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; 
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  value?: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = 'image/*,.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024, 
  onFileSelect,
  onFileRemove,
  error,
  helperText,
  required = false,
  disabled = false,
  value = null,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      setFileError(`File size must be less than ${formatFileSize(maxSize)}`);
      return false;
    }

    // Check file type against accept pattern
    const acceptPatterns = accept.split(',').map(pattern => pattern.trim());
    const isValidType = acceptPatterns.some(pattern => {
      if (pattern.startsWith('.')) {
        // Extension match
        return file.name.toLowerCase().endsWith(pattern.toLowerCase());
      } else if (pattern.includes('/')) {
        // MIME type match
        const [type, subtype] = pattern.split('/');
        if (subtype === '*') {
          return file.type.startsWith(type + '/');
        }
        return file.type === pattern;
      }
      return false;
    });

    if (!isValidType) {
      setFileError(`Invalid file type. Accepted: ${accept}`);
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleRemove = () => {
    onFileRemove?.();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFileError(null);
  };

  const handleClick = () => {
    if (!disabled && !value) {
      inputRef.current?.click();
    }
  };

  const displayError = error || fileError;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          transition-colors duration-200
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}
          ${displayError ? 'border-red-500 bg-red-50' : ''}
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        
        {!value ? (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">Click to upload</span>
              {' or drag and drop'}
            </div>
            <p className="text-xs text-gray-500">
              {accept} (max {formatFileSize(maxSize)})
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-blue-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 truncate max-w-50">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(value.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              disabled={disabled}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>
      
      {displayError && (
        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{displayError}</span>
        </div>
      )}
      
      {helperText && !displayError && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {value && !displayError && (
        <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>File ready to upload</span>
        </div>
      )}
    </div>
  );
};