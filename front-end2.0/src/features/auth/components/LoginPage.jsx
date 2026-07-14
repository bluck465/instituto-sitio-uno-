/**
 * LoginPage.jsx — Página wrapper del formulario de inicio de sesión.
 *
 * Estructura visual:
 * 1. Badge "Acceso" (eyebrow)
 * 2. Título "Iniciar sesión"
 * 3. Descripción de ayuda
 * 4. LoginForm (formulario controlado)
 * 5. Botón para cambiar a registro
 *
 * @param {function} onSwitchToRegister - Callback para navegar a la vista de registro
 */

import { LoginForm } from './LoginForm'
import { useNavigate } from 'react-router-dom' // Importamos la navegación interna

export function LoginPage({ onSwitchToRegister }) {
  const navigate = useNavigate() // Activamos el navegador

  return (
    <div className="auth-page">
      {/* Encabezado con badge, título y descripción */}
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-page__text">Ingresa con tu correo institucional para entrar al sistema.</p>
      </header>

      {/* Formulario de login (maneja su propio estado y envío) */}
      <LoginForm />

<<<<<<< HEAD
      {/* Botón para alternar entre login y registro */}
=======
      {/* --- BOTÓN DE ACCESO RÁPIDO PROFESIONAL --- */}
      <button 
        type="button" 
        onClick={() => navigate('/dashboard')}
        style={{
          backgroundColor: '#1e40af', // El azul elegante de tu proyecto
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '1rem',
          marginTop: '15px',
          cursor: 'pointer',
          width: '100%',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} // Efecto al pasar el mouse
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
      >
        Acceso Rápido Estudiante
      </button>
      {/* ------------------------------------------- */}

>>>>>>> fe3f9489ed3e36cd9c19b4e6d43864b06a7235d1
      <button type="button" className="auth-switch" onClick={onSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}
