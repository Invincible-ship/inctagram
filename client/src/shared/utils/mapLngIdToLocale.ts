import { LanguageIds, Locales } from '@/shared/config/i18n/types'

export const mapLngIdToLocale = (lngId: LanguageIds) => {
  const map: Record<LanguageIds, Locales> = {
    [LanguageIds.RU]: Locales.RU,
    [LanguageIds.EN]: Locales.EN,
  }

  return map[lngId]
}
