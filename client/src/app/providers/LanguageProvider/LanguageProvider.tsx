'use client'

import { LanguageIds } from '@/shared/config/i18n/types'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { ReactNode } from 'react'

type LanguageProviderProps = {
  lngId: LanguageIds
  children: ReactNode
}

export const LanguageProvider = ({ lngId, children }: LanguageProviderProps) => {
  return <LanguageContext.Provider value={lngId}>{children}</LanguageContext.Provider>
}
