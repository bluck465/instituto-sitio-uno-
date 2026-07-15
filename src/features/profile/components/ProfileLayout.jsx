export function ProfileLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Perfil</span>
        <h2>{title}</h2>
        <p className="auth-page__text">{subtitle}</p>
      </header>
      {children}
    </div>
  )
}
