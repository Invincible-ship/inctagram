'use client'

import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import React from 'react'

const Page = () => {
  return (
    <>
      <div>hello world</div>
    </>
  )
}

export default withAuth(Page, { routeRole: 'all' })
