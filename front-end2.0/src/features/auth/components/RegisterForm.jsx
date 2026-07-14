/**
 * RegisterForm.jsx — Formulario multi-sección de registro de estudiante.
 *
 * Estructura del formulario:
 * 1. Sección "Cuenta de usuario": email, password, rol, checkbox de activo.
 * 2. Sección "Datos del estudiante": cédula, nombres, apellidos, teléfono.
 *
 * Flujo de envío:
 * 1. Recolecta todos los campos del FormData en un objeto plano.
 * 2. Envía POST /api/auth/register con el payload.
 * 3. Si es exitoso y retorna token: auto-login y navegar a /dashboard.
 * 4. Si falla con 422: mostrar errores por campo inline junto a cada input.
 * 5. Si falla con otro código: mostrar error general en FormError.
 *
 * Estados manejados:
 * - error: error general del API para FormError.
 * - fieldErrors: errores por campo para mostrar inline.
 * - success: mensaje de éxito post-registro.
 * - loading: controla el estado del botón de envío.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { registerStudent } from '../services/authService'
import { parseServerError, formatFieldErrors } from '../../../services/errorHandler'
import { FormError } from './FormError'

export function RegisterForm() {
  const navigate = useNavigate()
  // login() se usa para auto-login después del registro exitoso
  const { login } = useAuth()

  // Estados del formulario
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  /**
   * handleSubmit() — Procesa el envío del formulario de registro.
   * - Recolecta todos los campos en un objeto plano desde FormData.
   * - Llama al endpoint de registro.
   * - Si retorna token: auto-login y redirigir al dashboard.
   * - Si falla: parsear errores y mostrarlos (generales o por campo).
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setSuccess('')
    setLoading(true)

    try {
      // Convertir FormData a objeto plano { email: "...", password: "...", ... }
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form)
      const response = await registerStudent(payload)

      // Registro exitoso: mostrar mensaje y auto-login
      setSuccess('¡Registro exitoso! Redirigiendo al dashboard…')

      // Si el API retornó token, hacer login automático
      if (response.token) {
        await login(form.get('email'), form.get('password'))
      }

      navigate('/dashboard')
    } catch (err) {
      // Parsear el error: extraer status, mensaje y errores por campo
      const parsed = parseServerError(err)
      setError(err)

      // Si hay errores de campo (422), mostrarlos inline junto a cada input
      if (parsed.fieldErrors) {
        setFieldErrors(formatFieldErrors(parsed.fieldErrors))
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * fieldClass() — Genera la clase CSS para un campo del formulario.
   * Si hay error de campo para ese nombre, agrega la clase 'field--error'
   * que marca el input en rojo.
   */
  const fieldClass = (name) =>
    `field${fieldErrors[name] ? ' field--error' : ''}`

  return (
    <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
      {/* Mensaje de éxito (solo se muestra post-registro) */}
      {success && <div className="form-success">{success}</div>}

      {/* Banner de error general + errores por campo */}
      <FormError error={error} fieldErrors={fieldErrors} />

      {/* ── Sección 1: Cuenta de usuario ────────────────────────── */}
      <section className="auth-group">
        <h3>Cuenta de usuario</h3>

        {/* Campo: correo electrónico */}
        <label className={fieldClass('email')}>
          <span>Correo</span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
          {/* Error inline: solo se muestra si el API retornó error para este campo */}
          {fieldErrors.email && <span className="field__error-msg">{fieldErrors.email}</span>}
        </label>

        {/* Campo: contraseña */}
        <label className={fieldClass('password')}>
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Crear contraseña"
            autoComplete="new-password"
            required
          />
          {fieldErrors.password && <span className="field__error-msg">{fieldErrors.password}</span>}
        </label>

        {/* Campo: rol (select con opciones predefinidas) */}
        <label className="field">
          <span>Rol</span>
          <select name="rol" defaultValue="estudiante">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>

        {/* Checkbox: cuenta activa (por defecto marcado) */}
        <label className="checkbox-field">
          <input type="checkbox" name="activo" defaultChecked />
          <span>Cuenta activa</span>
        </label>
      </section>

      {/* ── Sección 2: Datos del estudiante ─────────────────────── */}
      <section className="auth-group">
        <h3>Datos del estudiante</h3>

        {/* Campo: cédula de identidad */}
        <label className={fieldClass('cedula_identidad')}>
          <span>Cédula de identidad</span>
          <input type="text" name="cedula_identidad" placeholder="V-12345678" />
          {fieldErrors.cedula_identidad && <span className="field__error-msg">{fieldErrors.cedula_identidad}</span>}
        </label>

        {/* Fila de nombres: primer nombre (requerido) + segundo nombre (opcional) */}
        <div className="auth-grid">
          <label className={fieldClass('primer_nombre')}>
            <span>Primer nombre</span>
            <input type="text" name="primer_nombre" placeholder="Nombre" required />
            {fieldErrors.primer_nombre && <span className="field__error-msg">{fieldErrors.primer_nombre}</span>}
          </label>

          <label className="field">
            <span>Segundo nombre</span>
            <input type="text" name="segundo_nombre" placeholder="Opcional" />
          </label>
        </div>

        {/* Fila de apellidos: primer apellido (requerido) + segundo apellido (opcional) */}
        <div className="auth-grid">
          <label className={fieldClass('primer_apellido')}>
            <span>Primer apellido</span>
            <input type="text" name="primer_apellido" placeholder="Apellido" required />
            {fieldErrors.primer_apellido && <span className="field__error-msg">{fieldErrors.primer_apellido}</span>}
          </label>

          <label className="field">
            <span>Segundo apellido</span>
            <input type="text" name="segundo_apellido" placeholder="Opcional" />
          </label>
        </div>

        {/* Campo: teléfono */}
        <label className="field">
          <span>Teléfono</span>
          <input type="tel" name="telefono" placeholder="Teléfono celular" />
        </label>
      </section>

      {/* Botón de envío: cambia texto y se deshabilita durante la carga */}
      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Registrando…' : 'Registrarse'}
      </button>
    </form>
  )
}
