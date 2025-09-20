export const APP_CONFIG = {
  NAME: 'Tabitha Most Wanted',
  DESCRIPTION: 'Cross-platform wishlist app for kids',
  VERSION: '1.0.0',
} as const;

export const AGE_RANGES = {
  MIN: 6,
  MAX: 16,
} as const;

export const PRODUCT_CATEGORIES = [
  'toys',
  'games',
  'electronics',
  'books',
  'clothing',
  'sports',
  'arts-crafts',
  'educational',
  'outdoor',
  'music',
] as const;

export const WISHLIST_TYPES = [
  'birthday',
  'christmas',
  'holiday',
  'general',
] as const;

export const RETAILERS = [
  'amazon',
  'walmart',
] as const;

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_AGE: 'Age must be between 6 and 16',
  INVALID_PRICE: 'Price must be a positive number',
  INVALID_URL: 'Please enter a valid URL',
} as const;

export const API_ERRORS = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;
