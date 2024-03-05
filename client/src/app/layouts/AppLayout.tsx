'use client'

import { getIsUserInited, getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Header'
import { Sidebar, SidebarSkeleton } from '@/widgets/Sidebar'
import { FC, ReactNode, Suspense, useMemo } from 'react'
import { Toaster } from '@/shared/ui/Toaster/Toaster'
import { useSelector } from 'react-redux'
import { CreatePost } from '@/features/createPost'
import { LanguageIds } from '@/shared/config/i18n/types'
import { getIsLoading as getIsUserLoading } from '@/entities/User'

type AppLayoutProps = {
  children: ReactNode
  lngId: LanguageIds
}

export const AppLayout: FC<AppLayoutProps> = ({ children, lngId }) => {
  const isUserLoading = useSelector(getIsUserLoading)
  const isUserInited = useSelector(getIsUserInited)
  const isAuthorized = !!useSelector(getUserAuthData)

  const pageContainerMods = useMemo(
    () => ({
      padding: isAuthorized || isUserLoading,
    }),
    [isAuthorized, isUserLoading],
  )

  return (
    <>
      <Header isAuthorized={isAuthorized} isUserInited={isUserInited} />
      <div className="app-container">
        {isUserLoading && <SidebarSkeleton />}
        {isAuthorized && (
          <>
            <Sidebar />
            <CreatePost />
          </>
        )}
        <div className={classNames('page-container', pageContainerMods)}>{children}</div>
      </div>
      <Toaster />
    </>
  )
}
