import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export function MisPagosPage() {
  const { user } = useAuth()
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.id) return
    supabase
      .from('pagos')
      .select('*')
      .eq('usuario_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          if (err.code === '42P01') {
            setPagos([])
          } else {
            setError(err.message)
          }
        } else {
          setPagos(data || [])
        }
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p className="page-content">Cargando pagos...</p>

  const totalPagado = pagos
    .filter((p) => p.estado === 'pagado')
    .reduce((sum, p) => sum + (p.monto || 0), 0)

  const totalPendiente = pagos
    .filter((p) => p.estado === 'pendiente')
    .reduce((sum, p) => sum + (p.monto || 0), 0)

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

      <section className="dashboard-section">
        <h3>Mis pagos</h3>
        <p>{pagos.length} pago(s) registrado(s)</p>
      </section>

      {error && (
        <section className="dashboard-section">
          <p className="auth-error">{error}</p>
        </section>
      )}

      {pagos.length > 0 && (
        <section className="dashboard-section" style={{ marginTop: '16px' }}>
          <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div className="summary-card" style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Total pagado</p>
              <p style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 700, color: '#166534' }}>
                ${totalPagado.toLocaleString('es-VE')}
              </p>
            </div>
            <div className="summary-card" style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Pendiente</p>
              <p style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 700, color: totalPendiente > 0 ? '#991b1b' : '#166534' }}>
                ${totalPendiente.toLocaleString('es-VE')}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        {pagos.length === 0 ? (
          <p>No tienes pagos registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '10px 8px' }}>Concepto</th>
                  <th style={{ padding: '10px 8px' }}>Monto</th>
                  <th style={{ padding: '10px 8px' }}>Fecha</th>
                  <th style={{ padding: '10px 8px' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 8px' }}>{p.concepto || '-'}</td>
                    <td style={{ padding: '10px 8px' }}>${(p.monto || 0).toLocaleString('es-VE')}</td>
                    <td style={{ padding: '10px 8px' }}>{p.fecha ? new Date(p.fecha).toLocaleDateString('es-VE') : '-'}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span className={`matricula-badge matricula--${p.estado === 'pagado' ? 'activo' : 'suspendido'}`}
                        style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
                        {p.estado || 'pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
