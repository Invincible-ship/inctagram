/* eslint-disable */
'use client'

import { getIsLoading, getIsUserInited, getUserAuthData, setAuthData, useMeQuery } from '@/entities/User'
import { WithAuthOptions } from './routes'
import { ComponentType, useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Routes } from '@/shared/types/routes'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_IS_FIRST_AUTHORIZED } from '@/shared/const/localStorage'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export function withAuth<T extends JSX.IntrinsicAttributes = JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  options: WithAuthOptions
) {
  const { routeRole, userRole = '', redirectTo = '' } = options
  
  const ComponentWithAtuh = (props: Omit<T, keyof JSX.IntrinsicAttributes>) => {
    const lngId = useContext(LanguageContext) as LanguageIds
    const isLoading = useSelector(getIsLoading)
    const inited = useSelector(getIsUserInited)
    const reduxUserData = useSelector(getUserAuthData)
    const isFirstAuthorizedRef = useRef()
    const dispatch = useAppDispatch()

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
        if (!reduxUserData) {
          if (routeRole !== 'optional' && routeRole !== 'auth') {
            redirect(redirectTo || `/${lngId}${Routes.SIGNIN}`, RedirectType.replace)
          } 
        } else {
            if (routeRole === 'auth') {
              if (isFirstAuthorizedRef.current) {
                localStorage.setItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED, JSON.stringify(false))
                redirect(redirectTo || `/${lngId}${Routes.PROFILE}/${reduxUserData.userName}/edit`, RedirectType.replace)
              }
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

    return <Component {...props as T} />
  }

  return ComponentWithAtuh
}