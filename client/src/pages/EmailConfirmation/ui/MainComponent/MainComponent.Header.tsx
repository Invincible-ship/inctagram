import { FC } from 'react'
import s from './emailConfirmation.module.scss'

type HeaderProps = {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className={s.title}>
        <h3>{title}</h3>
      </div>
    </>
  )
}
