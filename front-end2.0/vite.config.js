/**
 * vite.config.js — Configuración del bundler Vite.
 * - Plugin React: habilita JSX y Fast Refresh en desarrollo.
 * - base '/': rutas relativas al raíz del dominio.
 * - alias '@': permite importar desde src/ con '@components/...' en lugar de rutas relativas largas.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      // Alias para simplificar imports: import X from '@/components/X'
      '@': resolve(__dirname, 'src'),
    },
  },
})
