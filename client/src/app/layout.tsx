import { SessionProvider } from '@/providers/SessionProvider/SessionProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share!',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </StoreProvider>
  )
}

export default RootLayout
