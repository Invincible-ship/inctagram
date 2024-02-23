'use client'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { FC, ReactNode, useMemo } from 'react'
import { Toaster } from '@/shared/ui/Toaster/Toaster'
import { useSelector } from 'react-redux'
import { CreatePost } from '@/features/createPost'
import { LanguageIds } from '@/shared/config/i18n/types'

type AppLayoutProps = {
  children: ReactNode
  lngId: LanguageIds
}

export const AppLayout: FC<AppLayoutProps> = ({ children, lngId }) => {
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
        <div className={classNames('page-container', pageContainerMods)}>{children}</div>
      </div>
      <Toaster />
    </>
  )
}
