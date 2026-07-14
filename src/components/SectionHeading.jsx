/**
 * SectionHeading — Encabezado reutilizable para secciones de contenido.
 * Muestra un badge ("eyebrow") encima del título h2.
 * Se usa en la landing page para las secciones "Sobre el instituto" y "Valores".
 *
 * @param {string} eyebrow - Texto del badge superior (ej: "Sobre el instituto")
 * @param {string} title - Título principal de la sección
 */

export function SectionHeading({ eyebrow, title }) {
  return (
    <header className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  )
}