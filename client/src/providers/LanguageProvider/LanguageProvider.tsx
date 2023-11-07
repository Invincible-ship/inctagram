'use client'

import { LanguageIds } from '@/shared/config/i18n/types'
import { ReactNode, createContext } from 'react'

type LanguageProviderProps = {
  lngId: LanguageIds
  children: ReactNode
}

export const LanguageContext = createContext<LanguageIds | ''>('')

export const LanguageProvider = ({ lngId, children }: LanguageProviderProps) => {
  return <LanguageContext.Provider value={lngId}>{children}</LanguageContext.Provider>
}
