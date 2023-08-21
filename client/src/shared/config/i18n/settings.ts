import { LanguageIds } from '@/shared/config/i18n/types'

export const fallbackLng = LanguageIds.EN
export const languages: LanguageIds[] = [fallbackLng, LanguageIds.RU]
export const defaultNS = 'translation'

export function getOptions(lng: LanguageIds | '' = fallbackLng, ns = defaultNS) {
  return {
    debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
