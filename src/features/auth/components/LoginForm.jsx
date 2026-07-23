import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from './FormError'
import { supabase } from '../../../lib/supabaseClient'
import { storage } from '../../../services/storage'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.target)

    try {
      const response = await login(form.get('email'), form.get('password'))

      const rol = response.user?.rol || 'estudiante'
      if (rol === 'profesor') {
        navigate('/teacher')
      } else if (rol === 'administrador') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.message?.includes('Email not confirmed')) {
        const email = form.get('email')
        storage.set('pendingVerificationEmail', email)

        const { data } = await supabase
          .from('usuarios')
          .select('rol')
          .eq('email', email)
          .maybeSingle()

        const rol = data?.rol || 'estudiante'
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <FormError error={error} />

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
            placeholder="Contraseña"
            autoComplete="current-password"
            required
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

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Iniciar sesion'}
      </button>
    </form>
  )
}
