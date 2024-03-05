'use client'

import FlagRU from '@/shared/assets/icons/ru-flag.svg'
import FlagUK from '@/shared/assets/icons/uk-flag.svg'
import { languages } from '@/shared/config/i18n/settings'
import {
  FC,
  MutableRefObject,
  ReactNode,
  Suspense,
  memo,
  useContext,
  useMemo,
  useState,
} from 'react'
import { usePathname, useSearchParams, redirect } from 'next/navigation'
import cls from './LangSwitcher.module.scss'
import { LanguageIds } from '@/shared/config/i18n/types'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { Select, SelectItem } from '@/shared/ui/Select/Select'

type TLanguageOption = {
  id: LanguageIds
  lng: string
  icon: ReactNode
}

const languagesOptions: TLanguageOption[] = languages.map(lng => {
  switch (lng) {
    case 'en':
      return { id: LanguageIds.EN, lng: 'English', icon: <FlagUK /> }
    case 'ru':
      return { id: LanguageIds.RU, lng: 'Russian', icon: <FlagRU /> }
    default:
      return { id: LanguageIds.RU, lng: 'Russian', icon: <FlagRU /> }
  }
})

type LangSwitcherProps = {
  portalContainer?: HTMLElement | null
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(({ portalContainer }) => {
  const lngId = useContext(LanguageContext)
  const pathname = usePathname() as string
  const searchParams = useSearchParams()

  const selectedLanguage = useMemo(() => {
    return languagesOptions.find(option => option?.id == lngId)
  }, [lngId]) as TLanguageOption

  const onChange = (value: LanguageIds) => {
    const newPathname = `${pathname.replace(`${lngId}`, value)}${
      searchParams && `?${searchParams?.toString()}`
    }`
    redirect(newPathname)
  }

  const defaultSelectedItem = <Option option={selectedLanguage} />

  return (
    <Select
      testId="lang-switcher"
      onValueChange={onChange}
      portalContainer={portalContainer}
      triggerClassName={cls.trigger}
      contentClassName={cls.content}
      defaultSelectedItem={defaultSelectedItem}
    >
      {languagesOptions.map(option => (
        <SelectItem key={option.id} value={option.id} className={cls.item}>
          <Option option={option} />
        </SelectItem>
      ))}
    </Select>
  )
})

LangSwitcher.displayName = 'LangSwitcher'

const Option = ({ option }: { option: TLanguageOption }) => (
  <div className={cls.value}>
    <span>{option?.icon}</span>
    <span className={cls.lngName}>{option?.lng}</span>
  </div>
)
