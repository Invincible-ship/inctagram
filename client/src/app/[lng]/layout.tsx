import { ReactNode, Suspense } from 'react'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageIds } from '@/shared/config/i18n/types'
import Loading from './loading'
import { NextFont } from 'next/dist/compiled/@next/font'
import { AppLayout } from '../layouts/AppLayout'
import { StoreProvider } from '../providers/StoreProvider'
import { SessionProvider } from '../providers/SessionProvider/SessionProvider'
import { LanguageProvider } from '../providers/LanguageProvider/LanguageProvider'
import '../styles/index.scss'

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
  return (
    <html lang={lng} dir={dir('ltr')} className={inter.className}>
      <head />
      <body>
        <div className="app">
          <StoreProvider>
            <SessionProvider>
              <LanguageProvider lngId={lng}>
                <AppLayout lngId={lng as LanguageIds}>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </AppLayout>
              </LanguageProvider>
            </SessionProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
