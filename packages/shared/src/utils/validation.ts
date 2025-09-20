import { z } from 'zod';
import { VALIDATION_MESSAGES, AGE_RANGES } from './constants';

// Common validation schemas
export const emailSchema = z.string().email(VALIDATION_MESSAGES.INVALID_EMAIL);

export const ageSchema = z
  .number()
  .int()
  .min(AGE_RANGES.MIN, `Age must be at least ${AGE_RANGES.MIN}`)
  .max(AGE_RANGES.MAX, `Age must be at most ${AGE_RANGES.MAX}`);

export const urlSchema = z.string().url(VALIDATION_MESSAGES.INVALID_URL);

export const priceSchema = z
  .number()
  .min(0, VALIDATION_MESSAGES.INVALID_PRICE);

export const uuidSchema = z.string().uuid('Invalid ID format');

// Utility functions
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const validateAge = (age: number): boolean => {
  return ageSchema.safeParse(age).success;
};

export const validateUrl = (url: string): boolean => {
  return urlSchema.safeParse(url).success;
};

export const validatePrice = (price: number): boolean => {
  return priceSchema.safeParse(price).success;
};

export const validateUuid = (id: string): boolean => {
  return uuidSchema.safeParse(id).success;
};

// Form validation helpers
export const createFormValidator = <T extends z.ZodType>(schema: T) => {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return {
      success: false,
      errors: result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    };
  };
};
