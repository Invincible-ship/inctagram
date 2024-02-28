'use client'
import { RecoveryPasswordWithAuth } from '@/features/auth/recoveryPassword/ui/createNewPassword'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCheckRecoveryCodeMutation } from '@/entities/User/api/userApi'
import { Routes } from '@/shared/types/routes'

const CreateNewPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code') as string
  const [check] = useCheckRecoveryCodeMutation()
  useEffect(() => {
    check({ recoveryCode: code })
      .unwrap()
      .catch(() => {
        router.push(Routes.REGISTRATION_CONFIRMATION)
      })
  }, [check, code, router])

  return <RecoveryPasswordWithAuth code={code} />
}
export default CreateNewPasswordPage
