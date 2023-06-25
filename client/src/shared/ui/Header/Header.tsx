import {FC, ReactNode} from "react"
import OutlineBell from '../../../../public/icons/bell-outline.svg'
import style from './Header.module.scss'
import Link from "next/link";

type HeaderProps = {
	logo: string
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({logo, children}) => {
	return (
  <header className={style.header}>
		<div className={style.headerContainer}>
				<Link href={'/'} className={style.link}>
					{logo}
				</Link>
				<OutlineBell stroke="white" />
				{children}
		</div>
  </header>
	)
}
