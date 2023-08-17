import React, { FC, useState } from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import s from './dropdownMenu.module.scss'
import Link from 'next/link'
import { classNames } from '@/shared/lib/classNames/classNames'

type DropdownMenuItemsProps = {
  text: string
  icon: React.ReactNode
  iconActive: React.ReactNode
  path: string
}

type DropdownMenuProps = {
  icon: React.ReactNode
  items: Array<DropdownMenuItemsProps>
  t: (key: string) => string
}

const DropdownMenu: FC<DropdownMenuProps> = ({ icon, items, t }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClickOpenChange = () => {
    setIsOpen(!isOpen)
  }

  const mods = {
    [s.isClosing]: !isOpen,
  }

  return (
    <Dropdown.Root open={isOpen} onOpenChange={onClickOpenChange}>
      <Dropdown.Trigger asChild>
        <button onClick={onClickOpenChange} className={s.iconButton}>
          {icon}
        </button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className={classNames(s.dropdownMenuContent, mods, [])}
          sideOffset={0}
          loop={true}
        >
          {items.map((i, index) => {
            return (
              <Dropdown.Item key={i.text} className={s.dropdownMenuItem}>
                <Link className={s.link} href={i.path}>
                  <span className={s.image}>{i.icon}</span>
                  <span>{t(i.text)}</span>
                </Link>
              </Dropdown.Item>
            )
          })}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

export default DropdownMenu
