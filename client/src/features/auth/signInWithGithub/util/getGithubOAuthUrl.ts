import { GITHUB_ENDPOINT, SIGN_IN_WITH_GITHUB } from '@/shared/const/apiEndpoints'

export const getGithubOAuthUrl = (): string => {
  const redirect_uri = `${process.env.NEXT_PUBLIC_API}${SIGN_IN_WITH_GITHUB}`
  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string

  console.log(redirect_uri)

  const qs = new URLSearchParams({
    client_id,
    scope: ['user', 'email'].join(':'),
    redirect_uri,
  })

  return `${GITHUB_ENDPOINT}?${qs.toString()}`
}
