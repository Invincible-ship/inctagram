'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Card } from '@/shared/ui/Card/Card'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import toast from 'react-hot-toast'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useCreateNewPasswordMutation } from '@/entities/User/api/userApi'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './createNewPassword.module.scss'
import {
  FormSchemaType,
  formCreatePasswordSchema,
} from '@/features/auth/recoveryPassword/lib/validationConstants/validationConstants'
import { Routes } from '@/shared/types/routes'

type Props = {
  code: string
}
export const CreateNewPassword = ({ code }: Props) => {
  const router = useRouter()
  const { t } = useClientTranslation(Namespaces.CREATENEWPASSWORD)
  const schema = formCreatePasswordSchema(t)
  const [recover, { isLoading }] = useCreateNewPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: {
      isValid,
      errors: { password, confirmPassword },
    },
  } = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    const { password } = data
    try {
      await recover({ newPassword: password, recoveryCode: code }).unwrap()
      router.push(Routes.SIGNIN)
    } catch (e) {
      if (isFetchBaseQueryError(e)) {
        const apiError = e.data as ApiError
        if (Array.isArray(apiError.messages)) {
          toast.error(apiError.messages[0].message)
        }
      }
    }
  }
  return (
    <Card t={t} title={'createNewPasswordTitle'}>
      <form onSubmit={handleSubmit(onSubmit)} className={'form-style'}>
        <PasswordWrapper
          className={s.newPassword}
          register={register('password')}
          id={'recover-password'}
          type={'password'}
          placeholder={t('newPassword')}
          title={t('newPassword')}
          error={password}
        />
        <PasswordWrapper
          id={'recover-password'}
          placeholder={t('passwordConfirmation')}
          type={'password'}
          title={t('passwordConfirmation')}
          register={register('confirmPassword')}
          error={confirmPassword}
        />
        <div className={s.text}>{t('passwordMust')}</div>
        <Button disabled={!isValid || isLoading} isLoading={isLoading} full type={'submit'}>
          {t('createNewPassword')}
        </Button>
      </form>
    </Card>
  )
}

export const RecoveryPasswordWithAuth = withAuth(CreateNewPassword, { routeRole: 'auth' })
