/**
 * router/index.jsx — Configuración del enrutador de la aplicación.
 *
 * Crea un BrowserRouter con:
 * - App como layout raíz (renderiza <Outlet />).
 * - Suspense como wrapper para soportar lazy loading de páginas.
 *   Muestra "Cargando..." mientras se descarga el chunk de la ruta.
 *
 * Las rutas se definen en routes.jsx para mantener este archivo limpio.
 */

import { Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { App } from '../App'
import { routes } from './routes'

// Wrapper de Suspense: muestra fallback mientras se carga el componente lazy
function SuspenseFallback() {
  return (
    <Suspense fallback={<div className="page-content"><p>Cargando…</p></div>}>
      <Outlet />
    </Suspense>
  )
}

// Crear el router con App como layout raíz
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        // SuspenseFallback envuelve todas las rutas hijas para lazy loading
        element: <SuspenseFallback />,
        children: routes,
      },
    ],
  },
])
