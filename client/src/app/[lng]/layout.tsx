import { ReactNode, Suspense } from 'react'
import { languages } from '@/shared/config/i18n/settings'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageParams } from '@/shared/config/i18n/types'
import { Header } from '@/widgets/Header'
import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import Loading from './loading'
import { LanguageProvider } from '@/providers/LanguageProvider/LanguageProvider'
import { Sidebar } from '@/widgets/Sidebar'

const inter = Inter({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
})

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share ',
}

export async function generateStaticParams() {
  return languages.map(lngId => ({ lngId }))
}

const RootLayout = async ({
  children,
  params: { lng: lngId },
}: {
  children: ReactNode
  params: LanguageParams
}) => {
  return (
    <html lang={lngId} dir={dir(lngId)} className={inter.className}>
      <head />
      <body className="app">
        <LanguageProvider lngId={lngId}>
          <Suspense fallback={<Loading />}>
            <Header />
            <main className="main">
              <Sidebar />
              <section className="section">{children}</section>
            </main>
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}

export default RootLayout
