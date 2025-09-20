import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { authValidation, authErrors, type AuthState, type AuthActions } from '@tabitha/shared';
import type { User, Session } from '@supabase/supabase-js';

export function useAuth(): AuthState & AuthActions {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setState(prev => ({ ...prev, error: authErrors.getErrorMessage(error), loading: false }));
          return;
        }

        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setState(prev => ({ ...prev, error: authErrors.getErrorMessage(error), loading: false }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
          error: null,
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      if (!authValidation.validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      // State will be updated by the auth state change listener
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        error: authErrors.getErrorMessage(error),
        loading: false,
      }));
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, userData: any) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Validate input
      if (!authValidation.validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const passwordValidation = authValidation.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors[0]);
      }

      const userValidation = authValidation.validateUserData(userData);
      if (!userValidation.isValid) {
        throw new Error(userValidation.errors[0]);
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name: userData.name,
            age: userData.age,
            gender: userData.gender,
            parent_email: userData.parentEmail,
          },
        },
      });

      if (error) {
        throw error;
      }

      // If user needs email confirmation
      if (data.user && !data.session) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
        }));
        // You might want to show a message about email confirmation
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setState(prev => ({
        ...prev,
        error: authErrors.getErrorMessage(error),
        loading: false,
      }));
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // State will be updated by the auth state change listener
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        error: authErrors.getErrorMessage(error),
        loading: false,
      }));
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      if (!authValidation.validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'tabitha://reset-password', // Deep link for mobile
      });

      if (error) {
        throw error;
      }

      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      console.error('Reset password error:', error);
      setState(prev => ({
        ...prev,
        error: authErrors.getErrorMessage(error),
        loading: false,
      }));
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: any) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) {
        throw error;
      }

      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      console.error('Update profile error:', error);
      setState(prev => ({
        ...prev,
        error: authErrors.getErrorMessage(error),
        loading: false,
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
}
