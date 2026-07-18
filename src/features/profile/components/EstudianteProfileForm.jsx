import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from '../../auth/components/FormError'

export function EstudianteProfileForm() {
  const navigate = useNavigate()
  const { saveProfile } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form)

      await saveProfile('estudiante', payload)
      navigate('/dashboard')
    } catch (err) {
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
        <span>Cedula de identidad *</span>
        <input type="text" name="cedula_identidad" placeholder="Tu cedula" required />
      </label>

      <label className="field">
        <span>Primer nombre *</span>
        <input type="text" name="primer_nombre" placeholder="Tu primer nombre" required />
      </label>

      <label className="field">
        <span>Primer apellido *</span>
        <input type="text" name="primer_apellido" placeholder="Tu primer apellido" required />
      </label>

      <label className="field">
        <span>Telefono</span>
        <input type="tel" name="telefono" placeholder="Tu telefono" />
      </label>

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar perfil'}
      </button>
    </form>
  )
}
