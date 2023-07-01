import { ReactNode } from 'react'
import { languages } from '@/shared/config/i18n/settings'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { LanguageParams } from '@/shared/config/i18n/types'
import '@/shared/styles/index.scss'
import { Header } from '@/widgets/Header'
import {Provider} from "react-redux";
import {store} from "@/providers/StoreProvider/config/store";
import {Providers} from "@/providers/StoreProvider/provider";

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share ',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const RootLayout = ({
  children,
  params: { lng }
} : {
  children: ReactNode,
  params: LanguageParams
}) => {
  return (
        <html lang={lng} dir={dir(lng)} className={inter.className}>
        <head />
        <body className='app'>
        <Header lng={lng} />
        <Providers>{children}</Providers>
        </body>
        </html>


  )
}

export default RootLayout