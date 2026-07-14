/**
 * authService.js — Servicios de autenticación contra el API backend.
 *
 * Expone dos funciones que encapsulan las peticiones HTTP de login y registro.
 * Ambas usan httpClient que automáticamente adjunta el token JWT si existe.
 *
 * Endpoints consumidos:
 * - POST /api/auth/login    → retorna { token, user }
 * - POST /api/auth/register → retorna { token, user } (auto-login post-registro)
 */

import { httpClient } from '../../../services/httpClient'

/**
 * loginUser() — Autentica al usuario con email y contraseña.
 * @param {{ email: string, password: string }} payload - Credenciales del usuario
 * @returns {Promise<{ token: string, user: object }>} Token JWT y datos del usuario
 */
export async function loginUser(payload) {
  return httpClient.post('/api/auth/login', payload)
}

/**
 * registerStudent() — Registra un nuevo estudiante en el sistema.
 * @param {object} payload - Datos del formulario (email, password, cedula, nombres, etc.)
 * @returns {Promise<{ token: string, user: object }>} Token JWT y datos del usuario registrado
 */
export async function registerStudent(payload) {
  return httpClient.post('/api/auth/register', payload)
}
