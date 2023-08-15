'use client'

import * as Select from '@radix-ui/react-select'
import ArrowDown from '@/shared/assets/icons/arrow-down.svg'
import FlagRU from '@/shared/assets/icons/ru-flag.svg'
import FlagUK from '@/shared/assets/icons/uk-flag.svg'
import CheckIcon from '@/shared/assets/icons/check.svg'
import { languages } from '@/shared/config/i18n/settings'
import { FC, ReactNode, Suspense, useContext, useMemo, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import cls from './LangSwitcher.module.scss'
import { LanguageIds } from '@/shared/config/i18n/types'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'

// type LangSwitcherProps = {
//   initialLngId: LanguageIds;
// };

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
      return { id: LanguageIds.EN, lng: 'English', icon: <FlagUK /> }
  }
})

const LangSwitcher = () => {
  const initialLngId = useContext(LanguageContext)
  const [lngId, setLngId] = useState(initialLngId)
  const router = useRouter()
  const pathname = usePathname() as string
  const searchParams = useSearchParams()

  const selectedLanguage = useMemo(() => {
    return languagesOptions.find(option => option?.id == lngId)
  }, [lngId]) as TLanguageOption

  const onChange = (value: LanguageIds) => {
    setLngId(value)

    const newPathname = `${pathname.replace(`${lngId}`, value)}?${searchParams?.toString()}`
    router.replace(newPathname)
  }

  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger className={cls.trigger}>
        <Select.Value>
          <Option option={selectedLanguage} />
        </Select.Value>
        <Select.Icon className={cls['lng-icon']}>
          <ArrowDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className={cls.content} position="popper">
        <Select.Viewport>
          {languagesOptions.map(option => (
            <Select.Item key={option.id} value={option.id} className={cls.item}>
              <Option option={option} />
              <Select.ItemIndicator className={cls.indicator}>
                <CheckIcon className={cls['check-icon']} />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

const Option = ({ option }: { option: TLanguageOption }) => (
  <div className={cls.value}>
    <span>{option?.icon}</span>
    {option?.lng}
  </div>
)

export const SuspenseLangSwitcher = () => (
  <Suspense fallback={<>placeholder</>}>
    <LangSwitcher />
  </Suspense>
)
