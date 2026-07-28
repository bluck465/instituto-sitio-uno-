import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function AdminPage() {
  const { user } = useAuth()

  return (
    <div className="dashboard-home">
      <section className="dashboard-section dashboard-welcome">
        <h3>Bienvenido, Administrador</h3>
        <p className="dashboard-welcome__subtitle">Panel de administracion - Instituto Tecnologico Sitio Uno</p>
      </section>

      <section className="dashboard-section profile-card">
        <div className="profile-header">
          <h3>Perfil del Administrador</h3>
        </div>
        <div className="profile-body" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.nombre?.charAt(0) || '?'}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{user?.nombre || 'Sin nombre'}</p>
            <p style={{ margin: 0, color: '#666' }}>Administrador del Instituto ITSU</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h3>Acceso rapido</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          <Link to="/admin/carreras" className="header-action solid" style={{ textDecoration: 'none' }}>
            Gestionar carreras
          </Link>
          <Link to="/admin/academico" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Asignaturas
          </Link>
          <Link to="/admin/periodos" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Periodos
          </Link>
          <Link to="/admin/secciones" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Secciones
          </Link>
          <Link to="/admin/inscripciones" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Inscripciones
          </Link>
          <Link to="/admin/estudiantes" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Estudiantes
          </Link>
          <Link to="/admin/docentes" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Docentes
          </Link>
          <Link to="/admin/usuarios" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white' }}>
            Usuarios
          </Link>
        </div>
      </section>
    </div>
  )
}
