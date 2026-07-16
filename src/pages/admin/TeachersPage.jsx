import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

export function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  const loadTeachers = () => {
    setLoading(true)
    supabase
      .from('profesores')
      .select('*')
      .order('primer_apellido')
      .then(({ data, error }) => {
        if (!error) setTeachers(data)
        setLoading(false)
      })
  }

  useEffect(() => { loadTeachers() }, [])

  if (loading && teachers.length === 0) return <p className="page-content">Cargando docentes...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={loadTeachers} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      <section className="dashboard-section">
        <h3>Docentes registrados</h3>
        <p>{teachers.length} docente(s) en el sistema</p>
      </section>

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 8px' }}>Nombre</th>
                <th style={{ padding: '10px 8px' }}>Apellido</th>
                <th style={{ padding: '10px 8px' }}>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px' }}>{t.primer_nombre} {t.segundo_nombre || ''}</td>
                  <td style={{ padding: '10px 8px' }}>{t.primer_apellido} {t.segundo_apellido || ''}</td>
                  <td style={{ padding: '10px 8px' }}>{t.telefono || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
