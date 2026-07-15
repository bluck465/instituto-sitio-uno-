import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ ADVERTENCIA: Faltan variables de entorno de Supabase. " +
    "Las llamadas a la base de datos no funcionarán, pero la UI se renderizará."
  );
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseKey);
}

export const supabase = supabaseInstance;
