import React, { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './sidebarMobile.module.scss'
import Link from 'next/link'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

const DropdownMobileMenu = ({ icon, menuItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useClientTranslation('', Namespaces.SIDEBAR)

  const onClickOpenChange = () => {
    setIsOpen(!isOpen)
  }

  const mods = {
    [s.isClosing]: !isOpen,
  }

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onClickOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button className={s.iconButton}>{icon}</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={classNames(s.dropdownMenuContent, mods, [])}
          sideOffset={0}
          loop={true}
        >
          {menuItems.map((item, index) => {
            return (
              <DropdownMenu.Item key={item.text} className={s.dropdownMenuItem}>
                <Link className={s.link} href={item.path}>
                  <span className={s.image}>{item.icon}</span>
                  <span>{t(item.text)}</span>
                </Link>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMobileMenu
