import { useGetCurrentSubscriptionQuery, CurrentSubscriptions } from '@/entities/Subscription'
import { AutoRenewal, ManageSubscriptions } from '@/features/manageSubscriptions'
import { VStack } from '@/shared/ui/Stack'

export const AccountManagement = () => {
  const { data: currentSubscriptions, isLoading } = useGetCurrentSubscriptionQuery()

  const isSubscriptionsExist = currentSubscriptions?.data && currentSubscriptions.data.length > 0

  return (
    <VStack gap="16" max>
      <CurrentSubscriptions subscriptions={currentSubscriptions?.data} isLoading={isLoading} />
      {isSubscriptionsExist && <AutoRenewal hasAutoRenewal={currentSubscriptions.hasAutoRenewal} />}
      <ManageSubscriptions isSubscriptionsExist={!!isSubscriptionsExist} />
    </VStack>
  )
}
