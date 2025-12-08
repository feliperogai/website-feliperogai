'use client'

import { useState, useEffect } from 'react'
import { Language, translations } from '../i18n/translations'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectFromNavigator = (): Language => {
      if (typeof navigator === 'undefined') return 'pt'

      const mapToLanguage = (lang?: string): Language | null => {
        if (!lang) return null
        const normalized = lang.toLowerCase()
        if (normalized.startsWith('pt')) return 'pt'
        if (normalized.startsWith('es')) return 'es'
        return 'en' // fallback for any other language
      }

      const browserLanguages =
        Array.isArray(navigator.languages) && navigator.languages.length > 0
          ? navigator.languages
          : navigator.language
            ? [navigator.language]
            : []

      for (const lang of browserLanguages) {
        const detected = mapToLanguage(lang)
        if (detected) return detected
      }

      return 'pt'
    }

    setLanguage(detectFromNavigator())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key
  }

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return {
    language,
    t,
    changeLanguage,
    isLoading
  }
}
