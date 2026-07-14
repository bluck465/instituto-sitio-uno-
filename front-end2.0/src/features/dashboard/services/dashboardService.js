/**
 * dashboardService.js — Servicio para obtener datos del dashboard del estudiante.
 *
 * Realiza una petición GET al endpoint protegido /api/dashboard.
 * El token JWT se adjunta automáticamente via httpClient.
 *
 * @returns {Promise<{ student: object, classes: Array }>} Datos del estudiante y sus materias inscritas
 */

import { httpClient } from '../../../services/httpClient'

export async function getDashboardData() {
  return httpClient.get('/api/dashboard')
}
