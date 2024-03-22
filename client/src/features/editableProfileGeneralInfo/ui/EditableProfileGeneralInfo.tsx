'use client'

import {
  ProfileGeneralInfo,
  TGeneralInfo,
  generalInfoSchemaFn,
  useUpdateProfileMutation,
} from '@/entities/Profile'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { getProfileGeneralInfo } from '../model/selectors/getProfileGeneralInfo'
import toast from 'react-hot-toast'
import { getUserId } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { revalidateDataByTag } from '@/shared/lib/serverActions/revalidateDataByTag'
import { VIEWER_TAG } from '@/shared/const/rtk'

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
      resetForm(undefined, { keepValues: true, keepErrors: true })

      revalidateDataByTag(VIEWER_TAG)
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
