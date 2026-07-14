/**
 * LoginPage.jsx — Página wrapper del formulario de inicio de sesión.
 *
 * Estructura visual:
 * 1. Badge "Acceso" (eyebrow)
 * 2. Título "Iniciar sesión"
 * 3. Descripción de ayuda
 * 4. LoginForm (formulario controlado)
 * 5. Botón de acceso rápido al dashboard
 * 6. Botón para cambiar a registro
 */

import { LoginForm } from './LoginForm'
import { useNavigate } from 'react-router-dom'

export function LoginPage({ onSwitchToRegister }) {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-page__text">Ingresa con tu correo institucional para entrar al sistema.</p>
      </header>

      <LoginForm />

      <button
        type="button"
        className="auth-action"
        onClick={() => navigate('/dashboard')}
      >
        Acceso Rápido Estudiante
      </button>

      <button type="button" className="auth-switch" onClick={onSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}
