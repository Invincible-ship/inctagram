'use client'

import { FC, useContext } from 'react'
import OutlineBell from '@/shared/assets/icons/bell-outline.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import cls from './Header.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'
import { HeaderMenu } from './HeaderMenu'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { LangSwitcher } from '@/features/LangSwitcher'

type HeaderProps = {
  isUserInited?: boolean
  isAuthorized?: boolean
}

export const Header: FC<HeaderProps> = ({ isAuthorized, isUserInited }) => {
  const lngId = useContext(LanguageContext)
  const mobile = useMediaQuery('(max-width: 769px)')

  return (
    <header className={cls.headerWrapper}>
      <div className="app-container">
        <HStack className={cls.header} justify="between" align="center">
          <HStack align="center">
            <Link href={`/${lngId}${Routes.MAIN}`}>
              <Logo />
            </Link>
          </HStack>
          <HStack align="center" gap={!mobile ? '36' : '12'}>
            {!mobile && isAuthorized && (
              <HStack align="center">
                <OutlineBell />
              </HStack>
            )}
            <LangSwitcher />
            {!isAuthorized &&
              (isUserInited ? (
                <HStack gap="24">
                  <Link href={`/${lngId}${Routes.SIGNIN}`}>
                    <Button theme={ButtonTheme.TEXT}>Log In</Button>
                  </Link>
                  <Link href={`/${lngId}${Routes.SIGNUP}`}>
                    <Button theme={ButtonTheme.DEFAULT}>Sign Up</Button>
                  </Link>
                </HStack>
              ) : (
                <AuthButtonsSkeleton />
              ))}
            {mobile && isAuthorized && <HeaderMenu />}
          </HStack>
        </HStack>
      </div>
    </header>
  )
}

const AuthButtonsSkeleton = () => (
  <HStack gap="24">
    <Skeleton width="110px" height="35px" border="10px" />
    <Skeleton width="110px" height="35px" border="10px" />
  </HStack>
)
