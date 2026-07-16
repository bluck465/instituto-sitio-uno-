import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

export function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const loadStudents = () => {
    setLoading(true)
    supabase
      .from('estudiantes')
      .select('*')
      .order('primer_apellido')
      .then(({ data, error }) => {
        if (!error) setStudents(data)
        setLoading(false)
      })
  }

  useEffect(() => { loadStudents() }, [])

  if (loading && students.length === 0) return <p className="page-content">Cargando estudiantes...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={loadStudents} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      <section className="dashboard-section">
        <h3>Estudiantes registrados</h3>
        <p>{students.length} estudiante(s) en el sistema</p>
      </section>

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 8px' }}>Cédula</th>
                <th style={{ padding: '10px 8px' }}>Nombre</th>
                <th style={{ padding: '10px 8px' }}>Apellido</th>
                <th style={{ padding: '10px 8px' }}>Teléfono</th>
                <th style={{ padding: '10px 8px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px' }}>{s.cedula_identidad}</td>
                  <td style={{ padding: '10px 8px' }}>{s.primer_nombre} {s.segundo_nombre || ''}</td>
                  <td style={{ padding: '10px 8px' }}>{s.primer_apellido} {s.segundo_apellido || ''}</td>
                  <td style={{ padding: '10px 8px' }}>{s.telefono || '-'}</td>
                  <td style={{ padding: '10px 8px' }}>
                    <span className={`matricula-badge matricula--${s.estado_matricula || 'activo'}`}
                      style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
                      {s.estado_matricula || 'activo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
