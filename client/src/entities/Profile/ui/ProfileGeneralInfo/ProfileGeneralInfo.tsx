import { TGeneralInfo } from '@/features/editableProfileSettings/model/types/generalInfo'
import { Namespaces } from '@/shared/config/i18n/types'
import Input from '@/shared/ui/Input/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { FC, Key } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import cls from './ProfileGeneralInfo.module.scss'
import { TextArea } from '@/shared/ui/TextArea/TextArea'

type ProfileGeneralInfoProps = {
  handleSubmit: () => void
  errors: FieldErrors<TGeneralInfo>
  register: UseFormRegister<TGeneralInfo>
  fieldsValues: TGeneralInfo
  t: TFunction<Namespaces, undefined>
}

export const ProfileGeneralInfo: FC<ProfileGeneralInfoProps> = ({
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
            const normalizeValue = value as keyof TGeneralInfo

            switch (value) {
              case 'birthday':
                return <h1>Calendar</h1>
              case 'city':
                return <h1>City select</h1>
              case 'aboutMe':
                return (
                  <TextArea
                    maxLength={200}
                    id={normalizeValue}
                    key={normalizeValue}
                    title={t(`general-info.${normalizeValue}`)}
                    {...register(normalizeValue)}
                  />
                )
              default:
                return (
                  <Input
                    full
                    id={normalizeValue}
                    key={normalizeValue}
                    title={t(`general-info.${normalizeValue}`)}
                    error={errors?.[normalizeValue]}
                    {...register(normalizeValue)}
                  />
                )
            }
          })}
        </VStack>
      </form>
    </HStack>
  )
}
