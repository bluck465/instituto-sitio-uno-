/**
 * supabaseAcademic.js — Implementacion de datos academicos con Supabase
 *
 * QUE HACE:
 *   Implementa academicContract usando la sintaxis de Supabase PostgreSQL.
 *   Este es el UNICO archivo que sabe que usas Supabase para datos academicos.
 *
 * POR QUE EXISTE:
 *   Si mananas cambias a otro sistema, creas otro provider con la misma
 *   interfaz y NADA mas cambia en tu app.
 *
 * COMO SE USA:
 *   import { supabaseAcademic } from './providers/supabase/supabaseAcademic'
 *   const { student, classes } = await supabaseAcademic.getDashboard(userId)
 *
 * PARA FUTUROS PROGRAMADORES:
 *   Cuando agregues una tabla nueva en Supabase, crea un metodo aqui
 *   que implemente el contrato correspondiente.
 */

import { supabase } from '../../../lib/supabaseClient'
import { academicContract } from '../../contracts/academicContract'

export const supabaseAcademic = {
  // Spread: hereda los defaults del contrato
  ...academicContract,

  /**
   * Obtiene los datos del dashboard del estudiante.
   *
   * Flujo interno:
   *   1. busca el perfil en tabla estudiantes
   *   2. busca las inscripciones con join a secciones y asignaturas
   *   3. formatea los datos para el frontend
   *
   * @param {string} userId - ID del usuario autenticado
   * @returns {Promise<{ student: Object, classes: Array }>}
   */
  async getDashboard() {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    const { data: estudiante, error: estError } = await supabase
      .from('estudiantes')
      .select('*')
      .eq('usuario_id', user.id)
      .maybeSingle()

    if (estError) throw estError

    const { data: inscripciones, error: inscError } = await supabase
      .from('inscripciones')
      .select(`
        id,
        nota_final,
        inasistencias,
        seccion_id,
        secciones (
          id,
          aula,
          codigo_seccion,
          periodo_id,
          asignaturas (
            codigo,
            nombre
          )
        )
      `)
      .eq('estudiante_id', user.id)

    if (inscError) throw inscError

    // 3. Formatear para el frontend
    const classes = (inscripciones || []).map((insc) => ({
      seccion_id: insc.seccion_id,
      codigo: insc.secciones?.asignaturas?.codigo || 'N/A',
      asignatura: insc.secciones?.asignaturas?.nombre || 'Sin asignatura',
      aula: insc.secciones?.aula || 'Por definir',
    }))

    return {
      student: {
        id: estudiante.id,
        cedula_identidad: estudiante.cedula_identidad,
        primer_nombre: estudiante.primer_nombre,
        primer_apellido: estudiante.primer_apellido,
        estado_matricula: estudiante.estado_matricula,
      },
      classes,
    }
  },

  /**
   * Obtiene todas las asignaturas disponibles.
   *
   * @returns {Promise<Array>}
   */
  async getSubjects() {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*')
      .order('codigo')

    if (error) throw error
    return data
  },
}
