import Link from 'next/link'
import { classNames } from '@/shared/lib/classNames/classNames'
import s from './../SidebarWeb/sideBar.module.scss'
import { SidebarItemProps } from '../SidebarWeb/SidebarItem'

type SidebarFooterProps = Omit<SidebarItemProps, 'text'>

export const SidebarFooterItem = ({
  onClick,
  isActive,
  iconActive,
  icon,
  path,
}: SidebarFooterProps) => {
  return (
    <>
      <li className={s.item}>
        <Link
          onClick={onClick}
          className={isActive ? classNames(s.link, {}, [s.active]) : s.link}
          href={path}
        >
          <span className={s.image}>{isActive ? (iconActive ? iconActive : icon) : icon}</span>
        </Link>
      </li>
    </>
  )
}
