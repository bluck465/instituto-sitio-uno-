/**
 * useHeaderScroll.js — Hook que controla el comportamiento del header al hacer scroll.
 *
 * Implementa dos estados:
 * - isScrolled: true cuando el scroll supera 20px (header se encoge visualmente).
 * - isHidden: true cuando el usuario baja y el scroll supera 80px (header se oculta).
 *   Si el usuario sube, el header vuelve a mostrarse.
 *
 * Usa requestAnimationFrame para limitar la frecuencia de actualizaciones
 * y evitar jank en el scroll (throttling por frame).
 * El listener se registra con { passive: true } para no bloquear el scroll.
 */

import { useEffect, useState } from 'react'

// Umbrales de scroll en píxeles
const SHRINK_THRESHOLD = 20   // Por encima de esto, header se encoge
const HIDE_THRESHOLD = 80     // Por encima de esto y bajando, header se oculta

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = 0       // Posición anterior del scroll para detectar dirección
    let ticking = false        // Flag de throttling con requestAnimationFrame

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY || 0

      // Encoger si se ha scrolleado más de 20px desde el tope
      setIsScrolled(currentScrollY > SHRINK_THRESHOLD)

      // Ocultar solo si el usuario está BAJANDO (currentScrollY > lastScrollY)
      // y ya pasó el umbral de 80px. Si sube, el header reaparece.
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > HIDE_THRESHOLD)

      lastScrollY = currentScrollY
    }

    const onScroll = () => {
      // Throttling: si ya hay un frame pendiente, no agenda otro
      if (ticking) {
        return
      }

      ticking = true

      // programAnimationFrame asegura que la actualización ocurra
      // justo antes del siguiente repaint del navegador
      window.requestAnimationFrame(() => {
        updateHeaderState()
        ticking = false
      })
    }

    // Ejecutar una vez al montar para calcular el estado inicial
    updateHeaderState()

    // Registrar listener de scroll (passive: true mejora rendimiento)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Cleanup: remover listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, []) // Array vacío: solo se ejecuta al montar y desmontar

  return { isScrolled, isHidden }
}
