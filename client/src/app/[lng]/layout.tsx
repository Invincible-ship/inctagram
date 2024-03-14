import { ReactNode } from 'react'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageIds } from '@/shared/config/i18n/types'
import { NextFont } from 'next/dist/compiled/@next/font'
import { AppLayout } from '../layouts/AppLayout'
import { StoreProvider } from '../providers/StoreProvider'
import { SessionProvider } from '../providers/SessionProvider/SessionProvider'
import { LanguageProvider } from '../providers/LanguageProvider/LanguageProvider'
import '../styles/index.scss'
import { UserAgentProvider } from '@/app/providers/UserAgentProvider/UserAgentProvider'
import { headers } from 'next/headers'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter: NextFont = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share!',
}

type RootLayoutProps = {
  children: ReactNode
  params: {
    lng: LanguageIds
  }
}

const RootLayout = ({ children, params: { lng } }: RootLayoutProps) => {
  const mobileHeader = headers().get('is-mobile')
  const mobile = mobileHeader ? (JSON.parse(mobileHeader) as boolean) : false

  return (
    <html lang={lng} dir={dir('ltr')} className={inter.className}>
      <head />
      <body>
        <div className="app">
          <StoreProvider>
            <SessionProvider>
              <LanguageProvider lngId={lng}>
                <UserAgentProvider mobile={mobile}>
                  <AppLayout lngId={lng as LanguageIds}>{children}</AppLayout>
                </UserAgentProvider>
              </LanguageProvider>
            </SessionProvider>
          </StoreProvider>
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
