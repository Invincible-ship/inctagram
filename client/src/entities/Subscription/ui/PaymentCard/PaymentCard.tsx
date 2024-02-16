import { SubscriptionPaymentType } from '@/entities/Subscription/model/types/types'
import React, { FC } from 'react'
import cls from './PaymentCard.module.scss'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { HStack, VStack } from '@/shared/ui/Stack'

type PaymentCardProps = {
  payment: SubscriptionPaymentType
  t: TFunction<Namespaces, undefined>
  mobile?: boolean
}

const PaymentCard: FC<PaymentCardProps> = ({ payment, t, mobile }) => {
  const { dateOfPayment, endDateOfSubscription, price, subscriptionType, paymentType } = payment
  const formatter = useDateFormatter()

  if (mobile)
    return (
      <VStack className={cls.PaymentCard} gap="12" max>
        <HStack align="center" justify="between" max>
          <HStack>{t('payments.titles.payment-date')}</HStack>
          <HStack className={cls.bold}>{formatter.format(new Date(dateOfPayment))}</HStack>
        </HStack>
        <HStack align="center" justify="between" max>
          <HStack>{t('payments.titles.subscription-end-date')}</HStack>
          <HStack className={cls.bold}>{formatter.format(new Date(endDateOfSubscription))}</HStack>
        </HStack>
        <HStack align="center" justify="between" max>
          <HStack>{t('payments.titles.subscription-type')}</HStack>
          <HStack className={cls.bold}>
            {t(`payments.subscription-types.${subscriptionType}`)}
          </HStack>
        </HStack>
        <HStack align="center" justify="between" max>
          <HStack>{t('payments.titles.price')}</HStack>
          <HStack className={cls.bold}>${price}</HStack>
        </HStack>
        <HStack align="center" justify="between" max>
          <HStack>{t('payments.titles.payment-type')}</HStack>
          <HStack className={cls.bold}>{t(`payments.payment-types.${paymentType}`)}</HStack>
        </HStack>
      </VStack>
    )

  return (
    <tr className={cls.PaymentCard}>
      <td>{formatter.format(new Date(dateOfPayment))}</td>
      <td>{formatter.format(new Date(endDateOfSubscription))}</td>
      <td>${price}</td>
      <td>{t(`payments.subscription-types.${subscriptionType}`)}</td>
      <td>{t(`payments.payment-types.${paymentType}`)}</td>
    </tr>
  )
}

export default PaymentCard
