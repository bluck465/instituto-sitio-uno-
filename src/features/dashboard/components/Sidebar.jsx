import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getHomePath = () => {
    if (user?.rol === 'profesor') return '/teacher'
    if (user?.rol === 'administrador') return '/admin'
    return '/dashboard'
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user">
        <p className="sidebar-user__name">{user?.nombre || user?.email}</p>
        <p className="sidebar-user__email">{user?.email}</p>
        <p className="sidebar-user__role">{user?.rol}</p>
      </div>

      <nav>
        <ul>
          <li><Link to={getHomePath()}>Resumen</Link></li>
          {user?.rol === 'estudiante' && (
            <>
              <li><Link to="/dashboard/inscripcion">Inscripción</Link></li>
              <li><Link to="/dashboard/pagos">Mis pagos</Link></li>
            </>
          )}
          <li><Link to="/profile/editar">Editar perfil</Link></li>
        </ul>
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesion
      </button>
    </aside>
  )
}
