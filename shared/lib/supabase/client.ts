import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we have real credentials (not placeholders)
const hasRealCredentials: boolean = 
  Boolean(supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key' &&
  !supabaseUrl.includes('placeholder'));

// Create client only if we have real credentials
// Otherwise create a no-op client that won't make requests
let supabase: SupabaseClient;

if (hasRealCredentials) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a client that will fail gracefully
  // We'll check before using it
  supabase = createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder'
  );
}

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return hasRealCredentials;
}

// Get Supabase client (returns null if not configured)
export function getSupabaseClient(): SupabaseClient | null {
  return hasRealCredentials ? supabase : null;
}

export { supabase };
