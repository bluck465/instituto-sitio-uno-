/**
 * HeroPanel — Tarjeta informativa dentro del hero.
 * Muestra un label, título y texto descriptivo.
 */

export function HeroPanel({ label, title, text }) {
  return (
    <article className="hero-panel">
      <span className="hero-panel-label">{label}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
