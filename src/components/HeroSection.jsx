/**
 * HeroSection — Sección principal (hero) de la landing page.
 * Compone HeroCopy (texto) y HeroPanel (tarjeta) dentro de la ilustración.
 */

import { HeroCopy } from './HeroCopy'
import { HeroPanel } from './HeroPanel'

export function HeroSection({ content }) {
  return (
    <section className="hero-section">
      <HeroCopy
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        points={content.points}
      />

      <div className="hero-visual" aria-label="Composición visual institucional">
        <img
          className="hero-art"
          src="/hero-visual.svg"
          alt="Ilustración institucional del campus digital"
          width="480"
          height="280"
        />

        <HeroPanel
          label={content.panelLabel}
          title={content.panelTitle}
          text={content.panelText}
        />
      </div>
    </section>
  )
}
