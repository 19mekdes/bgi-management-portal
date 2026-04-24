/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Formatting utility functions for the BGI Management Portal
 */

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format number with commas
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format phone number (alternative - simple)
 */
export const formatPhoneSimple = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Obfuscate email (e.g., u***r@example.com)
 */
export const obfuscateEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  
  const obfuscatedLocal = localPart.length > 2
    ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`
    : localPart;
  
  return `${obfuscatedLocal}@${domain}`;
};

/**
 * Format date range
 */
export const formatDateRange = (startDate: Date | string, endDate: Date | string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startStr = start.toLocaleDateString();
  const endStr = end.toLocaleDateString();
  
  return `${startStr} - ${endStr}`;
};

/**
 * Format time duration (in minutes to readable string)
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Format address
 */
export const formatAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): string => {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format initials from name
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  
  return initials;
};


export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};


export const formatJSON = (obj: any, indent: number = 2): string => {
  try {
    return JSON.stringify(obj, null, indent);
  } catch {
    return String(obj);
  }
};