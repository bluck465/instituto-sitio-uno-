import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { seccionesQueries } from '../../lib/queries/secciones'
import { periodosQueries } from '../../lib/queries/periodos'
import { asignaturasQueries } from '../../lib/queries/asignaturas'
import { profesoresQueries } from '../../lib/queries/profesores'

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

export function SeccionesPage() {
  const [secciones, setSecciones] = useState([])
  const [periodos, setPeriodos] = useState([])
  const [asignaturas, setAsignaturas] = useState([])
  const [profesores, setProfesores] = useState([])
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('')
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ asignatura_id: '', periodo_id: '', profesor_id: '', codigo_seccion: '', aula: '', cupo_maximo: '30' })

  const cargar = () => {
    setLoading(true)
    Promise.all([
      periodosQueries.getAll(),
      asignaturasQueries.getAll(),
      profesoresQueries.getAll(),
    ])
      .then(([p, a, pr]) => {
        setPeriodos(p)
        setAsignaturas(a)
        setProfesores(pr)
        const activo = p.find((x) => x.activo)
        if (activo && !periodoSeleccionado) setPeriodoSeleccionado(String(activo.id))
      })
      .finally(() => setLoading(false))
  }

  const cargarSecciones = () => {
    if (!periodoSeleccionado) { setSecciones([]); return }
    seccionesQueries.getByPeriodo(Number(periodoSeleccionado)).then(setSecciones)
  }

  useEffect(() => { cargar() }, [])
  useEffect(() => { cargarSecciones() }, [periodoSeleccionado])

  const handleCrear = async () => {
    if (!form.asignatura_id || !form.periodo_id || !form.profesor_id || !form.codigo_seccion.trim()) return
    await seccionesQueries.create({
      asignatura_id: Number(form.asignatura_id),
      periodo_id: Number(form.periodo_id),
      profesor_id: form.profesor_id,
      codigo_seccion: form.codigo_seccion.trim(),
      aula: form.aula.trim() || null,
      cupo_maximo: parseInt(form.cupo_maximo, 10) || 30,
    })
    setForm({ asignatura_id: '', periodo_id: '', profesor_id: '', codigo_seccion: '', aula: '', cupo_maximo: '30' })
    setMostrarForm(false)
    cargarSecciones()
  }

  const handleEditar = async (id) => {
    await seccionesQueries.update(id, {
      aula: form.aula.trim() || null,
      cupo_maximo: parseInt(form.cupo_maximo, 10) || 30,
    })
    setEditId(null)
    setForm({ asignatura_id: '', periodo_id: '', profesor_id: '', codigo_seccion: '', aula: '', cupo_maximo: '30' })
    cargarSecciones()
  }

  const handleBorrar = async (id) => {
    if (!confirm('¿Eliminar esta sección?')) return
    await seccionesQueries.delete(id)
    cargarSecciones()
  }

  const iniciarEdicion = (s) => {
    setEditId(s.id)
    setForm({ ...form, aula: s.aula || '', cupo_maximo: String(s.cupo_maximo || 30) })
  }

  const cancelar = () => {
    setEditId(null)
    setMostrarForm(false)
    setForm({ asignatura_id: '', periodo_id: '', profesor_id: '', codigo_seccion: '', aula: '', cupo_maximo: '30' })
  }

  if (loading) return <p className="page-content">Cargando datos...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={() => { cargar(); cargarSecciones() }} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Periodo:</label>
          <select value={periodoSeleccionado} onChange={(e) => setPeriodoSeleccionado(e.target.value)} style={selectStyle}>
            <option value="">Todos</option>
            {periodos.map((p) => (
              <option key={p.id} value={p.id}>{p.codigo} {p.activo ? '(Activo)' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="dashboard-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0 }}>Secciones</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{secciones.length} sección(es)</p>
        </div>
        <button onClick={() => {
          setMostrarForm(true)
          setForm({ ...form, periodo_id: periodoSeleccionado })
        }} style={btnSolid}>+ Crear</button>
      </section>

      {mostrarForm && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select value={form.asignatura_id} onChange={(e) => setForm({ ...form, asignatura_id: e.target.value })} style={{ ...selectStyle, flex: '1 1 180px' }}>
              <option value="">Asignatura</option>
              {asignaturas.map((a) => (
                <option key={a.id} value={a.id}>{a.codigo} — {a.nombre}</option>
              ))}
            </select>
            <select value={form.profesor_id} onChange={(e) => setForm({ ...form, profesor_id: e.target.value })} style={{ ...selectStyle, flex: '1 1 180px' }}>
              <option value="">Profesor</option>
              {profesores.map((p) => (
                <option key={p.id} value={p.id}>{p.primer_nombre} {p.primer_apellido}</option>
              ))}
            </select>
            <input placeholder="Código sección" value={form.codigo_seccion} onChange={(e) => setForm({ ...form, codigo_seccion: e.target.value })} style={{ ...inputStyle, flex: '1 1 120px' }} />
            <input placeholder="Aula" value={form.aula} onChange={(e) => setForm({ ...form, aula: e.target.value })} style={{ ...inputStyle, flex: '1 1 80px' }} />
            <input placeholder="Cupo" type="number" min="1" value={form.cupo_maximo} onChange={(e) => setForm({ ...form, cupo_maximo: e.target.value })} style={{ ...inputStyle, width: '60px', flex: 'none' }} />
            <button onClick={handleCrear} style={btnSolid}>Guardar</button>
            <button onClick={cancelar} style={btnOutline}>Cancelar</button>
          </div>
        </section>
      )}

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 8px' }}>Sección</th>
                <th style={{ padding: '10px 8px' }}>Asignatura</th>
                <th style={{ padding: '10px 8px' }}>Profesor</th>
                <th style={{ padding: '10px 8px' }}>Aula</th>
                <th style={{ padding: '10px 8px' }}>Cupo</th>
                <th style={{ padding: '10px 8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {secciones.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '16px 8px', color: 'var(--muted)', textAlign: 'center' }}>No hay secciones para este periodo.</td></tr>
              ) : secciones.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>{s.codigo_seccion}</td>
                  <td style={{ padding: '10px 8px' }}>{s.asignaturas?.nombre || '-'}</td>
                  <td style={{ padding: '10px 8px' }}>{s.profesores?.primer_nombre || '-'} {s.profesores?.primer_apellido || ''}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === s.id ? (
                      <input value={form.aula} onChange={(e) => setForm({ ...form, aula: e.target.value })} style={{ ...inputStyle, width: '80px' }} />
                    ) : (
                      s.aula || '-'
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === s.id ? (
                      <input type="number" min="1" value={form.cupo_maximo} onChange={(e) => setForm({ ...form, cupo_maximo: e.target.value })} style={{ ...inputStyle, width: '50px' }} />
                    ) : (
                      s.cupo_maximo
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editId === s.id ? (
                        <>
                          <button onClick={() => handleEditar(s.id)} style={btnSolid}>Guardar</button>
                          <button onClick={cancelar} style={btnOutline}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => iniciarEdicion(s)} style={btnOutline}>Editar</button>
                          <button onClick={() => handleBorrar(s.id)} style={btnDanger}>Borrar</button>
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
