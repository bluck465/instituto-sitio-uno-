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

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // Si no hay sesión activa, redirigir al inicio
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // Sesión válida: renderizar el contenido protegido
  return children
}
