/**
 * errorHandler.js — Utilidad para parsear errores del API a mensajes amigables.
 *
 * Proporciona dos funciones principales:
 * - parseServerError(): convierte un error HTTP en un objeto con status,
 *   mensaje friendly en español, y errores por campo si existen.
 * - formatFieldErrors(): extrae los errores de campo en un formato
 *   simplificado { campo: "mensaje" } para mostrar inline en formularios.
 *
 * Los mensajes están en español y mapean códigos HTTP comunes (400-500)
 * a textos comprensibles para el usuario final.
 */

// ── Mapa de mensajes por código de estado HTTP ───────────────────────
const ERROR_MAP = {
  400: 'Error al enviar los datos. Verifica e inténtalo de nuevo.',
  401: 'Correo o contraseña incorrectos.',
  403: 'No tienes permiso para realizar esta acción.',
  404: 'El recurso solicitado no fue encontrado.',
  409: 'Este correo electrónico o cédula ya se encuentra registrado.',
  422: 'Uno o más campos no son válidos. Revísalos e intenta de nuevo.',
  500: 'Error del servidor. Intenta de nuevo más tarde.',
}

// ── Mapa de nombres legibles para los campos del formulario ──────────
// Usado para traducir nombres técnicos de campos (snake_case) a etiquetas
// en español que el usuario pueda entender.
const FIELD_LABELS = {
  email: 'Correo electrónico',
  password: 'Contraseña',
  primer_nombre: 'Primer nombre',
  primer_apellido: 'Primer apellido',
  cedula_identidad: 'Cédula de identidad',
  segundo_nombre: 'Segundo nombre',
  segundo_apellido: 'Segundo apellido',
  telefono: 'Teléfono',
}

/**
 * parseServerError() — Convierte un error del API en un objeto legible.
 *
 * @param {Error|ApiError} error - Error capturado del httpClient
 * @returns {{ status: number, serverMessage: string|null, friendly: string, fieldErrors: object|null }}
 *
 * Flujo:
 * 1. Extraer el status del error (puede venir en error.status o error.response?.status).
 * 2. Extraer el body del error (puede venir en error.body o error.response?.data).
 * 3. Buscar el mensaje friendly en ERROR_MAP según el status.
 * 4. Para errores 422: formatear los errores de campo individuales.
 * 5. Para errores 409 y 401: usar el mensaje del servidor si existe.
 */
export function parseServerError(error) {
  // Si no hay error, retornar genérico de 500
  if (!error) return { friendly: ERROR_MAP[500], status: 500, fieldErrors: null }

  // Extraer status: puede estar en error.status o en error.response?.status
  const rawStatus = typeof error.status === 'number' ? error.status : null
  const status = rawStatus || error.response?.status || 500

  // Extraer body: puede estar en error.body o en error.response?.data
  const body = (error.body || error.response?.data || {})

  // Buscar mensaje de error del servidor (si viene como string)
  const serverMessage = typeof body.error === 'string'
    ? body.error
    : null

  // Buscar errores por campo (si body.error es un objeto con arrays de mensajes)
  const fieldErrors = body.error && typeof body.error === 'object'
    ? body.error
    : null

  // Mensaje base por defecto según el status
  let friendly = ERROR_MAP[status] || `Error inesperado (${status})`

  // Para errores 422: formatear errores de campo en texto legible
  if (status === 422 && fieldErrors) {
    const details = Object.entries(fieldErrors)
      .map(([field, msgs]) => {
        // Traducir nombre técnico del campo a etiqueta en español
        const label = FIELD_LABELS[field] || field
        return `${label}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`
      })
      .join(' | ')
    friendly = details || friendly
  }

  // Para errores 409 y 401: usar el mensaje específico del servidor
  if (status === 409 && serverMessage) {
    friendly = serverMessage
  }

  if (status === 401 && serverMessage) {
    friendly = serverMessage
  }

  return { status, serverMessage, friendly, fieldErrors }
}

/**
 * formatFieldErrors() — Convierte errores de campo del API a formato simplificado.
 *
 * @param {object|null} fieldErrors - Objeto { campo: "mensaje" | ["msg1", "msg2"] }
 * @returns {object} Objeto { campo: "primer mensaje" } con solo el primer error por campo
 *
 * Ejemplo de entrada:  { email: ["Requerido"], password: ["Mínimo 6 caracteres"] }
 * Ejemplo de salida:   { email: "Requerido", password: "Mínimo 6 caracteres" }
 */
export function formatFieldErrors(fieldErrors) {
  if (!fieldErrors) return {}
  const result = {}
  for (const [field, msgs] of Object.entries(fieldErrors)) {
    // Traducir nombre del campo a etiqueta legible
    const label = FIELD_LABELS[field] || field
    // Tomar solo el primer mensaje si es un array
    result[field] = Array.isArray(msgs) ? msgs[0] : msgs
  }
  return result
}
