/**
 * RegisterPage.jsx — Página wrapper del formulario de registro.
 *
 * Estructura visual:
 * 1. Badge "Acceso" (eyebrow)
 * 2. Título "Registrarse"
 * 3. Descripción de ayuda
 * 4. RegisterForm (formulario multi-sección)
 * 5. Botón para cambiar a login
 *
 * @param {function} onSwitchToLogin - Callback para navegar a la vista de login
 */

import { RegisterForm } from './RegisterForm'

export function RegisterPage({ onSwitchToLogin }) {
  return (
    <div className="auth-page">
      {/* Encabezado con badge, título y descripción */}
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Registrarse</h2>
        <p className="auth-page__text">
          Crea tu cuenta con correo, contraseña y rol y luego verifica tu correo electrónico.
        </p>
      </header>

      {/* Formulario de registro (maneja su propio estado y envío) */}
      <RegisterForm />

      {/* Botón para alternar entre registro y login */}
      <button type="button" className="auth-switch" onClick={onSwitchToLogin}>
        Ir a iniciar sesión
      </button>
    </div>
  )
}
