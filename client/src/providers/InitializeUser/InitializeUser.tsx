'use client'

import { getIsUserInited, initAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const InitializeUser = ({ children }: { children: ReactNode }) => {
  const inited = useSelector(getIsUserInited)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData())
    }
  }, [dispatch, inited])

  return children
}
