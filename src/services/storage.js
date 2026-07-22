/**
 * storage.js — Servicio de almacenamiento local
 *
 * Única puerta de acceso a localStorage de toda la app.
 * Centraliza get/set/remove con try/catch para evitar crasheos
 * si localStorage no está disponible.
 */

const prefix = 'itsu_'

export const storage = {
  get(key) {
    try {
      return localStorage.getItem(prefix + key)
    } catch { return null }
  },

  set(key, val) {
    try {
      localStorage.setItem(prefix + key, val)
    } catch { /* storage not available */ }
  },

  remove(key) {
    try {
      localStorage.removeItem(prefix + key)
    } catch { /* storage not available */ }
  },

  getJson(key) {
    try {
      const raw = localStorage.getItem(prefix + key)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  },

  setJson(key, val) {
    try {
      localStorage.setItem(prefix + key, JSON.stringify(val))
    } catch { /* storage not available */ }
  },
}
