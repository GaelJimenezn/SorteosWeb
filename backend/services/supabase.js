import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env (Estándar de Vite para leer variables)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('🛑 Faltan las credenciales de Supabase en el archivo .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);