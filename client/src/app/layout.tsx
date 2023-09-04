import { InitializeUser } from '@/providers/InitializeUser/InitializeUser'
import { StoreProvider } from '@/providers/StoreProvider'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share!',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <InitializeUser>{children}</InitializeUser>
    </StoreProvider>
  )
}

export default RootLayout
