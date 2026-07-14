/**
 * Sidebar.jsx — Barra lateral del dashboard del estudiante.
 *
 * Muestra tres secciones:
 * 1. Información del usuario: nombre y email desde el AuthContext.
 * 2. Navegación: enlaces a sub-rutas del dashboard (actualmente solo "Resumen").
 * 3. Botón de cerrar sesión: limpia el estado de auth y redirige al inicio.
 *
 * Se renderiza en el layout del dashboard como columna izquierda.
 */

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export function Sidebar() {
  // Datos del usuario y función de logout desde el contexto de autenticación
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  /**
   * handleLogout() — Cierra la sesión y redirige al inicio.
   * Limpia token y usuario de localStorage y resetea el estado de AuthContext.
   */
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="dashboard-sidebar">
      {/* Tarjeta de información del usuario */}
      <div className="sidebar-user">
        <p className="sidebar-user__name">{user?.nombre || 'Estudiante'}</p>
        <p className="sidebar-user__email">{user?.email}</p>
      </div>

      {/* Navegación del dashboard */}
      <nav>
        <ul>
          <li><Link to="/dashboard">Resumen</Link></li>
        </ul>
      </nav>

      {/* Botón de cerrar sesión: llama a handleLogout al hacer click */}
      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  )
}
