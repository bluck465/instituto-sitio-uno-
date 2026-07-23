import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import './CallbackPage.css'

function getProfilePath(rol) {
  if (rol === 'profesor') return '/profile/docente'
  if (rol === 'administrador') return '/profile/administrador'
  return '/profile/estudiante'
}

function exchangeCode(code) {
  return supabase.auth.exchangeCodeForSession(code)
}

export function CallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const rol = searchParams.get('rol') || 'estudiante'
  const [status, setStatus] = useState(() => (code ? 'verifying' : 'error'))
  const [errorMessage, setErrorMessage] = useState(() =>
    code ? null : 'No se encontró el código de verificación.',
  )
  const hasExchanged = useRef(false)

  useEffect(() => {
    if (!code || hasExchanged.current) return
    hasExchanged.current = true

    let cancelled = false
    exchangeCode(code).then(({ error }) => {
      if (cancelled) return
      if (error) {
        setStatus('error')
        setErrorMessage(error.message || 'No se pudo verificar el correo.')
        return
      }
      setStatus('success')
    })
    return () => { cancelled = true }
  }, [code])

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => navigate(getProfilePath(rol), { replace: true }), 1500)
    return () => clearTimeout(timer)
  }, [status, rol, navigate])

  const handleRetry = () => {
    if (!code) return
    setStatus('verifying')
    setErrorMessage(null)
    hasExchanged.current = false
    exchangeCode(code).then(({ error }) => {
      if (error) {
        setStatus('error')
        setErrorMessage(error.message || 'No se pudo verificar el correo.')
        return
      }
      setStatus('success')
    })
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
                Reintentar
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
