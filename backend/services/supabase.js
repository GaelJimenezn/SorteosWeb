import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL = 'URL_AQUI';
const SUPABASE_KEY = 'KEY_AQUI';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);