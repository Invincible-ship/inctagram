import { Flex, FlexJustify, FlexProps } from '@/shared/ui/Stack/Flex/Flex'
import { ReactNode, Suspense, memo, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import cls from './Tabs.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { calculateActiveTabPosition } from './utils/calculateActiveTabPosition'

export type Tab<T> = {
  value: T
  content: ReactNode
}

type TabsProps = {
  className?: string
  tabs: Tab<any>[]
  value: string
  onTabClick: (tab: Tab<any>) => void
  textColor?: string
  justifyChild?: FlexJustify
  withUnderline?: boolean
  name?: string
} & Pick<FlexProps, 'align' | 'gap' | 'direction' | 'justify'>

export const Tabs = (props: TabsProps) => {
  const {
    direction = 'row',
    gap,
    justifyChild,
    className,
    tabs,
    value,
    textColor,
    onTabClick,
    withUnderline,
    name,
  } = props

  const [_, forceRerender] = useState()

  const handleClick = useCallback(
    (tab: Tab<any>) => {
      return () => onTabClick(tab)
    },
    [onTabClick],
  )

  useLayoutEffect(() => {
    if (!withUnderline) return

    calculateActiveTabPosition(name)

    const handleResizeWindow = () => calculateActiveTabPosition(name)

    window.addEventListener('resize', handleResizeWindow)
    return () => removeEventListener('resize', handleResizeWindow)
  }, [withUnderline, value, name])

  useEffect(() => {
    forceRerender(undefined)
  })

  return (
    <Flex
      data-name={`tabs-${name}`}
      direction={direction}
      gap={gap}
      max
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs?.map(tab => {
        const isSelected = value == tab.value
        const tabMods = {
          [cls.selected]: isSelected,
        }

        return (
          <div
            key={tab.value}
            data-selected={isSelected}
            onClick={handleClick(tab)}
            className={classNames(cls.Tab, tabMods)}
            style={{ color: !isSelected ? textColor : undefined, justifyContent: justifyChild }}
          >
            {tab.content}
            {withUnderline && <span className={cls.underline}></span>}
          </div>
        )
      })}

      {withUnderline && <span data-name="active-underline" className={cls.activeUnderline}></span>}
    </Flex>
  )
}

Tabs.displayName = 'Tabs'
