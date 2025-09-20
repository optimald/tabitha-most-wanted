'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@tabitha/ui';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    parentEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { signUp, error, loading } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.age) {
      errors.age = 'Age is required';
    } else {
      const age = parseInt(formData.age);
      if (age < 6 || age > 16) {
        errors.age = 'Age must be between 6 and 16';
      }
    }

    // Require parent email for users under 13 (COPPA compliance)
    if (parseInt(formData.age) < 13 && !formData.parentEmail.trim()) {
      errors.parentEmail = 'Parent email is required for users under 13';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender || undefined,
        parentEmail: formData.parentEmail || undefined,
      });
      
      // Show success message or redirect
      router.push('/auth/verify-email');
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Tabitha Most Wanted!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to start building wishlists
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              error={formErrors.name}
              disabled={loading || isSubmitting}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              error={formErrors.email}
              disabled={loading || isSubmitting}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                name="age"
                required
                min="6"
                max="16"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                error={formErrors.age}
                disabled={loading || isSubmitting}
              />

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender (Optional)
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading || isSubmitting}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              error={formErrors.password}
              helperText="Must be at least 6 characters"
              disabled={loading || isSubmitting}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              error={formErrors.confirmPassword}
              disabled={loading || isSubmitting}
            />

            {parseInt(formData.age) < 13 && (
              <Input
                label="Parent's Email"
                type="email"
                name="parentEmail"
                required
                value={formData.parentEmail}
                onChange={handleInputChange}
                placeholder="Parent's email address"
                error={formErrors.parentEmail}
                helperText="Required for users under 13 (COPPA compliance)"
                disabled={loading || isSubmitting}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
