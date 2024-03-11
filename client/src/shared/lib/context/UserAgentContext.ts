import { createContext } from 'react'

export type UserAgentType = {
  mobile: boolean
}

export const UserAgentContext = createContext<UserAgentType>({
  mobile: false,
})
