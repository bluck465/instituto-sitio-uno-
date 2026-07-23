import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

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

const DocentePage = lazy(() =>
  import('../pages/DocentePage').then((m) => ({ default: m.DocentePage })),
)

const AdminPage = lazy(() =>
  import('../pages/AdminPage').then((m) => ({ default: m.AdminPage })),
)

const StudentsPage = lazy(() =>
  import('../pages/admin_pages/StudentsPage').then((m) => ({ default: m.StudentsPage })),
)

const TeachersPage = lazy(() =>
  import('../pages/admin_pages/TeachersPage').then((m) => ({ default: m.TeachersPage })),
)

const UsersPage = lazy(() =>
  import('../pages/admin_pages/UsersPage').then((m) => ({ default: m.UsersPage })),
)

const EstudianteProfilePage = lazy(() =>
  import('../pages/EstudianteProfilePage').then((m) => ({ default: m.EstudianteProfilePage })),
)

const DocenteProfilePage = lazy(() =>
  import('../pages/DocenteProfilePage').then((m) => ({ default: m.DocenteProfilePage })),
)

const AdministradorProfilePage = lazy(() =>
  import('../pages/AdministradorProfilePage').then((m) => ({ default: m.AdministradorProfilePage })),
)

const CallbackPage = lazy(() =>
  import('../features/auth/pages/CallbackPage').then((m) => ({ default: m.CallbackPage })),
)

export const routes = [
  { path: '/', element: <LandingPage /> },

  { path: '/login', element: <AuthOverlay mode="login" /> },
  { path: '/register', element: <AuthOverlay mode="register" /> },

  { path: '/auth/callback', element: <CallbackPage /> },

  {
    path: '/profile/estudiante',
    element: (
      <ProtectedRoute>
        <EstudianteProfilePage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/profile/docente',
    element: (
      <ProtectedRoute>
        <DocenteProfilePage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/profile/administrador',
    element: (
      <ProtectedRoute>
        <AdministradorProfilePage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },

  {
    path: '/teacher',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DocentePage /> },
    ],
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminPage /> },
      { path: 'estudiantes', element: <StudentsPage /> },
      { path: 'docentes', element: <TeachersPage /> },
      { path: 'usuarios', element: <UsersPage /> },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
]
