import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from './FormError'
import { storage } from '../../../services/storage'

export function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const form = new FormData(e.target)
    const payload = Object.fromEntries(form)
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

        <label className="field">
          <span>Contrasena</span>
          <input type="password" name="password" placeholder="Crear contrasena" autoComplete="new-password" required />
        </label>

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
