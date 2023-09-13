import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { redirect, useSearchParams } from 'next/navigation'
import { FC, useCallback, useContext, useEffect } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { setAuthData, useSignInWithGithubQuery, useSignInWithGoogleQuery } from '@/entities/User'
import { Routes } from '@/shared/types/routes'
import { ThirdPartyOauthServices } from '@/shared/types/thirdPartyOauthServices'

type SignInWithThirdPartyServicesPageProps = {
  oauth: ThirdPartyOauthServices
}

const signInOAuthQuery = {
  [ThirdPartyOauthServices.GOOGLE]: useSignInWithGoogleQuery,
  [ThirdPartyOauthServices.GITHUB]: useSignInWithGithubQuery,
}

export const SignInWithThirdPartyServicesPage: FC<SignInWithThirdPartyServicesPageProps> = ({
  oauth,
}) => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const dispatch = useAppDispatch()

  const { data: signInOAuthResponse, isSuccess, error } = signInOAuthQuery[oauth](code)

  const checkOAuth = useCallback(() => {
    if (isSuccess) {
      console.log('SignIn with google response: ', signInOAuthResponse)
      const { isAuth = false, accessToken, user } = signInOAuthResponse

      dispatch(setAuthData({ accessToken, user }))

      isAuth ? redirect(`/${lngId}${Routes.MAIN}`) : redirect(`/${lngId}${Routes.PROFILE}`)
    }

    if (error && 'status' in error && error.status == 400) {
      redirect(`/${lngId}${Routes.MERGE}`)
    }

    // TODO: add ErrorPage
    console.warn(error)
  }, [signInOAuthResponse, isSuccess, error, dispatch, lngId])

  useEffect(() => {
    checkOAuth()
  }, [checkOAuth])

  return <Preloader />
}
