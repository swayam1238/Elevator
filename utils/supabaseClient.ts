import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://muqxcwnftaphlmxtwmem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cXhjd25mdGFwaGxteHR3bWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDE1OTAsImV4cCI6MjA2Mjk3NzU5MH0.ZqPXXwk9XQ-8vqt8d4dJL5AlTbYmxhvLKBQ4RcHsE6o';
export const supabase = createClient(supabaseUrl, supabaseKey);
