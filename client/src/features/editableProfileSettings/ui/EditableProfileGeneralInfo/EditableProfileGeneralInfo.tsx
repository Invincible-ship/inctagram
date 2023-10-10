'use client'

import { ProfileGeneralInfo, useUpdateProfileGeneralInfoMutation } from '@/entities/Profile'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useContext, useEffect } from 'react'
import { generalInfoSchemaFn, TGeneralInfo } from '../../model/types/generalInfo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { getProfileGeneralInfo } from '@/entities/Profile/model/selectors/getProfileGeneralInfo'
import toast from 'react-hot-toast'

export const EditableProfileGeneralInfo = () => {
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.PROFILE_SETTINGS)
  const GeneralInfoSchema = generalInfoSchemaFn(t)

  const [updateProfileGeneralInfo, { isError, isSuccess, isLoading, reset: resetMutation }] =
    useUpdateProfileGeneralInfoMutation()
  const profileGeneralInfoData = useSelector(getProfileGeneralInfo)

  const {
    control,
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    watch,
  } = useForm<TGeneralInfo>({
    resolver: zodResolver(GeneralInfoSchema),
    mode: 'all',
    defaultValues: profileGeneralInfoData,
  })

  // TODO: delete when form will be absolutly complete
  if (__IS_DEV__) {
    console.log('Form errors: ', errors)
    console.log('Form values: ', watch())
    console.log('Form is valid?: ', isValid)
    console.log('Form is dirty?: ', isDirty)
  }

  useEffect(() => {
    resetForm(profileGeneralInfoData)
  }, [profileGeneralInfoData])

  const onSubmit = (data: TGeneralInfo) => {
    updateProfileGeneralInfo(data)
  }

  if (isError) {
    toast.error(t('general-info.errors.update'))
    resetMutation()
  }
  if (isSuccess) toast.success(t('general-info.update-success'))

  return (
    profileGeneralInfoData && (
      <ProfileGeneralInfo
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        setValue={setValue}
        isDirtyFields={isDirty}
        isFieldsValid={isValid}
        isLoading={isLoading}
        fieldsValues={profileGeneralInfoData as TGeneralInfo}
        t={t}
      />
    )
  )
}
