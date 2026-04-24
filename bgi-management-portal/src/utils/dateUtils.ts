
export const formatDate = (date: Date | string | null | undefined, format: string = 'YYYY-MM-DD'): string => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Format time to readable string
 */
export const formatTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const today = new Date();
  return formatDate(today, 'YYYY-MM-DD');
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date | string): boolean => {
  const today = new Date();
  const compareDate = new Date(date);
  
  return (
    compareDate.getDate() === today.getDate() &&
    compareDate.getMonth() === today.getMonth() &&
    compareDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is within a range
 */
export const isWithinRange = (date: Date | string, startDate: Date | string, endDate: Date | string): boolean => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return d >= start && d <= end;
};

/**
 * Get the start of the week (Monday)
 */
export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

/**
 * Get the end of the week (Sunday)
 */
export const getEndOfWeek = (date: Date = new Date()): Date => {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
};

/**
 * Get the start of the month
 */
export const getStartOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the end of the month
 */
export const getEndOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get the start of the year
 */
export const getStartOfYear = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), 0, 1);
};

/**
 * Get the end of the year
 */
export const getEndOfYear = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), 11, 31);
};

/**
 * Get days between two dates
 */
export const getDaysBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Add days to a date
 */
export const addDays = (date: Date | string, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Subtract days from a date
 */
export const subtractDays = (date: Date | string, days: number): Date => {
  return addDays(date, -days);
};

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date | string): boolean => {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6;
};

/**
 * Get the difference in months between two dates
 */
export const getMonthsBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12;
  return months + (end.getMonth() - start.getMonth());
};

/**
 * Format relative time (e.g., "2 hours ago", "yesterday")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)} days ago`;
  if (diffSeconds < 2592000) return `${Math.floor(diffSeconds / 604800)} weeks ago`;
  if (diffSeconds < 31536000) return `${Math.floor(diffSeconds / 2592000)} months ago`;
  return `${Math.floor(diffSeconds / 31536000)} years ago`;
};

/**
 * Parse date string to Date object safely
 */
export const parseDate = (dateString: string): Date | null => {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};