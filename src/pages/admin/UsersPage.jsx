import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../features/admin/services/adminService'

const ROLES = ['estudiante', 'profesor', 'administrador']

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)
  const [newRole, setNewRole] = useState('')

  const loadUsers = () => {
    setLoading(true)
    adminService.getUsers()
      .then(setUsers)
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadUsers() }, [])

  const handleSaveRole = async (userId) => {
    await adminService.updateUserRole(userId, newRole)
    setEditId(null)
    loadUsers()
  }

  const handleToggleActive = async (user, active) => {
    await adminService.toggleUserActive(user.id, active)
    loadUsers()
  }

  if (loading && users.length === 0) return <p className="page-content">Cargando usuarios...</p>

  return (
    <div className="dashboard-home">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/admin" className="header-action outline" style={{ textDecoration: 'none', border: '1px solid var(--border)', color: 'var(--text)', background: 'white', display: 'inline-flex' }}>
          ← Volver
        </Link>
        <button onClick={loadUsers} className="header-action outline" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'white', cursor: 'pointer' }}>
          ↻ Refrescar
        </button>
      </div>

      <section className="dashboard-section">
        <h3>Gestión de usuarios</h3>
        <p>{users.length} usuario(s) registrados</p>
      </section>

      <section className="dashboard-section" style={{ marginTop: '16px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 8px' }}>Email</th>
                <th style={{ padding: '10px 8px' }}>Rol</th>
                <th style={{ padding: '10px 8px' }}>Estado</th>
                <th style={{ padding: '10px 8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 8px' }}>{u.email}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {editId === u.id ? (
                      <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    ) : (
                      <span className={`matricula-badge matricula--${u.rol === 'administrador' ? 'egresado' : u.rol === 'profesor' ? 'activo' : 'suspendido'}`} style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
                        {u.rol}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ color: u.activo ? '#166534' : '#991b1b', fontWeight: 600 }}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editId === u.id ? (
                        <>
                          <button onClick={() => handleSaveRole(u.id)} style={{ padding: '4px 12px', borderRadius: '8px', border: 0, background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                            Guardar
                          </button>
                          <button onClick={() => setEditId(null)} style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer' }}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { setEditId(u.id); setNewRole(u.rol) }} style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer' }}>
                          Cambiar rol
                        </button>
                      )}
                      <button onClick={() => handleToggleActive(u, !u.activo)} style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', color: u.activo ? '#991b1b' : '#166534' }}>
                        {u.activo ? 'Desactivar' : 'Activar'}
                      </button>
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
