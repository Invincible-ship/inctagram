'use client'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { FC, ReactNode, Suspense, useMemo } from 'react'
import { Toaster } from '@/shared/ui/Toaster/Toaster'
import { useSelector } from 'react-redux'
import { LanguageIds } from '@/shared/config/i18n/types'
import { CreatePost } from '@/features/createPost'

type AppLayoutProps = {
  children: ReactNode
  Fallback: FC<any>
}

export const AppLayout: FC<AppLayoutProps> = ({ children, Fallback }) => {
  const isAuthorized = !!useSelector(getUserAuthData)

  const pageContainerMods = useMemo(
    () => ({
      padding: isAuthorized,
    }),
    [isAuthorized],
  )

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <div className="app-container">
        {isAuthorized && (
          <>
            <Sidebar />
            <CreatePost />
          </>
        )}
        <div className={classNames('page-container', pageContainerMods)}>
          <Suspense fallback={<Fallback />}>{children}</Suspense>
        </div>
      </div>
      <Toaster />
    </>
  )
}
