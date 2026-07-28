/**
 * academicContract.js — Contrato de datos academicos
 *
 * QUE HACE:
 *   Define los metodos que TODO proveedor academico DEBE implementar.
 *   Cubre las operaciones del dashboard y consultas academicas.
 *
 * POR QUE EXISTE:
 *   Separa QUE datos necesitas de COMO se obtienen.
 *   Si cambias de Supabase a otro sistema, solo creas un nuevo provider
 *   que implemente estos metodos.
 *
 * PARA FUTUROS PROGRAMADORES:
 *   Este contrato crecera conforme el proyecto avance (Fase 2, Fase 3).
 *   Cuando necesites un dato nuevo, primero agrégalo aqui, luego implementalo.
 *
 * METODOS:
 *   - getDashboard()         → Datos del dashboard del estudiante
 *   - getSubjects()          → Lista de asignaturas disponibles
 */

export const academicContract = {
  /**
   * Obtiene los datos completos del dashboard del estudiante.
   *
   * Incluye:
   *   - Perfil del estudiante (nombre, cedula, estado de matricula)
   *   - Materias inscritas (codigo, nombre, horario, aula)
   *
   * @returns {Promise<{ student: Object, classes: Array }>}
   *
   * student: {
   *   id: string,
   *   cedula_identidad: string,
   *   primer_nombre: string,
   *   primer_apellido: string,
   *   email: string,
   *   estado_matricula: 'activo' | 'suspendido' | 'egresado'
   * }
   *
 * classes: [{
 *   seccion_id: string,
 *   codigo: string,          // Ej: "MAT101"
 *   asignatura: string,      // Ej: "Matematicas I"
 *   aula: string             // Ej: "A-301"
 * }]
   *
   * @example
   *   const { student, classes } = await academic.getDashboard()
   *   console.log(student.primer_nombre)  // "Juan"
   *   console.log(classes.length)          // 3
   */
  async getDashboard() {
    throw new Error('academicContract.getDashboard() no implementado en el proveedor activo')
  },

  /**
   * Obtiene la lista de todas las asignaturas disponibles.
   *
   * @returns {Promise<Array>}
   *
   * Retorno: [{
   *   id: string,
   *   codigo: string,       // Ej: "MAT101"
   *   nombre: string,       // Ej: "Matematicas I"
   *   descripcion: string,
   *   creditos: number
   * }]
   *
   * @example
   *   const subjects = await academic.getSubjects()
   *   subjects.forEach(s => console.log(s.codigo, s.nombre))
   */
  async getSubjects() {
    throw new Error('academicContract.getSubjects() no implementado en el proveedor activo')
  },
}
