'use client'

import { classNames } from '@/shared/lib/classNames/classNames'
import { FC, MutableRefObject, ReactNode, memo, useRef } from 'react'
import cls from './Page.module.scss'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { usePathname, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/app/providers/StoreProvider'
import { getScrollPositionByPath, setScrollPositionForPath } from '@/features/UI'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'

type PageProps = {
  children: ReactNode
  className?: string
  onScrollEnd?: () => void
  isTriggerActive?: boolean
}

export const Page: FC<PageProps> = memo(
  ({ className, onScrollEnd, children, isTriggerActive = true }) => {
    const searchParams = useSearchParams()
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const pathname = usePathname()
    const scrollPosition = useSelector((state: StateSchema) =>
      getScrollPositionByPath(state, pathname),
    )
    const dispatch = useAppDispatch()

    useInfiniteScroll({
      wrapperRef,
      triggerRef,
      callback: onScrollEnd,
    })

    useInitialEffect(() => {
      window.scrollTo({ top: scrollPosition })

      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }, [searchParams])

    const onScroll = useThrottle(() => {
      const position = window.scrollY

      if (position != undefined && position != 0) {
        dispatch(setScrollPositionForPath({ position, pathname }))
      }
    }, 100)

    return (
      <div ref={wrapperRef} className={classNames(cls.Page, {}, ['Page', className])}>
        {children}
        {onScrollEnd ? (
          <div
            ref={triggerRef}
            className={cls.trigger}
            style={{ display: isTriggerActive ? 'block' : 'none' }}
          ></div>
        ) : null}
      </div>
    )
  },
)

Page.displayName = 'Page'
