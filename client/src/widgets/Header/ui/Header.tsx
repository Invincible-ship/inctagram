'use client'

import { FC, useContext, useMemo } from 'react'
import OutlineBell from '@/shared/assets/icons/bell-outline.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import cls from './Header.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'
import { HeaderMenu } from './HeaderMenu'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { LangSwitcher } from '@/features/LangSwitcher'
import SignInIcon from '@/shared/assets/icons/login-2-svgrepo-com.svg'
import { UserAgentContext } from '@/shared/lib/context/UserAgentContext'
import { useClientTranslation } from '@/shared/config/i18n/client'

type HeaderProps = {
  isUserInited?: boolean
  isAuthorized?: boolean
}

export const Header: FC<HeaderProps> = ({ isAuthorized, isUserInited }) => {
  const { t } = useClientTranslation()
  const lngId = useContext(LanguageContext)
  const { mobile } = useContext(UserAgentContext)

  const authButtons = useMemo(() => {
    return !mobile ? (
      <HStack gap="24">
        <Link href={`/${lngId}${Routes.SIGNIN}`}>
          <Button theme={ButtonTheme.TEXT}>{t('header.signin')}</Button>
        </Link>
        <Link href={`/${lngId}${Routes.SIGNUP}`}>
          <Button theme={ButtonTheme.DEFAULT}>{t('header.signup')}</Button>
        </Link>
      </HStack>
    ) : (
      <Link href={`/${lngId}${Routes.SIGNIN}`}>
        <SignInIcon />
      </Link>
    )
  }, [mobile, lngId, t])

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
              (isUserInited ? authButtons : <AuthButtonsSkeleton mobile={mobile} />)}
            {mobile && isAuthorized && <HeaderMenu />}
          </HStack>
        </HStack>
      </div>
    </header>
  )
}

const AuthButtonsSkeleton = ({ mobile }: { mobile?: boolean }) =>
  !mobile ? (
    <HStack gap="24">
      <Skeleton width="110px" height="35px" border="10px" />
      <Skeleton width="110px" height="35px" border="10px" />
    </HStack>
  ) : (
    <HStack>
      <Skeleton width={24} height={24} border="5px" />
    </HStack>
  )
