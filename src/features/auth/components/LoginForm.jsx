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

      <label className="field">
        <span>Contrasena</span>
        <input
          type="password"
          name="password"
          placeholder="Contrasena"
          autoComplete="current-password"
          required
        />
      </label>

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Iniciar sesion'}
      </button>
    </form>
  )
}
