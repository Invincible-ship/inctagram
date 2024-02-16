import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { FC, memo } from 'react'
import cls from './PaymentsListHeader.module.scss'
import { TFunction } from 'i18next'

type PaymentsListHeaderProps = {
  t: TFunction<Namespaces, undefined>
}

export const PaymentsListHeader: FC<PaymentsListHeaderProps> = memo(({ t }) => {
  return (
    <thead className={cls.PaymentsListHeader}>
      <tr>
        <th>{t('payments.titles.payment-date')}</th>
        <th>{t('payments.titles.subscription-end-date')}</th>
        <th>{t('payments.titles.price')}</th>
        <th>{t('payments.titles.subscription-type')}</th>
        <th>{t('payments.titles.payment-type')}</th>
      </tr>
    </thead>
  )
})

PaymentsListHeader.displayName = 'PaymentsListHeader'
