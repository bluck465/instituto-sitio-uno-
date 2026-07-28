import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'

const cardStyle = {
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  background: '#fff',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const cardHoverStyle = {
  borderColor: 'var(--accent)',
  boxShadow: '0 2px 8px rgba(47,107,240,0.12)',
}

const btnSolid = {
  padding: '4px 12px',
  borderRadius: '8px',
  border: 0,
  background: 'linear-gradient(135deg, #2f6bf0 0%, #1843b7 100%)',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.85rem',
}

const btnOutline = {
  padding: '4px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '0.85rem',
}

export function InscripcionPage() {
  const { user } = useAuth()

  const [carreras, setCarreras] = useState([])
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null)
  const [secciones, setSecciones] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [estudianteId, setEstudianteId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingSecciones, setLoadingSecciones] = useState(false)
  const [error, setError] = useState(null)
  const [inscribiendo, setInscribiendo] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

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
        setEstudianteId(estudiante.id)
        return Promise.all([
          supabase.from('carreras').select('*').order('codigo'),
          supabase
            .from('inscripciones')
            .select('*, secciones(*, asignaturas(*, carreras(*)))')
            .eq('estudiante_id', estudiante.id),
        ])
      })
      .then((results) => {
        if (cancelled || !results) return
        const [carrerasRes, inscripcionesRes] = results
        if (carrerasRes.error) throw carrerasRes.error
        if (inscripcionesRes.error) throw inscripcionesRes.error
        setCarreras(carrerasRes.data || [])
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

  const cargarSecciones = (carrera) => {
    if (!estudianteId) return
    setCarreraSeleccionada(carrera)
    setLoadingSecciones(true)

    supabase
      .from('secciones')
      .select('*, asignaturas(*, carreras(*)), profesores(*, usuarios!inner(email)), periodos_lectivos(*)')
      .eq('asignaturas.carrera_id', carrera.id)
      .order('codigo_seccion')
      .then(({ data, error: secError }) => {
        if (secError) throw secError
        setSecciones(data || [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingSecciones(false))
  }

  const handleInscribir = (seccionId) => {
    if (!estudianteId) return
    setInscribiendo(seccionId)
    supabase
      .from('inscripciones')
      .insert({ estudiante_id: estudianteId, seccion_id: seccionId })
      .then(({ error: insError }) => {
        if (insError) throw insError
        return supabase
          .from('inscripciones')
          .select('*, secciones(*, asignaturas(*, carreras(*)))')
          .eq('estudiante_id', estudianteId)
      })
      .then(({ data, error: insError }) => {
        if (insError) throw insError
        setInscripciones(data || [])
        setInscribiendo(null)
      })
      .catch((err) => {
        setError(err.message)
        setInscribiendo(null)
      })
  }

  const inscripcionesIds = inscripciones.map((i) => i.seccion_id)
  const inscripcionesCarrera = inscripciones.filter(
    (i) => i.secciones?.asignaturas?.carrera_id === carreraSeleccionada?.id
  )

  if (loading) return <p className="page-content">Cargando carreras...</p>

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

      {/* ── PASO 1: Seleccionar carrera ── */}
      {!carreraSeleccionada && (
        <>
          <section className="dashboard-section">
            <h3>Selecciona tu carrera</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
              Elige la carrera para ver las asignaturas disponibles
            </p>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {carreras.map((c) => (
              <div
                key={c.id}
                onClick={() => cargarSecciones(c)}
                onMouseEnter={() => setHoveredCard(c.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  ...cardStyle,
                  ...(hoveredCard === c.id ? cardHoverStyle : {}),
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📚</div>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{c.nombre}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{c.codigo}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── PASO 2: Secciones de la carrera seleccionada ── */}
      {carreraSeleccionada && (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <button
              onClick={() => { setCarreraSeleccionada(null); setSecciones([]) }}
              style={btnOutline}
            >
              ← Otra carrera
            </button>
            <h3 style={{ margin: 0 }}>
              {carreraSeleccionada.nombre}
            </h3>
          </div>

          {/* Mis inscripciones de esta carrera */}
          {inscripcionesCarrera.length > 0 && (
            <section className="dashboard-section">
              <h3>Mis inscripciones — {carreraSeleccionada.nombre}</h3>
              <p style={{ margin: '0 0 12px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                {inscripcionesCarrera.length} materia(s) inscrita(s)
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '10px 8px' }}>Materia</th>
                      <th style={{ padding: '10px 8px' }}>Seccion</th>
                      <th style={{ padding: '10px 8px' }}>Estado</th>
                      <th style={{ padding: '10px 8px' }}>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscripcionesCarrera.map((i) => (
                      <tr key={i.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 8px' }}>{i.secciones?.asignaturas?.nombre || '-'}</td>
                        <td style={{ padding: '10px 8px' }}>{i.secciones?.codigo_seccion || '-'}</td>
                        <td style={{ padding: '10px 8px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: i.estado_materia === 'aprobado' ? '#dcfce7' :
                                       i.estado_materia === 'reprobado' ? '#fee2e2' :
                                       i.estado_materia === 'retirado' ? '#fef3c7' : '#dbeafe',
                            color: i.estado_materia === 'aprobado' ? '#166534' :
                                   i.estado_materia === 'reprobado' ? '#991b1b' :
                                   i.estado_materia === 'retirado' ? '#92400e' : '#1e40af',
                          }}>
                            {i.estado_materia}
                          </span>
                        </td>
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

          {/* Secciones disponibles */}
          <section className="dashboard-section" style={{ marginTop: '16px' }}>
            <h3>Secciones disponibles</h3>
            {loadingSecciones ? (
              <p>Cargando secciones...</p>
            ) : secciones.length === 0 ? (
              <p>No hay secciones disponibles para esta carrera.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '10px 8px' }}>Materia</th>
                      <th style={{ padding: '10px 8px' }}>Seccion</th>
                      <th style={{ padding: '10px 8px' }}>Aula</th>
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
                          <td style={{ padding: '10px 8px' }}>{s.codigo_seccion || '-'}</td>
                          <td style={{ padding: '10px 8px' }}>{s.aula || '-'}</td>
                          <td style={{ padding: '10px 8px' }}>{s.periodos_lectivos?.codigo || '-'}</td>
                          <td style={{ padding: '10px 8px' }}>
                            {yaInscrito ? (
                              <span style={{ color: '#166534', fontWeight: 600, fontSize: '0.85rem' }}>Inscrito</span>
                            ) : (
                              <button
                                onClick={() => handleInscribir(s.id)}
                                disabled={inscribiendo === s.id}
                                style={{
                                  ...btnSolid,
                                  cursor: inscribiendo === s.id ? 'wait' : 'pointer',
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
        </>
      )}
    </div>
  )
}
