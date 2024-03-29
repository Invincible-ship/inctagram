import { useCancelAutoRenewalMutation } from '@/entities/Subscription'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { HStack } from '@/shared/ui/Stack'
import { FC } from 'react'
import cls from './AutoRenewal.module.scss'

type AutoRenewalProps = {
  hasAutoRenewal?: boolean
}

const CHECKBOX_VALUE = 'auto-renewal'

export const AutoRenewal: FC<AutoRenewalProps> = ({ hasAutoRenewal }) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const [cancelAutoRenewalMutation] = useCancelAutoRenewalMutation()

  const onClick = () => {
    if (hasAutoRenewal) {
      cancelAutoRenewalMutation()
    }
  }

  return (
    <HStack gap="12" align="center">
      <Checkbox
        value={CHECKBOX_VALUE}
        checked={hasAutoRenewal}
        onClick={onClick}
        disabled={!hasAutoRenewal}
      />
      <HStack className={cls.text}>{t('account-managment.auto-renewal')}</HStack>
    </HStack>
  )
}
