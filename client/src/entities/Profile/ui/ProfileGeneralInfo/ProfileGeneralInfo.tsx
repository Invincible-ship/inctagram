import { TGeneralInfo } from '@/features/editableProfileGeneralInfo'
import { Namespaces } from '@/shared/config/i18n/types'
import Input from '@/shared/ui/Input/Input'
import { Flex, HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import cls from './ProfileGeneralInfo.module.scss'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { DatePicker } from '@/widgets/DatePicker/DatePicker'
import { CitySelect } from '@/widgets/CitySelect/CitySelect'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import { UploadAvatar } from '@/features/uploadAvatar'

type ProfileGeneralInfoProps = {
  control: Control<TGeneralInfo>
  handleSubmit: () => void
  errors: FieldErrors<TGeneralInfo>
  register: UseFormRegister<TGeneralInfo>
  isDirtyFields: boolean
  isFieldsValid: boolean
  isLoading?: boolean
  fieldsValues: TGeneralInfo
  t: TFunction<Namespaces, undefined>
}

export const ProfileGeneralInfo: FC<ProfileGeneralInfoProps> = ({
  control,
  handleSubmit,
  errors,
  register,
  isDirtyFields,
  isFieldsValid,
  isLoading,
  fieldsValues,
  t,
}) => {
  const matches = useMediaQuery('(max-width: 768px)')
  const direction = matches ? 'column' : 'row'
  const align = direction == 'column' ? 'center' : 'start'

  return (
    <Flex className={cls.ProfileGeneralInfo} direction={direction} align={align} gap="36" max>
      <UploadAvatar t={t} />
      <form onSubmit={handleSubmit} className={cls.form}>
        <VStack gap="24" max>
          {Object.keys(fieldsValues).map(value => {
            const normalizedValue = value as keyof TGeneralInfo

            switch (normalizedValue) {
              case 'dateOfBirth':
                return (
                  <DatePicker
                    key={normalizedValue}
                    control={control}
                    name={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    error={errors?.[normalizedValue]}
                    max
                  />
                )
              case 'city':
                return (
                  <CitySelect
                    control={control}
                    name={normalizedValue}
                    key={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    max
                  />
                )
              case 'aboutMe':
                return (
                  <TextArea
                    maxLength={200}
                    id={normalizedValue}
                    key={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    error={errors?.[normalizedValue]}
                    {...register(normalizedValue)}
                  />
                )
              default:
                return (
                  <Input
                    full
                    required
                    id={normalizedValue}
                    key={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    error={errors?.[normalizedValue]}
                    {...register(normalizedValue)}
                  />
                )
            }
          })}

          <Button
            className={cls.submitButton}
            type="submit"
            theme={ButtonTheme.DEFAULT}
            disabled={!isDirtyFields || !isFieldsValid || isLoading}
            isLoading={isLoading}
            full={matches}
          >
            {t('general-info.button')}
          </Button>
        </VStack>
      </form>
      {!matches && <span className={cls.underline}></span>}
    </Flex>
  )
}
