import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
}

// This is a base hook that will be implemented differently for web and mobile
export function useAuthBase(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  return state;
}

// Auth validation utilities
export const authValidation = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  validateAge: (age: number): boolean => {
    return age >= 6 && age <= 16;
  },

  validateUserData: (userData: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!userData.age || !authValidation.validateAge(userData.age)) {
      errors.push('Age must be between 6 and 16');
    }

    if (userData.age < 13 && (!userData.parentEmail || !authValidation.validateEmail(userData.parentEmail))) {
      errors.push('Parent email is required for users under 13');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Auth error handling
export const authErrors = {
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    
    if (error?.message) {
      // Common Supabase auth errors
      switch (error.message) {
        case 'Invalid login credentials':
          return 'Invalid email or password. Please try again.';
        case 'Email not confirmed':
          return 'Please check your email and click the confirmation link.';
        case 'User already registered':
          return 'An account with this email already exists.';
        case 'Password should be at least 6 characters':
          return 'Password must be at least 6 characters long.';
        default:
          return error.message;
      }
    }
    
    return 'An unexpected error occurred. Please try again.';
  },
};

// Auth storage utilities (will be implemented differently for web/mobile)
export const authStorage = {
  // These will be overridden in platform-specific implementations
  getItem: async (key: string): Promise<string | null> => null,
  setItem: async (key: string, value: string): Promise<void> => {},
  removeItem: async (key: string): Promise<void> => {},
};
