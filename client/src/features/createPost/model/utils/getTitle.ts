import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'

export const getTitle = (step: number, t: TFunction<Namespaces, undefined>): string => {
  const titles: Record<number, string> = {
    1: t('select'),
    2: t('cropping'),
    3: t('filtering'),
    4: t('publish'),
  }

  return titles[step]
}
