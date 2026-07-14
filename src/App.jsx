/**
 * App.jsx — Shell raíz de la aplicación.
 * Actúa como layout base del router. Renderiza <Outlet /> para que
 * React Router inyecte la página hija correspondiente a cada ruta.
 * No contiene lógica de negocio, solo estructura DOM.
 */

import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <div className="app-shell">
      {/* Outlet renderiza dinámicamente el componente de la ruta activa */}
      <Outlet />
    </div>
  )
}
