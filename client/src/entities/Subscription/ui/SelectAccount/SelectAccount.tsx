import { AccountTypeField } from '../../model/consts/account'
import { VStack } from '@/shared/ui/Stack'
import { Dispatch, FC, SetStateAction, memo, useMemo, ChangeEvent } from 'react'
import cls from './SelectAccount.module.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { SubscriptionCard } from '../SubscriptionCard/SubscriptionCard'
import { RadioButton } from '@/shared/ui/RadioButton/RadioButton'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

type AccountName = 'accounts'

type SelectAccountProps = {
  activeType: AccountTypeField
  setAccountType: Dispatch<SetStateAction<AccountTypeField>>
  isSubscriptionsExist: boolean
}

type AccountOptions = {
  id: AccountTypeField
  value: AccountTypeField
  name: AccountName
  label: string
}

const baseKey = 'account-managment.select-account'

export const SelectAccount: FC<SelectAccountProps> = memo(
  ({ activeType, setAccountType, isSubscriptionsExist }) => {
    const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
    const mobile = useMediaQuery('(max-width: 769px)')
    const gap = mobile ? '4' : '16'

    const accountOptions: AccountOptions[] = useMemo(
      () => [
        {
          id: AccountTypeField.PERSONAL,
          value: AccountTypeField.PERSONAL,
          name: 'accounts',
          label: t(`${baseKey}.personal`),
        },
        {
          id: AccountTypeField.BUSINESS,
          value: AccountTypeField.BUSINESS,
          name: 'accounts',
          label: t(`${baseKey}.business`),
        },
      ],
      [t],
    )

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.currentTarget

      checked && setAccountType(value as AccountTypeField)
    }

    return (
      <VStack className={cls.SelectAccount} gap={gap} max>
        <h3 className={cls.title}>{t(`${baseKey}.title`)}</h3>
        <SubscriptionCard>
          <VStack gap="24" max>
            {accountOptions.map(type => {
              const { id, value, name, label } = type
              const disabled = id == AccountTypeField.PERSONAL && isSubscriptionsExist
              const checked = activeType == value

              return (
                <RadioButton
                  key={id}
                  id={id}
                  value={value}
                  name={name}
                  label={label}
                  onChange={onChange}
                  checked={checked}
                  disabled={disabled}
                />
              )
            })}
          </VStack>
        </SubscriptionCard>
      </VStack>
    )
  },
)

SelectAccount.displayName = 'SelectAccount'
