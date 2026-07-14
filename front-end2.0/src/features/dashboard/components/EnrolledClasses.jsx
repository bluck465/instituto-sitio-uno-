/**
 * EnrolledClasses.jsx — Lista de materias inscritas del estudiante.
 *
 * Renderiza las materias inscritas como tarjetas (class-card).
 * Cada tarjeta muestra: código, nombre de la materia, horario y aula.
 *
 * Estados:
 * - Sin materias: muestra un mensaje de "No hay materias inscritas".
 * - Con materias: renderiza una tarjeta por cada materia del array.
 *
 * @param {Array} classes - Array de objetos con { seccion_id, codigo, asignatura, horario, aula }
 */

export function EnrolledClasses({ classes }) {
  // Estado vacío: no hay materias inscritas
  if (!classes || classes.length === 0) {
    return (
      <section className="dashboard-classes">
        <h3>Materias inscritas</h3>
        <p>No hay materias inscritas actualmente.</p>
      </section>
    )
  }

  return (
    <section className="dashboard-classes">
      <h3>Materias inscritas</h3>
      <div className="classes-list">
        {classes.map((cls) => (
          <div className="class-card" key={cls.seccion_id}>
            {/* Código de la materia (ej: "MAT-101") */}
            <span className="class-card__code">{cls.codigo}</span>

            {/* Nombre de la materia */}
            <span className="class-card__name">{cls.asignatura}</span>

            {/* Horario: puede venir como string u objeto, se serializa en ambos casos */}
            <span className="class-card__schedule">
              {typeof cls.horario === 'string' ? cls.horario : JSON.stringify(cls.horario)}
            </span>

            {/* Aula donde se imparte */}
            <span className="class-card__aula">{cls.aula}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
