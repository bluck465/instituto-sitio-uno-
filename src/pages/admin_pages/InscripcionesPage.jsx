import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { inscripcionesQueries } from '../../lib/queries/inscripciones'
import { periodosQueries } from '../../lib/queries/periodos'
import { seccionesQueries } from '../../lib/queries/secciones'
import { estudiantesQueries } from '../../lib/queries/estudiantes'

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  fontSize: '0.9rem',
}

const selectStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  fontSize: '0.9rem',
  background: '#fff',
}

const btnSolid = {
  padding: '4px 12px',
  borderRadius: '8px',
  border: 0,
  background: 'var(--accent)',
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

const btnDanger = {
  ...btnOutline,
  color: '#991b1b',
}

const ESTADOS = ['cursando', 'aprobado', 'reprobado', 'retirado']

export function InscripcionesPage() {
  const [inscripciones, setInscripciones] = useState([])
  const [periodos, setPeriodos] = useState([])
  const [secciones, setSecciones] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [periodoId, setPeriodoId] = useState('')
  const [seccionId, setSeccionId] = useState('')
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ estudiante_id: '', nota_final: '', inasistencias: '', estado_materia: 'cursando' })

  const cargarPeriodos = () => {
    setLoading(true)
    periodosQueries.getAll()
      .then((p) => {
        setPeriodos(p)
        const activo = p.find((x) => x.activo)
        if (activo) setPeriodoId(String(activo.id))
      })
      .finally(() => setLoading(false))
  }

  const cargarSecciones = () => {
    if (!periodoId) { setSecciones([]); setSeccionId(''); return }
    seccionesQueries.getByPeriodo(Number(periodoId)).then(setSecciones)
  }

  const cargarInscripciones = () => {
    if (!seccionId) { setInscripciones([]); return }
    inscripcionesQueries.getBySeccion(seccionId).then(setInscripciones)
  }

  const cargarEstudiantes = () => {
    estudiantesQueries.getAll().then(setEstudiantes)
  }

  useEffect(() => { cargarPeriodos(); cargarEstudiantes() }, [])
  useEffect(() => { cargarSecciones() }, [periodoId])
  useEffect(() => { cargarInscripciones() }, [seccionId])

  const handleInscribir = async () => {
    if (!form.estudiante_id || !seccionId) return
    await inscripcionesQueries.create({
      estudiante_id: form.estudiante_id,
      seccion_id: seccionId,
    })
    setForm({ estudiante_id: '', nota_final: '', inasistencias: '', estado_materia: 'cursando' })
    setMostrarForm(false)
    cargarInscripciones()
  }

  const handleEditar = async (id) => {
    const updates = {}
    if (form.nota_final !== '') updates.nota_final = parseFloat(form.nota_final)
    if (form.inasistencias !== '') updates.inasistencias = parseInt(form.inasistencias, 10)
    if (form.estado_materia) updates.estado_materia = form.estado_materia
    await inscripcionesQueries.update(id, updates)
    setEditId(null)
    setForm({ estudiante_id: '', nota_final: '', inasistencias: '', estado_materia: 'cursando' })
    cargarInscripciones()
  }

  const handleBorrar = async (id) => {
    if (!confirm('¿Eliminar esta inscripción?')) return
    await inscripcionesQueries.delete(id)
    cargarInscripciones()
  }

  const iniciarEdicion = (insc) => {
    setEditId(insc.id)
    setForm({
      estudiante_id: '',
      nota_final: insc.nota_final != null ? String(insc.nota_final) : '',
      inasistencias: String(insc.inasistencias || 0),
      estado_materia: insc.estado_materia || 'cursando',
    })
  }

  const cancelar = () => {
    setEditId(null)
    setMostrarForm(false)
    setForm({ estudiante_id: '', nota_final: '', inasistencias: '', estado_materia: 'cursando' })
  }

  const seccionActual = secciones.find((s) => s.id === seccionId)

  if (loading) return <p className="page-content">Cargando datos...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={() => { cargarInscripciones() }} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={periodoId} onChange={(e) => { setPeriodoId(e.target.value); setSeccionId('') }} style={selectStyle}>
            <option value="">Periodo</option>
            {periodos.map((p) => (
              <option key={p.id} value={p.id}>{p.codigo} {p.activo ? '(Activo)' : ''}</option>
            ))}
          </select>
          <select value={seccionId} onChange={(e) => setSeccionId(e.target.value)} style={selectStyle}>
            <option value="">Sección</option>
            {secciones.map((s) => (
              <option key={s.id} value={s.id}>{s.codigo_seccion} — {s.asignaturas?.nombre || '?'}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="dashboard-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0 }}>
            Inscripciones{seccionActual ? ` — ${seccionActual.asignaturas?.nombre || ''} (${seccionActual.codigo_seccion})` : ''}
          </h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{inscripciones.length} estudiante(s) inscrito(s)</p>
        </div>
        {seccionId && (
          <button onClick={() => setMostrarForm(true)} style={btnSolid}>+ Inscribir</button>
        )}
      </section>

      {mostrarForm && seccionId && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select value={form.estudiante_id} onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })} style={{ ...selectStyle, flex: '2 1 250px' }}>
              <option value="">Seleccionar estudiante</option>
              {estudiantes.map((e) => (
                <option key={e.id} value={e.id}>{e.primer_nombre} {e.primer_apellido} — {e.cedula_identidad}</option>
              ))}
            </select>
            <button onClick={handleInscribir} style={btnSolid}>Inscribir</button>
            <button onClick={cancelar} style={btnOutline}>Cancelar</button>
          </div>
        </section>
      )}

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 8px' }}>Estudiante</th>
                <th style={{ padding: '10px 8px' }}>Cédula</th>
                <th style={{ padding: '10px 8px' }}>Nota</th>
                <th style={{ padding: '10px 8px' }}>Faltas</th>
                <th style={{ padding: '10px 8px' }}>Estado</th>
                <th style={{ padding: '10px 8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '16px 8px', color: 'var(--muted)', textAlign: 'center' }}>
                  {seccionId ? 'No hay inscripciones en esta sección.' : 'Selecciona un periodo y sección.'}
                </td></tr>
              ) : inscripciones.map((i) => (
                <tr key={i.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px' }}>{i.estudiantes?.primer_nombre || '-'} {i.estudiantes?.primer_apellido || ''}</td>
                  <td style={{ padding: '10px 8px' }}>{i.estudiantes?.cedula_identidad || '-'}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === i.id ? (
                      <input type="number" min="0" max="20" step="0.5" value={form.nota_final} onChange={(e) => setForm({ ...form, nota_final: e.target.value })} style={{ ...inputStyle, width: '60px' }} placeholder="--" />
                    ) : (
                      i.nota_final != null ? i.nota_final : '-'
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === i.id ? (
                      <input type="number" min="0" value={form.inasistencias} onChange={(e) => setForm({ ...form, inasistencias: e.target.value })} style={{ ...inputStyle, width: '50px' }} />
                    ) : (
                      i.inasistencias || 0
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === i.id ? (
                      <select value={form.estado_materia} onChange={(e) => setForm({ ...form, estado_materia: e.target.value })} style={{ ...selectStyle, fontSize: '0.8rem', padding: '4px 8px' }}>
                        {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                      </select>
                    ) : (
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontWeight: 600,
                        background: i.estado_materia === 'aprobado' ? '#dcfce7' : i.estado_materia === 'reprobado' ? '#fef2f2' : i.estado_materia === 'retirado' ? '#dbeafe' : '#f3f4f6',
                        color: i.estado_materia === 'aprobado' ? '#166534' : i.estado_materia === 'reprobado' ? '#991b1b' : i.estado_materia === 'retirado' ? '#1e40af' : '#6b7280',
                      }}>
                        {i.estado_materia || 'cursando'}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editId === i.id ? (
                        <>
                          <button onClick={() => handleEditar(i.id)} style={btnSolid}>Guardar</button>
                          <button onClick={cancelar} style={btnOutline}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => iniciarEdicion(i)} style={btnOutline}>Editar</button>
                          <button onClick={() => handleBorrar(i.id)} style={btnDanger}>Borrar</button>
                        </>
                      )}
                    </div>
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
