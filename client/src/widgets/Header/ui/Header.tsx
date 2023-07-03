import { FC } from "react"
import OutlineBell from '@/shared/assets/icons/bell-outline.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import { LangSwitcher } from "@/features/LangSwitcher"
import cls from './Header.module.scss'

export type HeaderProps = {
  lng: string;
}

export const Header: FC<HeaderProps> = ({ lng }) => {
    return (
        <header className={cls.header}>
            <div className={cls.headerContainer}>
                <div className={cls.logo}><Logo /></div>
                <div className={cls.right}>
                    {/*FIXME: implement notifications */}
                    <span data-testid="bell-icon"><OutlineBell /></span>
                    <LangSwitcher currentLngId={lng} />
                </div>
            </div>
        </header>
    )
}


