/**
 * supabaseClient.js — Cliente de Supabase (Capa de configuracion)
 *
 * QUE HACE:
 *   Crea UNA sola instancia del cliente de Supabase y la exporta
 *   para que toda la app la use. Esta instancia conecta tu frontend
 *   con tu proyecto de Supabase en la nube (PostgreSQL + Auth).
 *
 * POR QUE EXISTE:
 *   Sin este archivo, tendrias que crear un cliente nuevo en cada
 *   archivo que necesite hablar con la base de datos. Con este
 *   archivo, creas el cliente UNA VEZ y lo importas donde lo necesites.
 *
 * QUE NO HACE:
 *   - No contiene logica de negocio (no hace queries, no valida datos)
 *   - No maneja errores (eso lo hace cada provider)
 *   - No sabe que es un "login" o un "dashboard"
 *   - Solo CONFIGURA la conexion con Supabase
 *
 * CUANDO SE TOCA:
 *   Casi NUNCA. Solo cambias este archivo si:
 *   1. Cambias de proyecto de Supabase (nueva URL o key)
 *   2. Migras a otra base de datos (reemplazas createClient)
 *
 * PARA FUTUROS PROGRAMADORES:
 *   Este archivo es como el "enchufe" de la pared. Solo lo configuras
 *   una vez y luego conectas cualquier aparato (provider) a el.
 *   No lo modifiques a menos que sepas exactamente que estas haciendo.
 *
 * VARIABLES DE ENTORNO REQUERIDAS (en .env):
 *   VITE_SUPABASE_URL      → URL de tu proyecto Supabase
 *   VITE_SUPABASE_ANON_KEY → Clave publica (anon) de tu proyecto
 *
 * COMO OBTENERLAS:
 *   1. Ve a https://supabase.com y entra a tu proyecto
 *   2. Ve a Project Settings → API
 *   3. Copia "Project URL" y "anon public" key
 *   4. Pegalas en tu archivo .env
 */

import { createClient } from '@supabase/supabase-js'

// ── Variables de entorno ──────────────────────────────────────
// Vite expone las variables que empiezan con VITE_ en import.meta.env
// Estas variables estan en el archivo .env (no se sube a git)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ── Validacion basica ────────────────────────────────────────
// Si falta alguna variable, lanzamos un error claro en vez de
// que la app falle silenciosamente mas adelante

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno de Supabase. ' +
    'Crea un archivo .env en la raiz del proyecto con:\n' +
    '  VITE_SUPABASE_URL=tu-url\n' +
    '  VITE_SUPABASE_ANON_KEY=tu-key'
  )
}

// ── Crear cliente ────────────────────────────────────────────
// createClient recibe la URL y la key, y retorna un objeto
// que tiene metodos para hablar con Supabase:
//   supabase.from('tabla').select('*')     → queries a PostgreSQL
//   supabase.auth.signUp({ email, ... })   → autenticacion
//   supabase.storage.from('bucket')        → archivos

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
