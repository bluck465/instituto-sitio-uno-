import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { carrerasQueries } from '../../lib/queries/carreras'
import { asignaturasQueries } from '../../lib/queries/asignaturas'

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  fontSize: '0.9rem',
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

function agruparPorTrimestre(asignaturas) {
  const grupos = { '1er Trimestre': [], '2do Trimestre': [], '3er Trimestre': [], 'Otro': [] }
  asignaturas.forEach((a) => {
    const num = parseInt(a.codigo.split('-')[1]?.[0], 10)
    if (num === 1) grupos['1er Trimestre'].push(a)
    else if (num === 2) grupos['2do Trimestre'].push(a)
    else if (num === 3) grupos['3er Trimestre'].push(a)
    else grupos['Otro'].push(a)
  })
  return grupos
}

export function AcademicoPage() {
  const [searchParams] = useSearchParams()
  const carreraId = searchParams.get('carreraId')
  const [carrera, setCarrera] = useState(null)
  const [asignaturas, setAsignaturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ codigo: '', nombre: '', unidades_credito: '' })

  const cargar = () => {
    if (!carreraId) { setLoading(false); return }
    setLoading(true)
    Promise.all([
      carrerasQueries.getById(carreraId),
      asignaturasQueries.getByCarrera(carreraId),
    ])
      .then(([c, a]) => {
        setCarrera(c)
        setAsignaturas(a)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [carreraId])

  const handleCrear = async () => {
    if (!form.codigo.trim() || !form.nombre.trim()) return
    await asignaturasQueries.create({
      carrera_id: Number(carreraId),
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      unidades_credito: parseInt(form.unidades_credito, 10) || 4,
    })
    setForm({ codigo: '', nombre: '', unidades_credito: '' })
    setMostrarForm(false)
    cargar()
  }

  const handleEditar = async (id) => {
    if (!form.nombre.trim()) return
    await asignaturasQueries.update(id, {
      nombre: form.nombre.trim(),
      unidades_credito: parseInt(form.unidades_credito, 10) || 4,
    })
    setEditId(null)
    setForm({ codigo: '', nombre: '', unidades_credito: '' })
    cargar()
  }

  const handleBorrar = async (id) => {
    if (!confirm('¿Eliminar esta asignatura?')) return
    await asignaturasQueries.delete(id)
    cargar()
  }

  const iniciarEdicion = (a) => {
    setEditId(a.id)
    setForm({ codigo: a.codigo, nombre: a.nombre, unidades_credito: String(a.unidades_credito) })
  }

  const cancelar = () => {
    setEditId(null)
    setMostrarForm(false)
    setForm({ codigo: '', nombre: '', unidades_credito: '' })
  }

  if (!carreraId) return <div className="dashboard-home"><p className="page-content">Selecciona una carrera desde <Link to="/admin/carreras">Carreras</Link>.</p></div>
  if (loading) return <p className="page-content">Cargando asignaturas...</p>

  const grupos = agruparPorTrimestre(asignaturas)

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin/carreras" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={cargar} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      <section className="dashboard-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0 }}>Asignaturas — {carrera?.nombre || '...'}</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{asignaturas.length} materia(s)</p>
        </div>
        <button onClick={() => setMostrarForm(true)} style={btnSolid}>+ Crear</button>
      </section>

      {mostrarForm && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input placeholder="Código (ej: PROG-105)" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} style={{ ...inputStyle, flex: '1 1 150px' }} />
            <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} style={{ ...inputStyle, flex: '2 1 200px' }} />
            <input placeholder="UC" type="number" min="1" max="10" value={form.unidades_credito} onChange={(e) => setForm({ ...form, unidades_credito: e.target.value })} style={{ ...inputStyle, width: '60px', flex: 'none' }} />
            <button onClick={handleCrear} style={btnSolid}>Guardar</button>
            <button onClick={cancelar} style={btnOutline}>Cancelar</button>
          </div>
        </section>
      )}

      {Object.entries(grupos).map(([nombre, items]) => {
        if (items.length === 0) return null
        return (
          <section key={nombre} className="dashboard-section" style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{nombre}</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '10px 8px' }}>Código</th>
                    <th style={{ padding: '10px 8px' }}>Nombre</th>
                    <th style={{ padding: '10px 8px' }}>UC</th>
                    <th style={{ padding: '10px 8px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 600 }}>{a.codigo}</td>
                      <td style={{ padding: '10px 8px' }}>
                        {editId === a.id ? (
                          <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} style={{ ...inputStyle, width: '100%' }} />
                        ) : (
                          a.nombre
                        )}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        {editId === a.id ? (
                          <input type="number" min="1" max="10" value={form.unidades_credito} onChange={(e) => setForm({ ...form, unidades_credito: e.target.value })} style={{ ...inputStyle, width: '50px' }} />
                        ) : (
                          a.unidades_credito
                        )}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {editId === a.id ? (
                            <>
                              <button onClick={() => handleEditar(a.id)} style={btnSolid}>Guardar</button>
                              <button onClick={cancelar} style={btnOutline}>Cancelar</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => iniciarEdicion(a)} style={btnOutline}>Editar</button>
                              <button onClick={() => handleBorrar(a.id)} style={btnDanger}>Borrar</button>
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
        )
      })}
    </div>
  )
}
