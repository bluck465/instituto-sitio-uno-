/**
 * DashboardPage.jsx — Página principal del dashboard del estudiante.
 *
 * Al montar, llama a GET /api/dashboard para obtener los datos del estudiante.
 * Muestra tres estados posibles:
 * 1. Loading: indicador de carga mientras la petición está en curso.
 * 2. Error: mensaje de error si la petición falla.
 * 3. Éxito: muestra bienvenida, perfil del estudiante, estado de matrícula
 *    y materias inscritas.
 *
 * El estado de matrícula se colorea según su valor:
 * - "activo" → verde
 * - "suspendido" → rojo
 * - "egresado" → azul
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getDashboardData } from '../features/dashboard/services/dashboardService'
import { EnrolledClasses } from '../features/dashboard/components/EnrolledClasses'

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p>Cargando dashboard…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p className="auth-error">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  const estado = data.student.estado_matricula

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

      <section className="dashboard-section">
        <h3>Estado de matrícula</h3>
        <p className={`matricula-badge matricula--${estado}`}>
          {estado === 'activo' ? 'Activo' : estado === 'suspendido' ? 'Suspendido' : estado || 'Sin estado'}
        </p>
      </section>

      <EnrolledClasses classes={data.classes} />
    </div>
  )
}
