import { SIGN_IN_WITH_GOOGLE } from '@/shared/const/apiEndpoints'

export const getGoogleParams = (): string => {
  const redirect_uri = `${process.env.NEXT_PUBLIC_API}${SIGN_IN_WITH_GOOGLE}`
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

  const params = new URLSearchParams({
    scope: ['email', 'profile'].join(' '),
    response_type: 'code',
    redirect_uri,
    client_id,
  })

  return params.toString()
}
