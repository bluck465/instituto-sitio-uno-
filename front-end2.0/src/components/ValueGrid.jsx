/**
 * ValueGrid — Grid responsivo de tarjetas de valores institucionales.
 * Renderiza un array de objetos { label, title, description } como tarjetas
 * con número, título y descripción. Se usa en la sección "Valores" de la landing.
 *
 * @param {Array<{label: string, title: string, description: string}>} items - Valores a mostrar
 */

export function ValueGrid({ items }) {
  return (
    <div className="value-grid">
      {items.map((item) => (
        <article className="value-card" key={item.label}>
          <span className="value-index">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  )
}