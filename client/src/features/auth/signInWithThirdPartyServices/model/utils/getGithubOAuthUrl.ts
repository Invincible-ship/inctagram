import { SIGN_IN_WITH_GITHUB_ENDPOINT } from '@/shared/const/apiEndpoints'

export const getGithubOAuthUrl = (lngId: any = '') => {
  const githubUrl = new URL(SIGN_IN_WITH_GITHUB_ENDPOINT, process.env.NEXT_PUBLIC_API as string)

  return githubUrl.href
}
