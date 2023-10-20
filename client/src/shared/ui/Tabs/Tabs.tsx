import { Flex, FlexDirection } from '@/shared/ui/Stack/Flex/Flex'
import { ReactNode, memo, useCallback, useEffect, useLayoutEffect } from 'react'
import cls from './Tabs.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { calculateActiveTabPosition } from './utils/calculateActiveTabPosition'

export type Tab<T> = {
  value: T
  content: ReactNode
}

type TabsProps = {
  className?: string
  direction?: FlexDirection
  tabs: Tab<any>[]
  value: string
  onTabClick: (tab: Tab<any>) => void
}

export const Tabs = memo((props: TabsProps) => {
  const { direction = 'row', className, tabs, value, onTabClick } = props

  const handleClick = useCallback(
    (tab: Tab<any>) => {
      return () => onTabClick(tab)
    },
    [onTabClick],
  )

  useLayoutEffect(() => {
    calculateActiveTabPosition()

    window.addEventListener('resize', calculateActiveTabPosition)

    return () => removeEventListener('resize', calculateActiveTabPosition)
  })

  return (
    <Flex
      data-name="tabs"
      direction={direction}
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
          >
            {tab.content}
            {direction === 'row' && <span className={cls.underline}></span>}
          </div>
        )
      })}

      {direction === 'row' && (
        <span data-name="active-underline" className={cls.activeUnderline}></span>
      )}
    </Flex>
  )
})

Tabs.displayName = 'Tabs'
