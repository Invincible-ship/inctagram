'use client'
import homeIcon from '@/shared/assets/icons/home-outline.svg'
import Image from 'next/image'
import { FC } from 'react'
import s from './sideBar.module.scss'
import { IconHome } from './iconsComponent/IconHome'
import Link from 'next/link'

type SidebarItemProps = {
  text: string
}

export const SidebarItem: FC<SidebarItemProps> = ({ text }) => {
  return (
    <>
      <li className={s.item}>
        <Link className={s.link} href={'#'}>
          <div className={s.image}>
            <IconHome />
          </div>
          <span className={s.text}>{text}</span>
        </Link>
      </li>
    </>
  )
}
