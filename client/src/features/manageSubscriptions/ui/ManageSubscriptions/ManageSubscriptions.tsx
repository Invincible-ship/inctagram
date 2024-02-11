import {
  SelectAccount,
  SelectSubscriptionPlan,
  AccountTypeField,
  SubscriptionTypeField,
  PaymentMethodFiled,
  SubscriptionCost,
  useCreateSubscriptionMutation,
  useGetSubscriptionCostQuery,
} from '@/entities/Subscription'
import cls from './ManageSubscriptions.module.scss'
import { FC, useEffect, useMemo, useState } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PayPalLogo from '@/shared/assets/icons/paypal-logo.svg'
import StripeLogo from '@/shared/assets/icons/stripe-logo.svg'
import { FullPageLoader } from '@/shared/ui/FullPageLoader/FullPageLoader'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

const baseClientUrl = __IS_DEV__
  ? (process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT_URL as string)
  : (process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_URL as string)

type ManageSubscriptionsProps = {
  isSubscriptionsExist: boolean
}

export const ManageSubscriptions: FC<ManageSubscriptionsProps> = ({ isSubscriptionsExist }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const mobile = useMediaQuery('(max-width: 769px)')
  const [accountType, setAccountType] = useState<AccountTypeField>(AccountTypeField.PERSONAL)
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionTypeField>(
    SubscriptionTypeField.DAY,
  )
  const gap = !mobile ? '48' : undefined
  const justify = mobile ? 'between' : 'end'

  const { data: subscriptionsCost, isLoading: isCostsLoading } = useGetSubscriptionCostQuery()
  const [createSubscriptionMutation, { isLoading: isCreateSubscriptionLoading }] =
    useCreateSubscriptionMutation()

  useEffect(() => {
    if (isSubscriptionsExist) {
      setAccountType(AccountTypeField.BUSINESS)
    }
  }, [isSubscriptionsExist])

  const createSubscription = (paymentType: PaymentMethodFiled) => async () => {
    const { data: subscriptionData } = subscriptionsCost!

    const currentSubscription = subscriptionData.find(
      ({ typeDescription }) => typeDescription == subscriptionPlan,
    ) as SubscriptionCost
    const { amount, typeDescription } = currentSubscription
    const baseUrl = `${baseClientUrl}${pathname}?${searchParams.toString()}`

    const options = {
      paymentType,
      typeSubscription: typeDescription,
      amount,
      baseUrl,
    }

    const { url } = await createSubscriptionMutation(options).unwrap()
    router.push(url)
  }

  const memoizedPlans = useMemo(() => subscriptionsCost?.data, [subscriptionsCost])

  const isCostsLoaded = !isCostsLoading && subscriptionsCost?.data.length
  const isBusiness = accountType == AccountTypeField.BUSINESS

  return (
    <VStack className={cls.ManageSubscriptions} gap="24" max>
      <SelectAccount
        activeType={accountType}
        setAccountType={setAccountType}
        isSubscriptionsExist={isSubscriptionsExist}
      />
      {isCostsLoaded && isBusiness && (
        <>
          <SelectSubscriptionPlan
            plans={memoizedPlans!}
            activePlan={subscriptionPlan}
            setSubscriptionPlan={setSubscriptionPlan}
          />
          <HStack align="center" justify={justify} gap={gap} max>
            <PayPalLogo
              role="button"
              className={cls.paymentLogo}
              onClick={createSubscription(PaymentMethodFiled.PAYPAL)}
            />
            <HStack>{t('account-managment.payments.text')}</HStack>
            <StripeLogo
              role="button"
              className={cls.paymentLogo}
              onClick={createSubscription(PaymentMethodFiled.STRIPE)}
            />
          </HStack>
        </>
      )}
      {isCreateSubscriptionLoading && (
        <FullPageLoader label={t('account-managment.loader.create')} />
      )}
    </VStack>
  )
}
