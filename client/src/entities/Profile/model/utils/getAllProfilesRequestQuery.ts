import { GET_ALL_PROFILES } from '@/shared/const/apiEndpoints'
import { AllProfilesRequestParams } from '../types/types'

export const getAllProfilesRequestQuery = (config: AllProfilesRequestParams) => {
  const { cursor, ...restConfig } = config
  const qp = new URLSearchParams({
    cursor: cursor ? String(cursor) : '0',
  })

  Object.entries(restConfig).forEach(([key, value]) => {
    if (value != undefined) qp.append(key, String(value))
  })

  return `${GET_ALL_PROFILES}?${qp.toString()}`
}
