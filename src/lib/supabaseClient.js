
// Archivo de configuración para conectar con Supabase.
// Si las variables de entorno no están presentes, se muestra una advertencia
// y la UI se renderiza igual (sin conexión a BD).

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  // No destruimos la app — solo avisamos. Las llamadas a BD fallarán,
  // pero el usuario puede seguir navegando la UI.
  console.warn(
    'Faltan variables de entorno de Supabase. ' +
    'Las llamadas a la base de datos no funcionarán, pero la UI se renderizará.\n' +
    `VITE_SUPABASE_URL: ${supabaseUrl ? 'OK' : 'FALTANTE'}\n` +
    `VITE_SUPABASE_ANON_KEY: ${supabaseKey ? 'OK' : 'FALTANTE'}`
  )
} else {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export { supabase };
