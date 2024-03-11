'use client'

import { UserAgentContext, UserAgentType } from '@/shared/lib/context/UserAgentContext'
import { FC, ReactNode } from 'react'

type UserAgentProvider = Record<keyof UserAgentType, UserAgentType[keyof UserAgentType]> & {
  children: ReactNode
}

export const UserAgentProvider: FC<UserAgentProvider> = ({ children, ...userAgentOptions }) => {
  const userAgent: UserAgentType = {
    ...userAgentOptions,
  }

  return <UserAgentContext.Provider value={userAgent}>{children}</UserAgentContext.Provider>
}
