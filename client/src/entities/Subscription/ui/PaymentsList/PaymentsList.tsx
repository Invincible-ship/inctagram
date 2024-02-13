import { SubscriptionPaymentType } from '@/entities/Subscription/model/types/types'
import cls from './PaymentsList.module.scss'
import { FC } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import PaymentCard from '@/entities/Subscription/ui/PaymentCard/PaymentCard'
import { PaymentsListHeader } from '@/entities/Subscription/ui/PaymentsListHeader/PaymentsListHeader'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type PaymentsListProps = {
  payments?: SubscriptionPaymentType[]
  mobile?: boolean
}

export const PaymentsList: FC<PaymentsListProps> = ({ payments, mobile }) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)

  if (!payments) return <HStack max>You have no any paymnets!</HStack>

  const mods = {
    [cls.mobile]: mobile,
  }

  if (mobile)
    return (
      <VStack className={cls.PaymentsList} gap="12" max>
        {payments.map(payment => {
          return <PaymentCard key={payment.dateOfPayment} payment={payment} mobile t={t} />
        })}
      </VStack>
    )

  return (
    <HStack className={cls.PaymentsList} max>
      <table className={cls.paymentsTable}>
        <PaymentsListHeader t={t} />
        <tbody>
          {payments.map(payment => {
            return <PaymentCard key={payment.dateOfPayment} payment={payment} t={t} />
          })}
        </tbody>
      </table>
    </HStack>
  )
}
