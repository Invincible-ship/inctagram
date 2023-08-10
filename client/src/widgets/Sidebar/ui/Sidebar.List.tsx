'use client'
import { useState } from 'react'
import { SidebarItem } from './SidebarItem'
import s from './sideBar.module.scss'
import { footerItems, mainItems, midleBlockItems } from '../lib/sidebarItemsData'

export const SidebarList = () => {
  const [mainActiveIndex, setMainActiveIndex] = useState<number | null>(null)
  const [midleBlockActiveIndex, setMidleBlockActiveIndex] = useState<number | null>(null)
  const [footerActiveIndex, setFooterActiveIndex] = useState<number | null>(null)

  const handleMainItemClick = (index: number) => {
    setMainActiveIndex(index)
    setMidleBlockActiveIndex(null)
    setFooterActiveIndex(null)
  }

  const handleMidleBlockItemClick = (index: number) => {
    setMainActiveIndex(null)
    setMidleBlockActiveIndex(index)
    setFooterActiveIndex(null)
  }

  const handleFooterItemClick = (index: number) => {
    setMainActiveIndex(null)
    setMidleBlockActiveIndex(null)
    setFooterActiveIndex(index)
  }

  return (
    <>
      <nav className={s.sidebar}>
        <div className={s.body}>
          <ul className={s.mainBlock}>
            {mainItems.map((i, index) => {
              return (
                <SidebarItem
                  key={i.text}
                  icon={i.icon}
                  iconActive={i.iconActive}
                  path={i.path}
                  text={i.text}
                  isActive={mainActiveIndex === index}
                  onClick={() => handleMainItemClick(index)}
                />
              )
            })}
          </ul>
          <ul className={s.midleBlock}>
            {midleBlockItems.map((i, index) => {
              return (
                <SidebarItem
                  key={i.text}
                  icon={midleBlockActiveIndex === index ? i.iconActive : i.icon}
                  path={i.path}
                  text={i.text}
                  isActive={midleBlockActiveIndex === index}
                  onClick={() => handleMidleBlockItemClick(index)}
                />
              )
            })}
          </ul>
          <ul className={s.footer}>
            {footerItems.map((i, index) => {
              return (
                <SidebarItem
                  key={i.text}
                  icon={footerActiveIndex === index ? i.iconActive : i.icon}
                  path={i.path}
                  text={i.text}
                  isActive={footerActiveIndex === index}
                  onClick={() => handleFooterItemClick(index)}
                />
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
