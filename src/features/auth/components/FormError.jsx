export function FormError({ error }) {
  if (!error) return null

  return (
    <div className="auth-error" role="alert">
      {error}
    </div>
  )
}
