'use server'

import { UsersTotalCountResponse } from '@/entities/Viewer/model/types/types'
import { GET_USERS_TOTAL_COUNT } from '@/shared/const/apiEndpoints'

const totalUsersCountEndpoint = `${process.env.API}${GET_USERS_TOTAL_COUNT}`

export const fetchUsersTotalCount = async () => {
  const res = await fetch(totalUsersCountEndpoint, {
    next: { revalidate: 600 },
  })

  if (!res.ok) {
    return undefined
  }

  return res.json() as Promise<UsersTotalCountResponse>
}
