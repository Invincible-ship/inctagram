import { LanguageIds } from '@/shared/config/i18n/types'
import { GITHUB_ENDPOINT } from '@/shared/const/apiEndpoints'
import { Routes } from '@/shared/types/routes'

export const getGithubOAuthUrl = (lngId: LanguageIds): string => {
  const baseClientUrl = __IS_DEV__
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_URL

  const redirect_uri = `${baseClientUrl}${lngId}/${Routes.GITHUB_CLIENT}`
  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string

  const qs = new URLSearchParams({
    client_id,
    scope: ['user', 'email'].join(':'),
    redirect_uri,
  })

  return `${GITHUB_ENDPOINT}?${qs.toString()}`
}
