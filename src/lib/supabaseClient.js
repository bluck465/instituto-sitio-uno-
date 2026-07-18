
//esto es un archivo de configuración para conectar con Supabase. Se utiliza para crear una instancia del cliente de Supabase utilizando las variables de entorno definidas en el
//proyecto. Si las variables de entorno no están presentes, se muestra una advertencia en la consola y la instancia de Supabase no se crea, lo que significa que las llamadas a la
//base de datos no funcionarán, pero la interfaz de usuario aún se renderizará.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


let supabaseInstance = null;


// Validamos que ambas variables existan
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    `Falta la configuración de Supabase. Por favor, verifica tu archivo .env.\n` +
    `VITE_SUPABASE_URL: ${supabaseUrl ? 'Configurada' : 'FALTANTE'}\n` +
    `VITE_SUPABASE_ANON_KEY: ${supabaseKey ? 'Configurada' : 'FALTANTE'}`
  );
}

// Si pasa la validación, creamos y exportamos el cliente con total seguridad
export const supabase = createClient(supabaseUrl, supabaseKey);





//error handling for missing env variables //errores en la configuración de variables de entorno
//if (!supabaseUrl || !supabaseKey) {
//  console.warn(
//    "⚠️ ADVERTENCIA: Faltan variables de entorno de Supabase. " +
//    "Las llamadas a la base de datos no funcionarán, pero la UI se renderizará."
//  );
//} else {
//  supabaseInstance = createClient(supabaseUrl, supabaseKey)
//  console.log("✅ Supabase conectado:", supabaseUrl)
//}

//export const supabase = supabaseInstance;
