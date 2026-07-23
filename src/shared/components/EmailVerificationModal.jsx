import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { storage } from '../../services/storage'
import './EmailVerificationModal.css'

export function EmailVerificationModal() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState(null)
  const [rol, setRol] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function check() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        if (!user.email_confirmed_at) {
          setEmail(user.email)
          if (!cancelled) setVisible(true)
        }
        return
      }

      const pendingEmail = storage.get('pendingVerificationEmail')
      if (pendingEmail && !cancelled) {
        setEmail(pendingEmail)
        setRol(storage.get('pendingVerificationRol') || 'estudiante')
        setVisible(true)
      }
    }

    check()
    return () => { cancelled = true }
  }, [])

  const handleResend = async () => {
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `https://institutositiouno.vercel.app/auth/callback?rol=${rol || 'estudiante'}`,
      },
    })
    setLoading(false)
    setMessage(error
      ? 'No se pudo reenviar. Intenta de nuevo en unos minutos.'
      : 'Correo reenviado. Revisa tu bandeja de entrada.'
    )
  }

  const handleVerify = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email_confirmed_at) {
        storage.remove('pendingVerificationEmail')
        storage.remove('pendingVerificationRol')
        setVisible(false)
        setLoading(false)
        return
      }
    } catch {
      // Sin sesion activa, getUser() falla con 403 — es esperado
    }

    const pendingEmail = storage.get('pendingVerificationEmail')
    if (pendingEmail) {
      setMessage('Tu correo aun no ha sido confirmado. Revisa tu bandeja y haz clic en el enlace de verificacion.')
      setLoading(false)
      return
    }

    setMessage('Tu correo aun no ha sido confirmado. Revisa tu bandeja.')
    setLoading(false)
  }

  const handleClose = () => {
    storage.remove('pendingVerificationEmail')
    storage.remove('pendingVerificationRol')
    navigate('/')
  }

  if (!visible) return null

  return (
    <div className="ev-backdrop">
      <div className="ev-modal">
        <div className="ev-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
        </div>

        <h2 className="ev-title">Verifica tu correo electronico</h2>
        <p className="ev-text">
          Enviamos un enlace de confirmacion a <strong>{email}</strong>.
          Haz clic en el enlace para activar tu cuenta y continuar con tu registro.
        </p>

        {message && <div className="ev-message">{message}</div>}

        <div className="ev-actions">
          <button className="auth-button" onClick={handleVerify} disabled={loading}>
            {loading ? 'Verificando...' : 'Ya confirmé'}
          </button>
          <button
            className="auth-button ev-button--secondary"
            onClick={handleResend}
            disabled={loading}
          >
            Reenviar correo
          </button>
          <button
            className="auth-button ev-button--tertiary"
            onClick={handleClose}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
