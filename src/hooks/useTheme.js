import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'itsu_theme'

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light'
  } catch {
    return 'light'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (_) {
      /* storage not available */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
