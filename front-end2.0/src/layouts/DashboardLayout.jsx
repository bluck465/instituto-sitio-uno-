/**
 * DashboardLayout.jsx — Layout del dashboard del estudiante.
 *
 * Estructura de dos columnas:
 * - Izquierda: Sidebar (info del usuario, navegación, logout).
 * - Derecha: <Outlet /> que renderiza el contenido de la ruta hija activa.
 *
 * Se renderiza dentro de ProtectedRoute, por lo que solo es accesible
 * si el usuario está autenticado.
 */

import { Outlet } from 'react-router-dom'
import { Sidebar } from '../features/dashboard/components/Sidebar'

export function DashboardLayout() {
  return (
    <div className="dashboard-page">
      {/* Encabezado del dashboard con badge y título */}
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Panel</span>
        <h2>Dashboard del estudiante</h2>
      </header>

      {/* Layout de dos columnas: sidebar + contenido principal */}
      <div className="page-content dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          {/* Outlet renderiza la página hija (DashboardPage u otras sub-rutas) */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
