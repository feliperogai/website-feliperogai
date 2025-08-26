'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Language } from '../i18n/translations'

interface LanguageContextType {
  language: Language
  t: (key: keyof typeof import('../i18n/translations').translations.en) => string
  changeLanguage: (newLanguage: Language) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languageData = useLanguage()

  return (
    <LanguageContext.Provider value={languageData}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}
