import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'

const minAndSecMap = new Map([
  [[1, 21, 31, 41, 51], 'у'],
  [[2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54], 'ы'],
])

const hoursMap = new Map([
  [[2, 3, 4, 22, 23], 'а'],
  [[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'ов'],
])

export const getFormattedPublciationDate = (
  date: string,
  formatter: Intl.DateTimeFormat,
  t: TFunction<Namespaces>,
) => {
  const dateTime = new Date(date).getTime()

  const minute = 1000 * 60
  const hour = 1000 * 60 * 60
  const day = 1000 * 60 * 60 * 24

  if (Date.now() - dateTime < minute) {
    const count = Math.floor((Date.now() - dateTime) / 1000)
    const ending = calculateEnding(minAndSecMap, count)
    return t('dateFormatter.seconds', { count, ending })
  }

  if (Date.now() - dateTime < hour) {
    const count = Math.floor((Date.now() - dateTime) / (1000 * 60))
    const ending = calculateEnding(minAndSecMap, count)
    return t('dateFormatter.minutes', { count, ending })
  }

  if (Date.now() - dateTime < day) {
    const count = Math.floor((Date.now() - dateTime) / (1000 * 60 * 60))
    const ending = calculateEnding(hoursMap, count)
    return t('dateFormatter.hours', { count, ending })
  }

  return formatter.format(new Date(date))
}

const calculateEnding = (map: Map<number[], string>, currNum: number) => {
  // @ts-ignore
  for (let [numbers, end] of map.entries()) {
    if (numbers.includes(currNum)) return end
  }

  return ''
}
