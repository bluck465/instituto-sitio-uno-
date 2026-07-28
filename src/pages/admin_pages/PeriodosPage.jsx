import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { periodosQueries } from '../../lib/queries/periodos'

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

export function PeriodosPage() {
  const [periodos, setPeriodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ codigo: '', fecha_inicio: '', fecha_fin: '' })

  const cargar = () => {
    setLoading(true)
    periodosQueries.getAll()
      .then(setPeriodos)
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [])

  const handleCrear = async () => {
    if (!form.codigo.trim() || !form.fecha_inicio || !form.fecha_fin) return
    await periodosQueries.create({
      codigo: form.codigo.trim(),
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
    })
    setForm({ codigo: '', fecha_inicio: '', fecha_fin: '' })
    setMostrarForm(false)
    cargar()
  }

  const handleActivar = async (id) => {
    await periodosQueries.activate(id)
    cargar()
  }

  const cancelar = () => {
    setMostrarForm(false)
    setForm({ codigo: '', fecha_inicio: '', fecha_fin: '' })
  }

  if (loading && periodos.length === 0) return <p className="page-content">Cargando periodos...</p>

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
          <h3 style={{ margin: 0 }}>Periodos Académicos</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{periodos.length} periodo(s)</p>
        </div>
        <button onClick={() => setMostrarForm(true)} style={btnSolid}>+ Crear</button>
      </section>

      {mostrarForm && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input placeholder="Código (ej: 2026-I)" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} style={{ ...inputStyle, flex: '1 1 120px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: '1 1 150px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Fecha inicio</label>
              <input type="date" value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: '1 1 150px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Fecha fin</label>
              <input type="date" value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })} style={inputStyle} />
            </div>
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
                <th style={{ padding: '10px 8px' }}>Inicio</th>
                <th style={{ padding: '10px 8px' }}>Fin</th>
                <th style={{ padding: '10px 8px' }}>Estado</th>
                <th style={{ padding: '10px 8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {periodos.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>{p.codigo}</td>
                  <td style={{ padding: '10px 8px' }}>{new Date(p.fecha_inicio).toLocaleDateString('es-VE')}</td>
                  <td style={{ padding: '10px 8px' }}>{new Date(p.fecha_fin).toLocaleDateString('es-VE')}</td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontWeight: 600,
                      background: p.activo ? '#dcfce7' : '#f3f4f6',
                      color: p.activo ? '#166534' : '#6b7280',
                    }}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    {!p.activo && (
                      <button onClick={() => handleActivar(p.id)} style={{ ...btnSolid, fontSize: '0.8rem' }}>
                        Activar
                      </button>
                    )}
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
