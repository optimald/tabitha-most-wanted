import { z } from 'zod';

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export const PaginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type PaginatedResponse<T = any> = {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
  message?: string;
};

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// API Endpoint Types
export const AuthEndpoints = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  REFRESH: '/api/auth/refresh',
} as const;

export const ProductEndpoints = {
  DISCOVER: '/api/products/discover',
  SEARCH: '/api/products/search',
  DETAIL: '/api/products',
  SCRAPE: '/api/products/scrape',
} as const;

export const WishlistEndpoints = {
  BASE: '/api/wishlists',
  ITEMS: '/api/wishlists/:id/items',
  SHARE_EMAIL: '/api/wishlists/:id/share/email',
  SHARE_SMS: '/api/wishlists/:id/share/sms',
  SHARED: '/api/wishlists/shared/:shareId',
} as const;

export const UserEndpoints = {
  PROFILE: '/api/users/profile',
  PREFERENCES: '/api/users/preferences',
} as const;
