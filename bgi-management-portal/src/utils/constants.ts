
// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  EMPLOYEES: '/employees',
  PRODUCTS: '/products',
  ATTENDANCE: '/attendance',
  REPORTS: {
    ATTENDANCE: '/reports/attendance',
    INVENTORY: '/reports/inventory',
    EMPLOYEES: '/reports/employees',
  },
  SETTINGS: {
    PROFILE: '/settings/profile',
    CHANGE_PASSWORD: '/settings/change-password',
    PREFERENCES: '/settings/preferences',
    USERS_ROLE: '/settings/users',
  },
};

// Roles
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  manager: 'Manager',
  staff: 'Staff',
};

// Departments
export const DEPARTMENTS = [
  'HR',
  'IT',
  'Production',
  'Sales',
  'Marketing',
  'Finance',
  'Logistics',
] as const;

// Product categories
export const PRODUCT_CATEGORIES = [
  'Lager',
  'Ale',
  'Stout',
  'Porter',
  'IPA',
  'Non-Alcoholic',
  'Cider',
  'Other',
] as const;

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_LIMIT_OPTIONS = [5, 10, 20, 50, 100];

// Date formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY';
export const DISPLAY_DATE_TIME_FORMAT = 'MMM DD, YYYY HH:mm';

// Toast durations
export const TOAST_DURATION = {
  SHORT: 3000,
  DEFAULT: 5000,
  LONG: 8000,
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences',
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// WebSocket events
export const WS_EVENTS = {
  ATTENDANCE_UPDATE: 'attendance_update',
  PRODUCT_UPDATE: 'product_update',
  EMPLOYEE_UPDATE: 'employee_update',
  NOTIFICATION: 'notification',
};