import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isPlaceholder = (url: string, key: string) => {
  return (
    !url || 
    !key || 
    url.includes('your-project') || 
    key.includes('your-anon-key')
  );
};

export const isSupabaseConfigured = !isPlaceholder(supabaseUrl, supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;
