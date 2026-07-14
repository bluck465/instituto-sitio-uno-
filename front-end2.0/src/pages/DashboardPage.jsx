<<<<<<< HEAD
/**
 * DashboardPage.jsx — Página principal del dashboard del estudiante.
 *
 * Al montar, llama a GET /api/dashboard para obtener los datos del estudiante.
 * Muestra tres estados posibles:
 * 1. Loading: indicador de carga mientras la petición está en curso.
 * 2. Error: mensaje de error si la petición falla.
 * 3. Éxito: muestra el estado de matrícula y las materias inscritas.
 *
 * El estado de matrícula se colorea según su valor:
 * - "activo" → verde
 * - "suspendido" → rojo
 * - "egresado" → azul
 */

import { useState, useEffect } from 'react'
import { getDashboardData } from '../features/dashboard/services/dashboardService'
import { EnrolledClasses } from '../features/dashboard/components/EnrolledClasses'

export function DashboardPage() {
  // Estados del componente: datos, carga y error
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar datos del dashboard al montar el componente (array vacío = solo una vez)
  useEffect(() => {
    getDashboardData()
      .then(setData)       // Éxito: guardar datos en estado
      .catch(setError)     // Error: guardar error en estado
      .finally(() => setLoading(false))  // Siempre: terminar estado de carga
  }, [])

  // Estado de carga: mostrar indicador mientras se obtienen los datos
  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p>Cargando dashboard…</p>
        </div>
      </div>
    )
  }

  // Estado de error: mostrar mensaje de error amigable
  if (error) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p className="auth-error">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  // Extraer el estado de matrícula del estudiante
  const estado = data.student.estado_matricula

  return (
    <>
      {/* Sección de estado de matrícula con badge de color */}
      <section className="dashboard-section">
        <h3>Estado de matrícula</h3>
        {/* Clase CSS dinámica según el estado: activo/suspendido/egresado */}
        <p className={`matricula-badge matricula--${estado}`}>
          {estado === 'activo' ? 'Activo' : estado === 'suspendido' ? 'Suspendido' : estado || 'Sin estado'}
        </p>
      </section>

      {/* Lista de materias inscritas */}
      <EnrolledClasses classes={data.classes} />
    </>
=======
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
>>>>>>> fe3f9489ed3e36cd9c19b4e6d43864b06a7235d1
  )
}