import { InitializeUser } from '@/providers/InitializeUser/InitializeUser'
import { StoreProvider } from '@/providers/StoreProvider'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <InitializeUser>{children}</InitializeUser>
    </StoreProvider>
  )
}

export default RootLayout
