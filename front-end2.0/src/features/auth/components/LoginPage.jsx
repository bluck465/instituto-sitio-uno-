import { LoginForm } from './LoginForm'
import { useNavigate } from 'react-router-dom' // Importamos la navegación interna

export function LoginPage({ onSwitchToRegister }) {
  const navigate = useNavigate() // Activamos el navegador

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-page__text">Ingresa con tu correo institucional para entrar al sistema.</p>
      </header>

      <LoginForm />

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

      <button type="button" className="auth-switch" onClick={onSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}