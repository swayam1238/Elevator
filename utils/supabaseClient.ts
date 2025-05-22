import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Attempt to read from env, fallback to a hardcoded key for testing
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cXhjd25mdGFwaGxteHR3bWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDE1OTAsImV4cCI6MjA2Mjk3NzU5MH0.ZqPXXwk9XQ-8vqt8d4dJL5AlTbYmxhvLKBQ4RcHsE6o';

if (!supabaseUrl) {
  throw new Error('Missing Supabase environment variable VITE_SUPABASE_URL');
}

console.info('Supabase URL:', supabaseUrl);
console.info('Supabase Key:', supabaseKey.slice(0, 10) + '...');

export const supabase = createClient(supabaseUrl, supabaseKey);
