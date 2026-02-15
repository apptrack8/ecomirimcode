import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const STORAGE_KEY = 'ecomirin_lang'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'pt') return stored
    } catch (e) {}
    return 'pt'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch (e) {}
  }, [language])

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'pt') setLanguageState(lang)
  }

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value ?? path
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
