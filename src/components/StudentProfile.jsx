import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const StudentProfile = () => {
  const { user, logout } = useAuth()

  // Si no hay usuario en el contexto (no ha iniciado sesión o expiró el token)
  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.text}>No hay una sesión activa en este momento.</p>
      </div>
    )
  }

  // Renderizado del perfil con los datos provenientes de tu API
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Perfil Académico</h2>
        
        <div style={styles.infoGroup}>
          <p style={styles.label}>Estudiante</p>
          {/* Se usan operadores lógicos por si tu API devuelve 'name' en lugar de 'nombre' */}
          <p style={styles.value}>{user.nombre || user.name || 'Dato no disponible'}</p>
        </div>
        
        <div style={styles.infoGroup}>
          <p style={styles.label}>Correo Electrónico</p>
          <p style={styles.value}>{user.correo || user.email || 'Dato no disponible'}</p>
        </div>
        
        {/* Puedes agregar más campos aquí dependiendo de qué datos te envíe la API de backend en el objeto 'user' */}

        <button style={styles.button} onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '32px',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  header: {
    fontSize: '20px',
    color: '#111827',
    marginBottom: '24px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '12px',
    fontWeight: '600'
  },
  infoGroup: {
    marginBottom: '16px'
  },
  label: {
    fontSize: '12px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '4px'
  },
  value: {
    fontSize: '15px',
    color: '#374151',
    margin: '0'
  },
  button: {
    marginTop: '24px',
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#374151',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  text: {
    color: '#374151',
    fontSize: '15px'
  }
}

export default StudentProfile