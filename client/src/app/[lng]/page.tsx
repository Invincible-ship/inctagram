'use client'

import { getUserAuthData } from '@/entities/User'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { Routes } from '@/shared/types/routes'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const lngId = useContext(LanguageContext)
  const userData = useSelector(getUserAuthData)

  return (
    <div>
      <h1>Home page</h1>
      <Link href={`/${lngId}${Routes.SIGNIN}`}>To sigin</Link>
      <Link href={`/${lngId}${Routes.SIGNUP}`}>To signup</Link>
      <div>
        <p>User Data: </p>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default withAuth(Page, { routeRole: 'all' })
