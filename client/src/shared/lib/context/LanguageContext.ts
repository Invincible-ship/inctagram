import { LanguageIds } from '@/shared/config/i18n/types'
import { createContext } from 'react'

export const LanguageContext = createContext<LanguageIds | ''>('')
