/**
 * FormError.jsx — Banner de errores para formularios de autenticación.
 *
 * Renderiza un mensaje de error estilizado con:
 * - Icono según el código de estado (400=warning, 401=candado, 409=usuario, etc.)
 * - Mensaje principal amigable en español.
 * - Lista de errores por campo (si existen, típico de errores 422).
 *
 * Acepta tanto un error object (del ApiError) como fieldErrors pre-parseados.
 * Si parseServerError falla, muestra un fallback con el mensaje del error.
 *
 * @param {Error|null} error - Error del API (opcional)
 * @param {object|null} fieldErrors - Errores por campo ya parseados (opcional)
 */

import { parseServerError } from '../../../services/errorHandler'

// Iconos por código de estado HTTP
const STATUS_ICONS = {
  201: '✅',   // Creado (éxito)
  400: '⚠️',   // Bad request
  401: '🔒',   // No autorizado
  409: '👤',   // Conflicto (usuario duplicado)
  422: '📝',   // Validación fallida
  500: '❌',   // Error del servidor
}

export function FormError({ error, fieldErrors }) {
  // No renderizar nada si no hay errores
  if (!error && !fieldErrors) return null

  let parsed, message, status

  try {
    // Intentar parsear el error a un formato amigable
    parsed = error ? parseServerError(error) : null
    status = parsed?.status
    message = parsed?.friendly
  } catch (e) {
    // Si parseServerError falla, registrar en consola y usar fallback
    console.warn('FormError: parseServerError falló', e)
  }

  // Fallback: si no se pudo parsear, extraer mensaje del error directamente
  if (!message) {
    message = typeof error === 'string'
      ? error
      : error?.message
      || error?.status
      ? `Error ${error.status}`
      : 'Error desconocido'
  }

  // Seleccionar icono según el status HTTP
  const icon = STATUS_ICONS[status] || '⚠️'

  return (
    <div className={`form-error form-error--${status || 'unknown'}`}>
      {/* Mensaje principal con icono */}
      <p className="form-error__message">{icon} {message}</p>

      {/* Lista de errores por campo (solo si existen) */}
      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <ul className="form-error__fields">
          {Object.entries(fieldErrors).map(([field, msg]) => (
            <li key={field}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
