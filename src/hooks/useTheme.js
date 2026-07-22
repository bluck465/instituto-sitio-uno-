import { useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

const THEME_KEY = 'theme'

function getStoredTheme() {
  return storage.get(THEME_KEY) || 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    storage.set(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
