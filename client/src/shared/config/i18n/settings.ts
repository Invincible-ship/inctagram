import { LanguageIds, Locales } from '@/shared/config/i18n/types'

export const fallbackLng = LanguageIds.RU
export const languages: LanguageIds[] = [fallbackLng, LanguageIds.EN]
export const defaultNS = 'translation'
export const mapLngToLocale: Record<LanguageIds, Locales> = {
  [LanguageIds.RU]: Locales.RU,
  [LanguageIds.EN]: Locales.EN,
}

export function getOptions(lng: LanguageIds | '' = fallbackLng, ns = defaultNS) {
  return {
    debug: __IS_DEV__,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
