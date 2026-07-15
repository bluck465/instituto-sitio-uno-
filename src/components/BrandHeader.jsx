/**
 * BrandHeader — Header global del sitio.
 * Muestra el logo ITSU y los botones de login/registro.
 * Se oculta/encoge automáticamente al hacer scroll (ver useHeaderScroll).
 */

import { Link } from 'react-router-dom'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

export function BrandHeader() {
  // isScrolled = header encogido (>20px) | isHidden = header oculto (>80px bajando)
  const { isScrolled, isHidden } = useHeaderScroll()

  return (
    <header
      className={`site-header${isScrolled ? ' scrolled' : ''}${isHidden ? ' hidden' : ''}`}
    >
      <a className="brand-link" href="/" aria-label="Volver al inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <img
          className="brand-logo"
          src="/ITSU.webp"
          alt="Instituto Tecnológico Sitio Uno"
          width="399"
          height="64"
        />
      </a>

      {/* Navegación interna con React Router (sin recarga de página) */}
      <nav className="header-actions" aria-label="Acciones principales">
        <Link className="header-action outline" to="/login">
          Iniciar sesion
        </Link>
        <Link className="header-action solid" to="/register">
          Registrarse
        </Link>
      </nav>
    </header>
  )
}