'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md font-bold"
    >
      { theme === 'light' ? 'Dark Mode' : 'Light Mode' }
    </button>
  )
}

export default ThemeSwitch