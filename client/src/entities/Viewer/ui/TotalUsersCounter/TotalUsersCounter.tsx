import { HStack } from '@/shared/ui/Stack'
import { fetchUsersTotalCount } from '../../model/lib/serverActions/fetchUsersTotalCount'
import cls from './TotalUserCounter.module.scss'
import { FC } from 'react'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'

type TotalUsersCounterProps = {
  t: TFunction<Namespaces, undefined>
}

export const TotalUsersCounter: FC<TotalUsersCounterProps> = async ({ t }) => {
  const response = await fetchUsersTotalCount()

  const getCount = (count: number) => {
    const countArr = String(count).split('')
    return Array.from({ length: 6 }, (_, idx) => countArr.at(idx - 6) || 0)
  }

  return (
    <HStack className={cls.TotalUserCounter} justify="between" align="center" max>
      <HStack className={cls.title}>{t('counter.title')}</HStack>
      <HStack className={cls.counter}>
        {response
          ? getCount(response.totalCount).map((digit, idx) => (
              // eslint-disable-next-line react/jsx-indent
              <span key={idx} className={cls.digit}>
                {digit}
              </span>
            ))
          : 'Oops, something went wrong...'}
      </HStack>
    </HStack>
  )
}
