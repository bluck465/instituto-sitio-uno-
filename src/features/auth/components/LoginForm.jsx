/**
 * LoginForm.jsx — Formulario controlado de inicio de sesión.
 *
 * Maneja el ciclo completo de login:
 * 1. Captura email y password desde inputs controlados.
 * 2. Llama a login() del AuthContext que ejecuta POST /api/auth/login.
 * 3. Si es exitoso: navega a /dashboard.
 * 4. Si falla: muestra el error via FormError (parseado por errorHandler).
 *
 * Estados manejados:
 * - error: almacena el error del API para mostrar en FormError.
 * - loading: controla el estado del botón de envío.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { parseServerError } from '../../../services/errorHandler'
import { FormError } from './FormError'

export function LoginForm() {
  // login() del contexto: ejecuta la petición y guarda token/usuario en localStorage
  const { login } = useAuth()
  const navigate = useNavigate()

  // Estado del formulario: error del API y estado de carga
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  /**
   * handleSubmit() — Procesa el envío del formulario.
   * - Previene el reload por defecto del form.
   * - Extrae email y password del FormData.
   * - Llama a login() y navega al dashboard si es exitoso.
   * - Captura errores y los muestra en FormError.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const form = new FormData(e.target)
      await login(form.get('email'), form.get('password'))
      navigate('/dashboard')
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Banner de error: solo se muestra si hay un error activo */}
      <FormError error={error} />

      {/* Campo: correo electrónico */}
      <label className="field">
        <span>Correo institucional</span>
        <input type="email" name="email" placeholder="Email" autoComplete="email" required />
      </label>

      {/* Campo: contraseña */}
      <label className="field">
        <span>Contraseña</span>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </label>

      {/* Botón de envío: cambia texto y se deshabilita durante la carga */}
      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
