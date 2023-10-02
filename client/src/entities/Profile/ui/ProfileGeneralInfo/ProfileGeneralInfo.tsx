import { TGeneralInfo } from '@/features/editableProfileSettings/model/types/generalInfo'
import { Namespaces } from '@/shared/config/i18n/types'
import Input from '@/shared/ui/Input/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import cls from './ProfileGeneralInfo.module.scss'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker'

type ProfileGeneralInfoProps = {
  control: Control<TGeneralInfo>
  handleSubmit: () => void
  errors: FieldErrors<TGeneralInfo>
  register: UseFormRegister<TGeneralInfo>
  fieldsValues: TGeneralInfo
  t: TFunction<Namespaces, undefined>
}

export const ProfileGeneralInfo: FC<ProfileGeneralInfoProps> = ({
  control,
  handleSubmit,
  errors,
  register,
  fieldsValues,
  t,
}) => {
  return (
    <HStack gap="8" max>
      <h1>Avatar field</h1>
      <form onSubmit={handleSubmit} className={cls.form}>
        <VStack gap="24" max>
          {Object.keys(fieldsValues).map(value => {
            const normalizedValue = value as keyof TGeneralInfo

            switch (value) {
              case 'birthday':
                return (
                  <DatePicker
                    control={control}
                    value={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    error={errors?.[normalizedValue]}
                    max
                  />
                )
              case 'city':
                return <h1>City select</h1>
              case 'aboutMe':
                return (
                  <TextArea
                    maxLength={200}
                    id={normalizedValue}
                    key={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    {...register(normalizedValue)}
                  />
                )
              default:
                return (
                  <Input
                    full
                    id={normalizedValue}
                    key={normalizedValue}
                    title={t(`general-info.${normalizedValue}`)}
                    error={errors?.[normalizedValue]}
                    {...register(normalizedValue)}
                  />
                )
            }
          })}
        </VStack>
      </form>
    </HStack>
  )
}
