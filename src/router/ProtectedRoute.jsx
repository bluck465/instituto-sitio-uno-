/**
 * ProtectedRoute.jsx — Guard de autenticación para rutas protegidas.
 *
 * Verifica si el usuario está autenticado (via useAuth).
 * Si NO está autenticado, redirige a "/" (landing page).
 * Si SÍ está autenticado, renderiza los children normalmente.
 *
 * Uso: envolver rutas que requieran sesión activa.
 *   <ProtectedRoute><DashboardLayout /></ProtectedRoute>
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Cambia a false cuando quieras activar la proteccion de rutas
const BYPASS_AUTH = true

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // Si BYPASS_AUTH esta activo, saltar la verificacion
  if (BYPASS_AUTH) {
    return children
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
