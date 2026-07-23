import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from '../../auth/components/FormError'
import { PhoneField } from '../../../shared/components/PhoneField'
import './EditProfileForm.css'

export function EditProfileForm() {
  const navigate = useNavigate()
  const { user, saveProfile, getProfile } = useAuth()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!user?.rol) return
    getProfile(user.rol)
      .then((data) => setProfile(data))
      .catch((err) => {
        const parsed = parseServerError(err)
        setError(parsed.friendly || err.message)
      })
      .finally(() => setLoading(false))
  }, [user?.rol, getProfile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)

    try {
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form)

      await saveProfile(user.rol, payload)
      setSuccess('Perfil actualizado correctamente')
    } catch (err) {
      const parsed = parseServerError(err)
      setError(parsed.friendly || err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="edit-profile__loading">Cargando perfil...</p>
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <FormError error={error} />

      {success && <p className="auth-success">{success}</p>}

      <label className="field">
        <span>Cedula de identidad</span>
        <input
          type="text"
          name="cedula_identidad"
          placeholder="Tu cedula"
          defaultValue={profile?.cedula_identidad || ''}
        />
      </label>

      <div className="auth-grid">
        <label className="field">
          <span>Primer nombre *</span>
          <input
            type="text"
            name="primer_nombre"
            placeholder="Primer nombre"
            defaultValue={profile?.primer_nombre || ''}
            required
          />
        </label>

        <label className="field">
          <span>Segundo nombre</span>
          <input
            type="text"
            name="segundo_nombre"
            placeholder="Segundo nombre"
            defaultValue={profile?.segundo_nombre || ''}
          />
        </label>

        <label className="field">
          <span>Primer apellido *</span>
          <input
            type="text"
            name="primer_apellido"
            placeholder="Primer apellido"
            defaultValue={profile?.primer_apellido || ''}
            required
          />
        </label>

        <label className="field">
          <span>Segundo apellido</span>
          <input
            type="text"
            name="segundo_apellido"
            placeholder="Segundo apellido"
            defaultValue={profile?.segundo_apellido || ''}
          />
        </label>
      </div>

      <PhoneField
        name="telefono"
        defaultCountry="+58"
        defaultValue={profile?.telefono || ''}
      />

      <div className="edit-profile__actions">
        <button
          className="auth-button"
          type="submit"
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
        <button
          className="edit-profile__cancel"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
