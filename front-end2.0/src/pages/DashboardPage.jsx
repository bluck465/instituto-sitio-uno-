import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="dashboard-home">
      <section className="dashboard-section dashboard-welcome">
        <h3>Bienvenido, {user?.nombre || 'Estudiante'}</h3>
        <p className="dashboard-welcome__subtitle">Instituto Tecnológico Sitio Uno</p>
        <button
          className="btn-entrar"
          type="button"
          onClick={() => {
            document.querySelector('.profile-card')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Entrar
        </button>
      </section>

      <section className="dashboard-section profile-card">
        <div className="profile-header">
          <h3>Perfil del Estudiante</h3>
        </div>
        <div className="profile-body" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.nombre?.charAt(0) || '?'}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{user?.nombre || 'Sin nombre'}</p>
            <p style={{ margin: 0, color: '#666' }}>Estudiante del Instituto ITSU</p>
          </div>
        </div>
      </section>
    </div>
  )
}