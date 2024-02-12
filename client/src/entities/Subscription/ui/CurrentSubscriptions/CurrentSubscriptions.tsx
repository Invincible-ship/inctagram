import { SubscriptionCurrentType, SubscriptionCard } from '@/entities/Subscription'
import { Flex, HStack, VStack } from '@/shared/ui/Stack'
import { FC, useContext } from 'react'
import cls from './CurrentSubscription.module.scss'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { mapLngToLocale } from '@/shared/config/i18n/settings'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

type CurrentSubscriptionProps = {
  subscriptions: SubscriptionCurrentType[]
  hasAutoRenewal: boolean
}

const baseKey = 'account-managment.current-subscription'

export const CurrentSubscriptions: FC<CurrentSubscriptionProps> = ({ subscriptions }) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const mobile = useMediaQuery('(max-width: 769px)')
  const lngId = useContext(LanguageContext) as LanguageIds
  const locale = mapLngToLocale[lngId]
  const formatter = new Intl.DateTimeFormat(locale)

  const wrapperGap = mobile ? '4' : '16'
  const boxDirection = mobile ? 'column' : 'row'
  const boxGap = mobile ? '12' : '48'
  const itemDirection = mobile ? 'row' : 'column'
  const itemJustify = mobile ? 'between' : 'start'

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
