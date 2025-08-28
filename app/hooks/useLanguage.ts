'use client'

import { useState, useEffect } from 'react'
import { Language, translations } from '../i18n/translations'

// Países de língua portuguesa
const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'GW', 'CV', 'ST', 'TL', 'MO']
// Países de língua espanhola
const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ']

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Tentar obter o país do usuário via API
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.country_code) {
          const countryCode = data.country_code
          
          if (portugueseCountries.includes(countryCode)) {
            setLanguage('pt')
          } else if (spanishCountries.includes(countryCode)) {
            setLanguage('es')
          } else {
            setLanguage('en')
          }
        } else {
          // Fallback para inglês se não conseguir detectar
          setLanguage('en')
        }
      } catch (error) {
        console.log('Could not detect country, defaulting to English')
        setLanguage('en')
      } finally {
        setIsLoading(false)
      }
    }

    detectLanguage()
  }, [])

  const t = (key: keyof typeof translations.en): string => {
    // Debug temporário
    console.log('Translation requested for key:', key)
    console.log('Current language:', language)
    console.log('Available translations:', Object.keys(translations))
    
    const translation = translations[language][key] || translations.en[key] || key
    console.log('Translation result:', translation)
    
    return translation
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
