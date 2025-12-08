import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env (Estándar de Vite para leer variables)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

console.log("🔵 [Supabase] Inicializando cliente...");
if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("🔴 [Supabase] Faltan las credenciales en .env");
} else {
    console.log("🟢 [Supabase] Credenciales detectadas correctamente.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);