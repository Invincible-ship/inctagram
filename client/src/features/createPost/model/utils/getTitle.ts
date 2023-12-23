import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'

export const getTitle = (step: number, t: TFunction<Namespaces, undefined>): string => {
  const titles: Record<number, string> = {
    1: t('image-selecting.title'),
    2: t('image-cropping.title'),
    3: t('image-filtering.title'),
    4: t('post-publishing.title'),
  }

  return titles[step]
}
