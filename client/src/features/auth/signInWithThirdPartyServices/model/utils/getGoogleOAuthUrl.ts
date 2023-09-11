import { LanguageIds } from '@/shared/config/i18n/types'
import { GOOGLE_ENDPOINT } from '@/shared/const/apiEndpoints'
import { Routes } from '@/shared/types/routes'

export const getGoogleOAuthUrl = (lngId: LanguageIds): string => {
  // change env vars in prod
  const baseClientUrl = __IS_DEV__
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_URL

  const redirect_uri = `${baseClientUrl}${Routes.GOOGLE_CLIENT}`
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

  const qs = new URLSearchParams({
    scope: ['email', 'profile'].join(' '),
    response_type: 'code',
    redirect_uri,
    client_id,
  })

  return `${GOOGLE_ENDPOINT}?${qs.toString()}`
}
