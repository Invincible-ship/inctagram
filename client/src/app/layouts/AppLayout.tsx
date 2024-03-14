'use client'

import { getIsUserInited, getUserId } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Header'
import { Sidebar, SidebarSkeleton } from '@/widgets/Sidebar'
import { FC, ReactNode, Suspense, useMemo } from 'react'
import { Toaster } from '@/shared/ui/Toaster/Toaster'
import { useSelector } from 'react-redux'
import { LanguageIds } from '@/shared/config/i18n/types'
import { getIsLoading as getIsUserLoading } from '@/entities/User'
import dynamic from 'next/dynamic'
const CreatePost = dynamic(() => import('@/features/post/createPost').then(mod => mod.CreatePost))

type AppLayoutProps = {
  children: ReactNode
  lngId: LanguageIds
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const isUserLoading = useSelector(getIsUserLoading)
  const isUserInited = useSelector(getIsUserInited)
  const isAuthorized = !!useSelector(getUserId)

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
            <Suspense fallback={<SidebarSkeleton />}>
              <Sidebar />
            </Suspense>
            <CreatePost />
          </>
        )}
        <main className={classNames('page-container', pageContainerMods)}>{children}</main>
      </div>
      <Toaster />
    </>
  )
}
