/**
 * main.jsx — Punto de entrada de la aplicación.
 * Monta el árbol de React sobre el elemento #root del HTML.
 * Envuelve todo en StrictMode (detección de problemas en desarrollo),
 * AuthProvider (estado global de autenticación) y RouterProvider (enrutamiento SPA).
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import './App.css'

// Selecciona el nodo raíz del HTML y renderiza la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* AuthProvider envuelve toda la app para que cualquier componente pueda acceder al estado de sesión */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
