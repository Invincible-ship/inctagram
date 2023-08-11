'use client'
import { FC, ReactNode } from 'react'
import s from './sideBar.module.scss'
import Link from 'next/link'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TFunction } from 'i18next'

type SidebarItemProps = {
  text: string
  icon: ReactNode
  iconActive?: ReactNode
  path: string
  isActive: boolean
  onClick: () => void
  t: TFunction<string, undefined>
}

export const SidebarItem: FC<SidebarItemProps> = ({
  onClick,
  isActive,
  text,
  icon,
  iconActive,
  path,
  t,
}) => {
  return (
    <>
      <li className={s.item}>
        <Link
          onClick={onClick}
          className={isActive ? classNames(s.link, {}, [s.active]) : s.link}
          href={path}
        >
          <span className={s.image}>{isActive ? (iconActive ? iconActive : icon) : icon}</span>
          <span className={s.text}>{t(text)}</span>
        </Link>
      </li>
    </>
  )
}
