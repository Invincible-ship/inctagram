'use client'

import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'
import React, { useContext } from 'react'

const Page = () => {
  const lngId = useContext(LanguageContext)

  return (
    <div>
      <h1>Home page</h1>
      <Link href={`/${lngId}${Routes.SIGNIN}`}>To sigin</Link>
      <Link href={`/${lngId}${Routes.SIGNUP}`}>To signup</Link>
    </div>
  )
}

export default withAuth(Page, { routeRole: 'all' })
