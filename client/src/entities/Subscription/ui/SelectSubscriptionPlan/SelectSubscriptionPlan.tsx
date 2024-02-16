import React, { ChangeEvent, Dispatch, FC, SetStateAction, memo } from 'react'
import cls from './SelectSubscriptionPlan.module.scss'
import { SubscriptionCost } from '../../model/types/types'
import { SubscriptionCard } from '../SubscriptionCard/SubscriptionCard'
import { VStack } from '@/shared/ui/Stack'
import { RadioButton } from '@/shared/ui/RadioButton/RadioButton'
import { SubscriptionTypeField } from '../../model/consts/subscription'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

type SelectSubscriptionPlanProps = {
  plans: SubscriptionCost[] | undefined
  activePlan: SubscriptionTypeField
  setSubscriptionPlan: Dispatch<SetStateAction<SubscriptionTypeField>>
}

const SUBSCRIPTION_PLAN_NAME = 'subscription-plan'
const baseKey = 'account-managment.select-plan'

export const SelectSubscriptionPlan: FC<SelectSubscriptionPlanProps> = memo(
  ({ plans, activePlan, setSubscriptionPlan }) => {
    const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
    const mobile = useMediaQuery('(max-width: 769px)')
    const gap = mobile ? '4' : '16'

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.currentTarget
      checked && setSubscriptionPlan(value as SubscriptionTypeField)
    }

    if (!plans) return

    return (
      <VStack className={cls.SelectSubscriptionPlan} gap={gap} max>
        <h3 className={cls.title}>{t(`${baseKey}.title`)}</h3>
        <SubscriptionCard>
          <VStack gap="24">
            {plans.map(({ amount, typeDescription }) => {
              const checked = typeDescription == activePlan

              return (
                <RadioButton
                  key={typeDescription}
                  name={SUBSCRIPTION_PLAN_NAME}
                  id={typeDescription}
                  value={typeDescription}
                  label={t(`${baseKey}.${typeDescription}`, { amount })}
                  onChange={onChange}
                  checked={checked}
                />
              )
            })}
          </VStack>
        </SubscriptionCard>
      </VStack>
    )
  },
)

SelectSubscriptionPlan.displayName = 'SelectSubscriptionPlan'
