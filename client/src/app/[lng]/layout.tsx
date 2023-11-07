'use client'

import { ReactNode } from 'react'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageIds } from '@/shared/config/i18n/types'
import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import Loading from './loading'
import { LanguageProvider } from '@/providers/LanguageProvider/LanguageProvider'
import { useParams } from 'next/navigation'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextFont } from 'next/dist/compiled/@next/font'
import { AppLayout } from '@/shared/ui/Layouts/AppLayout'

const inter: NextFont = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { lng: lngId } = useParams()
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

  return (
    <html lang={lngId} dir={dir(lngId)} className={inter.className}>
      <head />
      <body>
        <div className="app">
          <GoogleOAuthProvider clientId={googleClientId}>
            <LanguageProvider lngId={lngId as LanguageIds}>
              <AppLayout Fallback={Loading}>{children}</AppLayout>
            </LanguageProvider>
          </GoogleOAuthProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
