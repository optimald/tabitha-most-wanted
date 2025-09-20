export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
} as const;

export const EXTERNAL_APIS = {
  AMAZON: {
    BASE_URL: 'https://www.amazon.com',
    SEARCH_PATH: '/s',
    PRODUCT_PATH: '/dp',
  },
  WALMART: {
    BASE_URL: 'https://www.walmart.com',
    SEARCH_PATH: '/search',
    PRODUCT_PATH: '/ip',
  },
} as const;

export const RATE_LIMITS = {
  SCRAPING: {
    REQUESTS_PER_MINUTE: 30,
    REQUESTS_PER_HOUR: 1000,
  },
  API: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 5000,
  },
} as const;
