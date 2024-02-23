'use client'

import { ForgotPasswordWithAuth } from '@/features/auth/forgotPassword/ui/forgotPassword'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { useContext } from 'react'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'

const ForgotPasswordPage = () => {
  const { t } = useClientTranslation(Namespaces.FORGOTPASSWORD)
  const lngId = useContext(LanguageContext) as LanguageIds

  return <ForgotPasswordWithAuth t={t} lngId={lngId} />
}
export default ForgotPasswordPage
