'use client'
import { useState } from 'react'
import { SidebarItem } from './SidebarItem'
import s from './sideBar.module.scss'
import {
  upBlockItems,
  midleBlockItems,
  logoutBlockItems,
  mobileFooterItems,
} from '../../lib/sidebarItemsData'
import { SidebarFooterItem } from '../SidebarMobile/SidebarMobileFooterItem'

export const Sidebar = () => {
  const [mainActiveIndex, setMainActiveIndex] = useState<number | null>(null)
  const [midleBlockActiveIndex, setMidleBlockActiveIndex] = useState<number | null>(null)
  const [logoutActiveIndex, setLogoutActiveIndex] = useState<number | null>(null)

  const handleMainItemClick = (index: number) => {
    setMainActiveIndex(index)
    setMidleBlockActiveIndex(null)
    setLogoutActiveIndex(null)
  }

  const handleMidleBlockItemClick = (index: number) => {
    setMainActiveIndex(null)
    setMidleBlockActiveIndex(index)
    setLogoutActiveIndex(null)
  }

  const handleLogoutItemClick = (index: number) => {
    setMainActiveIndex(null)
    setMidleBlockActiveIndex(null)
    setLogoutActiveIndex(index)
  }

  return (
    <>
      <nav className={s.sidebar}>
        <div className={s.container}>
          <div className={s.body}>
            <Sidebar.UpBlock
              mainActiveIndex={mainActiveIndex}
              handleMainItemClick={handleMainItemClick}
            />
            <Sidebar.MidleBlock
              midleBlockActiveIndex={midleBlockActiveIndex}
              handleMidleBlockItemClick={handleMidleBlockItemClick}
            />
            <Sidebar.LogoutBlock
              logoutActiveIndex={logoutActiveIndex}
              handleLogoutItemClick={handleLogoutItemClick}
            />
          </div>
        </div>
      </nav>
      <Sidebar.MobileFooter
        mainActiveIndex={mainActiveIndex}
        handleMainItemClick={handleMainItemClick}
      />
    </>
  )
}

//eslint-disable-next-line
Sidebar.UpBlock = ({ mainActiveIndex, handleMainItemClick }: UpBlockAndFooterProps) => {
  return (
    <ul className={s.mainBlock}>
      {upBlockItems.map((i, index) => {
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
  )
}
//eslint-disable-next-line
Sidebar.MidleBlock = ({ midleBlockActiveIndex, handleMidleBlockItemClick }: MidleBlockProps) => {
  return (
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
  )
}
//eslint-disable-next-line
Sidebar.LogoutBlock = ({ logoutActiveIndex, handleLogoutItemClick }: LogoutBlockrProps) => {
  return (
    <ul className={s.logout}>
      {logoutBlockItems.map((i, index) => {
        return (
          <SidebarItem
            key={i.text}
            icon={logoutActiveIndex === index ? i.iconActive : i.icon}
            path={i.path}
            text={i.text}
            isActive={logoutActiveIndex === index}
            onClick={() => handleLogoutItemClick(index)}
          />
        )
      })}
    </ul>
  )
}
//eslint-disable-next-line
Sidebar.MobileFooter = ({ mainActiveIndex, handleMainItemClick }: UpBlockAndFooterProps) => {
  return (
    <>
      <footer className={s.mobileFooter}>
        {mobileFooterItems.map((i, index) => {
          return (
            <SidebarFooterItem
              key={index}
              icon={mainActiveIndex === index ? i.iconActive : i.icon}
              path={i.path}
              isActive={mainActiveIndex === index}
              onClick={() => handleMainItemClick(index)}
            />
          )
        })}
      </footer>
    </>
  )
}

type UpBlockAndFooterProps = {
  mainActiveIndex: number | null
  handleMainItemClick: (index: number) => void
}
type MidleBlockProps = {
  midleBlockActiveIndex: number | null
  handleMidleBlockItemClick: (index: number) => void
}
type LogoutBlockrProps = {
  logoutActiveIndex: number | null
  handleLogoutItemClick: (index: number) => void
}
