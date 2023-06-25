"use client"

import '@/shared/config/i18n/i18n'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import OutlineIcon from '../../public/icons/home-outline.svg'
import {Header} from "@/shared/ui/Header/Header"

const Home = () => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language == 'ru' ? 'en' : 'ru')
  }

  return (
    <Suspense fallback="loading">
      <main className="app" style={{height: "100vh"}}>
        <Header logo={'Inctagram'}/>
        <h1>{t('test')}</h1>
        <Button 
          onClick={toggle} 
          theme={ButtonTheme.DEFAULT}
        >
          Switch
        </Button>
        <OutlineIcon stroke="white" />
      </main>
    </Suspense>
  )
}

export default Home
