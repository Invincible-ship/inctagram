"use client"

import { FC } from "react"
import OutlineBell from "@/shared/assets/icons/bell-outline.svg"
import Logo from "@/shared/assets/icons/logo.svg"
import { LangSwitcher } from "@/features/LangSwitcher"
import cls from "./Header.module.scss"
import { SignOutButton } from "@/features/auth/signout"
import { LanguageIds } from "@/shared/config/i18n/types"

type HeaderProps = {
  lngId: LanguageIds;
};

export const Header: FC<HeaderProps> = ({ lngId }) => (
  <header data-testid="header" className={cls.header}>
    <div className={cls.headerContainer}>
      <div className={cls.logo}>
        <Logo />
      </div>
      <div className={cls.right}>
        {/*FIXME: implement notifications */}
        <span>
          <OutlineBell />
        </span>
        <LangSwitcher initialLngId={lngId} />
        <SignOutButton />
      </div>
    </div>
  </header>
)
