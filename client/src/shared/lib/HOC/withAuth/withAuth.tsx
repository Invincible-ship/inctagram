/* eslint-disable */
'use client'

import { getIsLoading, getIsUserInited, getUserAuthData } from '@/entities/User'
import { UserRole, WithAuthOptions } from './routes'
import { ComponentType, FC, FunctionComponent, useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { redirect, usePathname } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Routes } from '@/shared/types/routes'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_IS_FIRST_AUTHORIZED } from '@/shared/const/localStorage'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export function withAuth(
  Component: FC<any>,
  options: WithAuthOptions
) {
  const { routeRole, userRole = '', redirectTo = '' } = options
  
  const ComponentWithAtuh = (props: any) => {
    const lngId = useContext(LanguageContext) as LanguageIds
    const isLoading = useSelector(getIsLoading)
    const inited = useSelector(getIsUserInited)
    const reduxUserData = useSelector(getUserAuthData)
    const isFirstAuthorizedRef = useRef()
    const pathname = usePathname()

    if (typeof window !== 'undefined') {
      isFirstAuthorizedRef.current = 
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED) as string)
    }

    console.log({
      inited,
      isLoading,
      reduxUserData
    })

    useEffect(() => {
      if (!isLoading && inited) {
        // Отсутствуют данные текущего пользователя (т.е. не зарегистрирован в системе)
        if (!reduxUserData) {
          // В случае если роут не опциональный, которым могут пользоваться все, либо же в случае если роут не представляет собой авторизацию пользователя (signin, signup) 
          if (routeRole !== 'optional' && routeRole !== 'auth') {
            redirect(redirectTo || `/${lngId}${Routes.SIGNIN}`, RedirectType.replace)
          }
        // Пользователь зарегистрирован в системе 
        } else {
            // Если авторизованный пользователь пытается попасть на роут авторизации
            if (routeRole === 'auth') {
              // Пользователь впервые зарегистрировался в приложении
              if (isFirstAuthorizedRef.current) {
                localStorage.setItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED, JSON.stringify(false))
                redirect(redirectTo || `/${lngId}${Routes.PROFILE}/${reduxUserData.userName}/edit`, RedirectType.replace)
              }
              redirect(redirectTo || `/${lngId}${Routes.MAIN}`, RedirectType.replace)
            }

            // Подрузамевается, что в приватных роутах, доступных только текущему пользователю, в pathname всегда присутствует userId
            if (userRole == UserRole.ADMIN) {
              if (pathname.substring(reduxUserData.userId)) 
                redirect(redirectTo || `/${lngId}${Routes.MAIN}`, RedirectType.replace)
            }
        }
      }
    }, [inited, reduxUserData, routeRole, isLoading])

    if (
      (isLoading || !reduxUserData || !inited) &&
      routeRole !== 'auth' &&
      routeRole !== 'optional'
    ) {
      return <Preloader />
    }

    return <Component {...props} />
  }

  return ComponentWithAtuh
}