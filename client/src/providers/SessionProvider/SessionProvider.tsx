'use client'

import { initProfileDataThunk } from '@/entities/Profile'
import { getIsUserInited, initAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const inited = useSelector(getIsUserInited)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initializeUser = async () => {
      if (!inited) {
        await dispatch(initAuthData())
        dispatch(initProfileDataThunk())
      }
    }

    initializeUser()
  }, [dispatch, inited])

  return children
}
