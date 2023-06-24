"use client"

import '@/shared/config/i18n/i18n'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import styles from './page.module.css'

const Home = () => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language == 'ru' ? 'en' : 'ru')
  }

  return (
    <Suspense fallback="loading">
      <main className={styles.main} style={{height: "100vh", padding: 0}}>
        <h1>{t('test')}</h1>
        <button onClick={toggle}>Переключить язык</button>
      </main>
    </Suspense>
  )
}

export default Home
