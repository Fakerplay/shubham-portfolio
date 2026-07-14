'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'day', setTheme: (t: string) => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('day')

  const getThemeFromTime = (): string => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'day'
    if (hour >= 18 && hour < 21) return 'evening'
    return 'night'
  }

  const getSurfaceFromTheme = (t: string): string => {
    if (t === 'morning' || t === 'day' || t === 'matcha') return 'light'
    return 'dark'
  }

  useEffect(() => {
    localStorage.removeItem('theme') // Clear legacy override locks
    const autoTheme = getThemeFromTime()
    setTheme(autoTheme)
    const surface = getSurfaceFromTheme(autoTheme)
    document.documentElement.setAttribute('data-theme', autoTheme)
    document.documentElement.setAttribute('data-surface', surface)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    const surface = getSurfaceFromTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.setAttribute('data-surface', surface)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
