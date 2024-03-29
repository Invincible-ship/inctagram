import { SubscriptionCurrentType, SubscriptionCard } from '@/entities/Subscription'
import { Flex, HStack, VStack } from '@/shared/ui/Stack'
import { FC } from 'react'
import cls from './CurrentSubscription.module.scss'
import { Namespaces } from '@/shared/config/i18n/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

type CurrentSubscriptionProps = {
  isLoading?: boolean
  subscriptions: SubscriptionCurrentType[] | undefined
}

const baseKey = 'account-managment.current-subscription'

export const CurrentSubscriptions: FC<CurrentSubscriptionProps> = ({
  subscriptions,
  isLoading,
}) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const mobile = useMediaQuery('(max-width: 769px)')
  const formatter = useDateFormatter()

  const wrapperGap = mobile ? '4' : '16'
  const boxDirection = mobile ? 'column' : 'row'
  const boxGap = mobile ? '12' : '48'
  const itemDirection = mobile ? 'row' : 'column'
  const itemJustify = mobile ? 'between' : 'start'

  if (isLoading) return <CurrentSubscriptionsSkeleton />
  if (!subscriptions?.length) return

  return (
    <VStack className={cls.CurrentSubscription} gap={wrapperGap} max>
      <h3 className={cls.title}>{t(`${baseKey}.title`)}</h3>
      {subscriptions.map(subscription => {
        const { subscriptionId, dateOfPayment, endDateOfSubscription } = subscription

        return (
          <SubscriptionCard key={subscriptionId}>
            <Flex direction={boxDirection} gap={boxGap} max={mobile}>
              <Flex
                direction={itemDirection}
                justify={itemJustify}
                align="start"
                gap="12"
                max={mobile}
              >
                <HStack className={cls.infoTitle}>{t(`${baseKey}.payment-date`)}</HStack>
                <HStack className={cls.infoDate}>
                  {formatter.format(new Date(dateOfPayment))}
                </HStack>
              </Flex>
              <Flex
                direction={itemDirection}
                justify={itemJustify}
                align="start"
                gap="12"
                max={mobile}
              >
                <HStack className={cls.infoTitle}>{t(`${baseKey}.payment-next`)}</HStack>
                <HStack className={cls.infoDate}>
                  {formatter.format(new Date(endDateOfSubscription))}
                </HStack>
              </Flex>
            </Flex>
          </SubscriptionCard>
        )
      })}
    </VStack>
  )
}

export const CurrentSubscriptionsSkeleton = () => (
  <VStack gap="12" max>
    <Skeleton width="100%" height={30} border="5px"></Skeleton>
    <Skeleton width="100%" height={100} border="10px"></Skeleton>
  </VStack>
)
