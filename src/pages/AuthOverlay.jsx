/**
 * AuthOverlay.jsx — Modal overlay para login y registro.
 *
 * Renderiza la LandingPage de fondo y superpone un modal con el formulario
 * de autenticación (login o registro según la prop `mode`).
 *
 * Comportamiento:
 * - Click en el backdrop (área oscura) → navega a "/" (cierra el modal).
 * - Click en el botón × → navega a "/" (cierra el modal).
 * - Click dentro del modal → NO cierra (stopPropagation evita que el evento suba al backdrop).
 * - El prop `mode` ("login" | "register") controla qué formulario se muestra.
 */

import { useNavigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { LoginPage } from '../features/auth/components/LoginPage'
import { RegisterPage } from '../features/auth/components/RegisterPage'

export function AuthOverlay({ mode }) {
  const navigate = useNavigate()

  return (
    <>
      {/* Landing page visible detrás del overlay oscuro */}
      <LandingPage />

      {/* Backdrop oscuro: click aquí cierra el modal */}
      <div
        className="auth-backdrop"
        onClick={() => navigate('/')}
        role="presentation"
      >
        {/* Contenido del modal: stopPropagation evita que el click cierre el modal */}
        <div
          className="auth-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button
            className="auth-close"
            type="button"
            onClick={() => navigate('/')}
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Renderizar login o registro según el modo */}
          {mode === 'login' ? (
            <LoginPage onSwitchToRegister={() => navigate('/register')} />
          ) : (
            <RegisterPage onSwitchToLogin={() => navigate('/')} />
          )}
        </div>
      </div>
    </>
  )
}
