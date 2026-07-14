/**
 * HeroCopy — Columna de texto del hero.
 * Muestra eyebrow, título, descripción y lista de beneficios.
 */

export function HeroCopy({ eyebrow, title, description, points }) {
  return (
    <div className="hero-copy">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-text">{description}</p>

      <ul className="hero-points" aria-label="Beneficios destacados">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  )
}
