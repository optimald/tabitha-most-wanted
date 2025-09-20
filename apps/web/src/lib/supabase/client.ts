import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_CONFIG } from '@tabitha/shared';

export const createClient = () =>
  createBrowserClient(
    SUPABASE_CONFIG.URL,
    SUPABASE_CONFIG.ANON_KEY
  );

export const supabase = createClient();
