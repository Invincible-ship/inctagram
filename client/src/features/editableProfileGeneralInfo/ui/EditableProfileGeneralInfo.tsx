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
import { revalidateDataByPath } from '@/shared/lib/serverActions/revalidateDataByPath'
import { VIEWER_TAG } from '@/shared/const/rtk'
import { getInternetConnection } from '@/shared/utils/getInternetConnection'

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

  const [updateProfileData, { isLoading }] = useUpdateProfileMutation()

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

  const onSubmit = async (profileData: TGeneralInfo) => {
    try {
      await updateProfileData({ ...profileData, id: userId }).unwrap()
      toast.success(t('general-info.update-success'))
      revalidateDataByPath(VIEWER_TAG)

      resetForm(undefined, { keepValues: true, keepErrors: true })
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (err.status == 'FETCH_ERROR') {
          toast.error(t('general-info.errors.internet'))
          return
        }

        toast.error(t('general-info.errors.update'))
        const apiError = err.data as ApiError

        if (Array.isArray(apiError.messages) && apiError.messages.length) {
          apiError.messages.forEach(({ message, field }) => {
            setError(field as keyof TGeneralInfo, { type: 'server', message })
          })
        }
      }
    }
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
