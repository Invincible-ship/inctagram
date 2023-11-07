'use client'

import { FC, useContext } from 'react'
import OutlineBell from '@/shared/assets/icons/bell-outline.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import { SuspenseLangSwitcher } from '@/features/LangSwitcher'
import cls from './Header.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'
import { HeaderMenu } from './HeaderMenu'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

type HeaderProps = {
  isAuthorized?: boolean
}

export const Header: FC<HeaderProps> = ({ isAuthorized }) => {
  const lngId = useContext(LanguageContext)
  const matched = useMediaQuery('(max-width: 769px)')

  return (
    <header className={cls.headerWrapper}>
      <div className="app-container">
        <HStack className={cls.header} justify="between" align="center">
          <HStack align="center">
            <Link href={`${lngId}${Routes.MAIN}`}>
              <Logo />
            </Link>
          </HStack>
          <HStack align="center" gap={!matched ? '36' : '12'}>
            {!matched && !isAuthorized && (
              <HStack align="center">
                <OutlineBell />
              </HStack>
            )}
            <SuspenseLangSwitcher />
            {matched && isAuthorized && <HeaderMenu />}
          </HStack>
        </HStack>
      </div>
    </header>
  )
}
