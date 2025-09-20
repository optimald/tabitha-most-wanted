-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE retailer_type AS ENUM ('amazon', 'walmart');
CREATE TYPE wishlist_type AS ENUM ('birthday', 'christmas', 'holiday', 'general');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 6 AND age <= 16),
  gender gender_type,
  interests TEXT[] DEFAULT '{}',
  parent_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  categories TEXT[] DEFAULT '{}',
  price_range_min DECIMAL(10,2),
  price_range_max DECIMAL(10,2),
  notifications_email BOOLEAN DEFAULT true,
  notifications_sms BOOLEAN DEFAULT false,
  notifications_push BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2) CHECK (original_price >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  image_url TEXT NOT NULL,
  product_url TEXT NOT NULL,
  retailer retailer_type NOT NULL,
  category TEXT NOT NULL,
  age_range_min INTEGER NOT NULL CHECK (age_range_min >= 0),
  age_range_max INTEGER NOT NULL CHECK (age_range_max <= 18),
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  availability BOOLEAN NOT NULL DEFAULT true,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (age_range_min <= age_range_max)
);

-- Wishlists table
CREATE TABLE public.wishlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type wishlist_type NOT NULL DEFAULT 'general',
  description TEXT,
  share_id TEXT UNIQUE,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist items table
CREATE TABLE public.wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wishlist_id UUID REFERENCES public.wishlists(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  priority INTEGER NOT NULL DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  notes TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(wishlist_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_age ON public.users(age);
CREATE INDEX idx_products_retailer ON public.products(retailer);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_age_range ON public.products(age_range_min, age_range_max);
CREATE INDEX idx_products_availability ON public.products(availability);
CREATE INDEX idx_products_scraped_at ON public.products(scraped_at);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX idx_wishlists_share_id ON public.wishlists(share_id);
CREATE INDEX idx_wishlist_items_wishlist_id ON public.wishlist_items(wishlist_id);
CREATE INDEX idx_wishlist_items_product_id ON public.wishlist_items(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wishlists_updated_at BEFORE UPDATE ON public.wishlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate share ID for wishlists
CREATE OR REPLACE FUNCTION generate_share_id()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'base64url');
END;
$$ LANGUAGE plpgsql;

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, age, gender, parent_email)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE((NEW.raw_user_meta_data->>'age')::integer, 10),
    COALESCE((NEW.raw_user_meta_data->>'gender')::gender_type, NULL),
    COALESCE(NEW.raw_user_meta_data->>'parent_email', NULL)
  );
  
  -- Create default user preferences
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
