/**
 * dbProvider.js — El interruptor global de la base de datos
 *
 * Que hace: Exporta el proveedor activo que usa toda la app.
 * Por que:   Si cambias de Supabase a otro sistema, solo cambias aqui.
 *
 * Como se usa:
 *   import { db } from '../services'
 *   db.auth.login(email, password)
 *   db.academic.getDashboard(userId)
 *
 * Para cambiar de proveedor:
 *   1. Crea el provider en providers/nombre-provider/
 *   2. Importalo aqui
 *   3. Reemplazalo en el objeto db
 */

import { supabaseAuth } from './providers/supabase/supabaseAuth'
import { supabaseAcademic } from './providers/supabase/supabaseAcademic'

export const db = {
  auth: supabaseAuth,
  academic: supabaseAcademic,
}
