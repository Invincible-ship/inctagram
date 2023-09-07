'use client'

import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'

const Profile = () => {
  return <h1>Profile Page</h1>
}

export default withAuth(Profile, { routeRole: 'all' })
