import { FC } from 'react'
import OutlineBell from '@/shared/assets/icons/bell-outline.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import { SuspenseLangSwitcher } from '@/features/LangSwitcher'
import cls from './Header.module.scss'
import { LanguageIds } from '@/shared/config/i18n/types'
import { HStack } from '@/shared/ui/Stack'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'

type HeaderProps = {
  lngId?: LanguageIds
}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className={cls.headerWrapper}>
      <HStack className={cls.header} justify="between" align="center">
        <HStack align="center">
          <Link href={Routes.MAIN}>
            <Logo />
          </Link>
        </HStack>
        <HStack align="center" gap="36">
          <HStack align="center">
            <OutlineBell />
          </HStack>
          <SuspenseLangSwitcher />
        </HStack>
      </HStack>
    </header>
  )
}
