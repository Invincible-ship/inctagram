import cls from './DottedMenuIcon.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export const DottedMenuIcon = ({ isActive }: { isActive?: boolean }) => {
  const mods = {
    [cls.active]: isActive,
  }

  return (
    <div role="button" className={classNames(cls.menu, mods)}>
      <span className={cls.dot}></span>
      <span className={cls.dot}></span>
      <span className={cls.dot}></span>
    </div>
  )
}
