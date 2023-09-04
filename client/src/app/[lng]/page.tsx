'use client'

import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import React from 'react'

const Page = () => {
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

export default withAuth(Page, { routeRole: 'all' })
