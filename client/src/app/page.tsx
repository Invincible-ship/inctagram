"use client"

import '@/shared/config/i18n/i18n'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

const Home = () => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language == 'ru' ? 'en' : 'ru')
  }

  return (
    <Suspense fallback="loading">
      <main className="app" style={{height: "100vh"}}>
        <h1>{t('test')}</h1>
        <Button 
          onClick={toggle} 
          theme={ButtonTheme.DEFAULT}
        >
          Switch
        </Button>
      </main>
    </Suspense>
  )
}

export default Home
