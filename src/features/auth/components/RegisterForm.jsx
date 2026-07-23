import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from './FormError'
import { storage } from '../../../services/storage'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validatePassword(pw) {
  const errors = []
  if (pw.length < 6) errors.push('Mínimo 6 caracteres')
  if (!/[A-Z]/.test(pw)) errors.push('Al menos 1 letra mayúscula')
  if (!/[0-9]/.test(pw)) errors.push('Al menos 1 número')
  return errors
}

export function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const pwChecks = [
    { label: 'Mínimo 6 caracteres', ok: password.length >= 6 },
    { label: 'Al menos 1 letra mayúscula', ok: /[A-Z]/.test(password) },
    { label: 'Al menos 1 número', ok: /[0-9]/.test(password) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const form = new FormData(e.target)
    const email = form.get('email')?.trim()
    const pw = form.get('password')

    if (!EMAIL_REGEX.test(email)) {
      setError('El correo electrónico no es válido. Verifícalo.')
      setLoading(false)
      return
    }

    const pwErrors = validatePassword(pw)
    if (pwErrors.length > 0) {
      setError('La contraseña no es segura: ' + pwErrors.join(', '))
      setLoading(false)
      return
    }

    const payload = Object.fromEntries(form)
    payload.email = email
    payload.activo = form.get('activo') === 'on'

    try {
      const response = await register(payload)

      const rol = response.user.rol || 'estudiante'
      const rolLabel = rol === 'profesor' ? 'Profesor'
        : rol === 'administrador' ? 'Administrador'
        : 'Estudiante'

      setSuccess(`Cuenta creada como ${rolLabel}. Redirigiendo...`)

      setTimeout(() => {
        if (rol === 'profesor') {
          navigate('/profile/docente')
        } else if (rol === 'administrador') {
          navigate('/profile/administrador')
        } else {
          navigate('/profile/estudiante')
        }
      }, 1500)
    } catch (err) {
      if (err.message?.includes('Email not confirmed')) {
        storage.set('pendingVerificationEmail', payload.email)

        const rol = payload.rol || 'estudiante'
        if (rol === 'profesor') navigate('/profile/docente')
        else if (rol === 'administrador') navigate('/profile/administrador')
        else navigate('/profile/estudiante')
        return
      }

      const parsed = parseServerError(err)
      setError(parsed.friendly || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
      <FormError error={error} />
      {success && <div className="auth-success">{success}</div>}

      <section className="auth-group">
        <h3>Crear cuenta</h3>

        <label className="field">
          <span>Correo</span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
        </label>

        <label className="field field--password">
          <span>Contraseña</span>
          <div className="password-input-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Crear contraseña"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </label>

        {touched && password.length > 0 && (
          <ul className="password-requirements">
            {pwChecks.map((c) => (
              <li key={c.label} className={c.ok ? 'pw-ok' : 'pw-fail'}>
                {c.ok ? '✅' : '⭕'} {c.label}
              </li>
            ))}
          </ul>
        )}

        <label className="field">
          <span>Rol</span>
          <select name="rol" defaultValue="estudiante">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>

        <label className="checkbox-field">
          <input type="checkbox" name="activo" defaultChecked />
          <span>Cuenta activa</span>
        </label>
      </section>

      <button className="auth-button" type="submit" disabled={loading || !!success}>
        {loading ? 'Registrando...' : success ? 'Redirigiendo...' : 'Registrarse'}
      </button>
    </form>
  )
}
