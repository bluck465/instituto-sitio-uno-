import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BrandHeader, SiteFooter } from '../components'

export function RegistrationStepTwoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const rol = user?.rol || 'estudiante'

  const handleComplete = () => {
    if (rol === 'profesor') {
      navigate('/profile/docente')
    } else if (rol === 'administrador') {
      navigate('/profile/administrador')
    } else {
      navigate('/profile/estudiante')
    }
  }

  return (
    <div className="landing-page">
      <main className="page-content">
        <BrandHeader />

        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Registro exitoso</span>
            <h1 className="hero-title">Bienvenido al Instituto Tecnologico Sitio Uno</h1>
            <p className="hero-text">
              Tu cuenta ha sido creada correctamente. Para acceder a todas las
              funcionalidades del campus digital, necesitamos que completes tu
              perfil con algunos datos adicionales.
            </p>

            <ul className="hero-points" aria-label="Siguientes pasos">
              <li>Datos personales basicos</li>
              <li>Informacion de contacto</li>
              <li>Documentacion requerida</li>
            </ul>

            <div className="hero-cta">
              <button className="auth-button" onClick={handleComplete}>
                Completar mi perfil
              </button>
              <button
                className="auth-button auth-button--secondary"
                onClick={() => navigate('/dashboard')}
              >
                Omitir por ahora
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-label="Composicion visual institucional">
            <img
              className="hero-art"
              src="/hero-visual.svg"
              alt="Ilustracion institucional del campus digital"
              width="480"
              height="280"
            />

            <div className="hero-panel">
              <span className="hero-panel__label">Paso 2 de 2</span>
              <h3 className="hero-panel__title">Completa tu perfil</h3>
              <p className="hero-panel__text">
                Esto nos permite personalizar tu experiencia y conectar con tu
                institucion de forma efectiva.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
