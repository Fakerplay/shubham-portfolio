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

  useEffect(() => {
    localStorage.removeItem('theme') // Clear legacy override locks
    const autoTheme = getThemeFromTime()
    setTheme(autoTheme)
    document.documentElement.setAttribute('data-theme', autoTheme)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
