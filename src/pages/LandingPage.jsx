/**
 * LandingPage.jsx — Página principal (landing) del instituto.
 *
 * Composición de la página completa:
 * 1. BrandHeader — Navegación superior con logo y botones de auth.
 * 2. HeroSection — Sección principal con título, descripción y tarjeta informativa.
 * 3. Sección "Sobre el instituto" — Texto descriptivo con SectionHeading.
 * 4. Sección "Valores" — Grid de 3 tarjetas de valores institucionales.
 * 5. SiteFooter — Pie de página.
 *
 * Todo el contenido (textos, valores) está definido como objetos estáticos
 * al inicio del archivo para facilitar su mantenimiento.
 */

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BrandHeader, HeroSection, SectionHeading, ValueGrid, SiteFooter } from '../components'

const AUTH_ERROR_MESSAGES = {
  otp_expired: 'El enlace de verificación ha expirado. Revisa tu correo y haz clic en el enlace más reciente, o solicita uno nuevo.',
  access_denied: 'El enlace no es válido. Puede que ya lo hayas usado. Solicita uno nuevo desde el registro.',
  email_not_confirmed: 'Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.',
}

// ── Contenido estático de la landing ─────────────────────────────────
// Cada objeto agrupa los textos de una sección para mantener el JSX limpio.

const hero = {
  eyebrow: 'Campus digital',
  title: 'Instituto Tecnológico Sitio Uno',
  description:
    'Un sitio institucional claro, moderno y ordenado para comunicar la identidad del instituto, orientar a la comunidad educativa y reforzar una presencia digital sólida.',
  points: ['Identidad institucional', 'Comunicación clara', 'Diseño responsivo'],
  panelLabel: 'Refactor visual',
  panelTitle: 'Una interfaz limpia, sobria y con enfoque académico.',
  panelText:
    'La composición mantiene el carácter del front-end original, pero lo reorganiza en componentes React con una estructura mantenible y lista para crecer.',
}

const intro = {
  eyebrow: 'Sobre el instituto',
  title: 'Una propuesta académica con presencia digital',
  description:
    'ITSU combina una imagen institucional seria con una experiencia visual directa para estudiantes, docentes y personal administrativo. Esta versión en React y Vite preserva la base visual del sitio original, pero la convierte en un proyecto modular y limpio.',
}

const values = {
  eyebrow: 'Valores del instituto',
  title: 'Los ejes que sostienen la identidad',
  items: [
    {
      label: '01',
      title: 'Excelencia académica',
      description:
        'Formación de alto nivel con foco en criterio profesional, innovación y mejora continua.',
    },
    {
      label: '02',
      title: 'Integridad institucional',
      description:
        'Procesos claros, responsabilidad y respeto por estudiantes, docentes y comunidad.',
    },
    {
      label: '03',
      title: 'Innovación con IA',
      description:
        'Tecnología aplicada para potenciar el aprendizaje, la orientación y el análisis de progreso.',
    },
  ],
}

export function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const error = searchParams.get('error')
    const errorCode = searchParams.get('error_code')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      const message = AUTH_ERROR_MESSAGES[errorCode]
        || errorDescription
        || 'Ocurrió un error al verificar tu correo.'
      setAuthError(message)

      const cleaned = new URLSearchParams(searchParams)
      cleaned.delete('error')
      cleaned.delete('error_code')
      cleaned.delete('error_description')
      cleaned.delete('sb')
      setSearchParams(cleaned, { replace: true })
    }
  }, [])

  return (
    <div className="landing-page">
      <main className="page-content">
        <BrandHeader />

        {authError && (
          <div className="auth-error" style={{ margin: '0 0 20px' }}>
            <p>{authError}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                className="auth-button"
                style={{ minWidth: 'auto', padding: '8px 16px' }}
                onClick={() => navigate('/register')}
              >
                Registrarse de nuevo
              </button>
              <button
                className="auth-button"
                style={{ minWidth: 'auto', padding: '8px 16px', background: 'transparent', color: '#b91c1c', border: '1px solid #b91c1c' }}
                onClick={() => navigate('/login')}
              >
                Ir al login
              </button>
            </div>
          </div>
        )}

        {/* Hero: sección principal con CTA de login/registro */}
        <HeroSection content={hero} />

        {/* Sección descriptiva sobre el instituto */}
        <section className="content-section" id="instituto">
          <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />
          <p className="content-copy">{intro.description}</p>
        </section>

        {/* Grid de valores institucionales */}
        <section className="content-section" id="valores">
          <SectionHeading eyebrow={values.eyebrow} title={values.title} />
          <ValueGrid items={values.items} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
