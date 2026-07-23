import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export function InscripcionPage() {
  const { user } = useAuth()
  const [secciones, setSecciones] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inscribiendo, setInscribiendo] = useState(null)

  useEffect(() => {
    if (!user?.id) return
    let cancelled = false

    supabase
      .from('estudiantes')
      .select('id')
      .eq('usuario_id', user.id)
      .single()
      .then(({ data: estudiante, error: estError }) => {
        if (cancelled) return
        if (estError || !estudiante) {
          setError('No se encontro tu perfil de estudiante.')
          return
        }
        return Promise.all([
          supabase
            .from('secciones')
            .select('*, asignaturas(*), profesores(*, usuarios!inner(email)), periodos_lectivos(*)')
            .order('horario'),
          supabase
            .from('inscripciones')
            .select('*, secciones(*, asignaturas(*))')
            .eq('estudiante_id', estudiante.id),
        ])
      })
      .then((results) => {
        if (cancelled || !results) return
        const [seccionesRes, inscripcionesRes] = results
        if (seccionesRes.error) throw seccionesRes.error
        if (inscripcionesRes.error) throw inscripcionesRes.error
        setSecciones(seccionesRes.data || [])
        setInscripciones(inscripcionesRes.data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [user])

  const handleInscribir = (seccionId) => {
    setInscribiendo(seccionId)
    supabase
      .from('estudiantes')
      .select('id')
      .eq('usuario_id', user.id)
      .single()
      .then(({ data: estudiante }) => {
        if (!estudiante) throw new Error('Perfil de estudiante no encontrado')
        return supabase
          .from('inscripciones')
          .insert({ estudiante_id: estudiante.id, seccion_id: seccionId })
      })
      .then(({ error: insError }) => {
        if (insError) throw insError
        window.location.reload()
      })
      .catch((err) => {
        setError(err.message)
        setInscribiendo(null)
      })
  }

  const inscripcionesIds = inscripciones.map((i) => i.seccion_id)

  if (loading) return <p className="page-content">Cargando secciones...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/dashboard" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={() => window.location.reload()} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      {error && (
        <section className="dashboard-section">
          <p className="auth-error">{error}</p>
        </section>
      )}

      <section className="dashboard-section">
        <h3>Mis inscripciones</h3>
        <p>{inscripciones.length} materia(s) inscrita(s)</p>
      </section>

      {inscripciones.length > 0 && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '10px 8px' }}>Materia</th>
                  <th style={{ padding: '10px 8px' }}>Seccion</th>
                  <th style={{ padding: '10px 8px' }}>Nota</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((i) => (
                  <tr key={i.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 8px' }}>{i.secciones?.asignaturas?.nombre || '-'}</td>
                    <td style={{ padding: '10px 8px' }}>{i.secciones?.codigo || '-'}</td>
                    <td style={{ padding: '10px 8px' }}>
                      {i.nota_final != null ? i.nota_final : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <h3>Secciones disponibles</h3>
        {secciones.length === 0 ? (
          <p>No hay secciones disponibles.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '10px 8px' }}>Materia</th>
                  <th style={{ padding: '10px 8px' }}>Seccion</th>
                  <th style={{ padding: '10px 8px' }}>Horario</th>
                  <th style={{ padding: '10px 8px' }}>Periodo</th>
                  <th style={{ padding: '10px 8px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((s) => {
                  const yaInscrito = inscripcionesIds.includes(s.id)
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 8px' }}>{s.asignaturas?.nombre || '-'}</td>
                      <td style={{ padding: '10px 8px' }}>{s.codigo || '-'}</td>
                      <td style={{ padding: '10px 8px' }}>{s.horario || '-'}</td>
                      <td style={{ padding: '10px 8px' }}>{s.periodos_lectivos?.nombre || '-'}</td>
                      <td style={{ padding: '10px 8px' }}>
                        {yaInscrito ? (
                          <span style={{ color: '#166534', fontWeight: 600, fontSize: '0.85rem' }}>Inscrito</span>
                        ) : (
                          <button
                            onClick={() => handleInscribir(s.id)}
                            disabled={inscribiendo === s.id}
                            style={{
                              padding: '4px 12px',
                              borderRadius: '8px',
                              border: 0,
                              background: 'linear-gradient(135deg, #2f6bf0 0%, #1843b7 100%)',
                              color: '#fff',
                              cursor: inscribiendo === s.id ? 'wait' : 'pointer',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                            }}
                          >
                            {inscribiendo === s.id ? 'Inscribiendo...' : 'Inscribir'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
