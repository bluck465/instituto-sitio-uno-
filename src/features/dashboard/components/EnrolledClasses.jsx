export function EnrolledClasses({ classes }) {
  if (!classes || classes.length === 0) {
    return (
      <section className="dashboard-section">
        <h3>Materias inscritas</h3>
        <p>No tienes materias inscritas en este periodo.</p>
      </section>
    )
  }

  return (
    <section className="dashboard-section">
      <h3>Materias inscritas</h3>
      <ul>
        {classes.map((cls, i) => (
          <li key={i}>{cls.nombre || cls.asignatura || 'Sin nombre'}</li>
        ))}
      </ul>
    </section>
  )
}
