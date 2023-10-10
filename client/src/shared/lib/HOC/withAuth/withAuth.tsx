/* eslint-disable */
'use client'

import { getIsLoading, getIsUserInited, getUserAuthData } from '@/entities/User'
import { WithAuthOptions } from './routes'
import { ComponentType, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Routes } from '@/shared/types/routes'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_IS_FIRST_AUTHORIZED } from '@/shared/const/localStorage'

export function withAuth<T extends JSX.IntrinsicAttributes = JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  config: WithAuthOptions
) {
  const { routeRole, userRole = '', redirectTo = '' } = config
  
  const ComponentWithAtuh = (props: Omit<T, keyof JSX.IntrinsicAttributes>) => {
    const lngId = useContext(LanguageContext) as LanguageIds
    const isLoading = useSelector(getIsLoading)
    const inited = useSelector(getIsUserInited)
    const userAuthData = useSelector(getUserAuthData)
    const isFirstAuthorizedRef = useRef()

    if (typeof window !== 'undefined') {
      isFirstAuthorizedRef.current = 
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED) as string)
    }

    console.log({
      inited,
      isLoading,
      userAuthData
    })

    useEffect(() => {
      if (!isLoading && inited) {
        if (!userAuthData) {
          if (routeRole !== 'optional' && routeRole !== 'auth') {
            redirect(redirectTo || `/${lngId}${Routes.SIGNIN}`, RedirectType.replace)
          } 
        } else {
            if (routeRole === 'auth') {
              if (isFirstAuthorizedRef.current) {
                localStorage.setItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED, JSON.stringify(false))
                redirect(redirectTo || `/${lngId}${Routes.PROFILE}/${userAuthData.id}/edit`, RedirectType.replace)
              }
              redirect(redirectTo || `/${lngId}${Routes.MAIN}`, RedirectType.replace)
            }
        }
      }
    }, [inited, userAuthData, routeRole, isLoading])

    if (
      (isLoading || !userAuthData || !inited) &&
      routeRole !== 'auth' &&
      routeRole !== 'optional'
    ) {
      return <Preloader />
    }

    return <Component {...props as T} />
  }

  return ComponentWithAtuh
}