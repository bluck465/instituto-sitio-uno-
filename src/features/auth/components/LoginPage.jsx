import { LoginForm } from './LoginForm'

export function LoginPage({ onSwitchToRegister }) {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesion</h2>
        <p className="auth-page__text">Ingresa con tu correo para entrar al sistema.</p>
      </header>

      <LoginForm />

      <div className="auth-footer">
        <p className="toggle-text">
          ¿No tienes cuenta?{' '}
          <a href="#" className="toggle-link" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
            Regístrate
          </a>
        </p>
        <p className="terms-text">
          Al continuar, aceptas los{' '}
          <a href="/terms" className="legal-link">Términos de Servicio</a> y la{' '}
          <a href="/privacy" className="legal-link">Política de Privacidad</a>,{' '}
          y recibir correos periódicos con actualizaciones.
        </p>
      </div>
    </div>
  )
}
