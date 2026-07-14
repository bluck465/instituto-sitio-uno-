/**
 * httpClient.js — Cliente HTTP genérico para consumir el API REST.
 *
 * Proporciona una capa de abstracción sobre fetch() que:
 * - Lee la URL base desde la variable de entorno VITE_API_BASE_URL.
 * - Adjunta automáticamente el token JWT de Authorization si existe.
 * - Retorna JSON directamente (parsea la respuesta).
 * - Lanza ApiError con status y body cuando la respuesta no es OK.
 *
 * Expone cuatro métodos: get, post, put, delete.
 * Todos los payloads se envían como application/json.
 */

// URL base del API backend, configurada en .env como VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * getToken() — Lee el token JWT de localStorage.
 * Retorna null si no existe o si hay error al acceder a localStorage.
 */
function getToken() {
  try {
    return localStorage.getItem('itsu_token')
  } catch {
    return null
  }
}

/**
 * ApiError — Clase de error personalizada para errores HTTP.
 * Extiende Error estándar con status (código HTTP) y body (respuesta del servidor).
 * El mensaje de error se extrae de body.error si existe.
 */
class ApiError extends Error {
  constructor(status, body) {
    const msg = typeof body?.error === 'string' ? body.error : `Error ${status}`
    super(msg)
    this.status = status
    this.body = body
  }
}

/**
 * request() — Función interna que ejecuta las peticiones fetch.
 *
 * 1. Construye la URL completa concatenando BASE_URL + endpoint.
 * 2. Lee el token JWT y lo agrega como header Authorization si existe.
 * 3. Mezcla los headers por defecto con los personalizados del caller.
 * 4. Si la respuesta no es OK (status fuera de 200-299), parsea el body
 *    y lanza un ApiError con el status y el body completo.
 * 5. Si todo está bien, retorna el body parseado como JSON.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const token = getToken()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Solo agregar Authorization si hay token (evita header vacío)
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  // Si la respuesta es error, parsear el body y lanzar excepción
  if (!response.ok) {
    // Usar .catch para evitar crashear si el body no es JSON válido
    const body = await response.json().catch(() => ({}))
    throw new ApiError(response.status, body)
  }

  return response.json()
}

/**
 * httpClient — Objeto exportado con los métodos HTTP disponibles.
 * Cada método encapsula un verbo HTTP y delega a request().
 */
export const httpClient = {
  /** GET: obtener datos del servidor */
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),

  /** POST: enviar datos al servidor (registro, login, etc.) */
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  /** PUT: actualizar datos existentes en el servidor */
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  /** DELETE: eliminar un recurso en el servidor */
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}
