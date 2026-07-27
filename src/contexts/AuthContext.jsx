import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
  saveProfileUser,
  getProfileUser,
  logoutUser
} from '../features/auth/services/authService'
import { storage } from '../services/storage'
import { supabase } from '../lib/supabaseClient'

// ── Estado inicial desde el servicio de storage ──
function getToken() { return storage.get('token') }
function setToken(token) { storage.set('token', token) }
function removeToken() { storage.remove('token') }
function getUser() { return storage.getJson('user') }
function setUser(user) { storage.setJson('user', user) }
function removeUser() { storage.remove('user') }

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser)
  const [token, setTokenState] = useState(getToken)
  const isAuthenticated = !!token && !!user

  useEffect(() => {
    const validateSession = async () => {
      if (!token) return
      const { error } = await supabase.auth.getUser()
      if (error) {
        removeToken()
        removeUser()
        setUserState(null)
        setTokenState(null)
      }
    }
    validateSession()
  }, [])

  const login = useCallback(async (email, password) => {
    const response = await apiLogin({ email, password })
    setToken(response.token)
    setTokenState(response.token)
    setUser(response.user)
    setUserState(response.user)
    storage.remove('pendingVerificationPassword')
    return response
  }, [])

  const register = useCallback(async (payload) => {
    const response = await apiRegister(payload)
    setToken(response.token)
    setTokenState(response.token)
    setUser(response.user)
    setUserState(response.user)
    return response
  }, [])

  const saveProfile = useCallback(async (rol, profileData) => {
    await saveProfileUser(rol, profileData)
  }, [])

  const getProfile = useCallback(async (rol) => {
    return getProfileUser(rol)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()          // cierra sesión en Supabase
    } catch {
      // si falla la red, igual limpiamos local
      // la sesión en Supabase expira sola con el TTL del JWT
    }
    removeToken()                 // limpieza local SIEMPRE se ejecuta
    removeUser()
    setTokenState(null)
    setUserState(null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user, token, isAuthenticated,
      login, register, saveProfile, getProfile, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
