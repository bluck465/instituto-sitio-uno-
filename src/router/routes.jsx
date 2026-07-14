/**
 * routes.jsx — Definición de rutas de la aplicación.
 *
 * Cada página se carga con React.lazy() para implementar code splitting:
 * los archivos JS de cada página solo se descargan cuando el usuario
 * navega a esa ruta, reduciendo el bundle inicial.
 *
 * Rutas definidas:
 * - /                    → LandingPage (página principal)
 * - /iniciar-sesion      → AuthOverlay en modo login
 * - /registro            → AuthOverlay en modo registro
 * - /dashboard           → DashboardLayout (protegida, requiere auth)
 *   └─ index             → DashboardPage (contenido principal)
 * - *                    → Redirect a / (catch-all)
 */

import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

// Lazy loading: cada página se importa dinámicamente solo cuando se necesita
// .then((m) => ({ default: m.LandingPage })) extrae el export nombrado
const LandingPage = lazy(() =>
  import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

const AuthOverlay = lazy(() =>
  import('../pages/AuthOverlay').then((m) => ({ default: m.AuthOverlay })),
)

const DashboardLayout = lazy(() =>
  import('../layouts/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
)

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

export const routes = [
  // Ruta principal: landing page
  { path: '/', element: <LandingPage /> },

  // Rutas de autenticación: modal overlay sobre la landing
  { path: '/iniciar-sesion', element: <AuthOverlay mode="login" /> },
  { path: '/registro', element: <AuthOverlay mode="register" /> },

  // Dashboard: ruta protegida que requiere autenticación
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Ruta index: contenido principal del dashboard
      { index: true, element: <DashboardPage /> },
    ],
  },

  // Catch-all: cualquier ruta no definida redirige al inicio
  { path: '*', element: <Navigate to="/" replace /> },
]
