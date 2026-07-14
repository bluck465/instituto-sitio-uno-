/**
 * AuthContext.jsx — Proveedor de autenticación global (Context API).
 *
 * Gestiona el estado de sesión del usuario en toda la aplicación:
 * - Almacena token JWT y datos del usuario en localStorage para persistir la sesión.
 * - Expone `login()` y `logout()` para que cualquier componente pueda autenticarse.
 * - La constante `isAuthenticated` permite verificar si hay sesión activa.
 *
 * Uso: envolver la app en <AuthProvider> y consumir con useAuth().
 */

import { createContext, useContext, useState, useCallback } from 'react'
import { loginUser as apiLogin } from '../features/auth/services/authService'

// Claves de localStorage para persistir la sesión
const TOKEN_KEY = 'itsu_token'
const USER_KEY = 'itsu_user'

// ── Helpers de localStorage ──────────────────────────────────────────
// Estas funciones encapsulan el acceso a localStorage para aislar
// la lógica de persistencia del resto del contexto.

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    // El usuario se guarda como JSON serializado
    return raw ? JSON.parse(raw) : null
  } catch {
    // Si el JSON está corrupto, retorna null en lugar de crashear
    return null
  }
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function removeUser() {
  localStorage.removeItem(USER_KEY)
}

// ── Contexto y Provider ─────────────────────────────────────────────

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Estado inicial: se hidrata desde localStorage para mantener sesión entre recargas
  const [user, setUserState] = useState(getUser)
  const [token, setTokenState] = useState(getToken)

  // True solo si hay token Y datos de usuario válidos
  const isAuthenticated = !!token && !!user

  /**
   * login() — Autentica al usuario contra el API.
   * 1. Llama al endpoint de login con email/password.
   * 2. Guarda el token y los datos del usuario en localStorage + estado React.
   * 3. Retorna la respuesta completa para que el componente consumidor actúe.
   */
  const login = useCallback(async (email, password) => {
    const response = await apiLogin({ email, password })
    const userData = response.user
    const newToken = response.token

    // Sincronizar localStorage (persistencia) y estado React (renderizado)
    setToken(newToken)
    setTokenState(newToken)
    setUser(userData)
    setUserState(userData)

    return response
  }, [])

  /**
   * logout() — Cierra la sesión limpia y completamente.
   * Remueve token y usuario de localStorage y resetea el estado a null.
   */
  const logout = useCallback(() => {
    removeToken()
    removeUser()
    setTokenState(null)
    setUserState(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth() — Hook personalizado para consumir el contexto de autenticación.
 * Retorna { user, token, isAuthenticated, login, logout }.
 * Lanza error si se usa fuera de <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
