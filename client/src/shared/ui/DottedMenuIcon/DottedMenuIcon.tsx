import { FC } from 'react'
import cls from './DottedMenuIcon.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

type DottedMenuIconProps = {
  isActive?: boolean
  className?: string
}

export const DottedMenuIcon: FC<DottedMenuIconProps> = ({ isActive, className }) => {
  const mods = {
    [cls.active]: isActive,
  }

  return (
    <div role="button" className={classNames(cls.menu, mods, [className])}>
      <span className={cls.dot}></span>
      <span className={cls.dot}></span>
      <span className={cls.dot}></span>
    </div>
  )
}
