import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const StudentProfile = () => {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    nombre: user?.nombre || user?.name || 'Angel Colmenares',
    correo: user?.correo || user?.email || 'angelcolmenares.itsu@gmail.com',
    telefono: user?.telefono || user?.phone || '04241722416',
    institucion: 'Instituto Tecnológico Sitio Uno (ITSU)',
  })

  // --- MODO DESARROLLO: Bloque de seguridad comentado para ver el diseño ---
  /*
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.textError}>No hay una sesión activa en este momento.</p>
        </div>
      </div>
    )
  }
  */
  // ------------------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const avatarLetter = formData.nombre ? formData.nombre.charAt(0).toUpperCase() : 'U'

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Cabecera de Perfil */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            {avatarLetter}
          </div>
          <div style={styles.headerText}>
            <h2 style={styles.title}>Perfil del Estudiante</h2>
            <span style={styles.subtitle}>Información Académica y de Contacto</span>
          </div>
        </div>

        <div style={styles.divider} />

        {isEditing ? (
          /* Modo Edición */
          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Electrónico</label>
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Teléfono de Contacto</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} style={styles.input} placeholder="Ej. 04241722416" />
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancelar</button>
              <button type="submit" style={styles.saveButton}>Guardar Cambios</button>
            </div>
          </form>
        ) : (
          /* Modo Lectura de Datos */
          <div style={styles.infoContainer}>
            <div style={styles.infoGroup}>
              <span style={styles.label}>Estudiante</span>
              <p style={styles.value}>{formData.nombre}</p>
            </div>

            <div style={styles.infoGroup}>
              <span style={styles.label}>Correo Electrónico</span>
              <p style={styles.value}>{formData.correo}</p>
            </div>

            <div style={styles.infoGroup}>
              <span style={styles.label}>Teléfono</span>
              <p style={styles.value}>{formData.telefono}</p>
            </div>

            <div style={styles.infoGroup}>
              <span style={styles.label}>Institución Académica</span>
              <p style={styles.value}>{formData.institucion}</p>
            </div>

            <div style={styles.infoGroup}>
              <span style={styles.label}>Estado de Matrícula</span>
              <div style={{...styles.badge, backgroundColor: '#dcfce7', color: '#166534'}}>
                Inscrito (Activo)
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={() => setIsEditing(true)} style={styles.editButton}>Editar Perfil</button>
              <button onClick={logout} style={styles.logoutButton}>Cerrar Sesión</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// (El objeto styles sigue igual...)
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '32px', width: '100%', maxWidth: '440px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' },
  header: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  avatar: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#334155', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' },
  headerText: { display: 'flex', flexDirection: 'column' },
  title: { fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: '0' },
  subtitle: { fontSize: '12px', color: '#64748b', marginTop: '2px' },
  divider: { height: '1px', backgroundColor: '#e2e8f0', margin: '0 0 24px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', backgroundColor: '#ffffff' },
  infoContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  infoGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  value: { fontSize: '14px', color: '#334155', margin: '0', fontWeight: '500' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', display: 'inline-block', width: 'fit-content', marginTop: '4px' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
  editButton: { flex: 1, padding: '9px 16px', backgroundColor: '#475569', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' },
  logoutButton: { flex: 1, padding: '9px 16px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' },
  saveButton: { flex: 1, padding: '9px 16px', backgroundColor: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' },
  cancelButton: { flex: 1, padding: '9px 16px', backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' },
  textError: { color: '#dc2626', textAlign: 'center', margin: '0', fontWeight: '500', fontSize: '14px' },
}

export default StudentProfile