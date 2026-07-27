import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import './CallbackPage.css'

function getProfilePath(rol) {
  if (rol === 'profesor') return '/profile/docente'
  if (rol === 'administrador') return '/profile/administrador'
  return '/profile/estudiante'
}

function parseAllParams() {
  const search = Object.fromEntries(new URLSearchParams(window.location.search).entries())
  const hash = window.location.hash.length > 1
    ? Object.fromEntries(new URLSearchParams(window.location.hash.slice(1)).entries())
    : {}
  return { ...hash, ...search }
}

const ERROR_MESSAGES = {
  otp_expired: 'El enlace de verificación ha expirado. Regístrate de nuevo para recibir uno nuevo.',
  access_denied: 'Acceso denegado. El enlace no es válido.',
  email_not_confirmed: 'El correo no ha sido confirmado.',
}

function getInitialState(code) {
  const params = parseAllParams()

  if (params.error) {
    const message = ERROR_MESSAGES[params.error_code]
      || params.error_description
      || 'Error de verificación.'
    return { status: 'error', errorMessage: message }
  }

  if (code || params.access_token) {
    return { status: 'verifying', errorMessage: null }
  }

  return { status: 'error', errorMessage: 'No se encontró el código de verificación.' }
}

export function CallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const rol = searchParams.get('rol') || 'estudiante'

  const initial = getInitialState(code)
  const [status, setStatus] = useState(initial.status)
  const [errorMessage, setErrorMessage] = useState(initial.errorMessage)
  const hasExchanged = useRef(false)

  useEffect(() => {
    if (status !== 'verifying' || hasExchanged.current) return
    hasExchanged.current = true

    const params = parseAllParams()

    if (code) {
      let cancelled = false
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (cancelled) return
        if (error) {
          setStatus('error')
          setErrorMessage(error.message || 'No se pudo verificar el correo.')
          return
        }
        setStatus('success')
      })
      return () => { cancelled = true }
    }

    if (params.access_token) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setStatus('success')
        } else {
          setStatus('error')
          setErrorMessage('No se pudo establecer la sesión.')
        }
      })
    }
  }, [status, code])

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => navigate(getProfilePath(rol), { replace: true }), 1500)
    return () => clearTimeout(timer)
  }, [status, rol, navigate])

  const handleRetry = () => {
    window.location.href = '/register'
  }

  return (
    <div className="callback-page">
      <div className="callback-card">
        {status === 'verifying' && (
          <>
            <div className="callback-spinner" />
            <p className="callback-status">Verificando tu correo...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <p className="callback-success">Correo verificado correctamente</p>
            <p className="callback-status">Redirigiendo...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <p className="callback-error">{errorMessage}</p>
            <div className="callback-actions">
              <button
                className="callback-button callback-button--primary"
                onClick={handleRetry}
              >
                Volver al registro
              </button>
              <button
                className="callback-button callback-button--secondary"
                onClick={() => navigate('/login', { replace: true })}
              >
                Ir al login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
