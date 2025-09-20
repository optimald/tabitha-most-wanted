# Supabase Database Setup

This directory contains the database schema and migrations for the Tabitha Most Wanted application.

## Database Schema

The database consists of the following main tables:

### Core Tables

1. **users** - User profiles (extends Supabase auth.users)
   - Stores user information like name, age, gender, interests
   - Links to parent email for COPPA compliance
   - Age validation (6-16 years old)

2. **user_preferences** - User preferences and settings
   - Notification preferences (email, SMS, push)
   - Category preferences
   - Price range preferences

3. **products** - Product catalog
   - Product information from Amazon and Walmart
   - Age-appropriate filtering (age_range_min/max)
   - Pricing, images, and availability
   - Category and retailer information

4. **wishlists** - User wishlists
   - Multiple types: birthday, christmas, holiday, general
   - Sharing capabilities with share_id
   - Privacy controls (public/private)

5. **wishlist_items** - Items in wishlists
   - Links products to wishlists
   - Priority levels (1-10)
   - Personal notes

### Key Features

- **Row Level Security (RLS)** - All tables have proper security policies
- **Age-Appropriate Content** - Products filtered by age ranges
- **COPPA Compliance** - Parent email required for users under 13
- **Sharing System** - Public wishlists with unique share IDs
- **Audit Trail** - Created/updated timestamps on all tables

## Migrations

### 20241220000001_initial_schema.sql
- Creates all tables and relationships
- Sets up indexes for performance
- Creates triggers for updated_at timestamps
- Adds user profile creation trigger

### 20241220000002_rls_policies.sql
- Enables Row Level Security on all tables
- Creates security policies for data access
- Sets up permissions for authenticated users

### 20241220000003_seed_data.sql
- Inserts sample products for testing
- Covers various categories and age ranges
- Includes products from both Amazon and Walmart

## Setup Instructions

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com and create a new project
   # Note down your project URL and anon key
   ```

2. **Run Migrations**
   ```sql
   -- In Supabase SQL Editor, run each migration file in order:
   -- 1. 20241220000001_initial_schema.sql
   -- 2. 20241220000002_rls_policies.sql
   -- 3. 20241220000003_seed_data.sql (optional, for testing)
   ```

3. **Configure Authentication**
   - Enable email/password authentication
   - Configure email templates
   - Set up OAuth providers (Google, Apple) if needed

4. **Update Environment Variables**
   ```bash
   # Copy the values from your Supabase dashboard
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Security Considerations

- All user data is protected by RLS policies
- Users can only access their own data
- Products are read-only for regular users
- Service role required for product management (scraping)
- Parent email validation for COPPA compliance

## Testing

The seed data includes:
- 17 sample products across various categories
- Age ranges from 6-16 years
- Both Amazon and Walmart products
- Different price points and ratings

## API Usage

The database is designed to work with the TypeScript types defined in `packages/shared/src/types/`:
- User types with validation
- Product types with retailer information
- Wishlist types with sharing capabilities
- API response types for consistent data flow

## Performance

Indexes are created on:
- User email and age
- Product retailer, category, and age ranges
- Product availability and scraping timestamps
- Wishlist user relationships
- Wishlist item relationships

This ensures fast queries for:
- Age-appropriate product discovery
- User wishlist management
- Product search and filtering
- Sharing functionality
