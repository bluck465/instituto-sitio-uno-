import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { carrerasQueries } from '../../lib/queries/carreras'
import { asignaturasQueries } from '../../lib/queries/asignaturas'

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  fontSize: '0.9rem',
  flex: '1 1 150px',
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

export function CarrerasPage() {
  const navigate = useNavigate()
  const [carreras, setCarreras] = useState([])
  const [conteoAsignaturas, setConteoAsignaturas] = useState({})
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ codigo: '', nombre: '' })

  const cargar = () => {
    setLoading(true)
    Promise.all([
      carrerasQueries.getAll(),
      asignaturasQueries.getAll(),
    ])
      .then(([carrerasData, asignaturasData]) => {
        setCarreras(carrerasData)
        const conteo = {}
        asignaturasData.forEach((a) => {
          conteo[a.carrera_id] = (conteo[a.carrera_id] || 0) + 1
        })
        setConteoAsignaturas(conteo)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [])

  const handleCrear = async () => {
    if (!form.codigo.trim() || !form.nombre.trim()) return
    await carrerasQueries.create({ codigo: form.codigo.trim(), nombre: form.nombre.trim() })
    setForm({ codigo: '', nombre: '' })
    setMostrarForm(false)
    cargar()
  }

  const handleEditar = async (id) => {
    if (!form.nombre.trim()) return
    await carrerasQueries.update(id, { nombre: form.nombre.trim() })
    setEditId(null)
    setForm({ codigo: '', nombre: '' })
    cargar()
  }

  const handleBorrar = async (id) => {
    if (!confirm('¿Eliminar esta carrera y todas sus asignaturas?')) return
    await carrerasQueries.delete(id)
    cargar()
  }

  const iniciarEdicion = (carrera) => {
    setEditId(carrera.id)
    setForm({ codigo: carrera.codigo, nombre: carrera.nombre })
  }

  const cancelar = () => {
    setEditId(null)
    setMostrarForm(false)
    setForm({ codigo: '', nombre: '' })
  }

  if (loading && carreras.length === 0) return <p className="page-content">Cargando carreras...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={cargar} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      <section className="dashboard-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0 }}>Carreras del Instituto</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{carreras.length} carrera(s) registrada(s)</p>
        </div>
        <button onClick={() => setMostrarForm(true)} style={btnSolid}>+ Crear</button>
      </section>

      {mostrarForm && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input placeholder="Código" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} style={inputStyle} />
            <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} style={{ ...inputStyle, flex: '2 1 200px' }} />
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
                <th style={{ padding: '10px 8px' }}>Código</th>
                <th style={{ padding: '10px 8px' }}>Nombre</th>
                <th style={{ padding: '10px 8px' }}>Asignaturas</th>
                <th style={{ padding: '10px 8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>{c.codigo}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === c.id ? (
                      <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} style={{ ...inputStyle, width: '100%' }} />
                    ) : (
                      c.nombre
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <button onClick={() => navigate(`/admin/academico?carreraId=${c.id}`)} style={{ ...btnOutline, color: 'var(--accent)', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>
                      {conteoAsignaturas[c.id] || 0}
                    </button>
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editId === c.id ? (
                        <>
                          <button onClick={() => handleEditar(c.id)} style={btnSolid}>Guardar</button>
                          <button onClick={cancelar} style={btnOutline}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => iniciarEdicion(c)} style={btnOutline}>Editar</button>
                          <button onClick={() => handleBorrar(c.id)} style={btnDanger}>Borrar</button>
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
