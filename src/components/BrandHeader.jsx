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
      <a className="brand-link" href="#inicio" aria-label="Volver al inicio">
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
        <Link className="header-action outline" to="/iniciar-sesion">
          Iniciar sesión
        </Link>
        <Link className="header-action solid" to="/registro">
          Registrarse
        </Link>
      </nav>
    </header>
  )
}