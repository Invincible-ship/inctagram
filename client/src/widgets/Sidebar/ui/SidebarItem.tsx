'use client'
import { FC } from 'react'
import s from './sideBar.module.scss'
import Link from 'next/link'
import { classNames } from '@/shared/lib/classNames/classNames'

type SidebarItemProps = {
  text: string
  icon: React.ReactNode
  iconActive?: React.ReactNode
  path: string
  isActive: boolean
  onClick: () => void
}

export const SidebarItem: FC<SidebarItemProps> = ({
  onClick,
  isActive,
  text,
  icon,
  iconActive,
  path,
}) => {
  return (
    <>
      <li className={s.item}>
        <Link
          onClick={onClick}
          className={isActive ? classNames(s.link, {}, [s.active]) : s.link}
          href={path}
        >
          {/*<Link onClick={onClick} className={s.link} href={path}>*/}
          <span className={s.image}>{isActive ? (iconActive ? iconActive : icon) : icon}</span>
          <span className={s.text}>{text}</span>
          {/*<span className={isActive ? classNames(s.text, {}, [s.active]) : s.text}>{text}</span>*/}
        </Link>
      </li>
    </>
  )
}
