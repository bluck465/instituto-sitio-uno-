import { useAuth } from '../contexts/AuthContext'

export function DocentePage() {
  const { user } = useAuth()

  return (
    <div className="dashboard-home">
      <section className="dashboard-section dashboard-welcome">
        <h3>Bienvenido, Profesor</h3>
        <p className="dashboard-welcome__subtitle">Panel del docente - Instituto Tecnologico Sitio Uno</p>
      </section>

      <section className="dashboard-section profile-card">
        <div className="profile-header">
          <h3>Perfil del Profesor</h3>
        </div>
        <div className="profile-body" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.nombre?.charAt(0) || '?'}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{user?.nombre || 'Sin nombre'}</p>
            <p style={{ margin: 0, color: '#666' }}>Profesor del Instituto ITSU</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h3>Materias asignadas</h3>
        <p>Proximamente podras ver tus materias y secciones aqui.</p>
      </section>
    </div>
  )
}
