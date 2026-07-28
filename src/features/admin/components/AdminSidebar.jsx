import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

const MODULES = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/usuarios', label: 'Usuarios', icon: '👥' },
  { path: '/admin/carreras', label: 'Carreras', icon: '🎓' },
  { path: '/admin/academico', label: 'Asignaturas', icon: '📚' },
  { path: '/admin/estudiantes', label: 'Estudiantes', icon: '🎓' },
  { path: '/admin/docentes', label: 'Docentes', icon: '👨‍🏫' },
  { path: '/admin/periodos', label: 'Periodos', icon: '📅' },
  { path: '/admin/secciones', label: 'Secciones', icon: '🏫' },
  { path: '/admin/inscripciones', label: 'Inscripciones', icon: '📝' },
  { path: '/admin/calificaciones', label: 'Calificaciones', icon: '📊' },
  { path: '/admin/finanzas', label: 'Finanzas', icon: '💰' },
]

export function AdminSidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user">
        <p className="sidebar-user__name">{user?.nombre || user?.email}</p>
        <p className="sidebar-user__email">{user?.email}</p>
        <p className="sidebar-user__role">Administrador</p>
      </div>

      <nav>
        <ul>
          {MODULES.map((mod) => (
            <li key={mod.path}>
              <Link
                to={mod.path}
                className={isActive(mod.path) ? 'nav-active' : ''}
              >
                <span>{mod.icon}</span>
                <span>{mod.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  )
}
