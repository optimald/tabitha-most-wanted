-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products table policies (read-only for users)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT TO authenticated USING (true);

-- Admin policy for products (for scraping service)
CREATE POLICY "Service role can manage products" ON public.products
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Wishlists table policies
CREATE POLICY "Users can view their own wishlists" ON public.wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlists" ON public.wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlists" ON public.wishlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlists" ON public.wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- Public wishlists can be viewed by anyone with share_id
CREATE POLICY "Public wishlists can be viewed via share_id" ON public.wishlists
  FOR SELECT USING (is_public = true AND share_id IS NOT NULL);

-- Wishlist items policies
CREATE POLICY "Users can view items in their wishlists" ON public.wishlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE id = wishlist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add items to their wishlists" ON public.wishlist_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE id = wishlist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in their wishlists" ON public.wishlist_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE id = wishlist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their wishlists" ON public.wishlist_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE id = wishlist_id AND user_id = auth.uid()
    )
  );

-- Public wishlist items can be viewed by anyone
CREATE POLICY "Public wishlist items can be viewed" ON public.wishlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE id = wishlist_id AND is_public = true AND share_id IS NOT NULL
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.user_preferences TO authenticated;
GRANT SELECT ON public.products TO authenticated, anon;
GRANT ALL ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlist_items TO authenticated;

-- Grant service role permissions for product management
GRANT ALL ON public.products TO service_role;
