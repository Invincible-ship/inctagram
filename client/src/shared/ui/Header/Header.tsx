import {FC, ReactNode} from "react"
import OutlineBell from '../../../../public/icons/bell-outline.svg'
import style from './Header.module.scss'

type HeaderProps = {
    logo: string
    children?: ReactNode
}

export const Header: FC<HeaderProps> = ({logo, children}) => {
    return (
      <header className={style.header}>
        <div className={style.headerContainer}>
          <div className={style.logo}>{logo}</div>
          <div>
            <OutlineBell stroke="white"/>
            {children}
          </div>
        </div>
      </header>
    )
}
