import React from 'react'
import StudentProfile from '../components/StudentProfile'

export function EstudianteProfilePage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Llamada directa al componente StudentProfile */}
      <StudentProfile />
    </div>
  )
}