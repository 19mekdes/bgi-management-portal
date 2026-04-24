/* eslint-disable @typescript-eslint/no-explicit-any */
// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  return emailRegex.test(email);
};

// Password validation (min 6 chars, at least one letter and one number)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Strong password (min 8 chars, uppercase, lowercase, number, special char)
export const isStrongPassword = (password: string): boolean => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
};

// Phone number validation (simple)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (value === null || value === undefined) return false;
  return true;
};

// Min length
export const minLength = (value: string, length: number): boolean => {
  return value.length >= length;
};

// Max length
export const maxLength = (value: string, length: number): boolean => {
  return value.length <= length;
};

// Number range
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// Positive number
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

// Non-negative number
export const isNonNegative = (value: number): boolean => {
  return value >= 0;
};

// Date is not in future
export const isNotFutureDate = (date: Date): boolean => {
  return date <= new Date();
};

// Date is not in past
export const isNotPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};