'use client'

import { IProfile, ProfileGeneralInfo, useUpdateProfileMutation } from '@/entities/Profile'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useContext, useEffect } from 'react'
import { generalInfoSchemaFn, TGeneralInfo } from '../../model/types/generalInfo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { getProfileGeneralInfo } from '../../model/selectors/getProfileGeneralInfo'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProfileDataThunk } from '../../model/getProfileDataThunk'
import { getUserId } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'

const defaultGeneralInfoValues: TGeneralInfo = {
  userName: '',
  firstName: '',
  lastName: '',
}

export const EditableProfileGeneralInfo = () => {
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.PROFILE_SETTINGS)
  const GeneralInfoSchema = generalInfoSchemaFn(t)
  const dispatch = useAppDispatch()
  const userId = useSelector(getUserId)

  const [updateProfileData, { isError, isSuccess, isLoading, error, reset: resetMutation }] =
    useUpdateProfileMutation()

  const profileGeneralInfoData = useSelector(getProfileGeneralInfo)

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

  useEffect(() => {
    if (userId) dispatch(getProfileDataThunk(userId))
  }, [userId, dispatch])

  const onSubmit = async (profileData: TGeneralInfo) => {
    const normalizedProfileData = !profileData.aboutMe
      ? { ...profileData, aboutMe: null }
      : profileData

    await updateProfileData(normalizedProfileData as Omit<Partial<IProfile>, 'id'>)

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
