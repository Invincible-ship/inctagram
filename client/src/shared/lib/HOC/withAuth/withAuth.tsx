/* eslint-disable */
'use client'

import { getIsLoading, getIsUserInited, getUserAuthData } from '@/entities/User'
import { WithAuthOptions } from './routes'
import { ComponentType, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Routes } from '@/shared/types/routes'

export function withAuth<T extends JSX.IntrinsicAttributes = JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  config: WithAuthOptions
) {
  const { routeRole, userRole = '', redirectTo = '' } = config
  
  const ComponentWithAtuh = (props: Omit<T, keyof JSX.IntrinsicAttributes>) => {
    const isLoading = useSelector(getIsLoading)
    const inited = useSelector(getIsUserInited)
    const userAuthData = useSelector(getUserAuthData)
    console.log({
      inited,
      isLoading,
      userAuthData
    })

    useEffect(() => {
      if (!isLoading && inited) {
        if (!userAuthData) {
          if (routeRole !== 'optional' && routeRole !== 'auth') {
            redirect(redirectTo || Routes.SIGNIN, RedirectType.replace)
          } 
        } else {
            if (routeRole === 'auth') {
              redirect(redirectTo || Routes.MAIN, RedirectType.replace)
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