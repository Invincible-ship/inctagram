import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { mapLngIdToLocale } from '@/shared/utils/mapLngIdToLocale'
import { useContext } from 'react'

export const useDateFormatter = (options?: Intl.DateTimeFormatOptions) => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const locale = mapLngIdToLocale(lngId)
  return new Intl.DateTimeFormat(locale, options)
}
