'use server'

import { GET_PUBLIC_USER_PROFILE } from '@/shared/const/apiEndpoints'
import { IViewer } from '../../types/types'
import { VIEWER_TAG } from '@/shared/const/rtk'
import { notFound } from 'next/navigation'

const API = process.env.API
const profileEndpoint = (id: string) => `${API}${GET_PUBLIC_USER_PROFILE}/${id}`

export const fetchPublicProfile = async (profileId: string) => {
  const profileResponse = await fetch(profileEndpoint(profileId), {
    next: {
      revalidate: 3600,
      tags: [VIEWER_TAG],
    },
  })

  if (!profileResponse.ok) {
    notFound()
  }

  return profileResponse.json() as Promise<IViewer>
}
