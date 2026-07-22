import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from '../../auth/components/FormError'
import { PhoneField } from '../../../shared/components/PhoneField'

export function EstudianteProfileForm() {
  // ── Hook para redirigir tras guardar ──
  const navigate = useNavigate()
  // ── Funciones de auth: saveProfile guarda los datos en Supabase ──
  const { saveProfile } = useAuth()
  // ── Estado del error (string) para mostrar en pantalla ──
  const [error, setError] = useState(null)
  // ── Estado de carga (boolean) para deshabilitar el botón ──
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // ── Toma todos los campos del formulario ──
      const form = new FormData(e.target)
      // ── Convierte FormData a objeto plano { name: value } ──
      const payload = Object.fromEntries(form)

      // ── Guarda en la tabla 'estudiantes' de Supabase ──
      await saveProfile('estudiante', payload)
      // ── Redirige al dashboard del estudiante ──
      navigate('/dashboard')
    } catch (err) {
      // ── Parsea el error del servidor a un mensaje legible ──
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

      {/* ── Grid de 2 columnas para nombres y apellidos ── */}
      <div className="auth-grid">
        <label className="field">
          <span>Primer nombre *</span>
          <input type="text" name="primer_nombre" placeholder="Primer nombre" required />
        </label>

        <label className="field">
          <span>Segundo nombre</span>
          <input type="text" name="segundo_nombre" placeholder="Segundo nombre" />
        </label>

        <label className="field">
          <span>Primer apellido *</span>
          <input type="text" name="primer_apellido" placeholder="Primer apellido" required />
        </label>

        <label className="field">
          <span>Segundo apellido</span>
          <input type="text" name="segundo_apellido" placeholder="Segundo apellido" />
        </label>
      </div>

      <PhoneField name="telefono" defaultCountry="+58" />

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar perfil'}
      </button>
    </form>
  )
}
