'use client'

import { ReactNode, Suspense } from 'react'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageIds } from '@/shared/config/i18n/types'
import { Header } from '@/widgets/Header'
import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import Loading from './loading'
import { LanguageProvider } from '@/providers/LanguageProvider/LanguageProvider'
import { useParams } from 'next/navigation'
import { Toaster } from '@/shared/ui/Toaster/Toaster'
import { GoogleOAuthProvider } from '@react-oauth/google'

const inter = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin', 'cyrillic'],
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
              <Suspense fallback={<Loading />}>
                <Header />
                {children}
                <Toaster />
              </Suspense>
            </LanguageProvider>
          </GoogleOAuthProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
