"use client"

import { LanguageIds } from "@/shared/config/i18n/types"
import { ReactNode, createContext, useMemo } from "react"

type LanguageProviderProps = {
  lngId: LanguageIds,
  children: ReactNode
}

export const LanguageContext = createContext<LanguageIds | ''>('')

export const LanguageProvider = ({ lngId, children }: LanguageProviderProps) => {
  const value = useMemo(() => lngId, [lngId])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}