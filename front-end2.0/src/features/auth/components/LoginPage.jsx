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

export function LoginPage({ onSwitchToRegister }) {
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

      {/* Botón para alternar entre login y registro */}
      <button type="button" className="auth-switch" onClick={onSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}
