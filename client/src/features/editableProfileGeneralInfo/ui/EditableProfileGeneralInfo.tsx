'use client'

import { ProfileGeneralInfo, useUpdateProfileMutation } from '@/entities/Profile'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useEffect } from 'react'
import { generalInfoSchemaFn, TGeneralInfo } from '../model/types/generalInfo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { getProfileGeneralInfo } from '../model/selectors/getProfileGeneralInfo'
import toast from 'react-hot-toast'
import { getUserId } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'

const defaultGeneralInfoValues: TGeneralInfo = {
  userName: '',
  firstName: '',
  lastName: '',
}

export const EditableProfileGeneralInfo = () => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const GeneralInfoSchema = generalInfoSchemaFn(t)
  const userId = useSelector(getUserId)
  const profileGeneralInfoData = useSelector(getProfileGeneralInfo)

  const [updateProfileData, { isError, isSuccess, isLoading, error, reset: resetMutation }] =
    useUpdateProfileMutation()

  const {
    control,
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<TGeneralInfo>({
    resolver: zodResolver(GeneralInfoSchema),
    mode: 'all',
    defaultValues: defaultGeneralInfoValues,
    values: profileGeneralInfoData,
  })

  useEffect(() => {
    if (isSuccess) toast.success(t('general-info.update-success'))

    if (isError) toast.error(t('general-info.errors.update'))

    if (error && isFetchBaseQueryError(error)) {
      const apiError = error.data as ApiError

      if (Array.isArray(apiError.messages) && apiError.messages.length) {
        apiError.messages.forEach(({ message, field }) => {
          setError(field as keyof TGeneralInfo, { type: 'server', message })
        })
      }
    }

    if (isSuccess || isError) resetMutation()
  }, [isSuccess, isError, error])

  const onSubmit = async (profileData: TGeneralInfo) => {
    const normalizedProfileData = !profileData.aboutMe
      ? { ...profileData, aboutMe: null }
      : profileData

    await updateProfileData({ ...normalizedProfileData, id: userId })

    resetForm(undefined, { keepValues: true, keepErrors: true })
  }

  return (
    profileGeneralInfoData && (
      <ProfileGeneralInfo
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        isDirtyFields={isDirty}
        isFieldsValid={isValid}
        isLoading={isLoading}
        fieldsValues={profileGeneralInfoData as TGeneralInfo}
        t={t}
      />
    )
  )
}
