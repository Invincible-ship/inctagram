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

const inter = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin', 'cyrillic'],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { lng: lngId } = useParams()

  return (
    <html lang={lngId} dir={dir(lngId)} className={inter.className}>
      <head />
      <body>
        <div className="app">
          <LanguageProvider lngId={lngId as LanguageIds}>
            <Suspense fallback={<Loading />}>
              <Header />
              {children}
              <Toaster />
            </Suspense>
          </LanguageProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
