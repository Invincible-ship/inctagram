'use client'

import { ProfileGeneralInfo } from '@/entities/Profile'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useCallback, useContext, useEffect } from 'react'
import { generalInfoSchemaFn, TGeneralInfo } from '../../model/types/generalInfo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { getProfileGeneralInfo } from '../../model/selectors/getProfileGeneralInfo'
import { getUserAuthData } from '@/entities/User'

export const EditableProfileGeneralInfo = () => {
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.PROFILE_SETTINGS)
  const GeneralInfoSchema = generalInfoSchemaFn(t)

  const profileGeneralInfoData = useSelector(getProfileGeneralInfo)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TGeneralInfo>({
    resolver: zodResolver(GeneralInfoSchema),
    mode: 'onBlur',
    defaultValues: profileGeneralInfoData,
  })

  useEffect(() => {
    reset(profileGeneralInfoData)
  }, [profileGeneralInfoData])

  const onSubmit = (data: TGeneralInfo) => {}

  const submitWithReactHookForm = useCallback(() => {
    handleSubmit(onSubmit)
  }, [handleSubmit])

  return (
    profileGeneralInfoData && (
      <ProfileGeneralInfo
        handleSubmit={submitWithReactHookForm}
        errors={errors}
        register={register}
        fieldsValues={profileGeneralInfoData as TGeneralInfo}
        t={t}
      />
    )
  )
}
