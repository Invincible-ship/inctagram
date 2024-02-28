'use client'

import { getScrollPositionByPath, setScrollPositionForPath } from '@/features/UI'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { usePathname } from 'next/navigation'
import { UIEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useScrollPosition = () => {
  const pathname = usePathname()
  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollPositionByPath(state, pathname),
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const document = window.document.documentElement
    document.scrollTop = scrollPosition

    document.addEventListener('scroll', onScroll)

    return document.removeEventListener('scroll', onScroll)
  }, [])

  const onScroll = useThrottle((window: Window, e: UIEvent<Window>) => {
    const position = e.currentTarget.scrollY
    console.log('Position in scroll: ', position)

    if (position != undefined && position != 0) {
      dispatch(setScrollPositionForPath({ position, pathname }))
    }
  }, 500)
}
